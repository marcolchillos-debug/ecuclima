# Sitio web Ecuclima — estructura y mantenimiento

Sitio estático publicado en GitHub Pages desde la rama `main`.
Cada `push` a `main` republica el sitio en 1–3 minutos.

- **En línea:** https://ecuclima.com  (dominio propio, con certificado)
- **Repositorio:** https://github.com/marcolchillos-debug/ecuclima

---

## Estructura

```
ecuclima-sitio-web/
├── index.html          Portada
├── partes.html         Buscador de repuestos
├── calculador.html     Calculadora de carga térmica
├── trane-chillers.html         Chillers Trane, con selector de modelo
├── compresores-bitzer.html     · valvulas-industriales.html
├── swep-heat-exchangers-info.html · cuartos-frios-inema.html
├── maquinas-hielo-comerciales-industriales.html
├── marcas-refrigeracion-industrial.html
├── quienes-somos.html · repuestos-trane.html · ubicacion.html
├── sanhua.html · full-gauge.html
├── CNAME               El dominio propio, lo lee GitHub Pages
├── .htaccess           Redirecciones 301, solo si el sitio pasa a Bluehost
├── favicon-32/180/512.png
├── datos.js            Base de datos del calculador (no editar a mano)
├── sitemap.xml         Lista de páginas para Google
├── robots.txt          Permisos de rastreo
├── logo-ecuclima.png
└── img/
    ├── trabajo-1..6.jpg    Galería de proyectos
    ├── marcas/             8 logos de marcas (PNG transparente)
    ├── clientes/           18 logos de clientes
    ├── productos/          27 fotos de repuestos
    ├── marcas-grid.png     Original compuesto, se conserva como respaldo
    └── clientes-grid.png   Original compuesto, se conserva como respaldo
```

Cada página es autocontenida: el CSS y el JavaScript van dentro del propio
archivo. No hay dependencias externas ni proceso de compilación. Se edita el
HTML, se hace `push`, y queda publicado.

---

## Regla que manda sobre todo lo demás: SEO

Nada se publica sin esto. Google es la vía por la que deben llegar los
clientes nuevos.

Toda página necesita, sin excepción:

- Un `<title>` único, de unos 60 caracteres, con la palabra clave al inicio
- `meta description` de 150–160 caracteres, redactada para que dé ganas de
  hacer clic, no como resumen técnico
- `link rel="canonical"` con la dirección definitiva
- Open Graph y Twitter Card, para que al compartir por WhatsApp se vea bien
- **Un solo `<h1>` por página.** Es el error más fácil de cometer: si el logo
  del encabezado va dentro de un `<h1>`, se desperdicia en el nombre de la
  empresa en lugar del tema de la página
- JSON-LD acorde al contenido: `LocalBusiness`, `Product`, `BreadcrumbList`,
  `WebApplication`
- `alt` descriptivo en cada imagen, con palabras que la gente busca de verdad
  — «Cuarto frío industrial instalado por Ecuclima», no «foto1»
- `loading="lazy"` en toda imagen que no se vea al abrir la página

**Lo que está dentro de una imagen, Google no lo lee.** Por eso los nombres de
marcas y clientes van como texto HTML junto al logo, nunca solo dibujados en
el PNG.

Al cambiar de dominio hay que actualizar la dirección base en los `canonical`
de las trece páginas, el `sitemap.xml`, el `robots.txt` y el JSON-LD.

---

## Tareas frecuentes

### Agregar o modificar un repuesto

El inventario está incrustado dentro de `partes.html`, en la constante
`PRODUCTOS`, cerca del final del archivo. Va embebido y no en un `.json`
aparte a propósito: al abrir el sitio como archivo local, el navegador
bloquea la lectura de archivos externos y el buscador quedaría vacío.

```js
{n:"Nombre completo del repuesto", c:"Categoría", p:252.90, iva:true, s:2, f:"archivo.jpg"}
```

| Campo | Significado |
|---|---|
| `n` | Nombre. Incluir marca y código: es lo que se busca |
| `c` | Categoría. Genera sola su botón de filtro |
| `p` | Precio, o `null` si es bajo pedido |
| `iva` | `true` si el precio no incluye IVA |
| `s` | Unidades en stock. Se omite si es bajo pedido |
| `f` | Nombre del archivo dentro de `img/productos/` |

La foto va en `img/productos/`. Si falta, la tarjeta igual funciona: el
espacio de la imagen se oculta solo.

### Agregar un logo de marca o cliente

Los logos necesitan **fondo transparente**, o se ve un recuadro gris sobre
la tarjeta.

Si el logo viene con fondo sólido, hay dos scripts de PowerShell que hacen
el trabajo (usan `System.Drawing`, porque en el equipo no hay ImageMagick,
ni Node, ni Python funcional):

1. Quitar el fondo por inundación desde los bordes. No usa reemplazo de
   color global: eso perforaría las partes claras internas de logos como
   el de Bitzer.
