# -*- coding: utf-8 -*-
"""La alarma diaria de la pagina de OFERTAS (productos de baja rotacion).

Lee en FileMaker (SOLO LECTURA) el stock y el PVP de lo que esta publicado en
ecuclima.com/ofertas.html y deja al dia tres archivos: ofertas-datos.js,
ofertas-precios.js y ofertas-feed.tsv (el que lee Google Merchant Center).
No toca ningun otro archivo del sitio. No gasta tokens de Claude.

DONDE CORRE. Tres maneras, el mismo programa:
  - EN LA NUBE (la que vale desde el 2026-10-22): GitHub Actions, .github/workflows/ofertas-diaria.yml, 22:07 de Ecuador, todas las noches (Google Merchant Center lee el archivo a las 0:00). No depende de
    ninguna PC: Marco pidio que el automatismo no dependa de la portatil, que pasa apagada. El sitio se lee y se publica por la API de GitHub
    (origen "github", sin git ni carpeta del sitio), el acceso a FileMaker y al correo llega por el secreto OFERTAS_SECRETOS, y el estado entre corridas
    (avisos ya enviados) se guarda en .github/ofertas/estado/ del mismo repositorio. Se activa con la variable OFERTAS_ACTIONS=1 (la pone el flujo).
  - EN LA OFICINA (pc-casa): datos\\ofertas-job.json con origen "github", token en un archivo y envio de correo por el modulo de esa PC. Quedo como
    opcion; hoy no se usa.
  - EN LA PORTATIL (sin ninguna de las dos): carpeta local del sitio + git. Solo para ensayar y para las tareas manuales.

    python -m catalogo.ofertas_semanal              mira y deja un informe. NO cambia nada del sitio
    python -m catalogo.ofertas_semanal --preparar   ademas deja los 3 archivos listos (carpeta de trabajo\\FECHA)
    python -m catalogo.ofertas_semanal --aplicar    ademas los copia a la carpeta del sitio (solo origen local; sin publicar)
    python -m catalogo.ofertas_semanal --publicar   ademas los publica en ecuclima.com. SOLO con la autorizacion de Marco
                                                    (autorizacion-ofertas-semanal.json); con --simular solo muestra
    --correo                                        envia los avisos por correo: a Sabrina lo hecho y publicado, y a Marco lo que necesite su atencion
    --aviso                                         (portatil) muestra un globo en pantalla si hay algo que mirar
    --aviso-pendiente / --aviso-enviado             el texto del correo a Sabrina y su marca de enviado
    --registrar "texto" [--sin-aviso]               anota a mano un hecho en la bitacora (sale en el proximo aviso a Sabrina)
    --estado-local                                  (portatil) rehace _borrador-ventas\\fm-ofertas.json con lo publicado; usarlo tras un git pull y antes de
                                                    reconstruir las ofertas a mano, porque la nube cambia stock y precios en GitHub
    --probar-github                                 (oficina) comprueba que el token de GitHub puede escribir (crea y borra una rama de prueba)
    --probar-correo                                 manda un correo de prueba a Marco

QUE CAMBIA SOLO Y QUE ESPERA A MARCO

  Se aplica sin preguntar (cambios "seguros"):
    - el stock baja o llega a 0 (vendido, de baja, TALLER, WebNO_PROP, ya no es Producto);
    - el stock sube hasta 2 unidades (devolucion o correccion pequena);
    - el PVP cambia 10 % o menos.
  Se deja como esta publicado y se marca "para revisar" en el informe:
    - el stock sube mas de 2 unidades;
    - el PVP cambia mas de 10 % (los saltos raros suelen ser errores de digitacion);
    - el PVP baja y la oferta quedaria por debajo del precio de compra de FileMaker;
    - FileMaker no trae PVP, o el producto no aparece en FileMaker;
    - cambian mas del 30 % de los productos a la vez (cambio masivo: no se aplica nada solo).
  Ademas lee la marca «Baja Rotacion» (layout «Listado Items») y avisa que productos estan marcados y no publicados, o publicados sin marca.
  Nunca se agregan ni se quitan productos de la pagina, ni se tocan textos, fotos
  o descuentos: eso lo decide Marco (lote.txt, ofertas-config.js).

Publicar es aparte y con permiso: sin el archivo de autorizacion, --publicar se
niega. La autorizacion la escribe Marco (o la escribe Claude cuando Marco lo dice
en el chat) y vence a los 90 dias.

SEGURIDAD EN LA NUBE. El repositorio es publico y el registro de GitHub Actions tambien: aqui no hay claves, ni la direccion del servidor de FileMaker,
ni correos, ni precios de compra; el registro solo trae conteos. El detalle (con precios de compra) va por correo a Marco, nunca al registro ni al repositorio.
Los secretos (FileMaker y correo) los pone Marco en GitHub con su propio script: nunca pasan por el chat ni por la memoria.
"""
import io, os, re, sys, json, time, shutil, hashlib, base64, datetime, subprocess, tempfile, smtplib, ssl, importlib.util, urllib.parse, urllib.error, urllib.request

from . import fm

AQUI = fm.AQUI
DATOS = os.path.join(AQUI, "datos")
CARPETA_INFORMES = os.path.join(DATOS, "ofertas_semanal")
AUTORIZACION = os.path.join(DATOS, "autorizacion-ofertas-semanal.json")
ARCHIVOS = ("ofertas-datos.js", "ofertas-precios.js", "ofertas-feed.tsv")

STOCK_SUBE_MAX = 2        # unidades que puede subir el stock sin que lo mire Marco
PVP_CAMBIO_MAX = 0.10     # cambio de PVP (fraccion) que se acepta sin que lo mire Marco
MINIMO_ENCONTRADOS = 0.8  # si FileMaker trae menos de esta fraccion de los productos, algo anda mal: no se toca nada
CAMBIO_MASIVO = 0.30      # si cambian mas de esta fraccion de los productos de una vez (y son 5 o mas), no se aplica nada solo
LATIDO_DIAS = 6           # nube: cada tanto se deja una marca en el repositorio para que GitHub no apague el flujo programado (60 dias sin actividad)


def _cargar_job():
    if os.environ.get("OFERTAS_ACTIONS"):          # GitHub Actions: todo sale del entorno del flujo de trabajo
        return {"nube": True, "origen": "github", "repo": os.environ.get("GITHUB_REPOSITORY") or "marcolchillos-debug/ecuclima", "rama": "main",
                "token_env": "GITHUB_TOKEN", "trabajo": os.path.join(tempfile.gettempdir(), "ofertas-trabajo"),
                "generador_feed": os.path.join(AQUI, "generar_feed.js"), "estado_en_repo": ".github/ofertas/estado", "pedir_build_pages": True}
    ruta = os.environ.get("OFERTAS_JOB_ARCHIVO") or os.path.join(DATOS, "ofertas-job.json")     # la variable sirve para ensayar sin tocar la configuracion real
    try:
        return json.loads(io.open(ruta, encoding="utf-8").read())
    except Exception:
        return {}


JOB = _cargar_job()
NUBE = bool(JOB.get("nube"))
if NUBE:
    AUTORIZACION = os.path.join(AQUI, "autorizacion-ofertas-semanal.json")


# ---------------------------------------------------------------- utilidades
def _num(v):
    try:
        return float(str(v).replace(",", ".").replace("$", "").strip())
    except Exception:
        return None


def _txt(x):
    """Numero listo para escribir en el JS: sin '.0' si es entero."""
    x = round(float(x), 2)
    return str(int(x)) if abs(x - round(x)) < 1e-9 else repr(x)


def _clave(cod):
    m = re.match(r"^\s*EC\s*0*(\d+)", str(cod or ""), re.I)
    return int(m.group(1)) if m else None


def _leer(ruta):
    return io.open(ruta, encoding="utf-8", newline="").read()


def _escribir(ruta, texto):
    os.makedirs(os.path.dirname(ruta), exist_ok=True)
    io.open(ruta, "w", encoding="utf-8", newline="").write(texto)


def _sha_txt(texto):
    return hashlib.sha256(texto.encode("utf-8")).hexdigest()


def _hoy():
    return datetime.date.today().isoformat()


def _node():
    n = shutil.which("node")
    if n:
        return n
    for c in (r"C:\Program Files\nodejs\node.exe", r"C:\Program Files (x86)\nodejs\node.exe", r"C:\nvm4w\nodejs\node.exe"):
        if os.path.exists(c):
            return c
    raise RuntimeError("No encuentro node (hace falta para armar el archivo de Google).")


def _escritorio():
    base = os.path.expanduser("~")
    for c in (os.path.join(base, "OneDrive", "Escritorio"), os.path.join(base, "Desktop"), os.path.join(base, "Escritorio")):
        if os.path.isdir(c):
            return c
    return DATOS


