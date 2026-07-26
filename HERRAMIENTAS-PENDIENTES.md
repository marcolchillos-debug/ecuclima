# Herramientas de ingeniería — hoja de ruta

## La idea

El calculador de carga térmica ya demostró que funciona como imán: alguien
que necesita dimensionar una cámara llega buscando la herramienta, no la
empresa. Un ingeniero o un aprendiz de refrigeración que encuentra acá lo
que necesita para resolver su trabajo, vuelve — y cuando le falta un
repuesto, ya sabe a quién preguntarle.

**La herramienta atrae, el catálogo vende.** Cada calculadora nueva es una
puerta de entrada distinta al mismo inventario.

Esto además esquiva la competencia frontal: contra un distribuidor grande
es difícil pelear por «comprar compresor Bitzer», pero nadie en español
ocupa «calcular diámetro de línea de succión» o «caída de presión en línea
de líquido».

---

## Herramientas propuestas

### 1. Calculador de chillers — prioridad

El equivalente del de cuartos fríos, pero para enfriamiento de líquido.

Entrada: caudal, temperatura de entrada y salida, tipo de fluido —agua,
glicol o salmuera—, altitud del sitio y temperatura ambiente de diseño.

Salida: potencia frigorífica en kW y toneladas de refrigeración, y el
modelo CGAM sugerido de la tabla que ya está publicada en la página de
chillers.

Ese último punto es el que cierra el círculo: la herramienta termina
recomendando un equipo que vendemos.

**Corrección de altitud.** Un condensador enfriado por aire pierde
capacidad con la altura, y a 2.500 m el aire pesa un cuarto menos. Casi
ninguna calculadora en línea lo contempla, y en la sierra ecuatoriana eso
lleva a sobredimensionar. Es la misma ventaja que ya diferencia al
calculador de cámaras.

### 2. Cálculo de tuberías de refrigerante

Diámetro de línea de succión, líquido y descarga.

Lo relevante no es solo la caída de presión: en la línea de succión hay
que garantizar **velocidad mínima de arrastre de aceite**, sobre todo en
tramos verticales ascendentes. Una línea sobredimensionada no devuelve el
aceite al compresor y termina rompiéndolo. Ese es el error que esta
herramienta evitaría, y es el que más compresores mata.

### 3. Cálculo eléctrico

Calibre de conductor, caída de tensión, y protección termomagnética según
la corriente del equipo. Aplicando la norma ecuatoriana, no la NEC
estadounidense: ahí hay un vacío real de herramientas locales.

### 4. Conversor de unidades

Toneladas de refrigeración, kW, BTU por hora, frigorías. Simple pero muy
buscado, y sirve de entrada a las herramientas grandes.

### 5. Tabla presión–temperatura de refrigerantes

R-404A, R-134a, R-507, R-717, R-744 y los nuevos de bajo GWP. Es la
consulta más frecuente de un técnico en campo, y en el celular.

---

## Dónde buscar el respaldo técnico

Toda herramienta tiene que citar su método, igual que el calculador actual
cita Emerson y ASHRAE. Sin esa referencia un ingeniero no confía en el
resultado.

- **Trane Application Manuals** y los *Engineers Newsletter*, que Trane
  publica abiertos. Siendo distribuidor autorizado, es la fuente natural
  para el calculador de chillers.
- **ASHRAE Handbook — Refrigeration**, capítulo de tuberías de
  refrigerante, para los diámetros y velocidades de arrastre.
- **Danfoss Coolselector** y el software de Bitzer, como referencia para
  contrastar resultados, no para copiar.
- **Carel**, para la parte de válvulas de expansión electrónica.

**Cuidado con el material de fabricantes:** los manuales son de consulta
libre, pero reproducir tablas completas puede infringir derechos. El
camino correcto es implementar el **método de cálculo** y citar la fuente,
no copiar la tabla.

---

## Qué hace falta antes

El calculador de cuartos fríos vive hoy en `calculador.html`, con sus
datos en `datos.js`. Cualquier herramienta nueva conviene que siga esa
misma estructura, para que compartan estilo y no haya que rehacer nada.

Queda pendiente de la conversación anterior: **los 182 KB de tablas
técnicas de `datos.js` que Google no ve**, porque se dibujan por
JavaScript al pulsar una pestaña. Publicarlas como páginas propias es
trabajo de una vez y multiplica el alcance de todo lo demás.
