# -*- coding: utf-8 -*-
"""Conexion al FileMaker de la oficina.

DOS REGLAS QUE COSTARON APRENDER:

1. UNA SOLA SESION Y SIEMPRE CERRARLA. El servidor es FileMaker Data API 18 y
   admite pocas sesiones simultaneas. Si un script se cae sin cerrar la suya,
   el servidor deja de dar sesiones nuevas y el login se queda colgado hasta
   que caducan solas (15 minutos). Por eso todo pasa por el 'with Sesion()'.

2. LOS NOMBRES DE CAMPO TIENEN TILDES Y ESPACIOS ('Descripcion ECUCLIMA' viene
   con tilde en la o). Nunca se buscan por igualdad exacta: se usa campo(),
   que compara sin tildes ni mayusculas.
"""
import re, io, os, sys, ssl, json, time, base64, subprocess, unicodedata
import urllib.request, urllib.parse, urllib.error

AQUI = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CONFIG = json.loads(io.open(os.path.join(AQUI, "config.json"), encoding="utf-8").read())

# En la nube (GitHub Actions) el servidor, la base y las credenciales NO estan en ningun archivo del repositorio publico: llegan en el secreto
# OFERTAS_SECRETOS = {"fm": {"servidor": "...", "base": "...", "usuario": "...", "clave": "..."}, "smtp": {...}, "avisos": {...}} que pone Marco en los
# Secrets de GitHub (o, mas simple, solo la parte "fm" en FM_ACCESO). Si no hay ninguno de los dos, todo sigue como en la portatil o la oficina.
def _acceso_del_entorno():
    try:
        if os.environ.get("OFERTAS_SECRETOS"):
            a = json.loads(os.environ["OFERTAS_SECRETOS"]).get("fm")
        elif os.environ.get("FM_ACCESO"):
            a = json.loads(os.environ["FM_ACCESO"])
        else:
            return None
        return {k: a[k] for k in ("servidor", "base", "usuario", "clave")}
    except Exception:
        raise RuntimeError("El acceso a FileMaker que llega por el entorno (OFERTAS_SECRETOS o FM_ACCESO) no tiene el formato esperado.")


_ACCESO = _acceso_del_entorno()
if _ACCESO:
    CONFIG["servidor"] = _ACCESO["servidor"]
    CONFIG["base_datos"] = _ACCESO["base"]

# El certificado del servidor es propio (por eso el -k del curl original).
_CTX = ssl.create_default_context()
_CTX.check_hostname = False
_CTX.verify_mode = ssl.CERT_NONE


def _credenciales():
    """Usuario y clave. Primero credenciales.json (si Marco lo creo), y si no,
    se leen del documento de traspaso que ya existe, para no dejar la clave
    copiada en mas archivos de los necesarios."""
    if _ACCESO:
        return _ACCESO["usuario"], _ACCESO["clave"]
    p = os.path.join(AQUI, "credenciales.json")
    if os.path.exists(p):
        d = json.loads(io.open(p, encoding="utf-8").read())
        return d["usuario"], d["clave"]
    doc = CONFIG["documento_credenciales"]
    try:
        t = io.open(doc, encoding="utf-8", errors="replace").read()
    except OSError:
        raise ErrorFileMaker("No hay credenciales de FileMaker en esta PC (falta %s). Las pone Marco con su script; no se piden por el chat." % p)
    m = re.search(r'-u "([^:]+):([^"]+)"', t)
    if not m:
        raise RuntimeError(
            "No encontre usuario/clave.\n"
            "Crea %s con:  {\"usuario\": \"...\", \"clave\": \"...\"}" % p)
    return m.group(1), m.group(2)


def sin_tildes(s):
    s = unicodedata.normalize("NFD", str(s or ""))
    return "".join(c for c in s if unicodedata.category(c) != "Mn").lower().strip()


def campo(fila, *nombres):
    """Saca un campo aunque el nombre real tenga tildes, mayusculas o espacios
    de mas. Devuelve texto limpio ('' si no esta)."""
    claves = {sin_tildes(k): k for k in fila}
    for n in nombres:
        k = claves.get(sin_tildes(n))
        if k is not None:
            return str(fila[k] if fila[k] is not None else "").strip()
    # segunda pasada: por coincidencia parcial
    for n in nombres:
        nn = sin_tildes(n)
        for k2, orig in claves.items():
            if nn and nn in k2:
                return str(fila[orig] if fila[orig] is not None else "").strip()
    return ""