def _secretos():
    """El secreto OFERTAS_SECRETOS de la nube ({"fm": ..., "smtp": ..., "avisos": ...}); {} si no hay."""
    try:
        d = json.loads(os.environ.get("OFERTAS_SECRETOS") or "{}")
        return d if isinstance(d, dict) else {}
    except Exception:
        return {}


# ---------------------------------------------------------------- de donde se lee el sitio y como se publica
class SitioLocal(object):
    """La carpeta del sitio en la portatil: lee los archivos y publica con git."""
    nombre = "local"

    def __init__(self):
        self.dir = fm.CONFIG["rutas"]["sitio"]
        self.ventas = os.path.join(self.dir, "_borrador-ventas")

    def trabajo(self):
        return os.path.join(self.ventas, "semanal")

    def generador(self):
        return os.path.join(self.ventas, "generar_feed.js")

    def leer(self, nombre):
        return _leer(os.path.join(self.dir, nombre))

    def leer_opcional(self, nombre):
        ruta = os.path.join(self.dir, nombre)
        return _leer(ruta) if os.path.exists(ruta) else None

    def _git(self, *args, check=True):
        p = subprocess.run(["git", "-C", self.dir] + list(args), capture_output=True, text=True, encoding="utf-8", errors="replace")
        if check and p.returncode != 0:
            raise RuntimeError("git %s fallo: %s" % (" ".join(args), (p.stderr or p.stdout).strip()[:400]))
        return p.stdout.strip()

    def antes_de_leer(self):
        self._git("pull", "--ff-only")

    def aplicar(self, textos, leidos):
        """Copia a la carpeta del sitio. Se niega si alguien toco los archivos mientras tanto."""
        for a in textos:
            if self.leer(a) != leidos[a]:
                raise RuntimeError("%s cambió en el sitio mientras se preparaba la actualización: se vuelve a correr." % a)
        sucios = self._git("status", "--porcelain", "--", *list(textos))
        if sucios:
            raise RuntimeError("Hay cambios sin publicar en los archivos de ofertas (%s). No se pisan." % sucios.replace("\n", " | "))
        for a, t in textos.items():
            _escribir(os.path.join(self.dir, a), t)

    def publicar(self, textos, mensaje, simular=False):
        if simular:
            print("  [simulacro] git add %s; git commit; git push" % " ".join(textos))
            return None
        if self._git("diff", "--cached", "--name-only"):
            raise RuntimeError("Hay archivos preparados (staged) en el repositorio del sitio: no se publica para no mezclar.")
        self._git("add", "--", *list(textos))
        cambiados = [x for x in self._git("diff", "--cached", "--name-only").split("\n") if x]
        if not cambiados:
            return "sin cambios"
        if any(x not in ARCHIVOS for x in cambiados):
            self._git("reset", "-q", "--", *list(textos))
            raise RuntimeError("Se iban a publicar archivos que no son de ofertas: %s" % cambiados)
        ruta_msg = os.path.join(DATOS, "mensaje-commit-ofertas.txt")
        _escribir(ruta_msg, mensaje)
        self._git("commit", "-F", ruta_msg)
        self._git("push")
        return self._git("rev-parse", "--short", "HEAD")

    def solicitar_build(self):
        pass


class SitioGitHub(object):
    """El sitio en GitHub: se lee y se publica por la API, sin git y sin carpeta del sitio.
    En la nube el token es el del propio flujo (GITHUB_TOKEN, con permisos «contents: write» y «pages: write»). En la oficina es un token fino
    (solo este repositorio, «Contents: lectura y escritura») que pone Marco con su propio script."""
    nombre = "github"

    def __init__(self, repo, rama, token_archivo=None, token_env=None):
        self.repo, self.rama = repo, rama
        self.token = ""
        if token_env and os.environ.get(token_env):
            self.token = os.environ[token_env].strip()
        elif token_archivo:
            try:
                self.token = io.open(token_archivo, encoding="utf-8").read().strip()
            except Exception:
                pass
        self._blob = {}       # archivo -> sha de git que tenia al leerlo (None si no existia)
        self.vence = None     # cuando vence el token (GitHub lo dice en una cabecera de cada respuesta; el del flujo no trae)

    def trabajo(self):
        return JOB.get("trabajo") or os.path.join(AQUI, "trabajo")

    def generador(self):
        return JOB.get("generador_feed") or os.path.join(AQUI, "herramientas", "generar_feed.js")

    def _api(self, metodo, ruta, cuerpo=None, intentos=3):
        url = "https://api.github.com/repos/%s%s" % (self.repo, ruta)
        ultimo = None
        for i in range(intentos):
            r = urllib.request.Request(url, method=metodo, data=(json.dumps(cuerpo).encode("utf-8") if cuerpo is not None else None))
            r.add_header("Accept", "application/vnd.github+json")
            r.add_header("X-GitHub-Api-Version", "2022-11-28")
            r.add_header("User-Agent", "ecuclima-ofertas")
            if self.token:
                r.add_header("Authorization", "Bearer " + self.token)
            if cuerpo is not None:
                r.add_header("Content-Type", "application/json")
            try:
                resp = urllib.request.urlopen(r, timeout=60)
                crudo = resp.read()
                v = resp.headers.get("github-authentication-token-expiration")
                if v:
                    self.vence = v
                return json.loads(crudo.decode("utf-8")) if crudo else {}
            except urllib.error.HTTPError as e:
                txt = e.read().decode("utf-8", "replace")
                if e.code in (500, 502, 503, 504) and i < intentos - 1:
                    time.sleep(3 + 4 * i)
                    ultimo = e
                    continue
                try:
                    msg = json.loads(txt).get("message", txt)
                except Exception:
                    msg = txt
                err = RuntimeError("GitHub %s %s -> %s %s" % (metodo, ruta.split("?")[0], e.code, str(msg)[:200]))
                err.codigo = e.code
                raise err
            except Exception as e:
                ultimo = e
                time.sleep(3 + 4 * i)
        raise RuntimeError("GitHub no respondio: %s" % type(ultimo).__name__)

    def leer(self, nombre):
        d = self._api("GET", "/contents/%s?ref=%s" % (urllib.parse.quote(nombre), urllib.parse.quote(self.rama)))
        self._blob[nombre] = d["sha"]
        if d.get("encoding") == "base64" and d.get("content"):
            return base64.b64decode(d["content"]).decode("utf-8")
        # archivo de mas de 1 MB: la API de contenidos no lo trae, se pide como blob
        return base64.b64decode(self._api("GET", "/git/blobs/%s" % d["sha"])["content"]).decode("utf-8")

    def leer_opcional(self, nombre):
        try:
            return self.leer(nombre)
        except RuntimeError as e:
            if getattr(e, "codigo", None) == 404:
                self._blob[nombre] = None
                return None
            raise

    def antes_de_leer(self):
        pass

    def aplicar(self, textos, leidos):
        raise RuntimeError("--aplicar solo existe con la carpeta del sitio (portatil). Con GitHub se usa --publicar.")

    def publicar(self, textos, mensaje, simular=False):
        if simular:
            print("  [simulacro] GitHub: un commit con %s" % ", ".join(textos))
            return None
        if not self.token:
            raise RuntimeError("Falta el token de GitHub (en la nube lo da el propio flujo; en la oficina lo pone Marco con su script).")
        for intento in range(3):
            cabeza = self._api("GET", "/git/ref/heads/%s" % urllib.parse.quote(self.rama))["object"]["sha"]
            # nadie debe haber tocado estos archivos desde que se leyeron
            for a in textos:
                if not self._blob.get(a):
                    continue
                actual = self._api("GET", "/contents/%s?ref=%s" % (urllib.parse.quote(a), urllib.parse.quote(self.rama)))["sha"]
                if actual != self._blob[a]:
                    raise RuntimeError("%s cambió en GitHub mientras se preparaba la actualización: se vuelve a correr." % a)
            base = self._api("GET", "/git/commits/%s" % cabeza)["tree"]["sha"]
            entradas = []
            for a, t in textos.items():
                b = self._api("POST", "/git/blobs", {"content": t, "encoding": "utf-8"})
                entradas.append({"path": a, "mode": "100644", "type": "blob", "sha": b["sha"]})
            arbol = self._api("POST", "/git/trees", {"base_tree": base, "tree": entradas})
            nuevo = self._api("POST", "/git/commits", {"message": mensaje, "tree": arbol["sha"], "parents": [cabeza]})
            try:
                self._api("PATCH", "/git/refs/heads/%s" % urllib.parse.quote(self.rama), {"sha": nuevo["sha"], "force": False})
            except RuntimeError as e:
                if getattr(e, "codigo", None) == 422 and intento < 2:     # alguien publico en medio: se rehace sobre la cabeza nueva
                    time.sleep(4)
                    continue
                raise
            for a in textos:
                self._blob.pop(a, None)
            return nuevo["sha"][:7]

    def solicitar_build(self):
        """Por si el commit hecho con el token del flujo no despierta a GitHub Pages: se le pide la construccion (si ya hay una en curso, solo se encola)."""
        if not JOB.get("pedir_build_pages"):
            return
        try:
            self._api("POST", "/pages/builds", {}, intentos=1)
            print("  (se pidió a GitHub Pages que construya el sitio)")
        except RuntimeError as e:
            print("  (no se pudo pedir la construcción de Pages: %s)" % str(e)[:140])

    def probar(self):
        """Prueba SIN dejar rastro: crea una rama de prueba apuntando al commit actual y la borra. Si lo logra, el token escribe."""
        if not self.token:
            return False, "no hay token"
        try:
            cabeza = self._api("GET", "/git/ref/heads/%s" % urllib.parse.quote(self.rama))["object"]["sha"]
            nombre = "prueba-ofertas-%d" % int(time.time())
            self._api("POST", "/git/refs", {"ref": "refs/heads/" + nombre, "sha": cabeza})
            self._api("DELETE", "/git/refs/heads/" + nombre)
            return True, "el token puede escribir en %s (rama de prueba creada y borrada)" % self.repo
        except RuntimeError as e:
            return False, str(e)


