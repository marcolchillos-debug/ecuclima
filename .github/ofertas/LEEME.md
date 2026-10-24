# Ofertas de Ecuclima: revisión diaria (copia de RESERVA en la nube)

**Desde el 2026-10-24 esta revisión corre todas las noches a las 22:07 en la PC de la oficina** (tarea `Ecuclima-Ofertas-Diaria`),
porque Marco pidió que la alarma y el comando vivan allá y porque los horarios de GitHub se atrasan horas. Esta copia en GitHub Actions
(`.github/workflows/ofertas-diaria.yml`) **ya no tiene horario**: solo se corre a mano (pestaña *Actions* → *Run workflow*) si algún día la oficina no puede, y
mientras no exista el secreto `OFERTAS_SECRETOS` no hace nada.

Este directorio es el código de la revisión diaria de **stock y precios** de la página de ofertas (`ecuclima.com/ofertas.html`). Google Merchant Center lee el archivo de productos a las 0:00 (hora de Ecuador).

## Qué hace

1. Lee `ofertas-datos.js` publicado y, para cada producto, pide a la base de inventario (solo lectura) el stock y el PVP.
2. Aplica solo los cambios **seguros**: el stock que baja o llega a 0, el stock que sube hasta 2 unidades y el PVP que cambia hasta ±10 %.
3. Lo demás (stock que sube más de 2, PVP que cambia más de 10 %, precio bajo el costo, cambios masivos) **no se publica solo**: avisa a Marco por correo.
4. Solo toca `ofertas-datos.js`, `ofertas-precios.js` y `ofertas-feed.tsv` (el archivo de Google Merchant Center). Nunca agrega ni quita productos.
5. Avisa por correo a quien corresponde lo publicado y lo que necesita revisión.

Solo publica si existe `autorizacion-ofertas-semanal.json` vigente (la autorización de Marco vence a los 90 días y se renueva).

## Archivos

| Archivo | Para qué |
|---|---|
| `catalogo/ofertas_semanal.py` | El programa (reglas, lectura, publicación por la API de GitHub, correo) |
| `catalogo/fm.py` | Conexión a la base de inventario |
| `generar_feed.js` | Arma el archivo de Google a partir de los datos publicados |
| `preparar_secretos.py` | Primer paso del flujo: oculta los valores secretos en el registro |
| `config.json` | Nombres de campos (sin servidor, sin credenciales) |
| `autorizacion-ofertas-semanal.json` | Permiso de Marco para publicar solo, con fecha de vencimiento |
| `estado/` | Lo mínimo que debe sobrevivir entre corridas (avisos ya enviados, marca semanal) |

## Secreto

El flujo necesita **un solo secreto** del repositorio, `OFERTAS_SECRETOS` (Settings → Secrets and variables → Actions), con este formato:

```json
{"fm": {"servidor": "...", "base": "...", "usuario": "...", "clave": "..."},
 "smtp": {"servidor": "...", "usuario": "...", "clave": "..."},
 "avisos": {"marco": ["..."], "sabrina": ["..."]}}
```

Sin `smtp` el flujo publica igual pero no manda correos. Los valores no están en este repositorio ni se ven en el registro de GitHub.
Se arma con `nube\armar_secreto.py` (copia el secreto al portapapeles sin mostrarlo); nunca pasa por ningún chat. Hoy no hace falta: la oficina publica por su propia llave.

## Probarlo o apagarlo

- **Correr ahora:** pestaña *Actions* → *Ofertas - revision diaria de stock y precios* → *Run workflow* → elegir `solo_mirar` (no cambia nada),
  `probar_correo` o `publicar`.
- **Apagarlo:** pestaña *Actions* → ese flujo → menú `···` → *Disable workflow*. O borrar el secreto `OFERTAS_SECRETOS` (el flujo queda sin hacer nada).
- Sin horario, ya no aplica el apagado automático de GitHub por 60 días sin actividad.