2. Recortar el margen transparente sobrante.

Ese segundo paso importa más de lo que parece. Snowkey llegó como una
imagen de 200×200 px cuyo logo real ocupaba 200×40: el resto era aire, y
en la web se veía diminuto.

**Cómo se dimensionan los logos.** No se igualan por altura, se igualan por
área visual. Normalizar por altura hace que los logos anchos se vean
enormes y los cuadrados diminutos. La altura de cada uno sale de
`√(4200 / proporción)` y se fija en `index.html` con selectores por nombre
de archivo:

```css
.marca-logo img[src$="snowkey.png"]{height:30px}   /* proporción 5.00 */
.marca-logo img[src$="emerson.png"]{height:56px}   /* proporción 1.49 */
```

Al sumar un logo nuevo hay que calcular su altura con esa fórmula y añadir
su regla.

### Cambiar los datos de contacto

El teléfono `+593 98 042 0996` y el correo `info@ecuclima.com` aparecen en
la ventana de chat, el pie de página y el JSON-LD de las trece páginas.
Conviene buscar y reemplazar en todo el proyecto para no dejar ninguno
desactualizado.

---

## Detalles que no son evidentes al leer el código

**Los enlaces `tel:` y `mailto:` en computadora.** En celular abren el
marcador o el correo. En computadora, si no hay cliente configurado —el
caso de quien usa Gmail en el navegador— no ocurre absolutamente nada. Por
eso el clic además copia el dato al portapapeles y muestra un aviso. El
copiado requiere `https`: funciona en GitHub Pages, pero no al abrir el
archivo con doble clic desde el escritorio.

**La ventana de chat abre con «Deseo información de » ya escrito.** No es
decorativo: sin texto previo, el visitante pulsaba enviar con el campo
vacío y aparecía un diálogo del navegador con la casilla «No permitir que
este sitio pregunte nuevamente». Quien la marcaba dejaba el botón mudo para
siempre. Queda además una validación en rojo dentro de la ventana como red
de seguridad.

**El calculador conserva su propia interfaz.** Su `<nav>` son las pestañas
de la herramienta, no navegación del sitio. Por eso se le añadió una barra
delgada de Ecuclima por encima en lugar de reemplazar su encabezado.

**`calculador.html` es una copia** de `../ecuclima-web/app.html`. Se copió
porque el enlace original apuntaba fuera de la raíz del sitio y habría dado
error 404 al publicar. Si se modifica el calculador original, hay que
volver a copiarlo y reaplicar la barra superior y la ventana de chat.

**Los copos de nieve del hero** recorren 390 px y llegan a blanco al 68 %
del trayecto. Ese número está atado a la altura del hero: si se cambia el
`min-height`, los copos se cortan antes de volverse blancos y se ven
siempre rojizos.

---

## Publicar

```bash
git add -A
git commit -m "Descripción del cambio"
git push origin main
```

El sitio se reconstruye solo. Si al abrirlo sigue viéndose la versión
anterior, es la caché del navegador: `Ctrl + Shift + R`.

---

## Pendiente

- [ ] Registrar el sitio en Google Search Console y enviar el `sitemap.xml`.
      Sin esto Google puede tardar semanas en descubrir la página
- [ ] Crear el perfil de Google Business. Para búsquedas locales del tipo
      «repuestos refrigeración Quito» pesa más que todo el trabajo técnico
- [ ] Las seis tarjetas de «Repuestos en stock» de la portada muestran
      emoji en vez de fotos reales, aunque las 27 fotos ya están en el
      servidor
- [ ] Danfoss y Emerson no tienen ningún producto cargado.
      Sus tarjetas llevan al buscador y caen en el mensaje de consulta

---

## Reglas que toda página nueva debe cumplir

**El encabezado se mantiene visible al desplazar.** Va con
`position: sticky; top: 0` y un `z-index` alto. El visitante debe poder
volver al menú desde cualquier punto de la página, sin subir hasta arriba.

**Nunca usar `overflow-x: hidden` en `html` o `body`.** Rompe el
encabezado fijo: al ocultar el desbordamiento el navegador crea un
contenedor de desplazamiento propio y `position: sticky` deja de
funcionar. Para contener el ancho se usa **`overflow-x: clip`**, que
recorta igual pero no crea ese contenedor.

Ese error ya ocurrió una vez: se agregó `hidden` para corregir un
desborde de texto en móvil y se llevó por delante el encabezado de las
trece páginas sin que se notara hasta días después.

**Texto justificado con guionado automático** en párrafos, listas y
fichas. Los títulos, las celdas de tabla y el pie quedan fuera:
justificar un título de dos palabras lo separa hasta los márgenes.

**Español neutro, tratamiento de usted.** Sin voseo ni modismos
regionales. El cliente es industrial ecuatoriano.