def elegir_sitio():
    if JOB.get("origen") == "github":
        return SitioGitHub(JOB["repo"], JOB.get("rama", "main"), JOB.get("token_archivo", os.path.join(AQUI, "secretos", "github-token.txt")), JOB.get("token_env"))
    return SitioLocal()


# ---------------------------------------------------------------- estado que debe sobrevivir entre corridas
class Almacen(object):
    """Bitacora, avisos enviados y alertas ya mandadas. En la portatil y la oficina son archivos de datos\\ofertas_semanal. En la nube la maquina se
    borra al terminar, asi que son archivos del repositorio, bajo .github/ofertas/estado/, que se guardan con un solo commit al final de la corrida."""

    def __init__(self, sitio=None):
        self._sitio = sitio
        self.prefijo = JOB.get("estado_en_repo")
        self.cache = {}
        self.sucios = set()

    @property
    def sitio(self):
        if self._sitio is None:
            self._sitio = elegir_sitio()
        return self._sitio

    def leer(self, nombre):
        if self.prefijo:
            if nombre not in self.cache:
                self.cache[nombre] = self.sitio.leer_opcional(self.prefijo + "/" + nombre) or ""
            return self.cache[nombre]
        ruta = os.path.join(CARPETA_INFORMES, nombre)
        return _leer(ruta) if os.path.exists(ruta) else ""

    def escribir(self, nombre, texto, transitorio=False):
        if self.prefijo:
            self.cache[nombre] = texto
            if not transitorio:
                self.sucios.add(nombre)
        else:
            _escribir(os.path.join(CARPETA_INFORMES, nombre), texto)

    def anexar(self, nombre, linea):
        if self.prefijo:
            self.escribir(nombre, self.leer(nombre) + linea)
        else:
            os.makedirs(CARPETA_INFORMES, exist_ok=True)
            io.open(os.path.join(CARPETA_INFORMES, nombre), "a", encoding="utf-8").write(linea)

    def volcar(self, mensaje):
        """En la nube: un commit con lo que cambio. En la portatil y la oficina no hace falta (ya esta en disco)."""
        if not (self.prefijo and self.sucios):
            return None
        textos = {self.prefijo + "/" + n: self.cache[n] for n in sorted(self.sucios)}
        c = self.sitio.publicar(textos, mensaje)
        self.sucios = set()
        return c


ALMACEN = None


def _almacen():
    global ALMACEN
    if ALMACEN is None:
        ALMACEN = Almacen()
    return ALMACEN


def latido():
    """Nube: una marca cada pocos dias en el repositorio. GitHub apaga los flujos programados de un repositorio publico que lleva 60 dias sin actividad."""
    al = _almacen()
    if not al.prefijo:
        return
    try:
        ultimo = datetime.date.fromisoformat(json.loads(al.leer("latido.json")).get("fecha", ""))
    except Exception:
        ultimo = None
    if ultimo is None or (datetime.date.today() - ultimo).days >= LATIDO_DIAS:
        al.escribir("latido.json", json.dumps({"fecha": _hoy(), "nota": "marca para que GitHub no apague la revision diaria por falta de actividad"}) + "\n")


# ---------------------------------------------------------------- lo publicado
_LINEA = re.compile(r'^(\{.*?"ec":"(EC\d+)".*?,"p":)(-?[0-9.]+)(,"s":)(-?[0-9.]+)(,.*)$')


def items_de(texto):
    items = []
    for linea in texto.split("\n"):
        t = linea.rstrip(",\r")
        if t.startswith("{") and t.endswith("}"):
            items.append(json.loads(t))
    if not items:
        raise RuntimeError("ofertas-datos.js no tiene productos: no se hace nada.")
    return items


def leer_config(sitio):
    """ofertas-config.js publicado -> dict (descuentoGeneral y descuentos por id)."""
    t = sitio.leer("ofertas-config.js")
    m = re.search(r"window\.OFERTAS_CONFIG\s*=\s*(\{.*\})\s*;?\s*$", t, re.S)
    if not m:
        raise RuntimeError("No pude leer ofertas-config.js")
    return json.loads(m.group(1))


def parchar_datos(texto, nuevos):
    """Cambia SOLO "p" y "s" de las lineas cuyo codigo esta en `nuevos` {EC: (p, s)}. Lo demas queda igual, byte por byte."""
    salida, vistos = [], set()
    for linea in texto.split("\n"):
        m = _LINEA.match(linea)
        if m and m.group(2) in nuevos:
            p, s = nuevos[m.group(2)]
            linea = m.group(1) + _txt(p) + m.group(4) + _txt(s) + m.group(6)
            vistos.add(m.group(2))
        salida.append(linea)
    faltan = set(nuevos) - vistos
    if faltan:
        raise RuntimeError("No pude parchar estos codigos en ofertas-datos.js: %s" % sorted(faltan))
    return "\n".join(salida)


def armar_precios(texto_datos):
    precios = {}
    for linea in texto_datos.split("\n"):
        t = linea.rstrip(",\r")
        if t.startswith("{") and t.endswith("}"):
            it = json.loads(t)
            precios[it["id"]] = it["p"]
    return "window.OFERTAS_PRECIOS = " + json.dumps(precios, ensure_ascii=False, separators=(",", ":")) + ";\n"


# ---------------------------------------------------------------- FileMaker (solo lectura)
def leer_filemaker(codigos):
    """codigos: lista de 'EC03827'. Devuelve ({numero: fieldData}, repetidos, marcados). Una sola sesion, siempre cerrada."""
    nums = {}
    for c in codigos:
        n = _clave(c)
        if n is not None:
            nums[n] = c
    campo_cod = fm.CONFIG["campos"]["codigo"]
    lay = urllib.parse.quote(fm.CONFIG["layout"])
    hallados, duplicados = {}, []

    def buscar(s, consultas):
        cuerpo = json.dumps({"query": consultas, "limit": str(len(consultas) + 10)}).encode("utf-8")
        try:
            d = s._pedir("/layouts/%s/_find" % lay, "POST", s._cab(True), cuerpo, espera=240)
            return [r["fieldData"] for r in d["response"]["data"]]
        except urllib.error.HTTPError as e:
            txt = e.read().decode("utf-8", "replace")
            if '"401"' in txt:      # FileMaker contesta 401 cuando no hay coincidencias
                return []
            raise fm.ErrorFileMaker("La busqueda fallo: %s %s" % (e.code, txt[:300]))

    def guardar(filas):
        for fd in filas:
            n = _clave(fd.get(campo_cod))
            if n in nums:
                if n in hallados:
                    duplicados.append(n)
                else:
                    hallados[n] = fd

    with fm.Sesion() as s:
        lista = sorted(nums)
        for i in range(0, len(lista), 40):
            lote = lista[i:i + 40]
            consultas = []
            for n in lote:
                for v in dict.fromkeys([nums[n], "EC" + str(n).zfill(4), "EC" + str(n).zfill(5)]):
                    consultas.append({campo_cod: "==" + v})
            guardar(buscar(s, consultas))
            time.sleep(0.4)
        # segunda pasada para los que no salieron: el codigo puede traer saltos de linea o espacios al final
        faltan = [n for n in lista if n not in hallados]
        for i in range(0, len(faltan), 40):
            lote = faltan[i:i + 40]
            consultas = []
            for n in lote:
                for v in dict.fromkeys([nums[n], "EC" + str(n).zfill(4), "EC" + str(n).zfill(5)]):
                    consultas.append({campo_cod: v + "*"})
            guardar(buscar(s, consultas))
            time.sleep(0.4)
        marcados = _leer_marcas(s)
    return hallados, duplicados, marcados


