# -*- coding: utf-8 -*-
"""Primer paso del flujo diario de ofertas (GitHub Actions).

Decide si el flujo esta activado (existe el secreto OFERTAS_SECRETOS y tiene el formato esperado) y le pide a GitHub que oculte cada valor secreto
en el registro, que es publico. No imprime ningun valor.
"""
import json
import os
import sys


def salida(clave, valor):
    ruta = os.environ.get("GITHUB_OUTPUT")
    if ruta:
        with open(ruta, "a", encoding="utf-8") as f:
            f.write("%s=%s\n" % (clave, valor))


def ocultar(v):
    if isinstance(v, dict):
        for x in v.values():
            ocultar(x)
    elif isinstance(v, list):
        for x in v:
            ocultar(x)
    elif isinstance(v, str) and len(v.strip()) >= 3 and "\n" not in v and "\r" not in v:
        print("::add-mask::" + v)


crudo = (os.environ.get("OFERTAS_SECRETOS") or "").strip()
if not crudo:
    print("::notice title=Ofertas::Todavia no esta el secreto OFERTAS_SECRETOS: la revision diaria no esta activada.")
    salida("activo", "false")
    sys.exit(0)
try:
    datos = json.loads(crudo)
    fm = datos["fm"]
    for k in ("servidor", "base", "usuario", "clave"):
        if not str(fm.get(k) or "").strip():
            raise ValueError(k)
except Exception:
    print("::error title=Ofertas::El secreto OFERTAS_SECRETOS no tiene el formato esperado (ver .github/ofertas/LEEME.md).")
    salida("activo", "false")
    sys.exit(1)

ocultar(datos)
salida("activo", "true")
print("Secretos cargados (sus valores quedan ocultos en el registro).")