class ErrorFileMaker(RuntimeError):
    pass


# ---------- candado: que dos corridas nunca pidan sesion a la vez ----------
# 2026-09-23: el servidor se quedo sin dar sesiones (login colgado en
# TimeoutError) y ese dia habia mas de una corrida tocando FileMaker al mismo
# tiempo. Cada login que falla igual gasta cupo del lado del servidor: si dos
# corridas de este mismo programa reintentan a la vez, se agotan entre ellas.
# Este candado hace que la SEGUNDA falle YA, sin marcar a FileMaker, en vez de
# sumarse a machacar un servidor que ya esta mal.
_ARCHIVO_CANDADO = os.path.join(AQUI, "datos", "fm.lock")
_CANDADO_MAX_MINUTOS = 20  # las sesiones de FileMaker caducan solas a los 15


def _proceso_vivo(pid):
    """Sin instalar nada nuevo: en Linux (la nube) con os.kill(pid, 0); en Windows le pregunta con tasklist."""
    if os.name != "nt":
        try:
            os.kill(pid, 0)
            return True
        except ProcessLookupError:
            return False
        except Exception:
            return True
    try:
        salida = subprocess.check_output(
            ["tasklist", "/FI", "PID eq %d" % pid, "/NH"],
            stderr=subprocess.DEVNULL, timeout=10).decode("utf-8", "replace")
        return str(pid) in salida
    except Exception:
        # No se pudo preguntar: mejor asumir que sigue vivo. Es mas seguro
        # esperar de mas (o pedir borrar a mano) que pisar una corrida real.
        return True


def _leer_candado():
    if not os.path.exists(_ARCHIVO_CANDADO):
        return None
    try:
        return json.loads(io.open(_ARCHIVO_CANDADO, encoding="utf-8").read())
    except Exception:
        return None


def _tomar_candado():
    """Si otra corrida ya esta adentro, falla YA -sin tocar FileMaker-.
    Si el candado quedo pegado de una corrida que ya murio (o de hace mas de
    _CANDADO_MAX_MINUTOS), lo limpia solo y sigue."""
    os.makedirs(os.path.dirname(_ARCHIVO_CANDADO), exist_ok=True)
    c = _leer_candado()
    if c:
        edad_min = (time.time() - c.get("desde_epoch", 0)) / 60.0
        if edad_min < _CANDADO_MAX_MINUTOS and _proceso_vivo(c.get("pid", -1)):
            raise ErrorFileMaker(
                "Ya hay otra corrida usando FileMaker ahora mismo "
                "(PID %s, '%s', empezo hace %.0f min). No se intenta un "
                "segundo login: asi no se agotan las sesiones del servidor "
                "entre las dos. Espera a que termine.\n"
                "Si ese proceso ya no existe de verdad, borra a mano:\n  %s"
                % (c.get("pid"), c.get("comando", "?"), edad_min, _ARCHIVO_CANDADO))
    io.open(_ARCHIVO_CANDADO, "w", encoding="utf-8").write(json.dumps({
        "pid": os.getpid(),
        "comando": " ".join(sys.argv),
        "desde": time.strftime("%Y-%m-%d %H:%M:%S"),
        "desde_epoch": time.time(),
    }))


def _soltar_candado():
    """Solo borra el candado si es el propio: una corrida vieja que se haya
    colgado en esto no debe borrarle el candado a la que la reemplazo."""
    c = _leer_candado()
    if c and c.get("pid") == os.getpid():
        try:
            os.remove(_ARCHIVO_CANDADO)
        except Exception:
            pass