def _leer_marcas(s):
    """Productos con «Baja Rotacion» = ok en FileMaker (layout «Listado Items», que es donde el campo esta puesto).
    Devuelve {numero: fieldData}, o None si el campo todavia no esta en ese layout. Dentro de la misma sesion."""
    lay = urllib.parse.quote("Listado Items")
    marcados, offset = {}, 1
    while True:
        cuerpo = json.dumps({"query": [{"Baja Rotacion": "*"}], "limit": "100", "offset": str(offset)}).encode("utf-8")
        try:
            d = s._pedir("/layouts/%s/_find" % lay, "POST", s._cab(True), cuerpo, espera=240)
        except urllib.error.HTTPError as e:
            txt = e.read().decode("utf-8", "replace")
            if '"401"' in txt:          # ninguno marcado todavia
                break
            if '"102"' in txt:          # el campo no existe en ese layout
                return None
            raise fm.ErrorFileMaker("La lectura de la marca «Baja Rotacion» fallo: %s %s" % (e.code, txt[:300]))
        filas = d["response"]["data"]
        for r in filas:
            n = _clave(r["fieldData"].get(fm.CONFIG["campos"]["codigo"]))
            if n is not None:
                marcados[n] = r["fieldData"]
        if len(filas) < 100:
            break
        offset += 100
        time.sleep(0.4)
    return marcados


# ---------------------------------------------------------------- reglas
# Lo que el personal anota en «Observaciones» de FileMaker y frena la venta como pieza nueva y completa (se avisa, no se cambia nada).
OBSERVACIONES_ALERTA = [
    (r"incomplet|no esta completo|no esta completa|no son completos", "incompleto"),
    (r"sin bobina", "sin bobina"), (r"sin brida", "sin bridas"), (r"abierto", "envase abierto"),
    (r"golpes|sucias|raspad|danad|roto", "con daños o suciedad"), (r"soldad", "soldado (ya usado)"),
    (r"pendiente confirmar", "datos sin confirmar"), (r"instalado en", "instalado (en uso)"),
    (r"se saco de", "retirado de otra unidad"),
]


def _descuento(cfg, it):
    """Descuento que la pagina aplica a este producto (el propio, o el general)."""
    if not cfg:
        return 0.20
    v = (cfg.get("descuentos") or {}).get(it["id"])
    return v if isinstance(v, (int, float)) else cfg.get("descuentoGeneral", 0.0)


def evaluar(it, fd, cfg=None):
    """Compara lo publicado (it) con lo que dice FileMaker (fd). Devuelve un dict con el valor nuevo de cada cosa y que hacer."""
    d = _descuento(cfg, it)
    r = {"ec": it["ec"], "id": it["id"], "nombre": it["n"], "marca": it.get("m", ""), "p_pub": it["p"], "s_pub": it["s"],
         "p_fm": None, "s_fm": None, "p_nuevo": it["p"], "s_nuevo": it["s"], "motivos": [], "revisar": [], "cambios": [], "no_vendible": [], "alertas": [],
         "descuento": d, "compra": None}
    if fd is None:
        r["revisar"].append("No aparece en FileMaker (¿se cambió el código?). Se deja como está publicado.")
        return r
    ocupado = fm.sin_tildes(fm.campo(fd, "webNO_PROP")) in ("ok", "x", "si", "s", "1", "true")
    clase = fm.campo(fd, "Clasificacion")
    estado = fm.campo(fd, "Estado")
    r["estado_fm"] = estado
    r["clase_fm"] = clase
    if "usado" in fm.sin_tildes(estado):
        r["alertas"].append("FileMaker la da por «%s», pero la página y el archivo de Google la presentan como nueva." % estado.replace("\r", " / "))
    obs = fm.sin_tildes(fm.campo(fd, "Observaciones").replace("\r", " / "))
    motivos = [m for pat, m in OBSERVACIONES_ALERTA if re.search(pat, obs)]
    if motivos:
        r["alertas"].append("Observación de FileMaker: «%s» (%s)." % (fm.campo(fd, "Observaciones").replace("\r", " / ")[:120], ", ".join(dict.fromkeys(motivos))))
    if clase != "Producto":
        r["no_vendible"].append("Clasificación «%s» (no es Producto)" % clase)
    if fm.campo(fd, "DADO DE BAJA"):
        r["no_vendible"].append("DADO DE BAJA")
    if fm.campo(fd, "TALLER"):
        r["no_vendible"].append("marcado TALLER")
    if ocupado:
        r["no_vendible"].append("marcado «no publicar en la web» (WebNO_PROP)")
    stock = _num(fm.campo(fd, "EN INVENTARIO"))
    pvp = _num(fm.campo(fd, "PVP"))
    compra = _num(fm.campo(fd, "Precio Compra"))
    r["s_fm"] = stock
    r["p_fm"] = round(pvp, 2) if pvp else None
    r["compra"] = compra
    if compra and compra > 0 and round(it["p"] * (1 - d), 2) < compra - 0.005:
        r["alertas"].append("La oferta publicada ($%s) está por debajo del precio de compra de FileMaker ($%s)." % (_txt(round(it["p"] * (1 - d), 2)), _txt(compra)))

    # stock
    s_fm = 0.0 if r["no_vendible"] or stock is None else max(stock, 0.0)
    if stock is None and not r["no_vendible"]:
        r["revisar"].append("FileMaker no trae el stock. Se deja el publicado.")
        s_fm = it["s"]
    if abs(s_fm - it["s"]) > 1e-9:
        if s_fm < it["s"]:
            r["s_nuevo"] = s_fm
            r["cambios"].append("stock %s → %s" % (_txt(it["s"]), _txt(s_fm)))
        elif s_fm - it["s"] <= STOCK_SUBE_MAX:
            r["s_nuevo"] = s_fm
            r["cambios"].append("stock %s → %s" % (_txt(it["s"]), _txt(s_fm)))
        else:
            r["revisar"].append("El stock sube de %s a %s (más de %d unidades de golpe). Se deja el publicado hasta que lo confirmes." % (_txt(it["s"]), _txt(s_fm), STOCK_SUBE_MAX))
    # precio
    if not pvp or pvp <= 0:
        if not r["no_vendible"]:
            r["revisar"].append("FileMaker no trae PVP. Se deja el precio publicado.")
    else:
        nuevo = round(pvp, 2)
        if abs(nuevo - it["p"]) >= 0.005:
            cambio = (nuevo - it["p"]) / it["p"]
            oferta_nueva = round(nuevo * (1 - d), 2)
            if abs(cambio) <= PVP_CAMBIO_MAX and cambio < 0 and compra and compra > 0 and oferta_nueva < compra - 0.005:
                r["revisar"].append("El PVP baja de $%s a $%s y la oferta quedaría en $%s, por debajo del precio de compra ($%s). Se deja el publicado hasta que lo confirmes." % (_txt(it["p"]), _txt(nuevo), _txt(oferta_nueva), _txt(compra)))
            elif abs(cambio) <= PVP_CAMBIO_MAX:
                r["p_nuevo"] = nuevo
                r["cambios"].append("PVP $%s → $%s (%+.1f %%)" % (_txt(it["p"]), _txt(nuevo), cambio * 100))
            else:
                r["revisar"].append("El PVP cambia de $%s a $%s (%+.0f %%): más de %d %%. Se deja el publicado hasta que lo confirmes." % (_txt(it["p"]), _txt(nuevo), cambio * 100, PVP_CAMBIO_MAX * 100))
    return r


# ---------------------------------------------------------------- informe
_CSS = ("body{font:15px/1.5 Arial,sans-serif;color:#1c2733;max-width:1000px;margin:24px auto;padding:0 16px}"
        "h1{font-size:22px;margin:0 0 4px}h2{font-size:17px;margin:26px 0 8px;border-bottom:2px solid #33658a;padding-bottom:3px}"
        "table{border-collapse:collapse;width:100%;font-size:13.5px}th,td{border-bottom:1px solid #d9dee4;padding:5px 7px;text-align:left;vertical-align:top}"
        "th{background:#2f4858;color:#fff}.nota{color:#5a6b80;font-size:13px}.ok{color:#1d7a3a;font-weight:700}.mal{color:#b42318;font-weight:700}"
        ".caja{background:#f3f6f9;border:1px solid #d9dee4;border-radius:6px;padding:10px 14px;margin:10px 0}")


