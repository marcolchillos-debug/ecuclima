# Ofertas de Ecuclima: revisión diaria en la nube

Este directorio es el código de la revisión diaria de **stock y precios** de la página de ofertas (`ecuclima.com/ofertas.html`).
Corre en GitHub Actions (`.github/workflows/ofertas-diaria.yml`), todas las noches a las 22:07 de Ecuador, para que los datos estén listos cuando Google Merchant Center lee el archivo de productos (a las 0:00). No depende de ninguna computadora.

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
Lo arma y lo copia al portapapeles el script `ACTIVAR-OFERTAS-EN-LA-NUBE.bat` que Marco corre en su computadora; nunca pasa por ningún chat.

## Probarlo o apagarlo

- **Correr ahora:** pestaña *Actions* → *Ofertas - revision diaria de stock y precios* → *Run workflow* → elegir `solo_mirar` (no cambia nada),
  `probar_correo` o `publicar`.
- **Apagarlo:** pestaña *Actions* → ese flujo → menú `···` → *Disable workflow*. O borrar el secreto `OFERTAS_SECRETOS` (el flujo queda sin hacer nada).
- GitHub apaga los flujos programados de un repositorio público tras 60 días sin actividad. Por eso la corrida deja una marca semanal en `estado/latido.json`.