class Sesion(object):
    """Abre una sesion, la presta, y la cierra pase lo que pase.

        with Sesion() as s:
            filas = s.buscar_productos()
    """

    def __init__(self, base_datos=None):
        self.host = CONFIG.get("servidor") or ""
        self.bd = base_datos or CONFIG.get("base_datos") or ""
        if not self.host or not self.bd:
            raise ErrorFileMaker("No hay servidor o base de FileMaker configurados (en la nube vienen del secreto OFERTAS_SECRETOS).")
        self.url = "https://%s/fmi/data/v1/databases/%s" % (
            self.host, urllib.parse.quote(self.bd))
        self.token = None

    # ---------- plomeria ----------
    def _pedir(self, ruta, metodo="GET", cabeceras=None, cuerpo=None, espera=90):
        r = urllib.request.Request(self.url + ruta, method=metodo, data=cuerpo)
        for k, v in (cabeceras or {}).items():
            r.add_header(k, v)
        crudo = urllib.request.urlopen(r, timeout=espera, context=_CTX).read()
        return json.loads(crudo.decode("utf-8"))

    def _cab(self, json_tambien=False):
        c = {"Authorization": "Bearer " + self.token}
        if json_tambien:
            c["Content-Type"] = "application/json"
        return c

    def __enter__(self):
        _tomar_candado()  # falla ya si otra corrida ya esta adentro
        usuario, clave = _credenciales()
        auth = base64.b64encode(("%s:%s" % (usuario, clave)).encode()).decode()
        ultimo = None
        for i in range(CONFIG.get("reintentos_login", 6)):
            try:
                d = self._pedir("/sessions", "POST",
                                {"Content-Type": "application/json",
                                 "Authorization": "Basic " + auth},
                                b"{}", espera=45)
                self.token = d["response"]["token"]
                return self
            except Exception as e:
                ultimo = e
                # El sintoma de "no quedan sesiones" es que el login se cuelga.
                time.sleep(5 + i * 5)
        _soltar_candado()  # no se entro: liberar antes de avisar el fallo
        raise ErrorFileMaker(
            "El servidor no dio sesion tras varios intentos (%s).\n"
            "Casi siempre es que quedaron sesiones abiertas de una corrida que "
            "se corto: caducan solas a los 15 minutos. Espera y vuelve a "
            "intentar." % type(ultimo).__name__)

    def __exit__(self, *a):
        if self.token:
            try:
                self._pedir("/sessions/" + self.token, "DELETE", self._cab(), espera=20)
            except Exception:
                pass
            self.token = None
        _soltar_candado()
        return False

    # ---------- lo que se usa ----------
    def layouts(self):
        return [l.get("name") for l in
                self._pedir("/layouts", "GET", self._cab())["response"]["layouts"]]

    def buscar_productos(self, todo=False):
        """Trae lo que hay que sincronizar. NO trae la base entera.

        Normal  -> Clasificacion=Producto  Y  la marca de sincronizar puesta.
                   Son los items nuevos o que Marco modifico: nada mas.
        --todo  -> Clasificacion=Producto  (primera carga o auditoria).

        Lo ya publicado y sin cambios no se pide, no se baja y no se toca."""
        lay = urllib.parse.quote(CONFIG["layout"])
        condicion = {CONFIG["campos"]["clasificacion"]:
                     "=" + CONFIG["clasificacion_publicable"]}
        marca = CONFIG.get("marca_sincronizar") or {}
        self.filtro_usado = "solo Producto (todo)"
        if not todo and marca.get("activa") and marca.get("campo"):
            # '*' en FileMaker = el campo tiene algo, sea 'X' o 'SI'.
            condicion[marca["campo"]] = "*"
            self.filtro_usado = "Producto + marca '%s'" % marca["campo"]
        cuerpo = json.dumps({
            "query": [condicion],
            "limit": str(CONFIG.get("limite", 3000)),
        }).encode("utf-8")
        try:
            d = self._pedir("/layouts/%s/_find" % lay, "POST",
                            self._cab(True), cuerpo, espera=240)
        except urllib.error.HTTPError as e:
            cuerpo_err = e.read().decode("utf-8", "replace")
            # FileMaker contesta con error 401 cuando NO hay coincidencias.
            # Eso no es una falla: es "no hay nada nuevo que sincronizar".
            if '"401"' in cuerpo_err:
                return []
            if '"102"' in cuerpo_err:
                raise ErrorFileMaker(
                    "El campo de la marca no existe en el layout %s.\n"
                    "Crealo en FileMaker o corrige 'marca_sincronizar.campo' "
                    "en config.json.\nDetalle: %s" % (CONFIG["layout"], cuerpo_err[:200]))
            raise ErrorFileMaker("La busqueda fallo: %s %s" % (e.code, cuerpo_err[:300]))
        return [r["fieldData"] for r in d["response"]["data"]]

    def descargar_foto(self, url, espera=90):
        """Baja una foto del contenedor. La URL de FileMaker solo sirve dentro
        de la sesion que la genero, por eso esto va acompanado del token."""
        cj = urllib.request.HTTPCookieProcessor()
        op = urllib.request.build_opener(
            urllib.request.HTTPSHandler(context=_CTX), cj)
        r = urllib.request.Request(url)
        r.add_header("Authorization", "Bearer " + self.token)
        return op.open(r, timeout=espera).read()