def _esc(s):
    return str(s).replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def _tabla(filas, cols):
    if not filas:
        return "<p class=nota>Ninguno.</p>"
    h = "<table><tr>" + "".join("<th>%s</th>" % c for c in cols) + "</tr>"
    for f in filas:
        h += "<tr>" + "".join("<td>%s</td>" % c for c in f) + "</tr>"
    return h + "</table>"


def armar_informe(res, meta, marcas=None):
    agotados = [r for r in res if r["s_nuevo"] <= 0 and r["s_pub"] > 0]
    cambios = [r for r in res if r["cambios"]]
    revisar = [r for r in res if r["revisar"]]
    noven = [r for r in res if r["no_vendible"]]
    sin_cambio = [r for r in res if not r["cambios"] and not r["revisar"]]
    h = ["<!doctype html><html lang=es><meta charset=utf-8><title>Ofertas: informe diario</title><style>%s</style>" % _CSS]
    h.append("<h1>Ofertas · informe de stock y precios</h1><p class=nota>%s · leído de FileMaker (solo lectura) · %s</p>" % (meta["cuando"], meta["modo"]))
    h.append("<div class=caja><b>%d</b> productos en la página · <b>%d</b> sin cambios · <b class=ok>%d</b> con cambios seguros · <b class=%s>%d</b> para revisar tú · <b>%d</b> agotados ahora</div>" % (
        len(res), len(sin_cambio), len(cambios), "mal" if revisar else "ok", len(revisar), len([r for r in res if r["s_nuevo"] <= 0])))
    h.append("<p>%s</p>" % _esc(meta["estado_publicacion"]))
    h.append("<h2>Se agotaron desde la última vez</h2>")
    h.append(_tabla([(r["ec"], _esc(r["nombre"]), _txt(r["s_pub"]), "<b>0</b>" + ("" if not r["no_vendible"] else " <span class=nota>(%s)</span>" % _esc("; ".join(r["no_vendible"])))) for r in agotados],
                    ["Código", "Producto", "Stock publicado", "Stock ahora"]))
    if agotados:
        h.append("<p class=nota>En la página pasan a «Agotado» (no desaparecen). Si ya no son de baja rotación, quitar la marca en FileMaker; si se vendieron del todo, nada más que hacer.</p>")
    h.append("<h2>Cambios que se aplican (seguros)</h2>")
    h.append(_tabla([(r["ec"], _esc(r["nombre"]), _esc("; ".join(r["cambios"]))) for r in cambios], ["Código", "Producto", "Cambio"]))
    h.append("<h2>Para que los mires tú (no se tocaron)</h2>")
    h.append(_tabla([(r["ec"], _esc(r["nombre"]), _esc(" ".join(r["revisar"]))) for r in revisar], ["Código", "Producto", "Qué pasa"]))
    h.append("<h2>Avisos de FileMaker sobre piezas que están a la venta</h2>")
    h.append(_tabla([(r["ec"], _esc(r["nombre"]), _esc(" ".join(r["alertas"]))) for r in res if r["alertas"] and r["s_nuevo"] > 0], ["Código", "Producto", "Qué dice FileMaker"]))
    h.append("<h2>No se pueden vender hoy según FileMaker</h2>")
    h.append(_tabla([(r["ec"], _esc(r["nombre"]), _esc("; ".join(r["no_vendible"])), _txt(r["s_fm"]) if r["s_fm"] is not None else "—") for r in noven], ["Código", "Producto", "Motivo", "Stock en FileMaker"]))
    if marcas:
        h.append("<h2>Marca «Baja Rotacion» en FileMaker</h2><p>%s</p>" % _esc(marcas["estado"]))
        if marcas["no_publicados"]:
            h.append("<p class=nota>Marcados en FileMaker y que NO están en la página (se revisan y se agregan, o no cumplen los criterios):</p>")
            h.append(_tabla([(c, _esc(d), _esc(s), _esc(k)) for c, d, s, k in marcas["no_publicados"]], ["Código", "Descripción", "Stock", "Clasificación"]))
        if marcas["sin_marca"]:
            h.append("<p class=nota>Están en la página pero sin la marca en FileMaker (marcarlos, o retirarlos de la página):</p>")
            h.append(_tabla([(c, _esc(n)) for c, n in marcas["sin_marca"]], ["Código", "Producto"]))
    h.append("<h2>Cómo se publica</h2><p class=nota>%s</p>" % _esc(meta["como_publicar"]))
    h.append("<h2>Todos los productos</h2>")
    h.append(_tabla([(r["ec"], _esc(r["nombre"]), "$" + _txt(r["p_nuevo"]), _txt(r["s_nuevo"]), _esc(r.get("estado_fm", ""))) for r in res], ["Código", "Producto", "PVP (sin IVA)", "Stock", "Estado en FileMaker"]))
    return "".join(h)


# ---------------------------------------------------------------- autorizacion y publicacion
def autorizacion():
    """(vigente, texto, dias_que_quedan). La autorizacion la da Marco; vence a los 90 dias."""
    if not os.path.exists(AUTORIZACION):
        return False, "No hay autorización de Marco para publicar solo (falta %s)." % os.path.basename(AUTORIZACION), 0
    try:
        d = json.loads(_leer(AUTORIZACION))
        f = datetime.date.fromisoformat(d["fecha"])
    except Exception:
        return False, "El archivo de autorización no se entiende: se ignora.", 0
    if d.get("activa") is not True or "marco" not in str(d.get("autorizado_por", "")).lower():
        return False, "La autorización no está activa o no es de Marco.", 0
    quedan = 90 - (datetime.date.today() - f).days
    if quedan < 0:
        return False, "La autorización de Marco venció (%s). Hay que renovarla." % d["fecha"], 0
    return True, "Autorizado por %s el %s: %s" % (d["autorizado_por"], d["fecha"], d.get("alcance", "")), quedan


def verificar_en_vivo(esperados, intentos=14, espera=15):
    """Espera a que ecuclima.com sirva exactamente los archivos nuevos (el CDN tarda 1-2 minutos). esperados: {archivo: sha256 del texto}."""
    for i in range(intentos):
        ok = True
        for a in ("ofertas-datos.js", "ofertas-feed.tsv"):
            if a not in esperados:
                continue
            try:
                u = "https://ecuclima.com/%s?v=%d" % (a, int(time.time()))
                c = urllib.request.urlopen(urllib.request.Request(u, headers={"Cache-Control": "no-cache"}), timeout=30).read()
                if hashlib.sha256(c).hexdigest() != esperados[a]:
                    ok = False
            except Exception:
                ok = False
        if ok:
            return True
        time.sleep(espera)
    return False


# ---------------------------------------------------------------- aviso en pantalla (portatil)
def avisar(titulo, texto):
    ps = ("Add-Type -AssemblyName System.Windows.Forms; Add-Type -AssemblyName System.Drawing; "
          "$n = New-Object System.Windows.Forms.NotifyIcon; $n.Icon = [System.Drawing.SystemIcons]::Information; "
          "$n.BalloonTipTitle = '%s'; $n.BalloonTipText = '%s'; $n.Visible = $true; $n.ShowBalloonTip(20000); Start-Sleep -Seconds 21; $n.Dispose()"
          % (titulo.replace("'", ""), texto.replace("'", "")))
    try:
        subprocess.Popen(["powershell", "-NoProfile", "-WindowStyle", "Hidden", "-Command", ps], creationflags=0x08000000)
    except Exception:
        pass


# ---------------------------------------------------------------- correo
def _smtp():
    """(servidor, usuario, clave) del buzon que manda los avisos. Nube: del secreto OFERTAS_SECRETOS. Vacios si no hay."""
    s = _secretos().get("smtp") or {}
    usuario = (s.get("usuario") or os.environ.get("SMTP_USUARIO") or "").strip()
    clave = s.get("clave") or os.environ.get("SMTP_CLAVE") or ""
    host = (s.get("servidor") or os.environ.get("SMTP_SERVIDOR") or "mail.ecuclima.com").strip()
    return host, usuario, clave


def _correo_listo():
    _, usuario, clave = _smtp()
    ruta = (JOB.get("correo") or {}).get("modulo")
    return bool((usuario and clave) or (ruta and os.path.exists(ruta)))


def _destinos(clave):
    """A quien va cada aviso. Nube: del secreto (nunca del codigo: el repositorio es publico). Oficina: ofertas-job.json. Portatil: config.json."""
    env = os.environ.get("AVISO_" + clave.upper(), "").strip()
    if env:
        return [x.strip() for x in env.split(",") if x.strip()]
    d = (_secretos().get("avisos") or {}).get(clave) or (JOB.get("correo") or {}).get(clave) or (fm.CONFIG.get("avisos") or {}).get(clave) or []
    return [x for x in d if isinstance(x, str) and "@" in x]


def _armar_mensaje(remitente, nombre, destinos, asunto, cuerpo, adjuntos):
    from email.mime.text import MIMEText
    from email.mime.multipart import MIMEMultipart
    from email.header import Header
    from email.utils import formataddr
    if adjuntos:
        msg = MIMEMultipart()
        msg.attach(MIMEText(cuerpo, "plain", "utf-8"))
        for nom, html in adjuntos:
            p = MIMEText(html, "html", "utf-8")
            p.add_header("Content-Disposition", "attachment", filename=nom)
            msg.attach(p)
    else:
        msg = MIMEText(cuerpo, "plain", "utf-8")
    msg["From"] = formataddr((str(Header(nombre, "utf-8")), remitente))
    msg["To"] = ", ".join(destinos)
    msg["Subject"] = Header(asunto, "utf-8")
    return msg


def enviar_correo(destinos, asunto, cuerpo, adjuntos=None):
    """(ok, detalle). Dos caminos: (1) SMTP con un buzon propio para avisos (nube: datos en el secreto OFERTAS_SECRETOS);
    (2) el modulo send_email.py de la oficina (el SMTP del buzon de Marco), sin tocar sus claves. adjuntos: [(nombre.html, texto)]."""
    if not destinos:
        return False, "no hay destinatarios configurados"
    c = JOB.get("correo") or {}
    nombre = c.get("nombre", "Ofertas de Ecuclima (aviso automático)")
    host, usuario, clave = _smtp()
    try:
        if usuario and clave:
            msg = _armar_mensaje(usuario, nombre, destinos, asunto, cuerpo, adjuntos)
            ctx = ssl.create_default_context()
            try:
                s = smtplib.SMTP_SSL(host, 465, timeout=30, context=ctx)
            except Exception:
                s = smtplib.SMTP(host, 587, timeout=30)
                s.starttls(context=ctx)
            s.login(usuario, clave)
            s.sendmail(usuario, list(destinos), msg.as_string())
            s.quit()
            return True, ""
        ruta = c.get("modulo")
        if ruta and os.path.exists(ruta):
            spec = importlib.util.spec_from_file_location("send_email_oficina", ruta)
            m = importlib.util.module_from_spec(spec)
            spec.loader.exec_module(m)
            msg = _armar_mensaje(m.e["correo"], nombre, destinos, asunto, cuerpo, adjuntos)
            s = m.conectar()
            s.sendmail(m.e["correo"], list(destinos), msg.as_string())
            s.quit()
            return True, ""
        return False, "correo no configurado (falta el buzon de avisos en el secreto OFERTAS_SECRETOS, o el modulo de correo de la oficina)"
    except Exception as ex:
        det = str(ex)
        if clave:
            det = det.replace(clave, "***")
        return False, "%s: %s" % (type(ex).__name__, det[:140])


# ---------------------------------------------------------------- bitacora y aviso a Sabrina
# Todo lo que se publica queda anotado aqui. El aviso para Sabrina sale de --aviso-pendiente: en la nube y en la oficina lo manda este mismo programa por
# correo con --correo (y marca enviado); en la portatil lo hacia una tarea de Claude. Si ese dia no hubo nada, no se manda nada.
# En la nube, lo ya avisado se borra de la bitacora (el repositorio es publico): ahi solo queda lo que falta por avisar.
def _bitacora(tipo, texto, **extra):
    reg = {"ts": datetime.datetime.now().isoformat(timespec="seconds"), "tipo": tipo, "texto": texto}
    reg.update(extra)
    _almacen().anexar("bitacora.jsonl", json.dumps(reg, ensure_ascii=False) + "\n")


def _leer_bitacora():
    out = []
    for linea in _almacen().leer("bitacora.jsonl").splitlines():
        try:
            out.append(json.loads(linea))
        except Exception:
            pass
    return out


def _json_estado(nombre):
    try:
        d = json.loads(_almacen().leer(nombre))
        return d if isinstance(d, dict) else {}
    except Exception:
        return {}


def aviso_pendiente():
    """Texto del aviso para Sabrina con lo realizado y publicado desde el ultimo aviso. '' si no hubo nada."""
    desde = _json_estado("aviso_estado.json").get("enviado_hasta", "")
    nuevos = [r for r in _leer_bitacora() if r["ts"] > desde and r.get("avisar", True)]
    if not nuevos:
        return ""
    _almacen().escribir("aviso_pendiente.json", json.dumps({"hasta": max(r["ts"] for r in nuevos)}), transitorio=True)
    lineas = ["Hola Sabrina:", "",
              "Esto es lo que se ha hecho y publicado en la página de Ofertas (ecuclima.com/ofertas.html) desde el último aviso:", ""]
    for r in nuevos:
        lineas.append("• %s — %s" % (r["ts"].replace("T", " ")[:16], r["texto"]))
        for d in r.get("detalle", []):
            lineas.append("    - " + d)
    lineas += ["", "Los productos agotados aparecen como «Agotado» en la página y ya no se pueden comprar.",
               "Si algo no cuadra con lo que ves en el sistema, responde este correo.", "",
               "Aviso automático del sistema de ofertas de Ecuclima, preparado por Claude por encargo de Marco."]
    return "\n".join(lineas)


def aviso_enviado():
    al = _almacen()
    hasta = _json_estado("aviso_pendiente.json").get("hasta") or datetime.datetime.now().isoformat(timespec="seconds")
    al.escribir("aviso_estado.json", json.dumps({"enviado_hasta": hasta, "marcado": datetime.datetime.now().isoformat(timespec="seconds")}))
    if al.prefijo:
        resto = [r for r in _leer_bitacora() if r["ts"] > hasta]
        al.escribir("bitacora.jsonl", "".join(json.dumps(r, ensure_ascii=False) + "\n" for r in resto))


def avisar_a_sabrina():
    """Manda por correo lo pendiente de la bitacora. Devuelve un texto para el registro."""
    texto = aviso_pendiente()
    if not texto:
        return "sin novedades para Sabrina"
    ok, det = enviar_correo(_destinos("sabrina"), "Ofertas de Ecuclima: lo realizado y publicado (%s)" % _hoy(), texto)
    if ok:
        aviso_enviado()
        return "aviso enviado a Sabrina"
    return "NO se pudo enviar el aviso a Sabrina (%s); queda pendiente para la próxima corrida" % det


def _alertas_para_marco(res, marcas, aut, error=None, token_vence=None, publicacion_ok=None):
    """Lo que necesita la atencion de Marco; se manda solo si cambio desde el ultimo correo (no se repite todos los dias)."""
    cosas = []
    if error:
        cosas.append("LA REVISIÓN DIARIA FALLÓ: %s" % error)
    if publicacion_ok is False:
        cosas.append("Se publicaron cambios de stock y precio, pero ecuclima.com todavía no los muestra (puede ser demora de GitHub Pages). Mira ecuclima.com/ofertas.html en unos minutos.")
    if res is not None:
        rev = [r for r in res if r["revisar"]]
        if rev:
            cosas.append("Para revisar (no se publicaron solos): %d producto(s)." % len(rev))
            cosas += ["  - %s %s: %s" % (r["ec"], r["nombre"][:40], " ".join(r["revisar"])[:200]) for r in rev[:15]]
        al = [r for r in res if r["alertas"] and r["s_nuevo"] > 0]
        if al:
            cosas.append("Avisos de FileMaker sobre productos a la venta: %d." % len(al))
            cosas += ["  - %s %s: %s" % (r["ec"], r["nombre"][:40], " ".join(r["alertas"])[:200]) for r in al[:15]]
    if token_vence:
        try:
            q = (datetime.date.fromisoformat(token_vence[:10]) - datetime.date.today()).days
            if q <= 21:
                cosas.append("El token de GitHub de la oficina vence el %s (en %d día(s)): hay que crear otro y ponerlo con el script de las claves." % (token_vence[:10], q))
        except Exception:
            pass
    if aut is not None:
        ok, texto, quedan = aut
        if not ok:
            cosas.append("La autorización para publicar sola NO está vigente: %s" % texto)
        elif quedan <= 14:
            cosas.append("La autorización para publicar sola vence en %d día(s): hay que renovarla (decírselo a Claude)." % quedan)
    return cosas


def avisar_a_marco(cosas, adjuntos=None):
    if not cosas:
        return "nada para Marco"
    if (JOB.get("drive") or {}).get("destino"):
        donde = "\n\nEl informe completo está en la carpeta Ofertas-informes de tu Google Drive (ultimo-informe.html)."
    elif adjuntos:
        donde = "\n\nEl informe completo va adjunto a este correo."
    else:
        donde = ""
    cuerpo = ("Marco:\n\nLa revisión diaria de stock y precios de la página de Ofertas necesita tu atención:\n\n" + "\n".join(cosas) + donde +
              "\n\nAviso automático del sistema de ofertas de Ecuclima, preparado por Claude por encargo tuyo.")
    # el mismo aviso no se repite, salvo una vez por semana como recordatorio
    firma = hashlib.sha1(("%d-%02d|" % datetime.date.today().isocalendar()[:2] + cuerpo).encode("utf-8")).hexdigest()
    if _json_estado("alerta_estado.json").get("firma") == firma:
        return "el aviso a Marco es el mismo de la última vez: no se repite"
    ok, det = enviar_correo(_destinos("marco"), "Ofertas de Ecuclima: hay algo para que revises", cuerpo, adjuntos)
    if ok:
        _almacen().escribir("alerta_estado.json", json.dumps({"firma": firma, "cuando": datetime.datetime.now().isoformat(timespec="seconds")}))
        return "aviso enviado a Marco"
    return "NO se pudo enviar el aviso a Marco (%s)" % det


def subir_informe(ruta_html):
    """Copia el informe al Drive de Marco (rclone ya esta configurado en la oficina) para que lo abra desde cualquier lugar."""
    d = JOB.get("drive") or {}
    if not d.get("rclone") or not os.path.exists(d["rclone"]):
        return
    for destino in ("ultimo-informe.html", "informe-%s.html" % _hoy()):
        try:
            subprocess.run([d["rclone"], "--config", d["config"], "copyto", ruta_html, d["destino"] + "/" + destino], capture_output=True, timeout=180)
        except Exception:
            pass


# ---------------------------------------------------------------- portatil: ponerse al dia con la nube
def estado_local():
    """(portatil) Rehace _borrador-ventas\\fm-ofertas.json con lo que esta en la carpeta del sitio. Usarlo despues de un git pull y ANTES de reconstruir las
    ofertas con construir_ofertas.js: la revision diaria de la nube cambia stock y precios en GitHub y esa reconstruccion volveria atras."""
    sitio = SitioLocal()
    items = items_de(sitio.leer("ofertas-datos.js"))
    ruta = os.path.join(sitio.ventas, "fm-ofertas.json")
    _escribir(ruta, json.dumps({"generado": datetime.datetime.now().isoformat(timespec="seconds"),
                                "items": {it["ec"]: {"p": it["p"], "s": it["s"]} for it in items}}, ensure_ascii=False, indent=1))
    return len(items), ruta


# ---------------------------------------------------------------- principal
def correr(preparar=False, aplicar=False, publicar_ya=False, simular=False, aviso=False, correo=False):
    global ALMACEN
    ahora = datetime.datetime.now()
    sitio = elegir_sitio()
    ALMACEN = Almacen(sitio)
    aviso_auth = ""
    aut = autorizacion()
    if publicar_ya:
        print("Autorización para publicar: %s" % aut[1])
        if not aut[0]:
            # sin permiso de Marco no se publica ni se copia nada al sitio: solo se prepara
            aviso_auth = " NO se publicó: " + aut[1]
            publicar_ya, aplicar, preparar = False, False, True
        elif simular:
            aplicar = False        # el simulacro no toca la carpeta del sitio
        else:
            sitio.antes_de_leer()  # lo ultimo que haya en GitHub, antes de leer lo publicado
    modo = "publicar" if publicar_ya else "aplicar" if aplicar else "preparar" if preparar else "solo mirar"
    leidos = {a: sitio.leer(a) for a in ARCHIVOS}
    texto = leidos["ofertas-datos.js"]
    items = items_de(texto)
    print("Productos publicados en Ofertas: %d (origen: %s)" % (len(items), sitio.nombre))

    print("Leyendo FileMaker (solo lectura)...")
    hallados, dup, marcados = leer_filemaker([it["ec"] for it in items])
    print("  encontrados: %d de %d%s" % (len(hallados), len(items), (" | códigos repetidos: %s" % sorted(set(dup))) if dup else ""))
    if len(hallados) < MINIMO_ENCONTRADOS * len(items):
        raise fm.ErrorFileMaker("FileMaker devolvió solo %d de %d productos: algo anda mal en la lectura. No se cambia nada." % (len(hallados), len(items)))

    cfg = leer_config(sitio)
    res = [evaluar(it, hallados.get(_clave(it["ec"])), cfg) for it in items]
    nuevos = {r["ec"]: (r["p_nuevo"], r["s_nuevo"]) for r in res if r["cambios"]}
    # Un cambio masivo suele ser un error de lectura o de digitacion en FileMaker: no se aplica nada solo, se muestra para revisar.
    if len(nuevos) >= 5 and len(nuevos) > CAMBIO_MASIVO * len(items):
        for r in res:
            if r["cambios"]:
                r["revisar"].append("Cambio masivo: %d de %d productos cambian a la vez, así que no se aplica nada solo. Cambio propuesto: %s." % (len(nuevos), len(items), "; ".join(r["cambios"])))
                r["cambios"], r["p_nuevo"], r["s_nuevo"] = [], r["p_pub"], r["s_pub"]
        nuevos = {}
        print("  CAMBIO MASIVO: no se aplica nada solo")
    print("  sin cambios: %d | cambios seguros: %d | para revisar: %d" % (len(res) - len(nuevos) - len([r for r in res if r["revisar"] and not r["cambios"]]), len(nuevos), len([r for r in res if r["revisar"]])))
    marcas = {"estado": "", "marcados": 0, "no_publicados": [], "sin_marca": []}
    if marcados is None:
        marcas["estado"] = "El campo «Baja Rotacion» todavía no está en el layout «Listado Items»: no se puede leer."
    else:
        pub = {_clave(it["ec"]): it for it in items}
        marcas["marcados"] = len(marcados)
        marcas["estado"] = ("Marcados con «Baja Rotacion» en FileMaker: %d." % len(marcados)) if marcados else "Todavía no hay productos marcados con «Baja Rotacion» en FileMaker."
        for n, fd in sorted(marcados.items()):
            if n not in pub:
                marcas["no_publicados"].append(("EC%05d" % n, " ".join(fm.campo(fd, "Descripcion Completa").split())[:70], fm.campo(fd, "EN INVENTARIO"), fm.campo(fd, "Clasificacion")))
        if marcados:
            marcas["sin_marca"] = [(it["ec"], it["n"]) for n, it in sorted(pub.items()) if n not in marcados]
        print("  marca «Baja Rotacion»: %d marcados | marcados sin publicar: %d | publicados sin marca: %d" % (len(marcados), len(marcas["no_publicados"]), len(marcas["sin_marca"])))

    carpeta = os.path.join(sitio.trabajo(), _hoy())
    meta = {"cuando": ahora.strftime("%Y-%m-%d %H:%M"), "modo": "modo: " + modo, "estado_publicacion": "", "como_publicar": ""}
    publicado = None
    publicacion_ok = None
    if preparar or aplicar or publicar_ya:
        nuevo_datos = parchar_datos(texto, nuevos) if nuevos else texto
        _escribir(os.path.join(carpeta, "ofertas-datos.js"), nuevo_datos)
        _escribir(os.path.join(carpeta, "ofertas-precios.js"), armar_precios(nuevo_datos))
        _escribir(os.path.join(carpeta, "ofertas-config.js"), sitio.leer("ofertas-config.js"))
        g = subprocess.run([_node(), sitio.generador(), carpeta], capture_output=True, text=True, encoding="utf-8", errors="replace")
        if g.returncode != 0:
            raise RuntimeError("No se pudo armar el archivo de Google: %s" % (g.stderr or g.stdout).strip()[:300])
        os.remove(os.path.join(carpeta, "ofertas-config.js"))
        if sitio.nombre == "local":
            # Para que una reconstruccion manual (construir_ofertas.js) no vuelva atras: deja el estado aceptado
            _escribir(os.path.join(sitio.ventas, "fm-ofertas.json"), json.dumps({
                "generado": ahora.isoformat(timespec="seconds"),
                "items": {r["ec"]: {"p": r["p_nuevo"], "s": r["s_nuevo"]} for r in res}}, ensure_ascii=False, indent=1))
        nuevos_textos = {a: _leer(os.path.join(carpeta, a)) for a in ARCHIVOS}
        hay = [a for a in ARCHIVOS if nuevos_textos[a] != leidos[a]]
        print("  archivos que cambian: %s" % (", ".join(hay) or "ninguno"))
        meta["estado_publicacion"] = ("Preparado en %s." % carpeta) + (" Archivos que cambian: %s." % ", ".join(hay) if hay else " Nada cambia: la página ya está al día.")
        cambiados = {a: nuevos_textos[a] for a in hay}
        if aplicar and hay and not publicar_ya:
            sitio.aplicar(cambiados, leidos)
            print("  copiados a la carpeta del sitio (sin publicar)")
            meta["estado_publicacion"] += " Copiados a la carpeta del sitio, todavía sin publicar."
        meta["estado_publicacion"] += aviso_auth
        if publicar_ya and hay:
            resumen = "\n".join("- %s: %s" % (r["ec"], "; ".join(r["cambios"])) for r in res if r["cambios"])
            mensaje = ("Ofertas: actualización diaria de stock y precios desde FileMaker (%s)\n\n%s\n\nCo-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>\n" % (_hoy(), resumen))
            if sitio.nombre == "local" and not simular:
                sitio.aplicar(cambiados, leidos)
            publicado = sitio.publicar(cambiados, mensaje, simular=simular)
            if publicado and not simular:
                sitio.solicitar_build()
                vivo = verificar_en_vivo({a: _sha_txt(t) for a, t in cambiados.items()})
                publicacion_ok = bool(vivo)
                meta["estado_publicacion"] += " Publicado (commit %s). Verificado en ecuclima.com: %s." % (publicado, "sí" if vivo else "NO, revisar")
                print("  publicado %s | verificado en vivo: %s" % (publicado, vivo))
                detalle = []
                for r in res:
                    if r["cambios"]:
                        agot = " (AGOTADO)" if r["s_nuevo"] <= 0 < r["s_pub"] else ""
                        detalle.append("%s %s: %s%s" % (r["ec"], r["nombre"][:48], "; ".join(r["cambios"]), agot))
                if NUBE and not _correo_listo():
                    detalle = []        # sin correo configurado el detalle se quedaria en el repositorio publico: solo el conteo
                _bitacora("publicacion", "Se actualizó el stock y los precios con lo que hay en FileMaker: %d producto(s) cambiaron." % len(nuevos),
                          detalle=detalle[:40] + (["… y %d más" % (len(detalle) - 40)] if len(detalle) > 40 else []), commit=publicado, en_vivo=bool(vivo))
        elif simular and hay:
            meta["estado_publicacion"] += " (simulacro: no se publicó)."
    else:
        meta["estado_publicacion"] = "Solo se miró: no se preparó ni se cambió nada."
    meta["como_publicar"] = ("Para publicar estos cambios: decirle a Claude «publica las ofertas», o correr "
                             "python -m catalogo.ofertas_semanal --publicar (necesita la autorización de Marco en autorizacion-ofertas-semanal.json). "
                             "Los productos «para revisar» no se publican hasta que Marco los confirme.")
    html = armar_informe(res, meta, marcas)
    if NUBE:
        # en la nube el informe no se guarda en ningun lado publico (lleva precios de compra): solo viaja adjunto al correo de Marco
        escritorio = "(adjunto al correo de Marco si hay algo que revisar)"
    else:
        os.makedirs(CARPETA_INFORMES, exist_ok=True)
        ruta = os.path.join(CARPETA_INFORMES, "informe-%s.html" % ahora.strftime("%Y-%m-%d_%H%M"))
        _escribir(ruta, html)
        if JOB.get("informes"):
            ultimo = os.path.join(JOB["informes"], "ultimo-informe.html")
            _escribir(ultimo, html)
            subir_informe(ultimo)
            escritorio = ultimo
        else:
            escritorio = os.path.join(_escritorio(), "ECUCLIMA-ofertas-informe-semanal.html")
            _escribir(escritorio, html)
        _escribir(os.path.join(CARPETA_INFORMES, "ultimo.json"), json.dumps({
            "cuando": meta["cuando"], "modo": modo, "origen": sitio.nombre, "token_vence": getattr(sitio, "vence", None), "productos": len(res), "cambios": len(nuevos), "revisar": len([r for r in res if r["revisar"]]),
            "publicado": publicado, "marcas": marcas,
            "agotados": [r["ec"] for r in res if r["s_nuevo"] <= 0], "detalle": res}, ensure_ascii=False, indent=1))
    print("  informe: %s" % escritorio)
    if correo:
        print("  correo a Sabrina: %s" % avisar_a_sabrina())
        cosas = _alertas_para_marco(res, marcas, aut, token_vence=getattr(sitio, "vence", None), publicacion_ok=publicacion_ok)
        print("  correo a Marco: %s" % avisar_a_marco(cosas, adjuntos=[("informe-ofertas-%s.html" % _hoy(), html)] if NUBE else None))
    if NUBE:
        latido()
    if not simular:
        c = ALMACEN.volcar("Ofertas: estado de la revisión diaria (%s)" % _hoy())
        if c:
            print("  estado guardado en el repositorio (commit %s)" % c)
    if aviso and (nuevos or [r for r in res if r["revisar"]]):
        avisar("Ofertas de Ecuclima", "%d cambios de stock/precio y %d por revisar. Mira ECUCLIMA-ofertas-informe-semanal.html en el Escritorio." % (len(nuevos), len([r for r in res if r["revisar"]])))
    return res


class _Doble(object):
    """Lo que se imprime sale en pantalla Y queda en el registro (para ver despues que paso en la corrida de la madrugada)."""
    def __init__(self, a, b):
        self.a, self.b = a, b

    def write(self, t):
        for x in (self.a, self.b):
            try:
                x.write(t)
            except Exception:
                pass

    def flush(self):
        for x in (self.a, self.b):
            try:
                x.flush()
            except Exception:
                pass


if __name__ == "__main__":
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass
    a = sys.argv[1:]
    # Comandos que no tocan FileMaker ni el sitio, y no pisan el registro de la corrida de la madrugada
    if "--aviso-pendiente" in a:
        print(aviso_pendiente())
        sys.exit(0)
    if "--aviso-enviado" in a:
        aviso_enviado()
        print("aviso marcado como enviado")
        sys.exit(0)
    if "--registrar" in a:
        i = a.index("--registrar")
        _bitacora("nota", a[i + 1], avisar="--sin-aviso" not in a)
        print("registrado en la bitácora")
        sys.exit(0)
    if "--estado-local" in a:
        n, ruta = estado_local()
        print("fm-ofertas.json rehecho con lo que hay en la carpeta del sitio (%d productos): %s" % (n, ruta))
        sys.exit(0)
    if "--probar-github" in a:
        ok, det = elegir_sitio().probar() if JOB.get("origen") == "github" else (False, "esta PC no usa el origen github")
        print(("OK: " if ok else "FALLÓ: ") + det)
        sys.exit(0 if ok else 1)
    if "--probar-correo" in a:
        ok, det = enviar_correo(_destinos("marco"), "Ofertas de Ecuclima: prueba del correo automático",
                                "Marco:\n\nEsta es una prueba del correo automático del sistema de ofertas. Si lo lees, los avisos funcionan.\n\nClaude")
        print(("OK: correo de prueba enviado" if ok else "FALLÓ: " + det))
        sys.exit(0 if ok else 1)
    if not NUBE:
        try:
            os.makedirs(CARPETA_INFORMES, exist_ok=True)
            _log = io.open(os.path.join(CARPETA_INFORMES, "ultima-corrida.log"), "w", encoding="utf-8")
            _log.write("Corrida %s  argumentos: %s\n" % (datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"), " ".join(sys.argv[1:])))
            sys.stdout = _Doble(sys.stdout, _log)
        except Exception:
            pass
    try:
        correr(preparar="--preparar" in a, aplicar="--aplicar" in a, publicar_ya="--publicar" in a, simular="--simular" in a, aviso="--aviso" in a, correo="--correo" in a)
    except Exception as e:      # lo esperado son fm.ErrorFileMaker y RuntimeError; cualquier otra cosa tambien se avisa
        print()
        print("!! %s" % e if isinstance(e, RuntimeError) else "!! %s: %s" % (type(e).__name__, e))
        if not isinstance(e, RuntimeError):
            import traceback
            traceback.print_exc()
        if "--correo" in a:
            print("  correo a Marco: %s" % avisar_a_marco(_alertas_para_marco(None, None, None, error=str(e)[:300] or type(e).__name__)))
            try:
                if "--simular" not in a:
                    _almacen().volcar("Ofertas: estado de la revisión diaria (la corrida falló) %s" % _hoy())
            except Exception:
                pass
        sys.exit(1)
