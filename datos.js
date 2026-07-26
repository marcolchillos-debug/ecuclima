// Generado por construir-datos.ps1. No editar a mano: editar los JSON en data\ y volver a ejecutar.
var CF = {};
CF["_correcciones"] = {
  "proposito": "Correcciones a las anomalias detectadas en el manual Emerson de 1968. No se modifican los archivos de datos originales: la aplicacion muestra el valor del manual y, cuando existe, el valor corregido, para que el usuario decida.",
  "fecha": "2026-07-25",
  "criterios_de_correccion": [
    "Regla interna del propio manual, pagina 14-8: calor latente de fusion = porcentaje de agua x 144 BTU/lb. Es la correccion mas defendible porque proviene del mismo documento.",
    "ASHRAE Handbook Refrigeration, capitulo de propiedades termicas de los alimentos, donde se pudo verificar el dato en fuentes publicas.",
    "El equivalente moderno de la regla es: calor latente = fraccion de agua x 334 kJ/kg."
  ],

  "correcciones": [
    {
      "producto": "Shrimp",
      "campo": "pct_agua y latente_fusion",
      "valor_manual": { "pct_agua": 70.8, "latente_fusion": 119 },
      "valor_corregido": { "pct_agua": 75, "latente_fusion": 108 },
      "fuente": "ASHRAE lista camaron con 75 por ciento de humedad y punto de congelacion inicial de -2 C, equivalente a 28.4 F. El latente se recalcula como 75 x 1.44.",
      "confianza": "media",
      "impacto": "El manual sobreestima el latente en 11 BTU/lb, es decir un 10 por ciento conservador en la carga de congelacion de camaron."
    },
    {
      "producto": "Cheese (American)",
      "campo": "latente_fusion",
      "valor_manual": { "pct_agua": 60, "latente_fusion": 79 },
      "valor_corregido": { "pct_agua": 60, "latente_fusion": 86 },
      "fuente": "Regla del propio manual. Ademas el resto de la familia de quesos sigue el patron 55 por ciento a 79 y 60 por ciento a 86, que American rompe.",
      "confianza": "alta",
      "impacto": "El manual subestima el latente en 7 BTU/lb."
    },
    {
      "producto": "Cheese (Limburger)",
      "campo": "latente_fusion",
      "valor_manual": { "pct_agua": 55, "latente_fusion": 86 },
      "valor_corregido": { "pct_agua": 55, "latente_fusion": 79 },
      "fuente": "Regla del propio manual y coherencia con Roquefort y Swiss, ambos 55 por ciento a 79 BTU/lb.",
      "confianza": "alta",
      "impacto": "El manual sobreestima el latente en 7 BTU/lb."
    },
    {
      "producto": "Cream (40%)",
      "campo": "latente_fusion",
      "valor_manual": { "pct_agua": 73, "latente_fusion": 90 },
      "valor_corregido": { "pct_agua": 73, "latente_fusion": 105 },
      "fuente": "Regla del propio manual. Se advierte que en productos con 40 por ciento de grasa parte del agua esta ligada y no congela, por lo que el valor real puede ubicarse entre ambos.",
      "confianza": "media",
      "impacto": "Diferencia de 15 BTU/lb. Para crema conviene usar el valor corregido como cota superior."
    },
    {
      "producto": "Butter",
      "campo": "latente_fusion",
      "valor_manual": { "pct_agua": 15, "latente_fusion": 15 },
      "valor_corregido": { "pct_agua": 15, "latente_fusion": 21.6 },
      "fuente": "Regla del propio manual.",
      "confianza": "baja",
      "impacto": "Producto mayoritariamente graso: la correlacion basada en agua pierde validez. La diferencia absoluta es pequena frente a la carga total."
    },
    {
      "producto": "Chocolate (coating)",
      "campo": "cp_sobre, cp_bajo, latente_fusion, punto_congelacion_F",
      "valor_manual": { "pct_agua": 55, "cp_sobre": 0.30, "cp_bajo": 0.55, "latente_fusion": 40, "punto_congelacion_F": "95-85" },
      "valor_corregido": null,
      "fuente": "No corregible con confianza. La fila tiene al menos tres inconsistencias: el calor especifico bajo congelacion supera al de sobre congelacion, lo que es fisicamente imposible; el 55 por ciento de agua no corresponde a una cobertura de chocolate, que tipicamente contiene menos del 2 por ciento; y el rango 95-85 F parece ser la temperatura de trabajo del templado y no un punto de congelacion.",
      "confianza": "nula",
      "impacto": "La aplicacion debe bloquear este producto y pedir que el usuario ingrese datos propios o de ficha tecnica del proveedor.",
      "recomendacion": "Para coberturas de chocolate usar cp cercano a 0.40 BTU/lb F y despreciar el calor latente de congelacion del agua."
    }
  ],

  "pendiente_v2": "Cargar la tabla completa de propiedades termicas del ASHRAE Handbook Refrigeration actual mediante el modulo de actualizacion por internet, y usarla como capa que sobrescriba los valores de 1968 conservando ambos para trazabilidad."
};
CF["_manifiesto"] = {
  "documento": "Emerson Climate Technologies, Refrigeration Manual Part 3 - The Refrigeration Load, Form No. AE 103 R3 (10/06), copyright 1968",
  "paginas_pdf": 44,
  "fecha_extraccion": "2026-07-25",
  "metodo": "Texto extraido con pdftotext. Las tablas son imagenes escaneadas y se leyeron pagina por pagina renderizando a PNG en escala de grises a 200 dpi, con ampliaciones a 400 dpi en las celdas dudosas.",
  "cobertura": "Las 44 paginas fueron revisadas. Todas las tablas numeradas del manual estan digitalizadas.",

  "tablas_digitalizadas": [
    { "tabla": "4", "nombre": "Typical Heat Transmission Coefficients", "paginas_manual": "12-3, 12-4", "archivo": "tabla4_materiales.json", "registros": 29 },
    { "tabla": "5", "nombre": "Summer Outdoor Design Data", "paginas_manual": "12-5, 12-6, 12-7", "archivo": "tabla5_diseno_exterior.json", "registros": 100 },
    { "tabla": "6", "nombre": "Allowance for Sun Effect", "paginas_manual": "12-8", "archivo": "envolvente.json", "registros": 3 },
    { "tabla": "7", "nombre": "Recommended Minimum Insulation Thickness", "paginas_manual": "12-9", "archivo": "envolvente.json", "registros": 7 },
    { "tabla": "7A", "nombre": "Quick Estimate Factors for Heat Transmission", "paginas_manual": "12-9", "archivo": "envolvente.json", "registros": 22 },
    { "tabla": "8", "nombre": "Average Air Changes per 24 Hr", "paginas_manual": "13-1", "archivo": "aire.json", "registros": 23 },
    { "tabla": "9", "nombre": "Heat Removed in Cooling Air to Storage Room Conditions", "paginas_manual": "13-2", "archivo": "aire.json", "registros": 160 },
    { "tabla": "10", "nombre": "Food Products Data", "paginas_manual": "14-1, 14-2, 14-3", "archivo": "productos_vegetales.json, productos_carnes.json, productos_frutas.json, productos_misc.json", "registros": 136 },
    { "tabla": "11", "nombre": "Properties of Solids", "paginas_manual": "14-4, 14-5", "archivo": "tabla11_solidos.json", "registros": 105 },
    { "tabla": "12", "nombre": "Properties of Liquids", "paginas_manual": "14-6", "archivo": "tabla12_liquidos.json", "registros": 66 },
    { "tabla": "13", "nombre": "Storage Requirements and Properties of Perishable Products", "paginas_manual": "14-9, 14-10", "archivo": "tabla13_almacenamiento.json", "registros": 160 },
    { "tabla": "14", "nombre": "Storage Conditions for Cut Flowers and Nursery Stock", "paginas_manual": "14-11", "archivo": "tabla14_flores.json", "registros": 38 },
    { "tabla": "15", "nombre": "Space, Weight and Density Data for Commodities", "paginas_manual": "14-12, 14-13", "archivo": "tabla15_embalajes.json", "registros": 101 },
    { "tabla": "16", "nombre": "Heat Equivalent of Electric Motors", "paginas_manual": "15-1", "archivo": "internas.json", "registros": 3 },
    { "tabla": "17", "nombre": "Heat Equivalent of Occupancy", "paginas_manual": "15-1", "archivo": "internas.json", "registros": 7 },
    { "tabla": "18", "nombre": "Recommended Condensing Unit Capacity, 35 F", "paginas_manual": "16-12", "archivo": "tablas18_19_seleccion_rapida.json", "registros": 56 },
    { "tabla": "19", "nombre": "Recommended Condensing Unit Capacity, Low Temperature", "paginas_manual": "16-12", "archivo": "tablas18_19_seleccion_rapida.json", "registros": 18 }
  ],

  "figuras_revisadas_sin_digitalizar": [
    {
      "figura": "67",
      "pagina_manual": "13-3",
      "titulo": "Infiltration Air Velocity Through Open Doors",
      "motivo": "No requiere digitalizacion. El grafico es la representacion exacta de la formula v = 100 * raiz(altura/7) * raiz(TD/60), que ya esta en aire.json. Comprobado: a 7 ft y 50 F la formula da 91.3 FPM y el grafico marca 91."
    },
    {
      "figura": "69 a 74",
      "pagina_manual": "16-4 a 16-8 y 16-10",
      "titulo": "Curvas de capacidad de compresor, condensador y evaporador, y cartas de balance del sistema",
      "motivo": "Son curvas de rendimiento de un compresor Copeland especifico de 1968, no tablas de consulta. Su contenido numerico solo aplica a ese modelo y hoy lo reemplaza el software de seleccion del fabricante. El procedimiento grafico de balance esta descrito integramente en el texto de las paginas 16-3 y 16-9, que si fue extraido."
    }
  ],

  "paginas_sin_datos": [
    { "pagina_pdf": 1, "contenido": "Portada" },
    { "pagina_pdf": 2, "contenido": "Indice de secciones e indice de tablas" },
    { "pagina_pdf": 43, "contenido": "Carta de conversion Fahrenheit-Centigrado. No se almacena: la aplicacion convierte con la formula exacta C = (F-32)*5/9." },
    { "pagina_pdf": 44, "contenido": "Contraportada con datos de Emerson" }
  ],

  "anomalias_detectadas_en_el_original": [
    "Tabla 12, Acetone: punto de congelacion impreso 203 F sin signo negativo. Verificado a 400 dpi, el error es del manual.",
    "Tabla 12, Aniline: punto de ebullicion impreso 63.2 F, valor real cercano a 363 F.",
    "Tabla 12, Hexane: punto de ebullicion impreso 755.6 F, valor real cercano a 156 F.",
    "Tabla 12, Alcohol-ethyl y Alcohol-methyl: la columna k contiene 0.789 y 0.796, que son gravedades especificas y no conductividades.",
    "Tabla 10, Chocolate (coating): calor especifico bajo congelacion mayor que el de sobre congelacion, y punto de congelacion impreso como 95-85.",
    "Tabla 18, fila 11x9: servicio intenso 9050 rompe la progresion de la tabla."
  ]
};
CF["_validacion"] = {
  "fecha": "2026-07-25",
  "alcance": "Tabla 10, 132 productos cargados, 109 con porcentaje de agua y calor latente declarados simultaneamente.",
  "reglas_aplicadas": [
    "Regla del propio manual: calor latente de fusion = porcentaje de agua x 144 BTU/lb. Tolerancia 2 BTU/lb.",
    "Correlacion ASHRAE: cp sobre congelacion = 0.008 x porcentaje de agua + 0.20. Tolerancia 0.06.",
    "Reproduccion del ejemplo resuelto del manual, paginas 16-1 y 16-2, total 939039 BTU en 24 horas."
  ],
  "resultado_ocr": "96 de 109 productos cumplen la regla del latente dentro de tolerancia. Los 13 restantes fueron reamplificados a 400 dpi y en todos los casos la transcripcion coincide con lo impreso. No se detecto ningun error de lectura.",

  "desviaciones_confirmadas_del_original": [
    { "producto": "Shrimp", "pct_agua": 70.8, "latente_tabla": 119, "latente_por_formula": 102.0, "nota": "Verificado a 400 dpi. El manual imprime 119. Los mariscos vecinos son coherentes (Scallops 80.3 y 116). Usar con criterio: por formula corresponderia 102." },
    { "producto": "Cream (40%)", "pct_agua": 73, "latente_tabla": 90, "latente_por_formula": 105.1, "nota": "Verificado a 400 dpi. El 40 por ciento de grasa altera el agua congelable, lo que explica parte de la diferencia." },
    { "producto": "Cheese (American)", "pct_agua": 60, "latente_tabla": 79, "latente_por_formula": 86.4, "nota": "El resto de los quesos sigue el patron 55 por ciento a 79 BTU/lb y 60 por ciento a 86 BTU/lb. American y Limburger son los dos que rompen ese patron, aparentemente intercambiados en el original. Verificado a 400 dpi." },
    { "producto": "Cheese (Limburger)", "pct_agua": 55, "latente_tabla": 86, "latente_por_formula": 79.2, "nota": "Ver nota de Cheese (American)." },
    { "producto": "Butter", "pct_agua": 15, "latente_tabla": 15, "latente_por_formula": 21.6, "nota": "Producto graso, la correlacion basada en agua no aplica bien." },
    { "producto": "Chocolate (coating)", "pct_agua": 55, "latente_tabla": 40, "latente_por_formula": 79.2, "nota": "Fila con varias anomalias en el original: ademas el cp bajo congelacion (0.55) supera al cp sobre congelacion (0.30), lo que es fisicamente inconsistente." }
  ],

  "desviaciones_menores_por_redondeo": [
    "Corn (green), Endive (escarole), Rhubarb, Tomatoes (green), Beef (fresh-lean), Pears y Raspberries se desvian entre 2.1 y 3.9 BTU/lb. Corresponde al redondeo del manual y no afecta el calculo."
  ],

  "correlacion_cp": "12 productos se apartan de la correlacion de calor especifico. Todos son carnes grasas, embutidos, lacteos grasos o harinas, donde el contenido de grasa domina sobre el de agua. No es un error de transcripcion sino una limitacion conocida de la correlacion, que solo es valida para productos de alto contenido de agua.",

  "conclusion": "La base de datos reproduce fielmente el documento original. Las anomalias listadas son del manual impreso de 1968 y quedan marcadas para que la aplicacion las advierta al usuario en lugar de corregirlas en silencio."
};
CF["aire"] = {
  "fuente": "Emerson Climate Technologies, Refrigeration Manual Part 3, Form AE-103 R3, paginas 13-1 y 13-2. From 1981 ASHRAE Handbook of Fundamentals.",
  "version": 1,
  "fecha_actualizacion": "2026-07-25",

  "tabla8_cambios_aire": {
    "titulo": "Average Air Changes per 24 Hr for Storage Rooms Due to Door Openings and Infiltration",
    "factores_uso": {
      "uso_intenso": 2.0,
      "uso_normal": 1.0,
      "almacenamiento_prolongado": 0.6
    },
    "columnas": ["volumen_ft3", "cambios_24h_sobre_32F", "cambios_24h_bajo_32F"],
    "filas": [
      [200, 44.0, 33.5],
      [300, 34.5, 26.2],
      [400, 29.5, 22.5],
      [500, 26.0, 20.0],
      [600, 23.0, 18.0],
      [800, 20.0, 15.3],
      [1000, 17.5, 13.5],
      [1500, 14.0, 11.0],
      [2000, 12.0, 9.3],
      [3000, 9.5, 7.4],
      [4000, 8.2, 6.3],
      [5000, 7.2, 5.6],
      [6000, 6.5, 5.0],
      [8000, 5.5, 4.3],
      [10000, 4.9, 3.8],
      [15000, 3.9, 3.0],
      [20000, 3.5, 2.6],
      [25000, 3.0, 2.3],
      [30000, 2.7, 2.1],
      [40000, 2.3, 1.8],
      [50000, 2.0, 1.6],
      [75000, 1.6, 1.3],
      [100000, 1.4, 1.1]
    ]
  },

  "tabla9_calor_por_pie_cubico": {
    "titulo": "Heat Removed in Cooling Air to Storage Room Conditions",
    "unidad": "BTU por pie cubico de aire infiltrado",
    "nota": "Para condiciones fuera de tabla, el manual indica calcular por diferencia de entalpia entre el aire exterior y el aire de la camara usando la carta psicrometrica.",
    "bloque_temperatura_alta": {
      "columnas_temp_ext_hr": [[85, 50], [85, 60], [90, 50], [90, 60], [95, 50], [95, 60], [100, 50], [100, 60]],
      "filas": [
        [65, 0.45, 0.64, 0.68, 0.91, 0.93, 1.20, 1.21, 1.51],
        [60, 0.66, 0.85, 0.89, 1.12, 1.14, 1.41, 1.42, 1.71],
        [55, 0.85, 1.04, 1.08, 1.31, 1.33, 1.60, 1.61, 1.91],
        [50, 1.03, 1.22, 1.26, 1.49, 1.51, 1.78, 1.79, 2.09],
        [45, 1.19, 1.39, 1.43, 1.66, 1.68, 1.94, 1.95, 2.25],
        [40, 1.35, 1.55, 1.59, 1.81, 1.83, 2.10, 2.11, 2.41],
        [35, 1.50, 1.70, 1.74, 1.96, 1.99, 2.25, 2.26, 2.56],
        [30, 1.64, 1.84, 1.88, 2.10, 2.13, 2.39, 2.40, 2.70]
      ]
    },
    "bloque_temperatura_baja": {
      "columnas_temp_ext_hr": [[40, 70], [40, 80], [50, 70], [50, 80], [90, 50], [90, 60], [100, 50], [100, 60]],
      "filas": [
        [25, 0.39, 0.43, 0.69, 0.75, 2.02, 2.24, 2.54, 2.84],
        [20, 0.52, 0.56, 0.82, 0.89, 2.15, 2.38, 2.68, 2.97],
        [15, 0.65, 0.69, 0.95, 1.01, 2.28, 2.50, 2.80, 3.10],
        [10, 0.77, 0.82, 1.08, 1.14, 2.40, 2.63, 2.93, 3.22],
        [5, 0.89, 0.94, 1.20, 1.26, 2.52, 2.75, 3.05, 3.34],
        [0, 1.01, 1.05, 1.31, 1.38, 2.64, 2.86, 3.16, 3.46],
        [-5, 1.13, 1.17, 1.43, 1.49, 2.76, 2.98, 3.28, 3.58],
        [-10, 1.24, 1.29, 1.55, 1.61, 2.88, 3.10, 3.40, 3.70],
        [-15, 1.36, 1.41, 1.67, 1.73, 2.99, 3.22, 3.52, 3.81],
        [-20, 1.48, 1.52, 1.78, 1.85, 3.11, 3.34, 3.64, 3.93],
        [-25, 1.60, 1.64, 1.90, 1.97, 3.23, 3.45, 3.75, 4.05],
        [-30, 1.72, 1.76, 2.03, 2.09, 3.35, 3.58, 3.88, 4.17]
      ]
    }
  },

  "metodo_velocidad_puerta": {
    "descripcion": "Metodo alternativo por velocidad de aire a traves de la puerta abierta.",
    "base": "100 pies por minuto de velocidad media en cada mitad de una puerta de 7 pies de alto con 60 F de TD.",
    "formula": "velocidad_fpm = 100 * raiz(altura_puerta_ft / 7) * raiz(TD_F / 60)",
    "caudal": "caudal_cfm = velocidad_fpm * (alto_ft * ancho_ft) / 2",
    "ejemplo_manual": "Puerta de 8 ft de alto por 4 ft de ancho con TD de 100 F: velocidad 138 FPM, caudal 2210 cfm."
  }
};
CF["almacenamiento"] = {
  "tabla": "Sistemas de almacenamiento y ocupación del volumen de la cámara",
  "fuente": "Elaboración propia de Ecuclima. Los factores de ocupación de planta se derivaron de la geometría estándar de cada sistema (profundidad de rack, ancho de pasillo de maniobra, paso de montantes) y se contrastaron con las cifras publicadas por los fabricantes de estanterías: selectivo cerca de 45 por ciento de aprovechamiento de planta, drive-in cerca de 65 por ciento y racks móviles sobre 80 por ciento.",
  "version": 1,
  "fecha_actualizacion": "2026-07-25",
  "nota_densidad_tabla15": "La densidad de la Tabla 15 es la del bulto: peso bruto dividido por el volumen geométrico del envase. Se verificó en 80 de las 83 filas que declaran dimensiones. NO incluye el pallet, los huecos entre cajas, los pasillos de maniobra, la estructura de racks ni la separación a muros y techo. Todo eso lo aporta el sistema de almacenamiento, y por eso el volumen de cámara no se puede sacar solo de la densidad.",
  "cadena_de_calculo": [
    "1. Volumen de envases = masa / densidad de la Tabla 15.",
    "2. Volumen de estiba = volumen de envases / factor de estiba en pallet, que recoge los huecos entre cajas y el volumen del propio pallet.",
    "3. Superficie de piso = volumen de estiba / (ocupación de planta x niveles x altura de carga por nivel).",
    "4. Los niveles no se eligen: salen de la altura interior disponible dividida por el paso vertical del sistema, limitados por el máximo que admite el sistema."
  ],
  "factor_estiba_en_pallet": 0.78,
  "claro_techo_m": 0.5,
  "nota_claro_techo": "Espacio reservado bajo el techo para evaporadores, difusores de aire y, cuando corresponde, rociadores. Sin él el aire no circula sobre la carga.",
  "columnas": ["sistema", "ocupacion_planta", "paso_vertical_m", "altura_carga_m", "niveles_max", "nota"],
  "filas": [
    ["Apilado en piso, bloque compacto", 0.60, 1.65, 1.50, 3,
      "Sin estructura ni pasillos internos. El límite es la resistencia al aplastamiento del propio embalaje: rara vez más de 3 alturas de pallet. Desaprovecha las cámaras altas."],
    ["Racks selectivos, pasillo convencional", 0.45, 1.80, 1.50, 8,
      "Acceso directo a cada pallet. Es el que más superficie pierde en pasillos, pero el único con 100 por ciento de selectividad."],
    ["Racks compactos drive-in", 0.62, 1.80, 1.50, 8,
      "El montacargas entra en la estructura. Del orden de 40 a 60 por ciento más pallets que el selectivo en la misma planta, a costa de la selectividad: exige producto homogéneo y rotación por bloques."],
    ["Racks móviles sobre carros", 0.80, 1.80, 1.50, 8,
      "Un solo pasillo para todo el bloque. La mayor densidad posible sin automatizar, y la que más ahorra en frío por metro cúbico refrigerado."],
    ["Estantería manual para cajas", 0.50, 0.60, 0.45, 8,
      "Sin pallets, carga y descarga a mano. Paso vertical corto, pensado para cajas y producto de rotación alta en cámaras pequeñas."]
  ],
  "costos_referenciales_usd": {
    "panel_base_m2": 18.0,
    "panel_por_mm": 0.22,
    "piso_m2": 55.0,
    "puerta_unidad": 1200.0,
    "nota": "Valores de referencia para anteproyecto, no cotización. El panel se estima como base + por_mm x espesor: 100 mm da 40 USD/m2 instalado. El piso incluye radier, aislación bajo losa y terminación. Reemplazar por los precios reales de Ecuclima."
  }
};
CF["ayuda"] = {
  "fuente": "Textos adaptados al español desde Emerson Refrigeration Manual Part 3, Form AE-103 R3. Las citas en inglés son textuales del original.",
  "version": 1,
  "fecha_actualizacion": "2026-07-25",

  "campos": {
    "c_largo": {
      "titulo": "Dimensiones exteriores",
      "texto": "Se ingresan las medidas por fuera del panel. El manual calcula la superficie de transmisión con dimensiones exteriores, criterio conservador porque toma el área mayor. El volumen interior lo deriva la app descontando dos espesores de panel en cada dirección, y es el que se usa para la infiltración.",
      "formula": "Volumen interior = (Largo − 2e) × (Ancho − 2e) × (Alto − 2e)",
      "pagina": "16-1"
    },
    "c_ti": {
      "titulo": "Temperatura de cámara",
      "texto": "Es la temperatura de diseño del espacio refrigerado. Define el diferencial contra el exterior, el espesor mínimo de aislación recomendado y la temperatura de evaporación. Si no sabes qué valor usar, búscala por producto en la pestaña Catálogo, Tabla 13, que trae la temperatura y la humedad a las que cada perecedero conserva mejor su calidad.",
      "tabla": "Tabla 13 · Condiciones de almacenamiento",
      "pagina": "14-8"
    },
    "c_te": {
      "titulo": "Temperatura exterior de diseño",
      "texto": "No se diseña para la temperatura más alta que pueda ocurrir alguna vez: ese pico puede darse unas pocas horas en varios años y encarece el equipo sin beneficio. El criterio del manual es usar la temperatura que se supera solo el 1% de las horas de los cuatro meses de verano. La Tabla 5 trae esos valores, pero solo para Estados Unidos y Canadá, por eso aquí se ingresa a mano.",
      "tabla": "Tabla 5 · Diseño exterior de verano",
      "pagina": "12-3"
    },
    "c_hr": {
      "titulo": "Humedad relativa exterior",
      "texto": "Entra en el cálculo de infiltración. El aire que ingresa no solo hay que enfriarlo: si trae más humedad que la cámara, esa humedad condensa y su calor latente se suma a la carga. Por eso a mayor humedad exterior, mayor carga por pie cúbico infiltrado.",
      "tabla": "Tabla 9 · Calor removido por pie cúbico",
      "pagina": "13-1"
    },
    "c_tg": {
      "titulo": "Temperatura bajo el piso",
      "texto": "Cuando el piso está sobre radier en contacto con el suelo, el diferencial no se calcula contra el aire exterior sino contra la temperatura que hay bajo la losa, bastante más estable y más baja en verano. El suelo es una masa enorme que no sigue el vaivén diario ni el de las estaciones, y a un metro de profundidad se queda cerca de la media anual del lugar. En el ejemplo del manual está a 55 °F mientras el ambiente está a 100 °F: usar el ambiente sobreestimaría fuertemente la carga del piso. Si la cámara está elevada con aire por debajo, se cambia el selector de Piso y entonces manda la temperatura exterior.",
      "pagina": "16-1"
    },
    "c_aisl": {
      "titulo": "Material aislante",
      "texto": "El factor k es la conductividad térmica: BTU que atraviesan un pie cuadrado por hora, por cada grado de diferencia y por pulgada de espesor. Mientras menor sea k, mejor aísla. Los buenos aislantes están en 0,25 o menos, y las espumas rígidas modernas llegan a 0,12–0,16.",
      "formula": "R total = 1/C + X₁/k₁ + X₂/k₂ …    y    U = 1 / R total",
      "tabla": "Tabla 4 · Coeficientes de transmisión",
      "pagina": "12-1"
    },
    "c_esp": {
      "titulo": "Espesor de panel",
      "texto": "Es el espesor del aislante puro, no el espesor total del muro con sus chapas. A menor temperatura de cámara hay que engrosar: la carga sube y, al mismo tiempo, el rendimiento del compresor baja porque la temperatura de evaporación es menor. Por eso el espesor mínimo recomendado crece al bajar la temperatura.",
      "formula": "Factor = 24 × k / espesor en pulgadas   [BTU por 24 h, por ft², por °F]",
      "tabla": "Tabla 7 · Espesor mínimo · Tabla 7A · Factores rápidos",
      "pagina": "12-8"
    },
    "c_hemi": {
      "titulo": "Hemisferio",
      "texto": "La Tabla 6 del manual es para el hemisferio norte: por eso lista muro este, sur y oeste, pero no norte. En Chile la orientación que recibe el sol de mediodía es el NORTE, no el sur. La app hace ese intercambio automáticamente cuando eliges hemisferio sur, de modo que el muro norte recibe el recargo que el original asigna al sur, y el muro sur queda sin sol directo.",
      "tabla": "Tabla 6 · Efecto del sol",
      "pagina": "12-8"
    },
    "c_piso": {
      "titulo": "Condición del piso",
      "texto": "Define contra qué temperatura se calcula el diferencial del piso: la del terreno si va sobre radier en contacto con el suelo, o la exterior si la cámara está elevada y su piso queda expuesto al aire.",
      "pagina": "16-1"
    },
    "i_luzW": {
      "titulo": "Iluminación y resistencias",
      "texto": "Toda la energía eléctrica que se disipa dentro de la cámara termina íntegramente convertida en calor: luminarias, resistencias de marcos de puerta, resistencias de desescarche. La conversión es exacta, no una aproximación, y vale para cualquier potencia.",
      "formula": "Q = Watts × horas al día × 3,41 BTU/Wh",
      "pagina": "15-1"
    },
    "i_hp": {
      "titulo": "Motores eléctricos",
      "texto": "Hay una confusión frecuente que conviene tener clara: creer que un motor instalado FUERA de la cámara, moviendo un ventilador interior por un eje, no aporta calor adentro. Sí aporta. Toda la energía que se convierte en trabajo mecánico pasa al aire como velocidad, y esa velocidad se degrada por roce hasta volverse calor dentro de la cámara. Lo que cambia según dónde esté el motor son solo sus pérdidas internas, no el trabajo útil.",
      "tabla": "Tabla 16 · Equivalente calorífico de motores",
      "pagina": "15-1"
    },
    "i_mcaso": {
      "titulo": "Ubicación del motor",
      "texto": "Tres casos, con factores distintos: motor y carga dentro, que es el caso típico de los ventiladores de un evaporador de circulación forzada; pérdidas fuera y trabajo útil dentro, como una bomba de salmuera o un motor exterior moviendo un ventilador interior; y motor dentro con trabajo útil fuera. El manual advierte que estos valores son aproximaciones y que la única medida exacta es la potencia eléctrica real consumida en watts.",
      "tabla": "Tabla 16 · Equivalente calorífico de motores",
      "pagina": "15-1"
    },
    "i_pers": {
      "titulo": "Ocupación",
      "texto": "Las personas entregan calor y humedad, y el aporte crece a medida que baja la temperatura de la cámara: 840 BTU/h por persona a 40 °F, 1.300 a 0 °F. El manual advierte que en permanencias cortas la ganancia real es algo mayor que la tabulada, porque el cuerpo aún no se ha adaptado al frío.",
      "tabla": "Tabla 17 · Equivalente calorífico de ocupación",
      "pagina": "15-1"
    },
    "i_uso": {
      "titulo": "Intensidad de uso de puertas",
      "texto": "El tráfico de entrada y salida depende del tamaño de la cámara, no de cuántas puertas tenga: por eso la Tabla 8 relaciona los cambios de aire con el volumen. Es el dato más incierto de todo el cálculo, y el manual es explícito en que estos valores admiten modificación importante si el uso es claramente intenso o claramente liviano. Intenso multiplica por 2; almacenamiento prolongado, por 0,6.",
      "tabla": "Tabla 8 · Cambios de aire por 24 h",
      "pagina": "13-1"
    },
    "r_fs": {
      "titulo": "Factor de seguridad",
      "texto": "Ojo con este campo. Es habitual agregar entre 5% y 10%, pero el manual advierte que el propio criterio de dimensionar el compresor para 16 a 18 horas de operación YA constituye una reserva importante. Si el cálculo se hizo con razonable exactitud, un factor de seguridad adicional puede terminar sobredimensionando el equipo, que entonces trabaja mal en carga parcial: ciclos cortos, mal control de humedad y desgaste. Se justifica solo cuando los datos de carga son realmente inciertos.",
      "pagina": "16-1"
    },
    "r_horas": {
      "titulo": "Horas de operación del compresor",
      "texto": "La carga se calcula en base 24 horas y se divide por las horas que se espera que el compresor funcione, para obtener la capacidad horaria. Las horas las determina el sistema de desescarche: si la evaporación no baja de 30 °F no se forma escarcha y se puede ir a 18–20 horas; con desescarche por parada de compresor, 16–18 horas; en baja temperatura con desescarche activo, 18 horas.",
      "formula": "Capacidad = Carga de 24 h ÷ horas de operación",
      "pagina": "16-1"
    },
    "r_hr": {
      "titulo": "Humedad relativa objetivo",
      "texto": "La humedad dentro de la cámara se controla eligiendo el diferencial entre la temperatura de cámara y la de evaporación del refrigerante. Un TD chico mantiene humedad alta, porque el serpentín deshumidifica menos; un TD grande la baja. Para 90% se usan 8 a 12 °F, para 80% de 12 a 16 °F, y para 75% de 16 a 22 °F. Bajo 10 °F de cámara se usan 15 °F o menos.",
      "pagina": "16-2"
    },
    "prod_masa": {
      "titulo": "Masa de producto",
      "texto": "Es la masa que ingresa a la cámara en el período considerado, no el inventario total almacenado. Un producto que ya está a temperatura de régimen no aporta carga sensible, solo respiración si es vegetal. Si no sabes cuánto cabe, la Tabla 15 del Catálogo trae densidades de estiba por tipo de envase.",
      "tabla": "Tabla 15 · Envases, peso y densidad",
      "pagina": "14-12"
    },
    "prod_horas": {
      "titulo": "Horas de abatimiento",
      "texto": "El manual calcula el enfriamiento del producto en base 24 horas. Si necesitas bajarlo en menos tiempo, la potencia instantánea sube en proporción: enfriar la misma masa en 12 horas exige el doble de capacidad. La app escala esa componente por 24 dividido las horas indicadas. Déjalo en 24 si no hay una exigencia de proceso.",
      "pagina": "16-1"
    },
    "prod_emb": {
      "titulo": "Embalaje",
      "texto": "Cajas, bandejas y pallets también entran calientes y hay que enfriarlos. Se estima como porcentaje de la masa del producto, y se calcula con el calor específico del cartón, 0,324 BTU/lb·°F según la Tabla 11. La Tabla 15 permite estimarlo mejor: la diferencia entre peso bruto y peso neto del bulto es justamente la masa de embalaje.",
      "tabla": "Tabla 11 · Sólidos · Tabla 15 · Envases",
      "pagina": "14-4"
    }
  },

  "bloques": {
    "transmision": {
      "titulo": "Carga por transmisión",
      "texto": "Es el calor que atraviesa muros, techo y piso por conducción. Depende del tipo de construcción, del área expuesta, del espesor y calidad del aislante y del diferencial de temperatura. En muros aislados la resistencia de película superficial es tan pequeña frente a la del aislante que el manual la desprecia.",
      "formula": "Q = U × A × TD"
    },
    "sol": {
      "titulo": "Efecto del sol",
      "texto": "Si un muro recibe sol directo, su superficie se calienta por encima del aire ambiente y el calor que entra aumenta. En vez de modelar la radiación, el manual usa un atajo: sumar grados al diferencial de temperatura según orientación y color. Una superficie oscura en un techo plano suma 20 °F; una clara, 9 °F. Esta tabla sirve solo para refrigeración, no es válida para aire acondicionado.",
      "pagina": "12-8"
    },
    "infiltracion": {
      "titulo": "Carga por infiltración",
      "texto": "Todo aire exterior que entra debe enfriarse hasta la temperatura de cámara, y si trae más humedad, esa humedad condensa y suma calor latente. El manual es franco: por la cantidad de variables involucradas, todos los métodos de estimación están sujetos a error considerable y las aplicaciones reales pueden desviarse bastante. Es el término menos preciso del cálculo."
    },
    "producto": {
      "titulo": "Carga de producto",
      "texto": "Se compone de hasta cuatro términos. Calor sensible sobre congelación, para bajar el producto hasta su punto de congelación. Calor latente, para congelar el agua que contiene. Calor sensible bajo congelación, ya con el agua vuelta hielo, con un calor específico distinto. Y calor de respiración, que solo aplica a frutas y verduras. El manual insiste en que si conviven varios productos hay que calcular cada uno por separado."
    },
    "respiracion": {
      "titulo": "Calor de respiración",
      "texto": "Las frutas y verduras siguen vivas después de cosechadas. Sus procesos vitales continúan y en ese metabolismo liberan calor, tanto más cuanto mayor es la temperatura de almacenamiento. Las carnes y los pescados no tienen procesos vitales posteriores y no generan calor: por eso en la base de datos esos productos no traen valores de respiración."
    },
    "suplementaria": {
      "titulo": "Carga suplementaria",
      "texto": "Todo el resto de fuentes de calor dentro de la cámara: iluminación, resistencias, motores de ventiladores y personas. Suele ser la componente más chica del total, pero en cámaras pequeñas con evaporadores potentes los motores pueden pesar mucho más de lo que uno espera."
    }
  },

  "manual": [
    {
      "id": "s12",
      "seccion": "Sección 12 · Transmisión de calor",
      "temas": [
        {
          "titulo": "La ecuación básica",
          "texto": "Todo el cálculo de transmisión descansa en una sola ecuación: el calor que atraviesa una barrera es igual al coeficiente global de transferencia, por el área, por el diferencial de temperatura. Q se expresa en BTU/h, U en BTU por hora por pie cuadrado y por grado F, A en pies cuadrados y TD en grados F entre ambas caras de la barrera, por ejemplo entre la temperatura exterior de diseño y la de la cámara.",
          "formula": "Q = U × A × TD",
          "pagina": "12-1"
        },
        {
          "titulo": "Conductividad, resistividad, conductancia y resistencia",
          "texto": "Conviene no confundir los cuatro símbolos. La conductividad k es una propiedad del material por pulgada de espesor. La conductancia C es el valor global para un espesor determinado, por ejemplo un bloque de hormigón de 8 pulgadas. La resistividad r es el recíproco de k, y la resistencia R el recíproco de C. Se trabaja con resistencias porque tienen una propiedad muy cómoda: se suman aritméticamente. Por eso para obtener U primero se suman todas las resistencias de las capas y recién al final se invierte el total.",
          "formula": "R total = r₁ + r₂ + r₃ …     U = 1 / R total",
          "pagina": "12-1"
        },
        {
          "titulo": "Por qué se ignora la película superficial",
          "texto": "La transferencia por cualquier material se ve afectada por la resistencia superficial al flujo de calor, que depende de si la superficie es rugosa o lisa, de su posición vertical u horizontal, de sus propiedades reflectantes y de la velocidad del aire que la barre. Sin embargo, en trabajo de refrigeración con muros aislados la conductividad es tan baja que la película superficial tiene efecto despreciable y puede omitirse del cálculo. Esto simplifica mucho y no introduce error apreciable.",
          "pagina": "12-1"
        },
        {
          "titulo": "Ejemplo resuelto del manual",
          "texto": "Un muro compuesto por dos pulgadas de un material con conductancia 0,16 y dos pulgadas de otro con k igual a 0,80. La resistencia total es 1/0,16 más 2/0,80, o sea 6,25 más 2,5, igual a 8,75. El U resulta 1 dividido 8,75, es decir 0,114 BTU por hora, pie cuadrado y grado F. Con ese muro, 90 pies cuadrados de superficie y 80 grados de diferencial, la ganancia es 0,114 por 90 por 80, igual a 812 BTU/h.",
          "formula": "Q = 0,114 × 90 ft² × 80 °F = 812 BTU/h",
          "pagina": "12-2"
        },
        {
          "titulo": "Espesor de aislación y economía",
          "texto": "A medida que baja la temperatura de almacenamiento ocurren dos cosas simultáneas: la carga de refrigeración aumenta, y el rendimiento del compresor disminuye porque debe trabajar con temperatura de evaporación más baja. Ambas empujan en la misma dirección. Por eso, desde un punto de vista práctico y económico, el espesor de aislante debe crecer conforme baja la temperatura de la cámara. Las recomendaciones de la Tabla 7 están basadas en poliuretano expandido con k igual a 0,16; con otro aislante hay que ajustar el espesor en proporción a los factores k.",
          "pagina": "12-8"
        },
        {
          "titulo": "El atajo de la Tabla 7A",
          "texto": "Para no repetir el cálculo de U cada vez, la Tabla 7A entrega directamente la ganancia en BTU por cada grado de diferencia, por pie cuadrado y por 24 horas, según espesor de aislante. Verificamos que cada celda de esa tabla es exactamente 24 por k dividido por el espesor en pulgadas, lo que permite a esta aplicación extenderla a cualquier espesor, incluidos los paneles métricos de 50, 75, 100, 150 y 200 mm que no figuran en el original.",
          "formula": "Factor = 24 × k / espesor en pulgadas",
          "pagina": "12-9"
        }
      ]
    },
    {
      "id": "s13",
      "seccion": "Sección 13 · Infiltración de aire",
      "temas": [
        {
          "titulo": "Qué se está calculando",
          "texto": "Cualquier aire exterior que entra al espacio refrigerado debe ser llevado hasta la temperatura de almacenamiento, lo que aumenta la carga. Además, si el contenido de humedad del aire entrante es superior al del espacio refrigerado, el exceso condensa y el calor latente de condensación se suma a la carga. Son dos efectos, uno sensible y otro latente, y la Tabla 9 los entrega ya combinados en un solo valor por pie cúbico.",
          "pagina": "13-1"
        },
        {
          "titulo": "Advertencia sobre la precisión",
          "texto": "Este es el punto más débil de todo el cálculo y el manual no lo disimula. Por la cantidad de variables involucradas es difícil calcular la ganancia por infiltración. Se han desarrollado varios métodos de estimación basados principalmente en la experiencia, pero todos están sujetos a la posibilidad de error considerable, y aplicaciones específicas pueden variar ampliamente respecto del valor real. Conviene tenerlo presente antes de discutir decimales en el resto del cálculo.",
          "pagina": "13-1"
        },
        {
          "titulo": "Método de cambios de aire",
          "texto": "El tráfico de entrada y salida de una cámara suele variar con su tamaño o volumen. Por lo tanto, la cantidad de veces que se abren las puertas se relaciona con el volumen más que con el número de puertas. Sobre esa base, la Tabla 8 entrega los cambios de aire promedio por 24 horas según el volumen, separando cámaras sobre y bajo 32 °F. Es el método que usa esta aplicación.",
          "pagina": "13-1"
        },
        {
          "titulo": "Método de velocidad en la puerta",
          "texto": "Un camino alternativo. Al abrir la puerta, la diferencia de densidad entre el aire frío y el caliente crea un diferencial de presión: el aire frío sale por la parte baja del vano y el caliente entra por arriba. Las velocidades son máximas en el borde superior e inferior y nulas en el centro. La velocidad media en cada mitad de una puerta de 7 pies de alto con 60 °F de diferencial es de 100 pies por minuto, y varía con la raíz cuadrada de la altura y con la raíz cuadrada del diferencial de temperatura. Conociendo cuánto tiempo por hora permanece abierta la puerta se obtiene la infiltración media.",
          "formula": "v = 100 × √(altura/7) × √(TD/60)     caudal = v × (alto × ancho) / 2",
          "pagina": "13-1"
        },
        {
          "titulo": "Aire de ventilación",
          "texto": "Si el espacio tiene ventilación forzada por ventiladores de inyección o extracción, la carga de ventilación reemplaza a la de infiltración cuando es mayor, y el cálculo se hace sobre el volumen de aire ventilado en lugar de los cambios estimados por apertura de puertas.",
          "pagina": "13-2"
        },
        {
          "titulo": "Condiciones fuera de tabla",
          "texto": "Para condiciones no cubiertas por la Tabla 9, el manual indica determinar la carga por diferencia de entalpía entre el aire entrante y el aire de la cámara, lo que se resuelve con la carta psicrométrica. Esta aplicación interpola dentro del rango tabulado y acota la humedad relativa a los valores publicados, en lugar de extrapolar.",
          "pagina": "13-2"
        }
      ]
    },
    {
      "id": "s14",
      "seccion": "Sección 14 · Carga de producto",
      "temas": [
        {
          "titulo": "De dónde sale la carga de producto",
          "texto": "Puede provenir de tres situaciones: un producto que se coloca en la cámara a temperatura superior a la de almacenamiento, un proceso de enfriamiento o congelación, o el calor de respiración de productos perecederos. La carga total de producto es la suma de los tipos que apliquen al caso.",
          "pagina": "14-1"
        },
        {
          "titulo": "Calor sensible sobre congelación",
          "texto": "La mayoría de los productos entra más caliente que la temperatura de almacenamiento. Como muchos alimentos tienen alto contenido de agua, su reacción a la pérdida de calor es distinta por encima y por debajo del punto de congelación: arriba el agua está en forma líquida, abajo ya cambió de estado a hielo. Por eso hay dos calores específicos distintos para el mismo producto. En la Tabla 10 el punto de congelación está en la primera columna y en casi todos los casos es inferior a 32 °F.",
          "formula": "Q = W × c × (T₁ − T₂)",
          "pagina": "14-7"
        },
        {
          "titulo": "Calor latente de congelación",
          "texto": "Para congelar el producto solo hay que considerar el agua que contiene: las sustancias sin agua, como los metales, no tienen punto de congelación ni calor latente de fusión asociado. Como el calor latente de fusión del agua es 144 BTU por libra, el del producto se obtiene multiplicando 144 por el porcentaje de agua. La ternera, con 63% de agua, tiene 91 BTU por libra. Esta relación es la que usamos para verificar toda la Tabla 10 celda por celda.",
          "formula": "Q = W × hif      donde hif = 144 × fracción de agua",
          "pagina": "14-8"
        },
        {
          "titulo": "Calor sensible bajo congelación",
          "texto": "Una vez congelada el agua del producto, el enfriamiento sensible vuelve a ocurrir del mismo modo que arriba del punto de congelación, con la diferencia de que el hielo presente en el producto cambia el calor específico. En la ternera, el calor específico sobre congelación es 0,71 y bajo congelación 0,39: prácticamente la mitad.",
          "formula": "Q = W × ci × (Tf − T₃)",
          "pagina": "14-8"
        },
        {
          "titulo": "Ejemplo resuelto del manual",
          "texto": "Enfriar 1.000 libras de ternera desde 42 °F hasta 0 °F. Sensible sobre congelación: 1.000 por 0,71 por 13 grados, igual a 9.230 BTU. Latente de congelación: 1.000 por 91, igual a 91.000 BTU. Sensible bajo congelación: 1.000 por 0,39 por 29 grados, igual a 11.310 BTU. Total 111.540 BTU. Nótese que el calor latente representa por sí solo el 82% del total: congelar es muchísimo más caro que enfriar.",
          "pagina": "14-8"
        },
        {
          "titulo": "Calor de respiración",
          "texto": "Frutas y verduras siguen siendo organismos vivos después de la cosecha. Sus procesos vitales continúan por un tiempo y como resultado desprenden calor. Ciertos otros alimentos también sufren reacciones químicas continuas que producen calor. Las carnes y pescados no tienen procesos vitales posteriores y no generan calor. La cantidad desprendida depende del producto y de su temperatura de almacenamiento, y se tabula en BTU por 24 horas por tonelada.",
          "pagina": "14-1"
        },
        {
          "titulo": "Varios productos en la misma cámara",
          "texto": "Si se van a considerar varias mercaderías distintas, o cajones y canastos, debe hacerse un cálculo separado para cada ítem si se quiere una estimación precisa de la carga de producto. Esta aplicación implementa exactamente eso: cada fila de la tabla de productos se calcula por separado con sus propias propiedades y se suma al final.",
          "pagina": "14-8"
        }
      ]
    },
    {
      "id": "s15",
      "seccion": "Sección 15 · Carga suplementaria",
      "temas": [
        {
          "titulo": "Alcance",
          "texto": "Además del calor transmitido por muros, la infiltración de aire y la carga de producto, cualquier ganancia proveniente de otras fuentes debe incluirse en la estimación total. En la práctica: iluminación, resistencias, motores y personas.",
          "pagina": "15-1"
        },
        {
          "titulo": "Luces y resistencias",
          "texto": "Cualquier energía eléctrica disipada directamente en el espacio refrigerado se convierte en calor y debe incluirse. Un watt hora equivale a 3,41 BTU, y esta relación de conversión es exacta para cualquier cantidad de potencia eléctrica. No hay rendimiento ni pérdidas que descontar: entra un watt, sale un watt de calor.",
          "formula": "Q = W × horas × 3,41",
          "pagina": "15-1"
        },
        {
          "titulo": "Motores: el error conceptual más común",
          "texto": "Como la energía no puede destruirse y solo puede cambiar de forma, cualquier energía eléctrica entregada a motores dentro del espacio refrigerado debe transformarse. Las pérdidas por roce e ineficiencia se convierten inmediatamente en calor. La porción convertida en trabajo útil, por ejemplo al mover un ventilador, existe brevemente como energía mecánica, se transfiere al fluido como aumento de velocidad, y a medida que el fluido pierde velocidad por roce termina íntegramente convertida en calor. De ahí que un motor montado fuera de la cámara que acciona un ventilador interior por eje sí aporte carga: lo que queda afuera son solo sus pérdidas internas.",
          "pagina": "15-1"
        },
        {
          "titulo": "Precisión de la Tabla 16",
          "texto": "Como el rendimiento del motor varía con su tamaño, la carga por caballo de fuerza cambia según la potencia: 4.250 BTU/hp·h para motores de 1/8 a 1/2 HP, 3.700 de 1/2 a 3 HP y 2.950 de 3 a 20 HP. El manual aclara que si bien estos valores son aproximaciones útiles, la única medida exacta del aporte energético es la potencia eléctrica real de entrada medida en watts. Si tienes el dato de placa real, úsalo.",
          "pagina": "15-1"
        },
        {
          "titulo": "Ocupación",
          "texto": "Las personas entregan calor y humedad, y la carga resultante varía según la duración de la permanencia, la temperatura, el tipo de trabajo y otros factores. La Tabla 17 entrega el promedio, pero en estadías de corta duración la ganancia de calor será algo mayor que la tabulada.",
          "pagina": "15-1"
        }
      ]
    },
    {
      "id": "s16",
      "seccion": "Sección 16 · Selección de equipo",
      "temas": [
        {
          "titulo": "De carga de 24 horas a capacidad horaria",
          "texto": "El equipo de refrigeración está diseñado para funcionar de manera continua, y normalmente el tiempo de operación del compresor lo determinan los requerimientos del sistema de desescarche. La carga se calcula en base 24 horas y la capacidad horaria requerida se obtiene dividiendo esa carga por las horas de operación deseadas dentro del período de 24 horas. Debe dejarse una reserva razonable para que la unidad recupere rápido tras una subida de temperatura y para absorber una carga mayor que la estimada.",
          "formula": "Capacidad horaria = Carga 24 h ÷ horas de operación",
          "pagina": "16-1"
        },
        {
          "titulo": "Cuántas horas elegir",
          "texto": "Depende del desescarche. Si la temperatura de evaporación no baja de 30 °F no se acumula escarcha y no hace falta período de desescarche: es práctica general elegir el compresor sobre la base de 18 a 20 horas. Para temperaturas de almacenamiento de 35 °F o más con temperaturas de refrigerante suficientemente bajas como para escarchar, se acostumbra desescarchar deteniendo el compresor y dejando que el aire de retorno derrita el hielo del serpentín: en esos casos se selecciona para 16 a 18 horas. En aplicaciones de baja temperatura debe proveerse un medio positivo de desescarche y con períodos normales suelen aceptarse 18 horas.",
          "pagina": "16-1"
        },
        {
          "titulo": "El factor de seguridad puede jugar en contra",
          "texto": "Es frecuente agregar un 5% a 10% como medida conservadora para asegurar que el equipo no quede subdimensionado, y esto puede ser deseable si los datos de carga son muy inciertos. Pero en general, el hecho mismo de dimensionar el compresor sobre la base de 16 a 18 horas de operación ya constituye por sí solo una reserva considerable. Si los cálculos se hicieron con razonable exactitud y el equipo se dimensionó correctamente, un factor de seguridad adicional puede terminar sobredimensionando el equipo en condiciones de carga liviana, y eso genera dificultades de operación.",
          "pagina": "16-1"
        },
        {
          "titulo": "Humedad relativa y TD del evaporador",
          "texto": "La humedad dentro de la cámara depende de muchas variables: tiempo de marcha del sistema, infiltración de humedad, condición y superficie de producto expuesta, movimiento del aire, condiciones exteriores y tipo de control. En la práctica, un control satisfactorio se logra seleccionando compresor y evaporador para el diferencial de temperatura adecuado entre la temperatura ambiente deseada en la cámara y la temperatura de evaporación del refrigerante. Para 90% de humedad, TD de 8 a 12 °F; para 85%, de 10 a 14; para 80%, de 12 a 16; para 75%, de 16 a 22. Bajo 10 °F de cámara, 15 °F o menos.",
          "pagina": "16-2"
        },
        {
          "titulo": "Selección del compresor",
          "texto": "Para seleccionar un compresor hay que conocer no solo la capacidad requerida, sino también las temperaturas de evaporación y condensación deseadas. Suponiendo 80% de humedad objetivo, con un TD de 14 °F en una cámara de 40 °F resulta una temperatura de evaporación de 26 °F. Para dejar reserva por pérdidas de línea, el compresor debe seleccionarse para la capacidad deseada entre 2 y 3 °F por debajo de la temperatura de evaporación buscada.",
          "pagina": "16-2"
        },
        {
          "titulo": "Temperatura de condensación",
          "texto": "Depende del medio condensante, aire o agua, de la temperatura ambiente o del agua de diseño, y de la capacidad del condensador elegido. Los condensadores por aire se seleccionan comúnmente para diferenciales de 10 a 30 °F, usando los TD bajos en aplicaciones de baja temperatura, donde la relación de compresión es más crítica, y los TD altos en aplicaciones de alta temperatura. Con un TD de diseño de 20 °F y ambiente de 100 °F, la condensación resulta a 120 °F.",
          "pagina": "16-3"
        },
        {
          "titulo": "Balance de componentes",
          "texto": "Los componentes disponibles comercialmente rara vez coinciden exactamente con los requerimientos de diseño, y como el diseño se basa en cargas pico estimadas, el sistema muchas veces deberá operar en condiciones distintas de las de diseño. Las capacidades del compresor, el condensador y el evaporador son variables pero están interrelacionadas: el sistema se estabiliza en un punto de balance. El manual resuelve esto gráficamente, superponiendo las curvas de los tres componentes. Un resultado interesante de ese análisis: al reducir la capacidad del compresor en un 16,7%, la capacidad neta del sistema cayó solo alrededor de 10%, porque con condensador y evaporador sin cambios el compresor pasa a trabajar en condiciones más eficientes, con menor presión de condensación y mayor presión de aspiración.",
          "pagina": "16-3 y 16-9"
        },
        {
          "titulo": "Sobre las tablas de selección rápida",
          "texto": "El manual incluye las Tablas 18 y 19 con capacidades recomendadas de unidad condensadora para cámaras walk-in. Están en la base de datos por completitud, pero conviene tomarlas solo como contraste de orden de magnitud: corresponden a equipos de 1968, suponen aislación con factor k de 0,25 y el propio manual advierte que las tablas de baja temperatura no incluyen ninguna reserva para carga de congelación. Para selección real, usa el software del fabricante.",
          "pagina": "16-11"
        }
      ]
    }
  ]
};
CF["envolvente"] = {
  "fuente": "Emerson Climate Technologies, Refrigeration Manual Part 3, Form AE-103 R3, paginas 12-8 y 12-9",
  "version": 1,
  "fecha_actualizacion": "2026-07-25",

  "tabla6_efecto_sol": {
    "titulo": "Allowance for Sun Effect",
    "descripcion": "Grados Fahrenheit a sumar al diferencial de temperatura normal para compensar el efecto del sol. Solo para carga de refrigeracion; no usar en diseno de aire acondicionado.",
    "fuente_original": "1981 ASHRAE Handbook of Fundamentals",
    "nota_hemisferio": "La tabla original es para el hemisferio norte y por eso no lista muro norte. En el hemisferio sur la orientacion equivalente al 'South wall' del original es el muro NORTE, y el muro sur es el que no recibe sol directo. La aplicacion debe hacer este intercambio cuando el proyecto este en el hemisferio sur.",
    "columnas": ["tipo_superficie", "muro_este", "muro_sur_hemisferio_norte", "muro_oeste", "techo_plano"],
    "filas": [
      ["Superficies oscuras: pizarra, techo asfaltico, pinturas negras", 8, 5, 8, 20],
      ["Superficies de color medio: madera sin pintar, ladrillo, teja roja, cemento oscuro, pintura roja gris o verde", 6, 4, 6, 15],
      ["Superficies claras: piedra blanca, cemento claro, pintura blanca", 4, 2, 4, 9]
    ]
  },

  "tabla7_espesor_minimo": {
    "titulo": "Recommended Minimum Insulation Thickness",
    "base": "Poliuretano expandido con k = 0.16. Para otros aislantes ajustar el espesor segun la razon de factores k.",
    "fuente_original": "1981 ASHRAE Handbook of Fundamentals",
    "columnas": ["temp_camara_F_min", "temp_camara_F_max", "espesor_pulg_clima_frio", "espesor_pulg_clima_calido"],
    "nota_columnas": "El original rotula las columnas como Northern U.S. y Southern U.S., es decir clima frio y clima calido respectivamente.",
    "filas": [
      [50, 60, 1, 2],
      [40, 50, 2, 2],
      [25, 40, 2, 3],
      [15, 25, 3, 3],
      [0, 15, 3, 4],
      [-15, 0, 4, 4],
      [-40, -15, 5, 5]
    ]
  },

  "tabla7A_factores_rapidos": {
    "titulo": "Quick Estimate Factors for Heat Transmission Through Insulated Walls",
    "unidad": "BTU por 1 F de TD por pie cuadrado por 24 horas",
    "nota": "El espesor es el del aislante puro, no el espesor total del muro.",
    "formula_verificada": "factor = 24 * k / espesor_en_pulgadas. Comprobado contra todas las celdas publicadas, por lo que la aplicacion puede interpolar cualquier espesor, incluidos paneles metricos de 50, 75, 100, 150 y 200 mm.",
    "espesores_pulg": [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    "series": [
      {
        "aislante": "Poliuretano expandido / poliestireno expandido",
        "k": 0.16,
        "factores": [1.92, 1.28, 0.96, 0.77, 0.64, 0.55, 0.48, 0.43, 0.38, 0.35, 0.32]
      },
      {
        "aislante": "Lana de vidrio / lana mineral en relleno y en placa",
        "k": 0.32,
        "factores": [3.8, 2.6, 1.9, 1.5, 1.3, 1.1, 0.96, 0.86, 0.76, 0.70, 0.64]
      }
    ]
  },

  "paneles_comerciales_metricos": {
    "nota": "Espesores comerciales habituales de panel aislante, con el factor derivado de la formula verificada 24*k/espesor. Incluidos para la seleccion directa en la aplicacion.",
    "columnas": ["espesor_mm", "espesor_pulg", "factor_k016_btu_24h_ft2_F", "factor_k032_btu_24h_ft2_F"],
    "filas": [
      [50, 1.969, 1.951, 3.901],
      [75, 2.953, 1.301, 2.601],
      [100, 3.937, 0.976, 1.951],
      [120, 4.724, 0.813, 1.626],
      [150, 5.906, 0.650, 1.301],
      [200, 7.874, 0.488, 0.976]
    ]
  }
};
CF["geo"] = {
  "tabla": "Ubicacion geografica, clima estimado por formula y factores por pais",
  "fuente": "Coordenadas, latitud y altitud: datos geograficos de dominio publico. Precio de electricidad y factor de emision de la red: valores de referencia orientativos, editables en la app. No son datos oficiales ni tarifas vigentes.",
  "version": 1,
  "fecha_actualizacion": "2026-07-25",
  "uso_en_calculo": [
    "La altitud da la presion barometrica y con ella la densidad del aire. La carga de infiltracion es proporcional a la densidad, asi que se corrige por el factor P(h)/P(0). A 2.500 m la infiltracion cae cerca de 26 por ciento.",
    "La latitud y la altitud dan una temperatura exterior de diseno estimada, que se ofrece como sugerencia. La temperatura que se usa en el calculo es siempre la que ingresa el usuario.",
    "El signo de la latitud define el hemisferio y con ello los meses de verano.",
    "Costa o continente define la humedad relativa y la amplitud termica tipicas."
  ],
  "gradiente_vertical_C_por_km": 4.5,
  "nota_gradiente": "El gradiente de la atmósfera libre es 6,5 °C/km, pero aplicado a temperaturas máximas de superficie sobrestima el enfriamiento: las mesetas altas se calientan mucho más que el aire libre a la misma cota. Para máximas de diseño el gradiente efectivo está entre 4 y 4,5 °C/km. Con 6,5 °C/km Quito daría 15 °C de diseño cuando la real ronda 25 °C. El valor es editable en la app.",
  "curva_latitud_C": [[0, 34], [10, 36], [20, 39], [30, 38], [40, 34], [50, 29], [60, 25], [70, 21], [80, 16]],
  "nota_curva": "Temperatura exterior de diseño de verano a nivel del mar, en el interior del continente, en función de la latitud absoluta. El máximo cerca de los 20 grados corresponde a la faja de desiertos subtropicales. Correlación aproximada: verificar siempre contra datos de estación meteorológica antes de un diseño definitivo.",
  "nota_costa": "Costa o continente solo define la humedad relativa y la amplitud térmica típicas. No corrige la temperatura de diseño: esa sale de la latitud y de la altura del sitio.",
  "humedad_relativa_pct": { "costa": 80, "continente": 45 },
  "amplitud_termica_C": { "costa": 8, "continente": 18 },
  "columnas_ciudades": ["pais", "ciudad", "lat", "lon", "alt_m", "tipo"],
  "ciudades": [
    ["Ecuador", "Quito", -0.22, -78.51, 2850, "continente"],
    ["Ecuador", "Guayaquil", -2.19, -79.89, 6, "costa"],
    ["Ecuador", "Cuenca", -2.90, -79.01, 2550, "continente"],
    ["Ecuador", "Santo Domingo", -0.25, -79.17, 550, "continente"],
    ["Ecuador", "Machala", -3.26, -79.96, 6, "costa"],
    ["Ecuador", "Manta", -0.95, -80.73, 6, "costa"],
    ["Ecuador", "Portoviejo", -1.06, -80.45, 44, "costa"],
    ["Ecuador", "Ambato", -1.24, -78.62, 2577, "continente"],
    ["Ecuador", "Riobamba", -1.67, -78.65, 2754, "continente"],
    ["Ecuador", "Loja", -3.99, -79.20, 2060, "continente"],
    ["Ecuador", "Ibarra", 0.35, -78.12, 2225, "continente"],
    ["Ecuador", "Esmeraldas", 0.97, -79.65, 8, "costa"],
    ["Ecuador", "Quevedo", -1.03, -79.46, 74, "continente"],
    ["Ecuador", "Milagro", -2.13, -79.59, 13, "continente"],
    ["Ecuador", "Babahoyo", -1.80, -79.53, 8, "continente"],
    ["Ecuador", "Latacunga", -0.93, -78.62, 2750, "continente"],
    ["Ecuador", "Tulcán", 0.81, -77.72, 2950, "continente"],
    ["Ecuador", "Azogues", -2.74, -78.85, 2518, "continente"],
    ["Ecuador", "Guaranda", -1.59, -79.00, 2668, "continente"],
    ["Ecuador", "Tena", -0.99, -77.81, 510, "continente"],
    ["Ecuador", "Puyo", -1.49, -77.99, 950, "continente"],
    ["Ecuador", "Macas", -2.31, -78.12, 1050, "continente"],
    ["Ecuador", "Nueva Loja", 0.09, -76.89, 300, "continente"],
    ["Ecuador", "Puerto Francisco de Orellana", -0.46, -76.99, 254, "continente"],
    ["Ecuador", "Zamora", -4.07, -78.95, 970, "continente"],
    ["Ecuador", "Salinas", -2.21, -80.97, 4, "costa"],
    ["Ecuador", "Bahía de Caráquez", -0.60, -80.42, 5, "costa"],
    ["Ecuador", "Durán", -2.17, -79.83, 5, "costa"],
    ["Ecuador", "Puerto Ayora", -0.74, -90.31, 6, "costa"],
    ["Chile", "Santiago", -33.45, -70.67, 520, "continente"],
    ["Chile", "Valparaíso", -33.05, -71.62, 10, "costa"],
    ["Chile", "Viña del Mar", -33.02, -71.55, 10, "costa"],
    ["Chile", "San Antonio", -33.59, -71.61, 10, "costa"],
    ["Chile", "Los Andes", -32.83, -70.60, 816, "continente"],
    ["Chile", "Rancagua", -34.17, -70.74, 500, "continente"],
    ["Chile", "Curicó", -34.98, -71.24, 200, "continente"],
    ["Chile", "Talca", -35.43, -71.67, 102, "continente"],
    ["Chile", "Chillán", -36.61, -72.10, 124, "continente"],
    ["Chile", "Concepción", -36.83, -73.05, 12, "costa"],
    ["Chile", "Los Ángeles", -37.47, -72.35, 140, "continente"],
    ["Chile", "Temuco", -38.74, -72.59, 114, "continente"],
    ["Chile", "Valdivia", -39.81, -73.25, 14, "costa"],
    ["Chile", "Osorno", -40.57, -73.13, 30, "continente"],
    ["Chile", "Puerto Montt", -41.47, -72.94, 5, "costa"],
    ["Chile", "Castro", -42.48, -73.76, 20, "costa"],
    ["Chile", "Coyhaique", -45.57, -72.07, 310, "continente"],
    ["Chile", "Punta Arenas", -53.16, -70.91, 37, "costa"],
    ["Chile", "La Serena", -29.90, -71.25, 30, "costa"],
    ["Chile", "Coquimbo", -29.95, -71.34, 10, "costa"],
    ["Chile", "Ovalle", -30.60, -71.20, 220, "continente"],
    ["Chile", "Copiapó", -27.37, -70.33, 391, "continente"],
    ["Chile", "Antofagasta", -23.65, -70.40, 40, "costa"],
    ["Chile", "Calama", -22.46, -68.93, 2260, "continente"],
    ["Chile", "Iquique", -20.21, -70.15, 10, "costa"],
    ["Chile", "Arica", -18.48, -70.31, 29, "costa"],
    ["Perú", "Lima", -12.05, -77.04, 154, "costa"],
    ["Perú", "Arequipa", -16.41, -71.54, 2335, "continente"],
    ["Perú", "Trujillo", -8.11, -79.03, 34, "costa"],
    ["Perú", "Chiclayo", -6.77, -79.84, 29, "costa"],
    ["Perú", "Piura", -5.19, -80.63, 29, "costa"],
    ["Perú", "Cusco", -13.53, -71.97, 3399, "continente"],
    ["Perú", "Iquitos", -3.75, -73.25, 106, "continente"],
    ["Perú", "Huancayo", -12.07, -75.21, 3271, "continente"],
    ["Perú", "Tacna", -18.01, -70.25, 562, "costa"],
    ["Perú", "Puno", -15.84, -70.03, 3827, "continente"],
    ["Colombia", "Bogotá", 4.71, -74.07, 2640, "continente"],
    ["Colombia", "Medellín", 6.24, -75.58, 1495, "continente"],
    ["Colombia", "Cali", 3.44, -76.52, 1018, "continente"],
    ["Colombia", "Barranquilla", 10.97, -74.80, 18, "costa"],
    ["Colombia", "Cartagena", 10.39, -75.51, 2, "costa"],
    ["Colombia", "Santa Marta", 11.24, -74.20, 2, "costa"],
    ["Colombia", "Bucaramanga", 7.12, -73.13, 959, "continente"],
    ["Colombia", "Pereira", 4.81, -75.69, 1411, "continente"],
    ["Colombia", "Manizales", 5.07, -75.52, 2160, "continente"],
    ["Colombia", "Cúcuta", 7.89, -72.50, 320, "continente"],
    ["Bolivia", "La Paz", -16.50, -68.15, 3640, "continente"],
    ["Bolivia", "El Alto", -16.51, -68.16, 4150, "continente"],
    ["Bolivia", "Santa Cruz de la Sierra", -17.78, -63.18, 416, "continente"],
    ["Bolivia", "Cochabamba", -17.39, -66.16, 2558, "continente"],
    ["Bolivia", "Sucre", -19.03, -65.26, 2810, "continente"],
    ["Bolivia", "Oruro", -17.98, -67.11, 3706, "continente"],
    ["Bolivia", "Potosí", -19.58, -65.75, 4067, "continente"],
    ["Bolivia", "Tarija", -21.53, -64.73, 1854, "continente"],
    ["Argentina", "Buenos Aires", -34.60, -58.38, 25, "costa"],
    ["Argentina", "Córdoba", -31.42, -64.19, 390, "continente"],
    ["Argentina", "Rosario", -32.95, -60.64, 25, "continente"],
    ["Argentina", "Mendoza", -32.89, -68.84, 746, "continente"],
    ["Argentina", "Salta", -24.79, -65.41, 1152, "continente"],
    ["Argentina", "San Miguel de Tucumán", -26.82, -65.22, 431, "continente"],
    ["Argentina", "Mar del Plata", -38.00, -57.56, 21, "costa"],
    ["Argentina", "Neuquén", -38.95, -68.06, 265, "continente"],
    ["Argentina", "San Carlos de Bariloche", -41.13, -71.31, 893, "continente"],
    ["Argentina", "Ushuaia", -54.80, -68.30, 23, "costa"],
    ["Brasil", "São Paulo", -23.55, -46.63, 760, "continente"],
    ["Brasil", "Rio de Janeiro", -22.91, -43.17, 2, "costa"],
    ["Brasil", "Brasília", -15.79, -47.88, 1172, "continente"],
    ["Brasil", "Belo Horizonte", -19.92, -43.94, 852, "continente"],
    ["Brasil", "Porto Alegre", -30.03, -51.23, 10, "costa"],
    ["Brasil", "Curitiba", -25.43, -49.27, 935, "continente"],
    ["Brasil", "Manaus", -3.12, -60.02, 92, "continente"],
    ["Brasil", "Recife", -8.05, -34.88, 4, "costa"],
    ["Brasil", "Fortaleza", -3.73, -38.53, 21, "costa"],
    ["Brasil", "Salvador", -12.97, -38.50, 8, "costa"],
    ["México", "Ciudad de Mexico", 19.43, -99.13, 2240, "continente"],
    ["México", "Guadalajara", 20.67, -103.35, 1566, "continente"],
    ["México", "Monterrey", 25.69, -100.32, 540, "continente"],
    ["México", "Puebla", 19.04, -98.20, 2135, "continente"],
    ["México", "Mérida", 20.97, -89.62, 10, "continente"],
    ["México", "Cancún", 21.16, -86.85, 10, "costa"],
    ["México", "Veracruz", 19.17, -96.13, 10, "costa"],
    ["México", "Tijuana", 32.51, -117.04, 20, "costa"],
    ["Venezuela", "Caracas", 10.48, -66.90, 900, "continente"],
    ["Venezuela", "Maracaibo", 10.65, -71.64, 6, "costa"],
    ["Venezuela", "Valencia", 10.16, -68.01, 480, "continente"],
    ["Uruguay", "Montevideo", -34.90, -56.16, 43, "costa"],
    ["Uruguay", "Salto", -31.39, -57.96, 35, "continente"],
    ["Paraguay", "Asunción", -25.28, -57.63, 43, "continente"],
    ["Paraguay", "Ciudad del Este", -25.51, -54.61, 220, "continente"],
    ["Panamá", "Ciudad de Panama", 8.98, -79.52, 2, "costa"],
    ["Costa Rica", "San José", 9.93, -84.08, 1172, "continente"],
    ["Costa Rica", "Limón", 9.99, -83.03, 3, "costa"],
    ["Guatemala", "Ciudad de Guatemala", 14.63, -90.51, 1500, "continente"],
    ["El Salvador", "San Salvador", 13.69, -89.19, 658, "continente"],
    ["Honduras", "Tegucigalpa", 14.07, -87.19, 990, "continente"],
    ["Honduras", "San Pedro Sula", 15.50, -88.03, 83, "continente"],
    ["Nicaragua", "Managua", 12.11, -86.24, 50, "continente"],
    ["Cuba", "La Habana", 23.11, -82.37, 59, "costa"],
    ["República Dominicana", "Santo Domingo", 18.49, -69.93, 14, "costa"],
    ["Puerto Rico", "San Juan", 18.47, -66.11, 8, "costa"],
    ["Estados Unidos", "Miami", 25.76, -80.19, 2, "costa"],
    ["Estados Unidos", "Los Ángeles", 34.05, -118.24, 71, "costa"],
    ["Estados Unidos", "Houston", 29.76, -95.37, 12, "costa"],
    ["Estados Unidos", "Nueva York", 40.71, -74.01, 10, "costa"],
    ["Estados Unidos", "Chicago", 41.88, -87.63, 181, "continente"],
    ["Estados Unidos", "Phoenix", 33.45, -112.07, 331, "continente"],
    ["Estados Unidos", "Denver", 39.74, -104.99, 1609, "continente"],
    ["Canadá", "Toronto", 43.65, -79.38, 76, "continente"],
    ["Canadá", "Vancouver", 49.28, -123.12, 4, "costa"],
    ["España", "Madrid", 40.42, -3.70, 667, "continente"],
    ["España", "Barcelona", 41.39, 2.17, 12, "costa"],
    ["España", "Valencia", 39.47, -0.38, 15, "costa"],
    ["España", "Sevilla", 37.39, -5.98, 7, "continente"],
    ["España", "Murcia", 37.99, -1.13, 43, "continente"],
    ["Portugal", "Lisboa", 38.72, -9.14, 2, "costa"],
    ["Francia", "París", 48.86, 2.35, 35, "continente"],
    ["Reino Unido", "Londres", 51.51, -0.13, 11, "continente"],
    ["Alemania", "Berlín", 52.52, 13.40, 34, "continente"],
    ["Italia", "Roma", 41.90, 12.50, 21, "continente"],
    ["Italia", "Milán", 45.46, 9.19, 120, "continente"],
    ["Países Bajos", "Ámsterdam", 52.37, 4.90, -2, "costa"],
    ["Emiratos Árabes Unidos", "Dubái", 25.20, 55.27, 5, "costa"],
    ["Singapur", "Singapur", 1.35, 103.82, 15, "costa"],
    ["Japón", "Tokio", 35.68, 139.69, 40, "costa"],
    ["China", "Shanghái", 31.23, 121.47, 4, "costa"],
    ["China", "Pekín", 39.90, 116.41, 44, "continente"],
    ["India", "Bombay", 19.08, 72.88, 14, "costa"],
    ["India", "Nueva Delhi", 28.61, 77.21, 216, "continente"],
    ["Tailandia", "Bangkok", 13.76, 100.50, 2, "costa"],
    ["Australia", "Sídney", -33.87, 151.21, 3, "costa"],
    ["Nueva Zelanda", "Auckland", -36.85, 174.76, 26, "costa"],
    ["Egipto", "El Cairo", 30.04, 31.24, 23, "continente"],
    ["Sudáfrica", "Johannesburgo", -26.20, 28.05, 1753, "continente"],
    ["Kenia", "Nairobi", -1.29, 36.82, 1795, "continente"],
    ["Nigeria", "Lagos", 6.52, 3.38, 39, "costa"],
    ["Marruecos", "Casablanca", 33.57, -7.59, 50, "costa"]
  ],
  "columnas_paises": ["costo_kwh_usd", "co2_kg_kwh"],
  "paises": {
    "Ecuador": [0.095, 0.16],
    "Chile": [0.15, 0.35],
    "Perú": [0.11, 0.25],
    "Colombia": [0.14, 0.16],
    "Bolivia": [0.08, 0.50],
    "Argentina": [0.09, 0.35],
    "Brasil": [0.14, 0.10],
    "México": [0.12, 0.42],
    "Venezuela": [0.05, 0.25],
    "Uruguay": [0.18, 0.06],
    "Paraguay": [0.06, 0.02],
    "Panamá": [0.17, 0.20],
    "Costa Rica": [0.14, 0.04],
    "Guatemala": [0.16, 0.30],
    "El Salvador": [0.17, 0.25],
    "Honduras": [0.15, 0.32],
    "Nicaragua": [0.18, 0.35],
    "Cuba": [0.10, 0.65],
    "República Dominicana": [0.16, 0.55],
    "Puerto Rico": [0.22, 0.60],
    "Estados Unidos": [0.09, 0.37],
    "Canadá": [0.08, 0.12],
    "España": [0.16, 0.15],
    "Portugal": [0.15, 0.16],
    "Francia": [0.15, 0.06],
    "Reino Unido": [0.20, 0.21],
    "Alemania": [0.20, 0.36],
    "Italia": [0.19, 0.31],
    "Países Bajos": [0.18, 0.32],
    "Emiratos Árabes Unidos": [0.08, 0.40],
    "Singapur": [0.16, 0.41],
    "Japón": [0.16, 0.45],
    "China": [0.09, 0.55],
    "India": [0.09, 0.71],
    "Tailandia": [0.11, 0.51],
    "Australia": [0.14, 0.55],
    "Nueva Zelanda": [0.12, 0.10],
    "Egipto": [0.05, 0.46],
    "Sudáfrica": [0.09, 0.91],
    "Kenia": [0.15, 0.10],
    "Nigeria": [0.10, 0.44],
    "Marruecos": [0.12, 0.61]
  },
  "pais_por_defecto": [0.12, 0.45],
  "costo_panel_usd_m2": {
    "base": 18.0,
    "por_mm": 0.22,
    "nota": "Costo instalado aproximado del panel: base + por_mm x espesor. 100 mm da 40 USD/m2. Editable en la app; ajustar al precio real de Ecuclima."
  }
};
CF["grupos"] = {
  "tabla": "Clasificacion de productos por grupo de manejo",
  "fuente": "Elaboracion propia de Ecuclima. Reagrupa el catalogo segun como se maneja el producto en frio, no segun botanica: lo que importa es que respire, que se congele, que se estibe parecido y que comparta temperatura de camara.",
  "version": 1,
  "fecha_actualizacion": "2026-07-25",
  "uso_en_calculo": [
    "No interviene en el calculo. Solo ordena el catalogo para poder encontrar un producto entre ciento y tantos.",
    "Cada producto cae en el grupo que diga esta lista; si no esta listado, hereda el grupo por defecto de su archivo de origen."
  ],
  "orden": [
    "Frutas",
    "Hortalizas y verduras",
    "Tuberculos y raices",
    "Carnicos",
    "Pescados y mariscos",
    "Lacteos y huevos",
    "Panaderia, granos y abarrotes",
    "No alimentarios"
  ],
  "por_defecto": {
    "frutas": "Frutas",
    "vegetales": "Hortalizas y verduras",
    "carnes_y_pescados": "Carnicos",
    "misceláneos": "Panaderia, granos y abarrotes"
  },
  "nota_por_defecto": "El grupo por defecto se aplica solo a los productos que no aparecen en las listas de abajo.",
  "asignaciones": {
    "Tuberculos y raices": [
      "Camote / batata", "Papas blancas", "Betarragas", "Zanahorias", "Nabos", "Rabanos",
      "Rabano picante", "Chirivias", "Colinabo", "Cebollas", "Yuca", "Malanga"
    ],
    "Pescados y mariscos": [
      "Bacalao fresco", "Camarones", "Ostiones", "Ostras a granel", "Ostras con concha",
      "Pescado congelado", "Pescado en hielo", "Pescado seco", "Caviar a granel", "Tilapia"
    ],
    "Hortalizas y verduras": [
      "Palmito"
    ],
    "Lacteos y huevos": [
      "Crema 40%", "Helado", "Leche", "Mantequilla", "Margarina", "Queso americano",
      "Queso Camembert", "Queso Limburger", "Queso Roquefort", "Queso suizo",
      "Huevos congelados", "Huevos en bandeja"
    ],
    "Panaderia, granos y abarrotes": [
      "Harina", "Levadura", "Masa de pan", "Pan", "Azucar de arce", "Jarabe de arce",
      "Miel", "Confites", "Cobertura de chocolate", "Frutos secos", "Cerveza", "Malta",
      "Lupulo", "Manteca de cerdo", "Maiz seco", "Porotos secos", "Arvejas secas", "Chucrut",
      "Cacao en grano seco", "Cafe verde en grano", "Quinua", "Panela"
    ],
    "No alimentarios": [
      "Flores cortadas", "Pieles y lanas", "Tabaco y puros"
    ]
  }
};
CF["internas"] = {
  "fuente": "Emerson Climate Technologies, Refrigeration Manual Part 3, Form AE-103 R3, pagina 15-1. From 1967 ASHRAE Handbook of Fundamentals.",
  "version": 1,
  "fecha_actualizacion": "2026-07-25",

  "iluminacion_y_resistencias": {
    "factor": 3.41,
    "unidad": "BTU/hr por watt",
    "nota": "Toda energia electrica disipada dentro de la camara se convierte integramente en calor. El factor es exacto para cualquier potencia."
  },

  "tabla16_motores": {
    "titulo": "Heat Equivalent of Electric Motors",
    "unidad": "BTU por (hp)(hr)",
    "casos": {
      "motor_y_carga_dentro": "Trabajo util y perdidas del motor se disipan dentro de la camara. Caso tipico de motores de ventilador de evaporadores de circulacion forzada.",
      "perdidas_fuera": "Perdidas del motor se disipan fuera y el trabajo util se ejerce dentro. Caso de bomba de salmuera o de agua helada, o motor fuera de la camara accionando un ventilador interior.",
      "carga_fuera": "Perdidas del motor se disipan dentro y el trabajo util se ejerce fuera. Motor dentro de la camara accionando una bomba o ventilador ubicado fuera."
    },
    "columnas": ["hp_min", "hp_max", "motor_y_carga_dentro", "perdidas_fuera", "carga_fuera"],
    "filas": [
      [0.125, 0.5, 4250, 2545, 1700],
      [0.5, 3, 3700, 2545, 1150],
      [3, 20, 2950, 2545, 400]
    ],
    "nota": "El manual advierte que estos valores son aproximaciones utiles, y que la unica medida exacta del aporte energetico es la potencia electrica real en watts."
  },

  "tabla17_ocupacion": {
    "titulo": "Heat Equivalent of Occupancy",
    "unidad": "BTU/hr por persona",
    "nota": "Para permanencias de corta duracion la ganancia de calor es algo mayor que la tabulada.",
    "columnas": ["temp_camara_F", "btu_hr_persona"],
    "filas": [
      [50, 720],
      [40, 840],
      [30, 950],
      [20, 1050],
      [10, 1200],
      [0, 1300],
      [-10, 1400]
    ]
  }
};
CF["marca"] = {
    "marca":  "Ecuclima",
    "fuente":  "ecuclima.com (redirige a pedidosecuclima.com), consultado el 25-07-2026",
    "version":  1,
    "fecha_actualizacion":  "2026-07-25",
    "empresa":  {
                    "nombre":  "ECUCLIMA",
                    "descriptor":  "Refrigeración Industrial Ecuador",
                    "eslogan":  "El tiempo es producción. Y nosotros sabemos cuánto vale.",
                    "sitio":  "ecuclima.com"
                },
    "contacto":  {
                     "telefono":  "+593 98 042 0996",
                     "email":  "info@ecuclima.com",
                     "responsable":  "Marco Rojas",
                     "direccion":  "Conocoto, Quito",
                     "pais":  "Ecuador"
                 },
    "colores":  {
                    "primario":  "#004080",
                    "primario_oscuro":  "#001F3F",
                    "secundario":  "#FF8000",
                    "secundario_oscuro":  "#CC6600",
                    "primario_claro":  "#E6F2FF"
                },
    "pie":  "Cálculo referencial preparado por ECUCLIMA — Refrigeración Industrial. Método Emerson AE-103 / ASHRAE. Para diseño definitivo contrastar con las ediciones vigentes de ASHRAE y los catálogos de los fabricantes.",
    "servicios":  [
                      "Construcción de cuartos fríos",
                      "Venta de equipos de refrigeración industrial",
                      "Mantenimiento preventivo y correctivo",
                      "Repuestos y accesorios",
                      "Servicio técnico 24/7",
                      "Importación y asesoría"
                  ],
    "logo_png_base64":  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAO4AAAEbCAMAAADqGEgOAAAC8VBMVEUAAADwfAzzjgz2oQztaxH3pwztZhPsZhPzkQzyigz0mAz3pwzwewzyiA/0lg31nAz3pQzwfBDtaBL3pgzucg7tZxPtaBPtaBP2oAztaBPtaBP3pQz3pQz3pAzsZxP3pgzsZxP3pwz3pAz2owz///9/seAGcrkrLYTsZhPKGh/3pgzMIB/lVxfiURnSLh3fShpNltHdRhvhThnjVBjQKR7OJB7YPB3ZQB3nWxbbQxzUMx3VNh3pXxX2ogzWOR3taxH1nAzrYxXwfgzubxDyigzxhgzzjgz0lQzxggzudA7vegz0mQzcSxzzkgza5fbvdwyyyOqYuuP72sX3+P3zsIeNwurMzMzmYhfk7PmzsrLQ3fP52MRkY2Nro9lvbm7V1dVenNWPjo7s8vu3trbIx8fBwMCvrq2XlpbF1vHvgg6cvOVqaWnExMRfXl5aWVnrgE3pahSlw+jQ0NB/fn5zcnJ7enqop6eLiopRUFDviU5FRUS50O6TkpKioqG7urqIh4biXBmdnZx3dnZWVFPy9Pt1qtz2tInGWkU4ODelpaSampmFhISKrNa+vb1MMXssLCy82POrqqnURibZ2dmfmq3s7Oz5z7XshE3QOyfe3t6CgYEiIiHn5+cqc7Q4MoXHNS3tfQ/j4+P85NTypnq1fHhMTEuLtOH2u5f97eKfn5799vFgMnJJSUi6XUTDY0/NSjLkXSWXosIXFxeTteGZZHCzND7maTLy8vLJUT32w6V1NmgLCwqKNVzg4ODul2q6TEbtfD/ndD9AQD+qyu2Ia4LrcjJWmtNccaFUT5qpYGHYUSjqaST+9/KPiL5KcanujluiN03ynmu9amDwik5vZ6v5x6asjZKthoHd3NuCotVrbpd/NWPOVjNBgcKca3K2sddRicfIel3xjU7k4/LW0ummlKDLjnW5d2mGcWWUNVa/PjnCWzWwbFp5bo+XbFdvXVOqvePIw+JDP5BikczFsqvFopLWYkN2ao3htautnJRTTUhgfDJFAAAAJHRSTlMAQEBAQIDAgMDAwMDBECDAZjDw1YCgUODAsGfwoJDQsJBQwMAmD62RAAAjY0lEQVR42uzavW7aQAAH8AyWmRIJVIxgiFiQHPElCoZgqlhRp0jZeY0+AhsLo4dsWZip2HiODOQJUF6jd+icP7bvfHfm0jhS/ud+pEgVv/7vi6gX3/nOd76DWCROiaZps9RcbmrR69USTcOiubwoesibJO+2Tt63ayg2CfkrHcu6KEguqbFq2xX3g1OjcuezWi9bDVJkzYBD390kbFMOubPUJMxPT4UsdatsnIeQPu1rt2C5rpcc0+grq1QvHDSJvjJCJdKK+zViVxtnbWWXjepXoWInqzfK+Xr9elaWStXRbblhu186VUun2ULvTGqpNVTXbN01kPshSX9CM+695yYWrxdlNj2mOyS5dc2kogR2cq/Z4fAnwZE3P7pRSjsjI9/3J8Tf6bj5U5NP6aarGCAHtL82GFImGRQbfQG3iH43GORzNyWbVtVFZEyi9IDQoVIsmArxjpndDfqdX65Orq9k2iBj0Nx2JzOUqRdY6cCTAaUDYerhsetAOsgKLmdqA1ecX92Jjz7PwDItpEIseQTpzQY/pbtakOVtBsLc9se9/E5MY0qElX2ljUX88WNnHmSmIpjPThBwp8R9f4a5a7TYG8kkVszobtqdC2d0cH3JPW8rVJtK3z+Xiq04alZpJqtaWXqT7n3ACSE1edx69DKe4H7q3ZgulgTY3MUC65HBMu7GAVF9nOVrBelM2yaLpQ82ZTPFgso67rsch53m2kEyQ890sVAaaBa9ysGWvNyxGSzKlIM97WK54G7KUpWV644MTGJsT6axHrCcTJIFVxLaK1NaUHHGMqfE6qkGxQrjJ89iJ84tGdECe2RiJouw3tGpO4vRrjC9hLcU59ZkWv31qnTuECyqVT53YJV4BXtzOYjFz0VFobCKPwVEvWpZ4ZR7XfHibcS0j+cWCysiouoX6ylpe+OYKXmjQubt3MViYHcSms0XCyzNUMgl1+Xf78M3sGLlSvZr22SxwNIfsz9QBWXR0u2cVSywIAs2ZEVtjmIZeCi4Vzmn5fbMFEt+L2bSgUc6i/WKpdKjegZWjPvjNzLX1ba5WMkWpYaNmJ56sfiJZA7WKbd+wp1oXyiAhZVfLHoFVvtaLC92FIG7fK59wvVMYpG4VgXr6WFRLDLlcyv444W6FVIQhfcJUFVOW91iSdAuuDM+VzKXJVgcsHwsxLFS26ZmMWPCiUi5I30rIrLqfztGu1g+OOBxLWj/5MJmu5+Xy+VmTXMI49mvacjLu7y3J+xO3Mwl3IX2ISuCPlNiGG5bqgnDA6U/AaNTbD7uVHErBpbjXL9CmSPbcP0GtUKxeHS5Y71iAWbQfdgylFX4+rbUO3f0uT2VazGwsC7XBzRqLtv9245nRbH6XAfctuq1+LTUzSukH5FwveTenrLjk8Hl/gBX6VoMKWn1g6kg71AsazebSiLjBvxzB+DY5en55bBq/b+s9psn/u0JTLV2H9hYcLDUlvrmE7WGrf+fw8sTnHyszwaJT7hHmKDdhexCEdX7cjAm0O84E4uvSQTtRv8GCyXsbr9qfWa267+iFYt2aQTtPkRZKByyZBJ/fg7L7AnNMn+Xxbhs7T50KTPzkH3ZtoqRcJOC0sGKBZfJuO0+otr0JC4Slma7TLSKXiXtgksivD1tioSlCZfAYsXqcVNWlucirNlk9k/UGYF9ba7wM8DbqlXErDbMCqwGN/3/ngpcLQqGVZPL/3C3K2a1/5i3f1CngTiA47i7OAnOv9NNblAHBQdHhzMhROPJQYh/CMHBuAacGlyqVHHooi4SREGRKjxFEIlUHVwe4j8UFbHipuKf1V/uklzaJLbaFvwq70mFFz65S+5K81Q3riNsGneN5m6ocmtWbJX813VX/oq7RnPr2Lo2SX3HA8xz/DQhy04flTsY81NzRu+OHdO5GtysTRmMxVKy/JLIg0od35zmRSt2bCpXW5uu27QDAE4UEIqRQeRkB4/IcjM5yKOGBAsNBhg3x739GhbbPpVb6+KNynFRZ0WCVhKRBeCYZIn5mTVwaZkbsAycEN3zfh2LzcVFmWW4dCLXwJeXN8CBB8AIFeitJDhAJyh3VysN1vbR3VOE3Hqr3fIsM0EbEgyAk+UU4rkc4DGsbIRpJeIBRGohutaMxY6Vslm52MXnBOMAEW0pWpY3QqWgGGSx6gi7XHq7l2rWf+fq/bIPENDWAgCfLL7sx0piDDJHeQURFPPR++x6DTuNu658cV/r03ujRm1sFOGhF78imRb4VGaAKrWTOHEAX869Pwvr4/P9mbhYO/fzLaRi/St4hHqClHGwkkVzPTWcmAcyw2aOBRijMg6Xz0rsvYcbNz6ek4sDe3rTHTm6t8Eh48n5xCp5wBas9cESxbUii4d2CrL83Lse3Ebs9V8bsQf/yNWz+OKmTZsu3N269ScewJjIY8ilZUYCEC5Um1gQUpWwgHkAVNh2R3IJpUOR2DEBuN+/iVbsVU27cyauftTr1qas07cONNx4hUOqXEF9cBbK5cWUZZEQQXb58sS2meSacWxjBA/64vzGvEnszhm56FXdRSz2DTJu0pV/ifoWEkNyBwMiC10BECx2cNVWFYFExC5ywWIOyDhaJVcAvCm4/XFrK3d3EXI1VnNv4FSmE5EalzLgC11yPbWbwCLTDCyo5CuuyO5WXwruvQkscktZGxetuquK+wEGBdcNxThXh9zOArkMQrWBwbzA8LQVbxxxLLlDPN3gaK7GzsQ9htg6F+cyzbkDx0By5GhuSFR4Gpi1yNkMIOTSWssKg8C0ZbHcXr7TXGmdxl1fvrq1ifsUHMUVjAtcFbyQaq7IJ/MAR9eBiDSnn0LA505W8MunS+e6f9SGOJcx14FaPau4eIlce7s596bETueu/TP3CfCM6xoe/viY+W7bZObtO8nus9XaBzvXV5+1kyPwizUIwIJqHZDcfO034EvBReACuG8V1wiRHDEkV7nCyMPJzNqWIvzUrqVrH1u4PhTXD4AT1Ma4Y9u0+H/ext32T9yv4CM3K/ACmpkH9dElBEe3kXvjUh9drV2/1DjErNijx4wLM4DJHJsKeWsmbdxt2+bjEidypTlsGF2/hdu9tHla/SawA0Rxh2ZMhgJqMdTacZV7bxw7J9dgccZkUfu1W+c+70/Dbs9G+GMbdxibZgQ8aODaGGnmonRuboZ1fWmelXtjZRp1ew4+eaNxMscm5kAlz+fVjUZc5yL2H7l381sVQ64sDApb0sBlwGceWsXUH2b1PzbdqoiJWWo0Ix//YfV6NuC31M4TA83V1nm4TzRXRxq5Pqm0OhWrPoDO+1RbiBQ3ApkRRF42uj2bWY5dRvRCJLHzcD9L7iPwKDMm8iU3JFWuV30L2G2YyD/fj0Y/fvwYjd7/LNW61W5tmzFMTJPn3JSBLO31eqkdx0o75PAy56LvL7k7xrRbbknuBYCQNsaMMS5A0q59Pfp++PDRrMOHD586ceL76LWy6la6tU3kUHN7oGLIDXG3bGNxZRP5cGburqJtFSuGXHXxekxmyYCp3IIbhDnXa9P230vrIRWKEXzw4JFRv93L1DkWpmGB5XAecFD5Rq8XCckV1bcIrxq4JWyCu1v+0dwtKsV9Cp705JOXTY7uQN3AOhA1a/ujg6ckdm/eoUMIRu/+SfCK5n7PN81JjF/xEk57DDCLBz0sSobUHdLqG8AHTdwC1j66aC1/Uem0ms0dIJpX5wYGxQhcKZ/eGNO+P3gCtRn2uArBOMLo3b//yJn3Ve6OVaI6d/3slfygw9+s281LVFEYBvB/xppd2CbJoEVtaiMOlljMjGNBRl8wjR+BX2gjoabkVJCSilQDJjaLlCKyFknpQnERjTWZiQsVLKKIaNfznnPe+97pztS9l3mCBAnk1/Oec8+9c42+jiqu8saCLTcor9AsYru9X/DXrrKamBveRVNvAS5uh5Caknt79tB2k7snp39qLWFrTQBGwfCC2/Q7bQdn9AcDuJU7Zh7edOMTKHBjMGK5vKKvwj2Ly5DJSx/t6mKtPA9wvbFCXE6s5OEddSLEHYFgyx+dOXHaaOG8qQLvZXixfsnb0/bIKhe5hXPnAQrqVT80FdQ5F4udC4ZLo69IS7f2CDa0H8xNOrRlhdrlHFRYAS8HuN6qGmxOJx9XUIQbw3d18Pz3hanTfrpYh7adtTdXhlRWCFyNevsxzoNNbZ3rjEXS75IHdO6pB6+vNRbOx8FgCj8UY91yPMwPXitZu+TAFh5mDoQS2ZrpIHkqWupIi1q05ja8VpCiHeRySTs0OzuOzA4NsZfqbeqZ6M0A68jCBj1W79bcqHan8I1UkLql4NQ6wtxfDuz/25ViZWvmca6qsEfjz3G7iZLE6OSMQ9tE5Yp2/C4FYHhp/aJeNc2d9ZsO7Mul3asJ3GnvMlx2EzQaNQsX11zOtN3qp13Zq5D5BP1XO8PdJubxj56N5Wp7hGu0txGAZzHPVC9WL6YZ3Nb1XGz6AxE+4yprlm5pNMhuhLU4UHGmHMNcVuaZmw3YvKe682u7T2ktfeRgP0dN9OhZVuWuQAvrkyfKS/XyNIPb21r30Ya9M20M7+nVgFSqO9xdGv6LGz1JWknSgfXBXQ6IdwMnuTwF0wPvDWh1BuRw8buNuO39plzSPkEApnpra6urZfHW19UlhTtiIX5gEelDjPY+DsvH2TnaNw4sctgrdywgGV2jJ75/a+ltgrXRACdrce93tjUNyiyDCy3OoAnqV69eWrzMbb4v3F/CWK1QLyuw1/ayQg3WrWTOYS3IPVSYS+cqyVsUjPcwxIr3NVDt24BkjO/u0vV5uSVVVcQdd3L7ZJxf2iHBBL+KEk7tem29ivKNRkAyJVj/XFm8AkYqzlYiLfipwC5StZxJjUXe/ZM7m4ebkc88luyS1Urni0aVfHTkJMXqnyuLV8BrEHM21lSzkmWDLb/WCq5z7SagpbWbjxu/pq3IdK5l5DqMkpqgYGXpCtY/F4vXme/ziyrz3wMSmWXFzRBXdmZwaWfWO5XeqnDhte/M4GaA1XnKDBHjTvAkcjYYFqtkmrF+uXLl9ZBJfkKRbq6r75ULUTUuRKgX/SJSrsWtV9zGj0ZL0+wtU8AVg7tn2wt3m7CUTcVty3fMoGPV0EqtOWbg0Ky5HX3xrh2LO+dNO1JWDC5VNeOFO1Nu0txc18p7FdVrvOPmDGkOVXKIbG3uGI53DVvcBW/cOW/cI+aPA4sMeOCy9s5wRx0vXjk0r+AeAVijlVmmnQrcxq5Ikrlpb9yFvNr9h1lWsF2x8u8WZt1rB5h7bbhDL15Ms6pXewHm+z8pV5ZuQ+SR9WTcGzeZx4rkb/eIFcYy1eM0TzJ3M97XbKtXHmbou3vTbT8fIcGlWW6I7Ggs8sGL9osTq3LUghXmKqW062WanzM3E+/DNJt6tZfBhLVpB9VlyMxyZEtZPXMXnFhKmQuuVjKVkvXO7WvENEu9+kFkNcJP5lhrlatm+fzWPs60n1kWq8t2CSvtep3mZeY2Npp6sTmTF/1SwSTWWK2lUcbKNeWCG/LF/eLAuuTm/+3nAc/XoYYurneCvf0Ao2LkArBGOwitrdzQRV/cBZvVI1eckqxnbqQB9RpvD7y0fgHm9AOLSSYtRpnL9csdSdqwvtrNzYwPbpeMM3kJTGJKezthad1Ca0bZlHvJD3eOrd65+TPgiYvbmvPwxvU499I8U8EAm8BK1YoWo9zlnztF2GJyt90emQlLaYhEUK94UTA1zFHYJrNusXCHWetnmJeALS53zO2F6IDJFtXLXhpogNEwZ1BhJyxtXGnBlQuR+3uE6f3F5SIu7wKzzP0UIq/erlTBBIYYZkhh1ViaZNLihKHKvQqu52NGuujc8mWXh0jm7oRC0q8uGCMNMgVfCYtqLW2D1l75anGXXF90C2L37vXBLccft5vVKHOnLlrePgb3doJMwVc0S9Xmai9deSDPxt1vVAWxPrjl5q/n7uodY2/oYui8eAkMMcg6ZFXYP8TdvWtTURgGcHDS/+NWJxEVWlRwUgeJMXKXUD+QTlVQEAclDg6tmEESyBQMTV062SjWCpI6lUBVsGRwaa0fg4Om2oIu4uR7zuk9z9Xk3vd9r6DPlfix/XzOV2N6NDuQ09pyZ722JV6okqxp3KPuSWz3oHCx6vq16nLk9WASG7KlkpWwUbVem+HIPD8QC651idrF3TGUtojb9pN34rIdz7ZgAzZi5Nq1LWxcO1P64rlfsyxUsKa2e9Qn+SYK2cmqcijKZXgdmMREdrlprHevmmppINO8ddqZmn9nXHyiGoQF18PSuPHbY3xki1Uvemd847rzRmASEzkKWU2zvlqrLX1yWEpLvVABq+cOuomiq9h5zZtNM8ZrC3ZgmsSIsxpsTFteI6uLdCyv9lm13IPugVVVb4WsLhvGawp2YBKT2Yao1mqxbiBfnyXtJ8K61MRf+gE7IDlpu8Aisr2oS1Kb2vWZ6x5MYkNGzgFrqp0tLZZLeE9iXr4LwZra7rbUuTso9aboYHU4Sqs0SwXTiLZgihGbH5ZK1gjrtNWNEZ9lVbl7k5ITcQ8m5I3si0Dv/WS8BmzFREbOGKvF2mqNdhPaF+Kv64HN2u7BxEzv0tVbmyhFYBITGblkra5ZU225+rOmL3ceVk27O/yfwjbo1o22avYOD6/PLjqwExOZ4qSm1xi2Wl6Hdl5c7l4mJ7VcYCmyeit1Y7VZL5UN2IkphHZSopLVDuNFwjYaMe3DKWm5qc2aR8uFlSKt943Bem950YkNGZkhq52zFltujSCr2csF1r7oucCiXjZPhuFdrJadmMiEtpk1UrJuYeeq6BbrFF8uh83tOa7iwqqrt1mHt7bZqDoxkRGiktVi536uxbRPp6TlvmSsFA0XWHW9leFYNhoNEhMZcVSyEnaB9luktiQt9x2DVXGBVdSLtOPetc25hiMjDdMrWRcm1uPaA9BmKTfnrQz3iHnAhVVdL7xIa3OO0vCZIypZCdv6DXugA4+23Byw4HoY0y6A+nrhRdY3qwsLc1EWbBqbvzcLbbZyHXYvMZl2j0RhrKhX7kXFGxONBZ+JjT+KhVZTLvZYFIvc87AELoOlA8Qzsbfe/6nMWssFJ0ZgsUrxWWaKFXI5LKXelHor07Cm5IDL02XNP3HCGS9Wy2WsFNTLp9kVYimqTxYtMcVm5gKLVBSfTZnmrC704XRNbsexKPbvubAiXXD4gp/VeWxtfqcqq7ACm4nLYymqj0lWunUOO7VTlzUGm50LIzL8BBhZw9N9VgzjDrDCdBirhstjKe1dytzvxsWwvsDmozph8Nh99Oi4CVbKdHOXOpU33V7c2nrRWYZBtwmRlcG6V47LFOuDzUhpvt+ze+wqRrA2SzkBNkflUjguUyyCzUiZJ7ZZNRK5zY/iHL1SeC5TLPLkf3E77Ci2VjE31Yrc/7dcrFNMsbAKuDkGi9Sb/4X7gl2eRNxj5iEuh0U+/w/uahoWVHAdLKHdYzmRNftwfv7qx2mTUysfMnHXmLUY0bc7nJ6e1vr6fRBLsaAXv2OmrLDdY1FysDIZUW6+zVeT9oKegr2qtpAP6Xej35VbLrMW93M9LJ3LWdWb7+tJstL1e8jjcQN+q9pymSmr50qxI+ZhhnPyt8LiG3/DFf1QBtVh9yi528ElqwRLP0yEw/nbxyAoJN3bXfi7oZyaCxyXoQLrUhEtx5NBeCrh+9gLcu/tuNI96dm9m+PuMyiWjPQkI3kyKA6FofEOMF+EVzeUeWw2LpjuQUTDufmRrtzImxukcV3eH947qqEsKtZFPZiBtQFWPJwf0Sp1tkj7rL1g3yuRK0HA78BTa6piZdwT+5J6dT8NCPeV/vMgnnEokdEgrzorC6zCdnentDsyON107kfLDMfGJi13KAzyfRtSyA7nr5pis3MxZ5PTTj1eGGtIL/gZXAznMF27/FKD1XNB5f8ZoF5JL9ciAR40f8eCFWYP0lr13IiajqX02JmLkPd83x0yVG+embgyrJ4Lq/zfdz6nLMv93tFi/mI0a91ONH4+CN6mTFytVbwygyvAIu30harfvNXweEhnS/r9UD5YSZm4LFbNPWEetCuyIrWk6Rv5ileuFCMq9iMqNXh81rzcSD5aTd1WWpH9FzyMaVeERXrNtKkbDvl7tC33xvmIi4wmcb9kxu7fn9DuiSi7dVakm7gNUaILuyPa1m/Gz465Pdn+PSRoO9mxxPWwBK4Oi+wdeHh+ZXVj2G9civlbkX3SUpO5S1mtMq4Wi9xP4uJckfeTNzx7y/0SYZYpFVbM1VuxXCm4dG1dAVobZplSWBVcNRbf+vCwmcANI27Eu3HjSr5QJC3HfaDH6rgZrTa9ZsJShf8yyoVOUf0RLsqMVcfdnx1L6SadIUdjWvOW5FB84uYL+XDgRtTRF6vn6q3I54RjBgmLOEWS8LFdpLFsF4MCoxVi9Vw9Fmmzh8jQHSIvmpYxrwccIpe01r/n8lbG+2iAlm7i/UXb3bs8DcRxAB/ERfAFXARxu8GhLmZxqKDi+xsSC4oiiJO6VEdxcdC6OTjESZFkSKmgFSFQkdqCRbBiFO3gCyJuiv4P/nKX3DeX5Hoxp9/AY+NjSz/9JXeXyz0+l4+eY6K+Yj4WlwjQvrLAGrj7sjgNC4s8KJ68x4u1vSF+E5rgci0uABWtpdVptS5ImIbbEItk3S+O5uvQ8odHS1xc3uOutT2WssfEtbOWvR+4TJyw5wSSRh0X6WC+joMZkzcYXthjzdwj1yyw8Oobq8tnTx29mgjRVGFqTtFaW+tUl7h21sO0ZV50vSf5l+OYp7p8Th7fZzDxCq01tmZ1LbD4aQDF+zhB8rsI5+XveD3DoTihv6laO6uRuwrVbWpVl6ByL26anDx7lczJb+c6k7XESpRD+eVNe6w916BUF42r3uvkPa/+191PTl08KruoY2oPZGG145qx+kXjT9Ubnjeqbg0d12gtsHZcWM2VldKyt+J2try8V7QvXtlg7blmrHZt8Q/9YgVMXB3/qGgtrPZcWOtjka1v7y1ZinLj5PXSUpRfNlh7bjMrvD9vaRcancJCI3RAFlYLri0W3tt0wQCwuozsemEZ2adXFlhbrvkoFlZTntVdJPj132O36bmHkk1yDVQzFqtjnt9Swc+3Uh6WJlgfNrA6fNNjqboSpq8uUcyB1bTc9vZnHVff/9gXVmya6h7Kcq326AkxrkBFgcEtl9beCiz/QtktYSuqubVHT+afBkBePVvCvfv1b7FOncLymLn2hRVf1Tx6WuAC++qvrGasqGxdrn1hQVXBkrtly0MrrGMsrAUXlW1WWIA/30u4ZEq5v381OWUdU2FtuRhQNCss8vzprYz7Ji1slzJMHgy74w4ltmqKKVZcYOsVtt6Sti8P0wFjt894OlucgIkEDbAorBUXVjPWKK1KJzWOHMdjqbxBv4PCWnCBrdPJNsCCe9pxToPbBGvNxUjR3MkarY24rdqnrD23HrbBejYTt8Ho6V9wYbVoiw2TijnuCNwGbbEl11xYNMVNrY7CnVIvdJoSWxbWzF27I8u1eqOnYTegNxd0o78qrOhYu1OJVbiIGVu2Xkkyz/9Nm7bdEqbhorDTjndavJVwqmLHHsvSDyEe0oAh7sQ6K540GHWdMje6wzNRUXcWPuu7YSz3Q/c1870gJ5sELsvih1cyLMXMzbDjPsvldA489ZmScCh8GWeaYgdMJEqw0WmmxBuWuCETCVqt7OGdiYT03yXYWL6r14FgzYM+U+NOUGAjl6yUocfUDMaytKwYX3gzUDetLMv26fE0tSODKbiFlrnVypCKxJvPlXcV8sq+ZuW8S7FtM1dofVZK6o0ZAm+eOyaewoVW8UYFrqtyy/ELtOSw7bGKvJ6QlWdvLe6IlTPgx3M0YBUJ89xOmetXvnuFCyO4hvSJ+45VxSVpfW63+sNN+p0Rq0y0lEumqoxzXLcBl03I+7r6O3/D9TRvb+vWiFVntJQ70FSnmuvW5vZ0RzPr/QU3b/JzdH/r1hB7ajtCV6xabqx70tSS6xJ3Xv2dv+Ci7Q0j2o0HTHYxPuo53NolYJZ4CRcngB85EfZYx2lZcV9voyySB4t3V5KEDbhoqDppRyv3h+iI0ffwhEu4fVla3tmGjAFm4rqT1sxniDfZlttPuDPXezdP+50r8ls1uSeIJxFexBuuWBq7TBo4N5KSkZ4b59smyvB0fa7XSkCvoecji9fg8szi3sIV0gZcpssgkHXKxo1BRyTScwOc4I5I9qSJkTvjnAUr7YP7zpN6e64a2aN4pWFxkes4Ja5fugTQc1HMfOfqF/ap0ijqf+R2gC1zORbcnjwXgK3J7QneFfnJpfvgeqwZdzvfDNwRy5G0XI4CdwEurHW5Ihg2FrgxM3EFTFtde24otFGZK7Bm7jY9V0Si/GXcne32kcrqbiA/3/6WO+ymmaZcHLNjnAEgidxJo2mqttXmzpiMv+j1emG/UF1yorrgyr+9RHMxA53Wl6ehh5m11AhuX3D9UlPVT7UY1tty5Su9fi94PYW7cye5xKap7n0MHsjQ6SoZYrwVcW00KHBxG2DEwM1yR3D7ttx2qRUM2yIuuIn2gHSp3O1Z9hA3lC9SnHrqMrW8Hvbp8hzdc3THY0AyjKpwuibxG3EJUuIuhBYdNGEp+7fLqFz5MRArxiVuooxGMAIRkjbA7jjlIuD6+FCUQ5ktBBdGM5erroCbJZi3J/lpnHc7k+yVrgJX5hIBB9Lrjcc5xemknNjj/wwDpo6OGzLE7ee/89fcdpGrzSThglXgyo/hAnFHTA0qOtY12XS2TnXcCSsGTVdvKfddNfc9huPa9Eh7cLuxujuciot4TMP0WWUih9LXcHXXc++M3CsG7nw594i5utvvl8uL1ndLXF12MfLXcYvlRTe8rRZ3puO2vWXcA9tzLGDV6u64Rhc6VYUa8Nn/UeVMJLraKm4rqLo2n7VIUsENi1ycq++L3ImeqxRX5W7CxyD6oqqZ0jHGitVap/gs9LaLysnRam5P5RJvruW236kv6qKpToq7Q24b89yVpEQOkDcqqgakFQlZ9Q0BCp7lxi2Picz4SKpwUerOtvEEKKkHbliYUJQvle6nL+bRw/wLL+Y7F7Jl3nwob9qQ567YruTEVlKNPYb4neGWLMp002B0R7mZNQlC13U7CXF2h4draS/MvS+PypZllt3MmtMfQa/HW+MrPPN2mtl7HrlPBU/2xaNeP71bNdtJ+Z5m526FtCnPXa1yd5xIx/8dkW7OKtIVExJ3porVkAlhKDG3mtOukZ188DQnHlmVHFRJ60iJrC94L1kupNbHrBSbyDY9U2y67NquZo3CXbe9kPsWVvO99tYy6bYThARaY+UPamv/cGs2OwrCQABuYjxi3HgEY7J7MY23vXiZLCDyI2k8zjNw4xH2UXjUbVKyozAwdcNpv8Z6NJ9fUyB0p57YwJD8e8FTmfSunZwZWQdVZcGkl57mmANwa5n4gCFxd1rqVKYbpMqHddOTKzJh3TxHGcOQYKC7gjFxdfKW/RTCEtNhkTytMp6RDZsItmkMIyI15ACccIPepzLlsCcxrPviulpNdHlnXY9UltuoiE0ILHXTCq48/mHRTQ9m1PW1sLcMWPZqzBYmMV2Lguyfw9Iq7tMiI5vIYb/SHCYIA8UQwSym6dpXwoplf1Uf92JOVQx7SbMaplkplgOIxKarWt+wQln3IVd+ISfYC/NNqzIrYJ614gnetR+xybpLK4YlUR9ZHG/G1hP5i2xVpdesqLUHkZok0hrkQdZ517XtWJZunWb34jNSWI4En1fxpbpfrWQRawKEQbYcW+0BWfcUtnZXOfGXL7JnWsIstuStdCU5S4G9muVtp33jsr9ljMmaprm3FvR93sGRoaUsS1MUwP7dnnn1bqUktqFelNo4smaGvOgBvSDrQMkE61D/B6KN8iP4aa8OUhiGYSCKCoZZCRsZLRNjvPX9D1jT9ABN0yQ25N3gMwiZt8ktPXaHyJmL1YLsFS1PmawW5VewrG0enmuQoyJYhh/aCyF/lCrXEZdedGVNco4AY9EBXpWrkhVRLpHe2d4utTUaEOUugJGq2k7kWkggyFAAVJJZOz96kB0/S04jYcMvGNBNlfd43OcFhHZ9JoUFo1AAAAAASUVORK5CYII="
};
CF["productos_carnes"] = {
  "tabla": "Tabla 10 - Food Products Data",
  "categoria": "carnes_y_pescados",
  "fuente": "Emerson Climate Technologies, Refrigeration Manual Part 3, Form AE-103 R3, pagina 14-2",
  "version": 1,
  "fecha_actualizacion": "2026-07-25",
  "nota": "Carnes y pescados no tienen calor de respiracion: no hay procesos vitales tras el sacrificio.",
  "productos": [
    { "nombre": "Bacon", "nombre_es": "Tocino", "punto_congelacion_F": null, "pct_agua": 20, "cp_sobre": 0.50, "cp_bajo": 0.30, "latente_fusion": 29, "respiracion": [] },
    { "nombre": "Beef (dried)", "nombre_es": "Carne de vacuno seca", "punto_congelacion_F": null, "pct_agua_min": 5, "pct_agua_max": 15, "cp_sobre_min": 0.22, "cp_sobre_max": 0.34, "cp_bajo_min": 0.19, "cp_bajo_max": 0.26, "latente_fusion_min": 7, "latente_fusion_max": 22, "respiracion": [] },
    { "nombre": "Beef (fresh-lean)", "nombre_es": "Vacuno fresco magro", "punto_congelacion_F": 29, "pct_agua": 68, "cp_sobre": 0.77, "cp_bajo": 0.40, "latente_fusion": 100, "respiracion": [] },
    { "nombre": "Beef (fresh-fat)", "nombre_es": "Vacuno fresco graso", "punto_congelacion_F": 28, "pct_agua": null, "cp_sobre": 0.60, "cp_bajo": 0.35, "latente_fusion": 79, "respiracion": [] },
    { "nombre": "Brined meats", "nombre_es": "Carnes en salmuera", "punto_congelacion_F": null, "pct_agua": null, "cp_sobre": 0.75, "cp_bajo": null, "latente_fusion": null, "respiracion": [] },
    { "nombre": "Cod fish (fresh)", "nombre_es": "Bacalao fresco", "punto_congelacion_F": 28, "pct_agua": null, "cp_sobre": 0.90, "cp_bajo": 0.49, "latente_fusion": 119, "respiracion": [] },
    { "nombre": "Cut meats", "nombre_es": "Carnes trozadas", "punto_congelacion_F": 29, "pct_agua": 65, "cp_sobre": 0.72, "cp_bajo": 0.40, "latente_fusion": 95, "respiracion": [] },
    { "nombre": "Fish (frozen)", "nombre_es": "Pescado congelado", "punto_congelacion_F": 28, "pct_agua": 70, "cp_sobre": 0.76, "cp_bajo": 0.41, "latente_fusion": 101, "respiracion": [] },
    { "nombre": "Fish (iced)", "nombre_es": "Pescado en hielo", "punto_congelacion_F": null, "pct_agua": 70, "cp_sobre": 0.76, "cp_bajo": 0.41, "latente_fusion": 101, "respiracion": [] },
    { "nombre": "Fish (dried)", "nombre_es": "Pescado seco", "punto_congelacion_F": null, "pct_agua": null, "cp_sobre": 0.56, "cp_bajo": 0.34, "latente_fusion": 65, "respiracion": [] },
    { "nombre": "Hams and loins", "nombre_es": "Jamones y lomos", "punto_congelacion_F": 27, "pct_agua": 60, "cp_sobre": 0.68, "cp_bajo": 0.38, "latente_fusion": 86.5, "respiracion": [] },
    { "nombre": "Lamb", "nombre_es": "Cordero", "punto_congelacion_F": 29, "pct_agua": 58, "cp_sobre": 0.67, "cp_bajo": 0.30, "latente_fusion": 83.5, "respiracion": [] },
    { "nombre": "Livers", "nombre_es": "Higados", "punto_congelacion_F": 29, "pct_agua": 65.5, "cp_sobre": 0.72, "cp_bajo": 0.40, "latente_fusion": 93.3, "respiracion": [] },
    { "nombre": "Oyster (shell)", "nombre_es": "Ostras con concha", "punto_congelacion_F": 27, "pct_agua": 80.4, "cp_sobre": 0.83, "cp_bajo": 0.44, "latente_fusion": 116, "respiracion": [] },
    { "nombre": "Oysters (tub)", "nombre_es": "Ostras a granel", "punto_congelacion_F": 27, "pct_agua": 87, "cp_sobre": 0.90, "cp_bajo": 0.46, "latente_fusion": 125, "respiracion": [] },
    { "nombre": "Pork (fresh)", "nombre_es": "Cerdo fresco", "punto_congelacion_F": 28, "pct_agua": 60, "cp_sobre": 0.68, "cp_bajo": 0.38, "latente_fusion": 86.5, "respiracion": [] },
    { "nombre": "Pork (smoked)", "nombre_es": "Cerdo ahumado", "punto_congelacion_F": null, "pct_agua": 57, "cp_sobre": 0.60, "cp_bajo": 0.32, "latente_fusion": null, "respiracion": [] },
    { "nombre": "Poultry (fresh)", "nombre_es": "Aves frescas", "punto_congelacion_F": 27, "pct_agua": 74, "cp_sobre": 0.79, "cp_bajo": 0.37, "latente_fusion": 106, "respiracion": [] },
    { "nombre": "Poultry (frozen)", "nombre_es": "Aves congeladas", "punto_congelacion_F": 27, "pct_agua": 74, "cp_sobre": 0.79, "cp_bajo": 0.37, "latente_fusion": 106, "respiracion": [] },
    { "nombre": "Sausage (casings)", "nombre_es": "Tripas de embutido", "punto_congelacion_F": null, "pct_agua": null, "cp_sobre": 0.60, "cp_bajo": null, "latente_fusion": null, "respiracion": [] },
    { "nombre": "Sausage (drying)", "nombre_es": "Embutido en secado", "punto_congelacion_F": 26, "pct_agua": 65.5, "cp_sobre": 0.89, "cp_bajo": 0.56, "latente_fusion": 93, "respiracion": [] },
    { "nombre": "Sausage (franks)", "nombre_es": "Vienesas", "punto_congelacion_F": 29, "pct_agua": 60, "cp_sobre": 0.86, "cp_bajo": 0.56, "latente_fusion": 86, "respiracion": [] },
    { "nombre": "Sausage (fresh)", "nombre_es": "Longaniza fresca", "punto_congelacion_F": 26, "pct_agua": 65, "cp_sobre": 0.89, "cp_bajo": 0.56, "latente_fusion": 93, "respiracion": [] },
    { "nombre": "Sausage (smoked)", "nombre_es": "Embutido ahumado", "punto_congelacion_F": 25, "pct_agua": 60, "cp_sobre": 0.86, "cp_bajo": 0.56, "latente_fusion": 86, "respiracion": [] },
    { "nombre": "Scallops", "nombre_es": "Ostiones", "punto_congelacion_F": 28, "pct_agua": 80.3, "cp_sobre": 0.89, "cp_bajo": 0.48, "latente_fusion": 116, "respiracion": [] },
    { "nombre": "Shrimp", "nombre_es": "Camarones", "punto_congelacion_F": 28, "pct_agua": 70.8, "cp_sobre": 0.83, "cp_bajo": 0.45, "latente_fusion": 119, "respiracion": [] },
    { "nombre": "Veal", "nombre_es": "Ternera", "punto_congelacion_F": 29, "pct_agua": 63, "cp_sobre": 0.71, "cp_bajo": 0.39, "latente_fusion": 91, "respiracion": [] }
  ]
};
CF["productos_frutas"] = {
  "tabla": "Tabla 10 - Food Products Data",
  "categoria": "frutas",
  "fuente": "Emerson Climate Technologies, Refrigeration Manual Part 3, Form AE-103 R3, pagina 14-3. Extraido del 1967 ASHRAE Handbook of Fundamentals.",
  "version": 1,
  "fecha_actualizacion": "2026-07-25",
  "productos": [
    { "nombre": "Apples", "nombre_es": "Manzanas", "punto_congelacion_F": 28.4, "pct_agua": 84.1, "cp_sobre": 0.86, "cp_bajo": 0.45, "latente_fusion": 121, "respiracion": [ { "T_F": 32, "min": 830, "max": 830 }, { "T_F": 40, "min": 1435, "max": 1435 } ] },
    { "nombre": "Apricots", "nombre_es": "Damascos", "punto_congelacion_F": 28.1, "pct_agua": 85.4, "cp_sobre": 0.88, "cp_bajo": 0.46, "latente_fusion": 122, "respiracion": [] },
    { "nombre": "Avocadoes", "nombre_es": "Paltas", "punto_congelacion_F": 27.2, "pct_agua": 94, "cp_sobre": 0.91, "cp_bajo": 0.49, "latente_fusion": 136, "respiracion": [ { "T_F": 60, "min": 13200, "max": 39700 } ] },
    { "nombre": "Bananas", "nombre_es": "Platanos", "punto_congelacion_F": 28, "pct_agua": 74.8, "cp_sobre": 0.80, "cp_bajo": 0.42, "latente_fusion": 108, "respiracion": [ { "T_F": 68, "min": 8400, "max": 9200 } ] },
    { "nombre": "Blackberries", "nombre_es": "Moras", "punto_congelacion_F": 28.9, "pct_agua": 85.3, "cp_sobre": 0.88, "cp_bajo": 0.46, "latente_fusion": 122, "respiracion": [] },
    { "nombre": "Blueberries", "nombre_es": "Arandanos", "punto_congelacion_F": 28.6, "pct_agua": 82.3, "cp_sobre": 0.86, "cp_bajo": 0.45, "latente_fusion": 118, "respiracion": [ { "T_F": 32, "min": 1300, "max": 2200 } ] },
    { "nombre": "Cantaloupes", "nombre_es": "Melon cantalupo", "punto_congelacion_F": 29, "pct_agua": 92.7, "cp_sobre": 0.94, "cp_bajo": 0.48, "latente_fusion": 132, "respiracion": [ { "T_F": 40, "min": 2000, "max": 2000 }, { "T_F": 60, "min": 8500, "max": 8500 } ] },
    { "nombre": "Cherries", "nombre_es": "Cerezas", "punto_congelacion_F": 26, "pct_agua": 83, "cp_sobre": 0.87, "cp_bajo": 0.45, "latente_fusion": 120, "respiracion": [] },
    { "nombre": "Cranberries", "nombre_es": "Arandanos rojos", "punto_congelacion_F": 27.3, "pct_agua": 87.4, "cp_sobre": 0.90, "cp_bajo": 0.46, "latente_fusion": 124, "respiracion": [] },
    { "nombre": "Currants", "nombre_es": "Grosellas", "punto_congelacion_F": 30.2, "pct_agua": 84.7, "cp_sobre": 0.88, "cp_bajo": 0.45, "latente_fusion": 120, "respiracion": [] },
    { "nombre": "Dates (dry)", "nombre_es": "Datiles secos", "punto_congelacion_F": -4.1, "pct_agua": 20, "cp_sobre": 0.36, "cp_bajo": 0.26, "latente_fusion": 29, "respiracion": [] },
    { "nombre": "Dates (fresh)", "nombre_es": "Datiles frescos", "punto_congelacion_F": 27.1, "pct_agua": 78, "cp_sobre": 0.82, "cp_bajo": 0.43, "latente_fusion": 112, "respiracion": [] },
    { "nombre": "Figs (fresh)", "nombre_es": "Higos frescos", "punto_congelacion_F": 27.1, "pct_agua": 78, "cp_sobre": 0.82, "cp_bajo": 0.43, "latente_fusion": 112, "respiracion": [] },
    { "nombre": "Figs (dried)", "nombre_es": "Higos secos", "punto_congelacion_F": null, "pct_agua": 24, "cp_sobre": 0.39, "cp_bajo": 0.27, "latente_fusion": 34, "respiracion": [] },
    { "nombre": "Gooseberries", "nombre_es": "Uva espina", "punto_congelacion_F": 28.9, "pct_agua": 88.3, "cp_sobre": 0.90, "cp_bajo": 0.46, "latente_fusion": 126, "respiracion": [] },
    { "nombre": "Grapefruit", "nombre_es": "Pomelo", "punto_congelacion_F": 28.4, "pct_agua": 88.8, "cp_sobre": 0.91, "cp_bajo": 0.46, "latente_fusion": 126, "respiracion": [ { "T_F": 32, "min": 460, "max": 460 }, { "T_F": 40, "min": 1070, "max": 1070 } ] },
    { "nombre": "Grapes", "nombre_es": "Uvas", "punto_congelacion_F": 26.3, "pct_agua": 81.7, "cp_sobre": 0.86, "cp_bajo": 0.44, "latente_fusion": 116, "respiracion": [ { "T_F": 35, "min": 830, "max": 830 } ] },
    { "nombre": "Honey Dew Melon", "nombre_es": "Melon tuna", "punto_congelacion_F": 20, "pct_agua": 92.6, "cp_sobre": 0.94, "cp_bajo": 0.48, "latente_fusion": 132, "respiracion": [ { "T_F": 40, "min": 1000, "max": 1000 } ] },
    { "nombre": "Lemons", "nombre_es": "Limones", "punto_congelacion_F": 28.1, "pct_agua": 89.3, "cp_sobre": 0.92, "cp_bajo": 0.46, "latente_fusion": 127, "respiracion": [ { "T_F": 40, "min": 810, "max": 810 }, { "T_F": 60, "min": 2970, "max": 2970 } ] },
    { "nombre": "Limes", "nombre_es": "Limas", "punto_congelacion_F": 29, "pct_agua": 86, "cp_sobre": 0.89, "cp_bajo": 0.46, "latente_fusion": 122, "respiracion": [ { "T_F": 40, "min": 810, "max": 810 }, { "T_F": 60, "min": 2970, "max": 2970 } ] },
    { "nombre": "Mangoes", "nombre_es": "Mangos", "punto_congelacion_F": 32, "pct_agua": 93, "cp_sobre": 0.90, "cp_bajo": 0.46, "latente_fusion": 134, "respiracion": [] },
    { "nombre": "Nectarines", "nombre_es": "Nectarines", "punto_congelacion_F": 29, "pct_agua": 82.9, "cp_sobre": 0.90, "cp_bajo": 0.49, "latente_fusion": 119, "respiracion": [] },
    { "nombre": "Oranges", "nombre_es": "Naranjas", "punto_congelacion_F": 28, "pct_agua": 87.2, "cp_sobre": 0.90, "cp_bajo": 0.46, "latente_fusion": 124, "respiracion": [ { "T_F": 32, "min": 795, "max": 795 }, { "T_F": 40, "min": 1400, "max": 1400 } ] },
    { "nombre": "Peaches", "nombre_es": "Duraznos", "punto_congelacion_F": 29.4, "pct_agua": 86.9, "cp_sobre": 0.90, "cp_bajo": 0.46, "latente_fusion": 124, "respiracion": [ { "T_F": 32, "min": 1110, "max": 1110 }, { "T_F": 40, "min": 1735, "max": 1735 } ] },
    { "nombre": "Pears", "nombre_es": "Peras", "punto_congelacion_F": 28.5, "pct_agua": 83.5, "cp_sobre": 0.86, "cp_bajo": 0.45, "latente_fusion": 118, "respiracion": [ { "T_F": 32, "min": 770, "max": 770 } ] },
    { "nombre": "Persimmons", "nombre_es": "Caquis", "punto_congelacion_F": 28.3, "pct_agua": 78.2, "cp_sobre": 0.84, "cp_bajo": 0.43, "latente_fusion": 112, "respiracion": [] },
    { "nombre": "Pineapples", "nombre_es": "Pinas", "punto_congelacion_F": 29.4, "pct_agua": 85.3, "cp_sobre": 0.88, "cp_bajo": 0.45, "latente_fusion": 123, "respiracion": [] },
    { "nombre": "Plums", "nombre_es": "Ciruelas", "punto_congelacion_F": 28, "pct_agua": 85.7, "cp_sobre": 0.88, "cp_bajo": 0.45, "latente_fusion": 122, "respiracion": [] },
    { "nombre": "Pomegranates", "nombre_es": "Granadas", "punto_congelacion_F": 28, "pct_agua": 77, "cp_sobre": 0.87, "cp_bajo": 0.48, "latente_fusion": 112, "respiracion": [] },
    { "nombre": "Prunes (fresh)", "nombre_es": "Ciruelas frescas", "punto_congelacion_F": 28, "pct_agua": 85.7, "cp_sobre": 0.88, "cp_bajo": 0.45, "latente_fusion": 123, "respiracion": [] },
    { "nombre": "Quinces", "nombre_es": "Membrillos", "punto_congelacion_F": 28.1, "pct_agua": 85.3, "cp_sobre": 0.88, "cp_bajo": 0.45, "latente_fusion": 122, "respiracion": [] },
    { "nombre": "Raspberries", "nombre_es": "Frambuesas", "punto_congelacion_F": 30.1, "pct_agua": 82, "cp_sobre": 0.85, "cp_bajo": 0.45, "latente_fusion": 122, "respiracion": [ { "T_F": 40, "min": 6800, "max": 8500 }, { "T_F": 60, "min": 18100, "max": 22300 } ] },
    { "nombre": "Strawberries", "nombre_es": "Frutillas", "punto_congelacion_F": 29.9, "pct_agua": 90, "cp_sobre": 0.92, "cp_bajo": 0.47, "latente_fusion": 129, "respiracion": [] },
    { "nombre": "Tangerines", "nombre_es": "Mandarinas", "punto_congelacion_F": 28.0, "pct_agua": 87.3, "cp_sobre": 0.93, "cp_bajo": 0.51, "latente_fusion": 126, "respiracion": [ { "T_F": 32, "min": 3265, "max": 3265 }, { "T_F": 40, "min": 5865, "max": 5865 } ] },
    { "nombre": "Watermelons", "nombre_es": "Sandias", "punto_congelacion_F": 29.2, "pct_agua": 92.1, "cp_sobre": 0.97, "cp_bajo": 0.48, "latente_fusion": 132, "respiracion": [] }
  ]
};
CF["productos_misc"] = {
  "tabla": "Tabla 10 - Food Products Data",
  "categoria": "misceláneos",
  "fuente": "Emerson Climate Technologies, Refrigeration Manual Part 3, Form AE-103 R3, paginas 14-2 y 14-3",
  "version": 1,
  "fecha_actualizacion": "2026-07-25",
  "productos": [
    { "nombre": "Beer", "nombre_es": "Cerveza", "punto_congelacion_F": 28, "pct_agua": 92, "cp_sobre": 1.0, "cp_bajo": null, "latente_fusion": null, "respiracion": [] },
    { "nombre": "Bread", "nombre_es": "Pan", "punto_congelacion_F": null, "pct_agua_min": 32, "pct_agua_max": 37, "cp_sobre": 0.70, "cp_bajo": 0.34, "latente_fusion_min": 46, "latente_fusion_max": 53, "respiracion": [] },
    { "nombre": "Bread (dough)", "nombre_es": "Masa de pan", "punto_congelacion_F": null, "pct_agua": 58, "cp_sobre": 0.75, "cp_bajo": null, "latente_fusion": null, "respiracion": [] },
    { "nombre": "Butter", "nombre_es": "Mantequilla", "punto_congelacion_F_min": 0, "punto_congelacion_F_max": 30, "pct_agua": 15, "cp_sobre": 0.64, "cp_bajo": 0.34, "latente_fusion": 15, "respiracion": [] },
    { "nombre": "Candy", "nombre_es": "Confites", "punto_congelacion_F": null, "pct_agua": null, "cp_sobre": 0.93, "cp_bajo": null, "latente_fusion": null, "respiracion": [] },
    { "nombre": "Caviar (tub)", "nombre_es": "Caviar a granel", "punto_congelacion_F": 20, "pct_agua": 55, "cp_sobre": null, "cp_bajo": null, "latente_fusion": null, "respiracion": [ { "T_F": 40, "min": 3820, "max": 3820 } ] },
    { "nombre": "Cheese (American)", "nombre_es": "Queso americano", "punto_congelacion_F": 17, "pct_agua": 60, "cp_sobre": 0.64, "cp_bajo": 0.36, "latente_fusion": 79, "respiracion": [ { "T_F": 40, "min": 4680, "max": 4680 } ] },
    { "nombre": "Cheese (Camembert)", "nombre_es": "Queso Camembert", "punto_congelacion_F": 18, "pct_agua": 60, "cp_sobre": 0.70, "cp_bajo": 0.40, "latente_fusion": 86, "respiracion": [ { "T_F": 40, "min": 4920, "max": 4920 } ] },
    { "nombre": "Cheese (Limburger)", "nombre_es": "Queso Limburger", "punto_congelacion_F": 19, "pct_agua": 55, "cp_sobre": 0.70, "cp_bajo": 0.40, "latente_fusion": 86, "respiracion": [ { "T_F": 40, "min": 4920, "max": 4920 } ] },
    { "nombre": "Cheese (Roquefort)", "nombre_es": "Queso Roquefort", "punto_congelacion_F": 3, "pct_agua": 55, "cp_sobre": 0.65, "cp_bajo": 0.32, "latente_fusion": 79, "respiracion": [ { "T_F": 45, "min": 4000, "max": 4000 } ] },
    { "nombre": "Cheese (Swiss)", "nombre_es": "Queso suizo", "punto_congelacion_F": 15, "pct_agua": 55, "cp_sobre": 0.64, "cp_bajo": 0.36, "latente_fusion": 79, "respiracion": [ { "T_F": 40, "min": 4660, "max": 4660 } ] },
    { "nombre": "Chocolate (coating)", "nombre_es": "Cobertura de chocolate", "punto_congelacion_F_min": 85, "punto_congelacion_F_max": 95, "pct_agua": 55, "cp_sobre": 0.30, "cp_bajo": 0.55, "latente_fusion": 40, "respiracion": [], "nota_ocr": "El manual imprime 95-85 en la columna de punto de congelacion y cp_bajo mayor que cp_sobre. Reproducido tal cual del original; revisar antes de usar." },
    { "nombre": "Cream (40%)", "nombre_es": "Crema 40%", "punto_congelacion_F": 28, "pct_agua": 73, "cp_sobre": 0.85, "cp_bajo": 0.40, "latente_fusion": 90, "respiracion": [] },
    { "nombre": "Eggs (crated)", "nombre_es": "Huevos en bandeja", "punto_congelacion_F": 27, "pct_agua": null, "cp_sobre": 0.76, "cp_bajo": 0.40, "latente_fusion": 100, "respiracion": [] },
    { "nombre": "Eggs (frozen)", "nombre_es": "Huevos congelados", "punto_congelacion_F": 27, "pct_agua": null, "cp_sobre": null, "cp_bajo": 0.41, "latente_fusion": 100, "respiracion": [] },
    { "nombre": "Flour", "nombre_es": "Harina", "punto_congelacion_F": null, "pct_agua": 13.5, "cp_sobre": 0.38, "cp_bajo": 0.28, "latente_fusion": null, "respiracion": [] },
    { "nombre": "Flowers (cut)", "nombre_es": "Flores cortadas", "punto_congelacion_F": 32, "pct_agua": null, "cp_sobre": null, "cp_bajo": null, "latente_fusion": null, "respiracion": [], "carga_especial": { "valor": 480, "unidad": "BTU/24h por pie cuadrado de area de piso" } },
    { "nombre": "Furs and Woolens", "nombre_es": "Pieles y lanas", "punto_congelacion_F": null, "pct_agua": null, "cp_sobre": null, "cp_bajo": 0.40, "latente_fusion": null, "respiracion": [] },
    { "nombre": "Honey", "nombre_es": "Miel", "punto_congelacion_F": null, "pct_agua": 18, "cp_sobre": 0.35, "cp_bajo": 0.26, "latente_fusion": 26, "respiracion": [ { "T_F": 40, "min": 1420, "max": 1420 } ] },
    { "nombre": "Hops", "nombre_es": "Lupulo", "punto_congelacion_F": null, "pct_agua": null, "cp_sobre": null, "cp_bajo": null, "latente_fusion": null, "respiracion": [ { "T_F": 35, "min": 1500, "max": 1500 } ] },
    { "nombre": "Ice cream", "nombre_es": "Helado", "punto_congelacion_F_min": 0, "punto_congelacion_F_max": 27, "pct_agua_min": 58, "pct_agua_max": 66, "cp_sobre": 0.78, "cp_bajo": 0.45, "latente_fusion": 96, "respiracion": [] },
    { "nombre": "Lard", "nombre_es": "Manteca de cerdo", "punto_congelacion_F": null, "pct_agua": null, "cp_sobre": 0.52, "cp_bajo": null, "latente_fusion": null, "respiracion": [] },
    { "nombre": "Malt", "nombre_es": "Malta", "punto_congelacion_F": null, "pct_agua": null, "cp_sobre": null, "cp_bajo": null, "latente_fusion": null, "respiracion": [ { "T_F": 50, "min": 1500, "max": 1500 } ] },
    { "nombre": "Maple sugar", "nombre_es": "Azucar de arce", "punto_congelacion_F": null, "pct_agua": 5, "cp_sobre": 0.24, "cp_bajo": 0.21, "latente_fusion": 7, "respiracion": [ { "T_F": 45, "min": 1420, "max": 1420 } ] },
    { "nombre": "Maple syrup", "nombre_es": "Jarabe de arce", "punto_congelacion_F": null, "pct_agua": 36, "cp_sobre": 0.49, "cp_bajo": 0.31, "latente_fusion": 52, "respiracion": [ { "T_F": 45, "min": 1420, "max": 1420 } ] },
    { "nombre": "Milk", "nombre_es": "Leche", "punto_congelacion_F": 31, "pct_agua": 87.5, "cp_sobre": 0.93, "cp_bajo": 0.49, "latente_fusion": 124, "respiracion": [] },
    { "nombre": "Nuts (dried)", "nombre_es": "Frutos secos", "punto_congelacion_F": null, "pct_agua_min": 3, "pct_agua_max": 10, "cp_sobre_min": 0.21, "cp_sobre_max": 0.29, "cp_bajo_min": 0.19, "cp_bajo_max": 0.24, "latente_fusion_min": 4.3, "latente_fusion_max": 14, "respiracion": [ { "T_F": 35, "min": 1000, "max": 1000 } ] },
    { "nombre": "Oleomargarine", "nombre_es": "Margarina", "punto_congelacion_F": null, "pct_agua": 15.5, "cp_sobre": 0.32, "cp_bajo": 0.25, "latente_fusion": 22, "respiracion": [] },
    { "nombre": "Tobacco and cigars", "nombre_es": "Tabaco y puros", "punto_congelacion_F": 25, "pct_agua": null, "cp_sobre": null, "cp_bajo": null, "latente_fusion": null, "respiracion": [] },
    { "nombre": "Yeast", "nombre_es": "Levadura", "punto_congelacion_F": null, "pct_agua": 70.9, "cp_sobre": 0.77, "cp_bajo": 0.41, "latente_fusion": 102, "respiracion": [] }
  ]
};
CF["productos_tropicales"] = {
  "tabla": "Productos tropicales de Ecuador y Colombia",
  "categoria": "frutas",
  "fuente": "Contenido de agua: USDA FoodData Central, dominio publico. Calor especifico y calor latente: derivados por las ecuaciones de Siebel (1892), tambien de dominio publico. NO proviene de Emerson ni de ASHRAE: este archivo se puede publicar tal cual.",
  "version": 1,
  "fecha_actualizacion": "2026-07-25",
  "metodo": [
    "cp sobre congelacion = 0,008 x %agua + 0,20   BTU/lb F",
    "cp bajo congelacion  = 0,003 x %agua + 0,20   BTU/lb F",
    "calor latente de fusion = %agua x 1,44        BTU/lb",
    "Son las mismas reglas que validar.ps1 usa para verificar la base heredada, asi que estos productos son consistentes con los 132 anteriores."
  ],
  "advertencia_punto_congelacion": "El punto de congelacion inicial NO esta publicado por USDA. Los valores estan ESTIMADOS y llevan la marca punto_congelacion_estimado en cada registro. Se comprobo que caen dentro de la banda del propio catalogo: sobre 69 frutas y hortalizas frescas con dato publicado, la media es 29,1 F con desviacion de 1,6 F.",
  "hallazgo_punto_congelacion": "Se probo estimar el punto de congelacion por regresion contra el porcentaje de agua y NO funciona: R2 de 0,07 sobre 69 productos frescos. En producto fresco el punto de congelacion es practicamente constante, cerca de 29 F o menos 1,6 C, y no sigue al contenido de agua. Para un producto nuevo sin dato conviene usar 29 F como valor por defecto antes que una correlacion.",
  "advertencia_respiracion": "El calor de respiracion no esta publicado por producto en fuentes libres. Los valores de este archivo estan ESTIMADOS POR ANALOGIA con productos de la misma familia botanica o de comportamiento semejante ya tabulados en el catalogo, y cada registro declara con cual. Llevan la marca respiracion_estimada. Son ordenes de magnitud, no medidas: en conservacion prolongada conviene confirmarlos con el exportador.",
  "productos": [
    {
      "nombre": "Papaya",
      "nombre_es": "Papaya",
      "punto_congelacion_F": 30.4,
      "punto_congelacion_estimado": true,
      "pct_agua": 88.1,
      "cp_sobre": 0.90,
      "cp_bajo": 0.46,
      "latente_fusion": 127,
      "respiracion": [ { "T_F": 40, "min": 1300, "max": 1800 } ], "respiracion_estimada": true, "respiracion_analogia": "Tomate y papa: climaterica de actividad media",
      "almacenamiento_C": "7 a 13",
      "hr_pct": "85 a 90"
    },
    {
      "nombre": "Passion fruit (maracuya)",
      "nombre_es": "Maracuya",
      "punto_congelacion_F": 29.7,
      "punto_congelacion_estimado": true,
      "pct_agua": 72.9,
      "cp_sobre": 0.78,
      "cp_bajo": 0.42,
      "latente_fusion": 105,
      "respiracion": [ { "T_F": 40, "min": 2500, "max": 3500 } ], "respiracion_estimada": true, "respiracion_analogia": "Familia Passifloraceae: respiracion alta",
      "almacenamiento_C": "7 a 10",
      "hr_pct": "85 a 90"
    },
    {
      "nombre": "Pitahaya (dragon fruit)",
      "nombre_es": "Pitahaya",
      "punto_congelacion_F": 30.4,
      "punto_congelacion_estimado": true,
      "pct_agua": 85.0,
      "cp_sobre": 0.88,
      "cp_bajo": 0.46,
      "latente_fusion": 122,
      "respiracion": [ { "T_F": 40, "min": 700, "max": 1000 } ], "respiracion_estimada": true, "respiracion_analogia": "Melon: fruta de cactacea, respiracion baja",
      "almacenamiento_C": "7 a 10",
      "hr_pct": "85 a 90"
    },
    {
      "nombre": "Cape gooseberry (uchuva)",
      "nombre_es": "Uvilla / uchuva",
      "punto_congelacion_F": 30.0,
      "punto_congelacion_estimado": true,
      "pct_agua": 85.4,
      "cp_sobre": 0.88,
      "cp_bajo": 0.46,
      "latente_fusion": 123,
      "respiracion": [ { "T_F": 40, "min": 1200, "max": 1600 } ], "respiracion_estimada": true, "respiracion_analogia": "Tomate: misma familia Solanaceae",
      "almacenamiento_C": "2 a 8",
      "hr_pct": "85 a 90"
    },
    {
      "nombre": "Sweet granadilla",
      "nombre_es": "Granadilla",
      "punto_congelacion_F": 29.8,
      "punto_congelacion_estimado": true,
      "pct_agua": 80.0,
      "cp_sobre": 0.84,
      "cp_bajo": 0.44,
      "latente_fusion": 115,
      "respiracion": [ { "T_F": 40, "min": 2500, "max": 3500 } ], "respiracion_estimada": true, "respiracion_analogia": "Familia Passifloraceae, igual que maracuya",
      "almacenamiento_C": "7 a 10",
      "hr_pct": "85 a 90"
    },
    {
      "nombre": "Tamarillo (tree tomato)",
      "nombre_es": "Tomate de arbol",
      "punto_congelacion_F": 30.4,
      "punto_congelacion_estimado": true,
      "pct_agua": 87.0,
      "cp_sobre": 0.90,
      "cp_bajo": 0.46,
      "latente_fusion": 125,
      "respiracion": [ { "T_F": 40, "min": 1260, "max": 1260 } ], "respiracion_estimada": true, "respiracion_analogia": "Tomate: misma familia Solanaceae",
      "almacenamiento_C": "3 a 5",
      "hr_pct": "85 a 95"
    },
    {
      "nombre": "Naranjilla (lulo)",
      "nombre_es": "Naranjilla / lulo",
      "punto_congelacion_F": 30.6,
      "punto_congelacion_estimado": true,
      "pct_agua": 92.0,
      "cp_sobre": 0.94,
      "cp_bajo": 0.48,
      "latente_fusion": 132,
      "respiracion": [ { "T_F": 40, "min": 1400, "max": 1800 } ], "respiracion_estimada": true, "respiracion_analogia": "Tomate: misma familia Solanaceae",
      "almacenamiento_C": "7 a 10",
      "hr_pct": "85 a 90"
    },
    {
      "nombre": "Babaco",
      "nombre_es": "Babaco",
      "punto_congelacion_F": 30.9,
      "punto_congelacion_estimado": true,
      "pct_agua": 94.0,
      "cp_sobre": 0.95,
      "cp_bajo": 0.48,
      "latente_fusion": 135,
      "respiracion": [ { "T_F": 40, "min": 1300, "max": 1800 } ], "respiracion_estimada": true, "respiracion_analogia": "Papaya: misma familia Caricaceae",
      "almacenamiento_C": "6 a 8",
      "hr_pct": "85 a 90"
    },
    {
      "nombre": "Gulupa (purple passion fruit)",
      "nombre_es": "Gulupa",
      "punto_congelacion_F": 29.7,
      "punto_congelacion_estimado": true,
      "pct_agua": 73.0,
      "cp_sobre": 0.78,
      "cp_bajo": 0.42,
      "latente_fusion": 105,
      "respiracion": [ { "T_F": 40, "min": 2500, "max": 3500 } ], "respiracion_estimada": true, "respiracion_analogia": "Familia Passifloraceae, igual que maracuya",
      "almacenamiento_C": "6 a 8",
      "hr_pct": "90 a 95"
    },
    {
      "nombre": "Soursop (guanabana)",
      "nombre_es": "Guanabana",
      "punto_congelacion_F": 30.0,
      "punto_congelacion_estimado": true,
      "pct_agua": 81.2,
      "cp_sobre": 0.85,
      "cp_bajo": 0.44,
      "latente_fusion": 117,
      "respiracion": [ { "T_F": 60, "min": 4000, "max": 6000 } ], "respiracion_estimada": true, "respiracion_analogia": "Palta: climaterica muy activa. No baja de 13 C por dano por frio",
      "almacenamiento_C": "13 a 15",
      "hr_pct": "85 a 90"
    },
    {
      "nombre": "Heart of palm (palmito)",
      "nombre_es": "Palmito",
      "punto_congelacion_F": 30.6,
      "punto_congelacion_estimado": true,
      "pct_agua": 90.5,
      "cp_sobre": 0.92,
      "cp_bajo": 0.47,
      "latente_fusion": 130,
      "respiracion": [ { "T_F": 40, "min": 8000, "max": 15000 } ], "respiracion_estimada": true, "respiracion_analogia": "Esparrago: tejido tierno cortado, respiracion muy alta",
      "almacenamiento_C": "0 a 2",
      "hr_pct": "90 a 95"
    },
    {
      "nombre": "Tilapia",
      "nombre_es": "Tilapia",
      "punto_congelacion_F": 30.0,
      "punto_congelacion_estimado": true,
      "pct_agua": 78.1,
      "cp_sobre": 0.82,
      "cp_bajo": 0.43,
      "latente_fusion": 112,
      "respiracion": [],
      "almacenamiento_C": "0 a 1 en fresco, -18 o menos congelada",
      "hr_pct": "90 a 95"
    },
    {
      "nombre": "Cassava (yuca)",
      "nombre_es": "Yuca",
      "punto_congelacion_F": 30.0,
      "punto_congelacion_estimado": true,
      "pct_agua": 59.7,
      "cp_sobre": 0.68,
      "cp_bajo": 0.38,
      "latente_fusion": 86,
      "respiracion": [ { "T_F": 40, "min": 1300, "max": 1800 } ], "respiracion_estimada": true, "respiracion_analogia": "Papa: raiz de reserva",
      "almacenamiento_C": "0 a 5 parafinada",
      "hr_pct": "85 a 90"
    },
    {
      "nombre": "Taro (malanga)",
      "nombre_es": "Malanga",
      "punto_congelacion_F": 30.4,
      "punto_congelacion_estimado": true,
      "pct_agua": 70.6,
      "cp_sobre": 0.76,
      "cp_bajo": 0.41,
      "latente_fusion": 102,
      "respiracion": [ { "T_F": 40, "min": 1710, "max": 1710 } ], "respiracion_estimada": true, "respiracion_analogia": "Camote: raiz de reserva",
      "almacenamiento_C": "7 a 10",
      "hr_pct": "85 a 90"
    },
    {
      "nombre": "Cocoa beans, dried",
      "nombre_es": "Cacao en grano seco",
      "punto_congelacion_F": null,
      "pct_agua": 7.0,
      "cp_sobre": 0.26,
      "cp_bajo": 0.22,
      "latente_fusion": 10,
      "respiracion": [],
      "almacenamiento_C": "15 a 18, ambiente seco",
      "hr_pct": "55 a 65",
      "nota": "Producto seco: no se congela. Lo critico en camara no es la carga termica sino mantener la humedad baja para evitar moho."
    },
    {
      "nombre": "Coffee, green beans",
      "nombre_es": "Cafe verde en grano",
      "punto_congelacion_F": null,
      "pct_agua": 11.0,
      "cp_sobre": 0.29,
      "cp_bajo": 0.23,
      "latente_fusion": 16,
      "respiracion": [],
      "almacenamiento_C": "10 a 15, ambiente seco",
      "hr_pct": "50 a 60",
      "nota": "Producto seco: no se congela. Se refrigera para conservar perfil de taza; manda el control de humedad."
    },
    {
      "nombre": "Quinoa, grain",
      "nombre_es": "Quinua",
      "punto_congelacion_F": null,
      "pct_agua": 13.3,
      "cp_sobre": 0.31,
      "cp_bajo": 0.24,
      "latente_fusion": 19,
      "respiracion": [],
      "almacenamiento_C": "10 a 18, ambiente seco",
      "hr_pct": "50 a 60",
      "nota": "Grano seco: no se congela."
    },
    {
      "nombre": "Panela (unrefined cane sugar)",
      "nombre_es": "Panela",
      "punto_congelacion_F": null,
      "pct_agua": 7.0,
      "cp_sobre": 0.26,
      "cp_bajo": 0.22,
      "latente_fusion": 10,
      "respiracion": [],
      "almacenamiento_C": "15 a 20, ambiente seco",
      "hr_pct": "50 a 60",
      "nota": "Producto seco e higroscopico: absorbe humedad y se apelmaza. La humedad manda sobre la temperatura."
    }
  ]
};
CF["productos_vegetales"] = {
  "tabla": "Tabla 10 - Food Products Data",
  "categoria": "vegetales",
  "fuente": "Emerson Climate Technologies, Refrigeration Manual Part 3, Form AE-103 R3, paginas 14-1 y 14-2",
  "version": 1,
  "fecha_actualizacion": "2026-07-25",
  "unidades": {
    "punto_congelacion": "F",
    "pct_agua": "%",
    "cp_sobre": "BTU/(lb)(F)",
    "cp_bajo": "BTU/(lb)(F)",
    "latente_fusion": "BTU/lb",
    "respiracion": "BTU por 24 h por tonelada"
  },
  "productos": [
    { "nombre": "Artichokes", "nombre_es": "Alcachofas", "punto_congelacion_F": 29.1, "pct_agua": 83.7, "cp_sobre": 0.87, "cp_bajo": 0.45, "latente_fusion": 120, "respiracion": [ { "T_F": 40, "min": 10140, "max": 10140 } ] },
    { "nombre": "Asparagus", "nombre_es": "Esparragos", "punto_congelacion_F": 29.8, "pct_agua": 93, "cp_sobre": 0.94, "cp_bajo": 0.48, "latente_fusion": 134, "respiracion": [ { "T_F": 40, "min": 11700, "max": 23100 } ] },
    { "nombre": "Beans, string", "nombre_es": "Porotos verdes", "punto_congelacion_F": 29.7, "pct_agua": 88.9, "cp_sobre": 0.91, "cp_bajo": 0.47, "latente_fusion": 128, "respiracion": [ { "T_F": 40, "min": 9700, "max": 11400 } ] },
    { "nombre": "Beans, Lima", "nombre_es": "Habas Lima", "punto_congelacion_F": 30.1, "pct_agua": 66.5, "cp_sobre": 0.73, "cp_bajo": 0.40, "latente_fusion": 94, "respiracion": [ { "T_F": 40, "min": 4300, "max": 6100 } ] },
    { "nombre": "Beans, dried", "nombre_es": "Porotos secos", "punto_congelacion_F": null, "pct_agua": 12.5, "cp_sobre": 0.30, "cp_bajo": 0.24, "latente_fusion": 18, "respiracion": [] },
    { "nombre": "Beets", "nombre_es": "Betarragas", "punto_congelacion_F": 31.1, "pct_agua": 87.6, "cp_sobre": 0.90, "cp_bajo": 0.46, "latente_fusion": 126, "respiracion": [ { "T_F": 32, "min": 2700, "max": 2700 }, { "T_F": 40, "min": 4100, "max": 4100 } ] },
    { "nombre": "Broccoli", "nombre_es": "Brocoli", "punto_congelacion_F": 29.2, "pct_agua": 89.9, "cp_sobre": 0.92, "cp_bajo": 0.47, "latente_fusion": 130, "respiracion": [ { "T_F": 40, "min": 11000, "max": 17000 } ] },
    { "nombre": "Brussels sprouts", "nombre_es": "Coles de Bruselas", "punto_congelacion_F": 31, "pct_agua": 84.9, "cp_sobre": 0.88, "cp_bajo": 0.46, "latente_fusion": 122, "respiracion": [ { "T_F": 40, "min": 6600, "max": 11000 } ] },
    { "nombre": "Cabbage", "nombre_es": "Repollo", "punto_congelacion_F": 31.2, "pct_agua": 92.4, "cp_sobre": 0.94, "cp_bajo": 0.47, "latente_fusion": 132, "respiracion": [ { "T_F": 40, "min": 1700, "max": 1700 } ] },
    { "nombre": "Carrots", "nombre_es": "Zanahorias", "punto_congelacion_F": 29.6, "pct_agua": 88.2, "cp_sobre": 0.90, "cp_bajo": 0.46, "latente_fusion": 126, "respiracion": [ { "T_F": 32, "min": 2100, "max": 2100 }, { "T_F": 40, "min": 3500, "max": 3500 } ] },
    { "nombre": "Cauliflower", "nombre_es": "Coliflor", "punto_congelacion_F": 30.1, "pct_agua": 91.7, "cp_sobre": 0.93, "cp_bajo": 0.47, "latente_fusion": 132, "respiracion": [ { "T_F": 40, "min": 4500, "max": 4500 } ] },
    { "nombre": "Celery", "nombre_es": "Apio", "punto_congelacion_F": 29.7, "pct_agua": 93.7, "cp_sobre": 0.95, "cp_bajo": 0.48, "latente_fusion": 135, "respiracion": [ { "T_F": 32, "min": 1600, "max": 1600 }, { "T_F": 40, "min": 2400, "max": 2400 } ] },
    { "nombre": "Corn (green)", "nombre_es": "Choclo verde", "punto_congelacion_F": 28.9, "pct_agua": 75.5, "cp_sobre": 0.79, "cp_bajo": 0.42, "latente_fusion": 106, "respiracion": [ { "T_F": 32, "min": 7200, "max": 11300 }, { "T_F": 40, "min": 10600, "max": 13200 } ] },
    { "nombre": "Corn (dried)", "nombre_es": "Maiz seco", "punto_congelacion_F": null, "pct_agua": 10.5, "cp_sobre": 0.28, "cp_bajo": 0.23, "latente_fusion": 15, "respiracion": [] },
    { "nombre": "Cucumbers", "nombre_es": "Pepinos", "punto_congelacion_F": 30.5, "pct_agua": 96.1, "cp_sobre": 0.97, "cp_bajo": 0.49, "latente_fusion": 137, "respiracion": [] },
    { "nombre": "Eggplant", "nombre_es": "Berenjena", "punto_congelacion_F": 30.4, "pct_agua": 92.7, "cp_sobre": 0.94, "cp_bajo": 0.48, "latente_fusion": 132, "respiracion": [] },
    { "nombre": "Endive (escarole)", "nombre_es": "Endibia / escarola", "punto_congelacion_F": 30.9, "pct_agua": 93.3, "cp_sobre": 0.94, "cp_bajo": 0.48, "latente_fusion": 132, "respiracion": [] },
    { "nombre": "Horseradish", "nombre_es": "Rabano picante", "punto_congelacion_F": 26.4, "pct_agua": 73.4, "cp_sobre": 0.78, "cp_bajo": 0.42, "latente_fusion": 104, "respiracion": [] },
    { "nombre": "Kale", "nombre_es": "Col rizada", "punto_congelacion_F": 30.7, "pct_agua": 86.6, "cp_sobre": 0.89, "cp_bajo": 0.46, "latente_fusion": 124, "respiracion": [] },
    { "nombre": "Kohlrabi", "nombre_es": "Colinabo", "punto_congelacion_F": 30, "pct_agua": 90, "cp_sobre": 0.92, "cp_bajo": 0.47, "latente_fusion": 128, "respiracion": [] },
    { "nombre": "Lettuce", "nombre_es": "Lechuga", "punto_congelacion_F": 31.2, "pct_agua": 94.8, "cp_sobre": 0.96, "cp_bajo": 0.48, "latente_fusion": 136, "respiracion": [ { "T_F": 32, "min": 2300, "max": 2300 }, { "T_F": 40, "min": 2700, "max": 2700 } ] },
    { "nombre": "Mushrooms", "nombre_es": "Champinones", "punto_congelacion_F": 30.2, "pct_agua": 91.1, "cp_sobre": 0.93, "cp_bajo": 0.47, "latente_fusion": 130, "respiracion": [ { "T_F": 32, "min": 6200, "max": 6200 }, { "T_F": 50, "min": 22000, "max": 22000 } ] },
    { "nombre": "Olives", "nombre_es": "Aceitunas", "punto_congelacion_F": 28.5, "pct_agua": 75.2, "cp_sobre": 0.80, "cp_bajo": 0.42, "latente_fusion": 108, "respiracion": [] },
    { "nombre": "Onions", "nombre_es": "Cebollas", "punto_congelacion_F": 30.1, "pct_agua": 87.5, "cp_sobre": 0.90, "cp_bajo": 0.46, "latente_fusion": 124, "respiracion": [ { "T_F": 32, "min": 700, "max": 1100 }, { "T_F": 40, "min": 1800, "max": 1800 } ] },
    { "nombre": "Parsnips", "nombre_es": "Chirivias", "punto_congelacion_F": 28.9, "pct_agua": 78.6, "cp_sobre": 0.84, "cp_bajo": 0.46, "latente_fusion": 112, "respiracion": [] },
    { "nombre": "Peas (green)", "nombre_es": "Arvejas verdes", "punto_congelacion_F": 30, "pct_agua": 74.3, "cp_sobre": 0.79, "cp_bajo": 0.42, "latente_fusion": 106, "respiracion": [ { "T_F": 40, "min": 13200, "max": 16000 } ] },
    { "nombre": "Peas (dried)", "nombre_es": "Arvejas secas", "punto_congelacion_F": null, "pct_agua": 9.5, "cp_sobre": 0.28, "cp_bajo": 0.22, "latente_fusion": 14, "respiracion": [] },
    { "nombre": "Peppers (sweet)", "nombre_es": "Pimiento", "punto_congelacion_F": 30.1, "pct_agua": 92.4, "cp_sobre": 0.94, "cp_bajo": 0.47, "latente_fusion": 132, "respiracion": [ { "T_F": 40, "min": 4700, "max": 4700 } ] },
    { "nombre": "Potatoes (white)", "nombre_es": "Papas blancas", "punto_congelacion_F": 28.9, "pct_agua": 77.8, "cp_sobre": 0.82, "cp_bajo": 0.43, "latente_fusion": 111, "respiracion": [ { "T_F": 40, "min": 1300, "max": 1800 } ] },
    { "nombre": "Potatoes (sweet)", "nombre_es": "Camote / batata", "punto_congelacion_F": 28.5, "pct_agua": 68.5, "cp_sobre": 0.75, "cp_bajo": 0.40, "latente_fusion": 97, "respiracion": [ { "T_F": 40, "min": 1710, "max": 1710 } ] },
    { "nombre": "Pumpkin", "nombre_es": "Zapallo", "punto_congelacion_F": 30.1, "pct_agua": 90.5, "cp_sobre": 0.92, "cp_bajo": 0.47, "latente_fusion": 130, "respiracion": [] },
    { "nombre": "Radishes", "nombre_es": "Rabanos", "punto_congelacion_F": 30.1, "pct_agua": 93.6, "cp_sobre": 0.95, "cp_bajo": 0.48, "latente_fusion": 134, "respiracion": [] },
    { "nombre": "Rhubarb", "nombre_es": "Ruibarbo", "punto_congelacion_F": 28.4, "pct_agua": 94.9, "cp_sobre": 0.96, "cp_bajo": 0.48, "latente_fusion": 134, "respiracion": [] },
    { "nombre": "Sauerkraut", "nombre_es": "Chucrut", "punto_congelacion_F": 26, "pct_agua": 89, "cp_sobre": 0.92, "cp_bajo": 0.47, "latente_fusion": 129, "respiracion": [] },
    { "nombre": "Spinach", "nombre_es": "Espinaca", "punto_congelacion_F": 30.3, "pct_agua": 92.7, "cp_sobre": 0.94, "cp_bajo": 0.48, "latente_fusion": 132, "respiracion": [ { "T_F": 40, "min": 8000, "max": 8000 } ] },
    { "nombre": "Squash", "nombre_es": "Zapallo italiano", "punto_congelacion_F": 30.1, "pct_agua": 90.5, "cp_sobre": 0.92, "cp_bajo": 0.47, "latente_fusion": 130, "respiracion": [] },
    { "nombre": "Tomatoes (green)", "nombre_es": "Tomates verdes", "punto_congelacion_F": 30.4, "pct_agua": 94.7, "cp_sobre": 0.95, "cp_bajo": 0.48, "latente_fusion": 134, "respiracion": [ { "T_F": 60, "min": 6230, "max": 6230 } ] },
    { "nombre": "Tomatoes (ripening)", "nombre_es": "Tomates madurando", "punto_congelacion_F": 30.4, "pct_agua": 94.1, "cp_sobre": 0.95, "cp_bajo": 0.48, "latente_fusion": 134, "respiracion": [ { "T_F": 40, "min": 1260, "max": 1260 } ] },
    { "nombre": "Turnips", "nombre_es": "Nabos", "punto_congelacion_F": 30.5, "pct_agua": 90.9, "cp_sobre": 0.93, "cp_bajo": 0.47, "latente_fusion": 130, "respiracion": [ { "T_F": 32, "min": 1900, "max": 1900 }, { "T_F": 40, "min": 2200, "max": 2200 } ] },
    { "nombre": "Vegetables (mixed)", "nombre_es": "Verduras surtidas", "punto_congelacion_F": 30, "pct_agua": 90, "cp_sobre": 0.90, "cp_bajo": 0.45, "latente_fusion": 130, "respiracion": [] }
  ]
};
CF["refrigerantes"] = {
  "tabla": "Refrigerantes y potencial de calentamiento global",
  "fuente": "Valores de GWP a 100 años del IPCC (AR4/AR5), recogidos en el Reglamento F-Gas de la Unión Europea y en la Enmienda de Kigali al Protocolo de Montreal. Valores de dominio público.",
  "version": 1,
  "fecha_actualizacion": "2026-07-25",
  "uso_en_calculo": [
    "El GWP multiplicado por la carga de refrigerante y por la tasa de fuga anual da la emisión directa en toneladas de CO2 equivalente al año.",
    "Sumada a la emisión indirecta por consumo eléctrico da el TEWI simplificado, que es el indicador que compara de verdad dos soluciones."
  ],
  "columnas": ["refrigerante", "gwp_100", "tipo", "rango_tipico"],
  "filas": [
    ["R-717 amoníaco", 0, "natural", "Media y baja temperatura, industrial"],
    ["R-744 CO2", 1, "natural", "Transcrítico y cascada, comercial e industrial"],
    ["R-1270 propileno", 2, "natural (A3)", "Baja carga, equipos compactos"],
    ["R-290 propano", 3, "natural (A3)", "Media y baja temperatura, baja carga"],
    ["R-600a isobutano", 3, "natural (A3)", "Refrigeración doméstica y comercial pequeña"],
    ["R-1234ze(E)", 7, "HFO (A2L)", "Media temperatura, enfriadoras"],
    ["R-454C", 148, "HFO/HFC (A2L)", "Reemplazo de R-404A"],
    ["R-455A", 148, "HFO/HFC (A2L)", "Media y baja temperatura"],
    ["R-513A", 631, "HFO/HFC (A1)", "Reemplazo de R-134a"],
    ["R-32", 675, "HFC (A2L)", "Aire acondicionado"],
    ["R-448A", 1387, "HFC/HFO (A1)", "Reemplazo de R-404A, comercial"],
    ["R-449A", 1397, "HFC/HFO (A1)", "Reemplazo de R-404A, comercial"],
    ["R-134a", 1430, "HFC (A1)", "Media temperatura"],
    ["R-407C", 1774, "HFC (A1)", "Aire acondicionado y media temperatura"],
    ["R-22", 1810, "HCFC (A1)", "En eliminación por el Protocolo de Montreal"],
    ["R-404A", 3922, "HFC (A1)", "Baja temperatura, en retirada por F-Gas"],
    ["R-507A", 3985, "HFC (A1)", "Baja temperatura, en retirada por F-Gas"]
  ],
  "tasa_fuga_anual_pct_por_defecto": 10,
  "nota_fuga": "La tasa de fuga anual típica de una instalación comercial va de 5 a 15 por ciento de la carga. En instalaciones antiguas o con muchas uniones mecánicas puede ser mayor.",
  "proteccion_puerta": {
    "columnas": ["descripcion", "efectividad"],
    "filas": [
      ["Sin protección", 0.0],
      ["Cortina de lamas de PVC en buen estado", 0.85],
      ["Cortina de lamas desgastada o incompleta", 0.6],
      ["Cortina de aire", 0.7],
      ["Puerta rápida enrollable", 0.75],
      ["Antecámara o esclusa", 0.9]
    ],
    "fuente": "Rangos de efectividad citados habitualmente en la literatura de ASHRAE Refrigeration para dispositivos de protección de puertas."
  }
};
CF["tabla11_solidos"] = {
  "tabla": "Tabla 11 - Properties of Solids",
  "fuente": "Emerson Climate Technologies, Refrigeration Manual Part 3, Form AE-103 R3, paginas 14-4 y 14-5. From 1967 ASHRAE Handbook of Fundamentals.",
  "version": 1,
  "fecha_actualizacion": "2026-07-25",
  "notas_original": [
    "k = BTU por (hr)(sq ft)(F deg por ft)",
    "Gravedad especifica = razon de densidad (lb/ft3) respecto al agua (62.4 lb/ft3)"
  ],
  "columnas": ["nombre", "cp_btu_lb_F", "cp_temp_F", "gravedad_especifica", "k_temp_F", "k"],
  "filas": [
    ["Aluminio", 0.226, 100, "2.55-2.80", 32, 122.0],
    ["Bronce de aluminio", null, null, 7.7, null, null],
    ["Alundum (alúmina fundida)", 0.186, 212, null, null, null],
    ["Asbesto", 0.25, "0.47-0.58", "2.1-2.8", 32, 0.09],
    ["Asfalto", "0.3-0.4", null, null, null, null],
    ["Cenizas", 0.20, null, "0.64-0.72", 32, 0.041],
    ["Baquelita", "0.3-0.4", null, null, null, null],
    ["Mampostería de ladrillo", 0.2, null, "1.85-2.00", 70, "0.33-0.92"],
    ["Latón rojo", 0.08991, 32, "8.4-8.7", 32, 59.5],
    ["Latón amarillo", 0.08831, 32, "8.4-8.7", 32, 49.4],
    ["Bismuto estaño", 0.040, null, null, 64, 37.6],
    ["Bronce de campana", 0.086, "59-208.4", null, null, null],
    ["Bronce", 0.104, null, "7.4-8.8", null, null],
    ["Cadmio", 0.0548, null, 8.65, 64, 53.7],
    ["Carbón de retorta", 0.204, null, null, null, null],
    ["Cartón", null, null, null, null, "0.1-0.2"],
    ["Celulosa", 0.32, null, null, null, null],
    ["Cemento, clinker Portland", 0.186, null, "1.5-2.4", null, 0.017],
    ["Carbón vegetal", 0.242, null, "0.28-0.57", 172, 0.051],
    ["Ladrillo de cromo", 0.17, null, null, null, null],
    ["Arcilla", 0.224, null, 1.28, null, null],
    ["Carbón mineral", "0.26-0.37", null, "0.65-1.8", null, null],
    ["Alquitranes de hulla", 0.35, 104, null, null, null],
    ["Aceites de alquitrán de hulla", 0.34, "59-194", null, null, null],
    ["Coque", 0.265, "69.8-752", "1.0-1.4", 32, 0.106],
    ["Hormigón de piedra", 0.156, "70-213", "1.5-2.4", null, "0.5-0.75"],
    ["Cobre fundido y laminado", null, null, "8.8-8.9", 32, 224.0],
    ["Criolita", 0.253, "60.8-131", null, null, null],
    ["Tiza", 0.215, null, "1.8-2.8", null, 0.48],
    ["Corcho granulado prensado", 0.485, null, "0.22-0.26", 24, 0.028],
    ["Algodón, lino y cáñamo", null, null, "1.47-1.50", 32, 0.033],
    ["Algodón en rama", null, null, null, null, 0.01],
    ["Diamante", 0.147, null, null, null, null],
    ["Tierra seca y compactada", null, null, "1.5 (suelta)", 32, 0.035],
    ["Tierra seca y compactada", null, null, "1.5 (suelta)", 100, 0.039],
    ["Fieltro", null, null, null, 86, 0.022],
    ["Ladrillo refractario", 0.198, 212, null, null, null],
    ["Fluorita", 0.21, 86, null, null, null],
    ["Vidrio crown", "0.16-0.2", null, "2.4-2.7", null, "0.333-0.5"],
    ["Vidrio flint", 0.117, null, "3.2-4.7", null, null],
    ["Vidrio pyrex", 0.20, null, null, null, null],
    ["Vidrio de silicato", "0.188-0.2", "32-212", null, null, null],
    ["Lana de vidrio", 0.157, null, null, null, null],
    ["Vidrio común", null, null, "2.40-2.80", null, null],
    ["Grafito en polvo", 0.165, "78.8-168.8", null, 104, 0.106],
    ["Grafito", 0.20, "68-212", "2.4-2.7", null, "1.0-2.32"],
    ["Yeso", 0.259, "60.8-114.8", "2.3-2.8", 68, 0.25],
    ["Alpaca", 0.0946, "32-212", 8.58, null, null],
    ["Granate", 0.1758, "60.8-212", null, null, null],
    ["Oro", 0.0308, null, "19.25-19.2", 64, 169.0],
    ["Hielo", 0.350, -112, "0.88-0.92", 32, "1.28 (agua)"],
    ["Hielo", 0.434, -40, null, 14, 1.35],
    ["Hielo", 0.465, -4, null, -4, 1.41],
    ["Hielo", 0.487, 32, null, -22, 1.471],
    ["Hielo", null, null, null, -40, 1.538],
    ["Caucho natural", 0.481, -148, null, null, null],
    ["Hierro fundido gris", 0.101, null, "7.03-7.13", 129, 27.6],
    ["Arrabio", null, null, 7.2, null, null],
    ["Hierro forjado", null, null, "7.6-7.9", 64, 34.9],
    ["Plomo", 0.030, null, 11.34, 64, 20.1],
    ["Caliza", 0.217, "59-212", "2.1-2.8", null, "0.3-0.75"],
    ["Litargirio", 0.055, null, null, null, null],
    ["Cuero", null, null, "0.86-1.02", null, 0.092],
    ["Lino", null, null, null, null, 0.05],
    ["Mármol", 0.21, 64.4, "2.4-2.8", null, "1.2-1.7"],
    ["Manganeso", null, null, 7.42, null, null],
    ["Magnesia", 0.234, 212, null, null, 0.04],
    ["Ladrillo de magnesita", 0.222, 212, null, null, "0.9-2.5"],
    ["Metal monel", 0.127, "68-2372", 8.97, null, null],
    ["Mica", 0.10, 68, null, null, 0.44],
    ["Níquel", 0.103, null, 8.9, 64, 34.4],
    ["Acero al níquel", 0.109, null, null, null, null],
    ["Papel", 0.324, null, "0.70-1.15", null, 0.075],
    ["Parafina", 0.6939, "32-68", "0.87-0.91", 86, 0.145],
    ["Platino fundido", null, null, 21.5, 64, 40.2],
    ["Porcelana", 0.22, null, null, 329, 0.945],
    ["Pirita de cobre", 0.131, "66.2-122", null, null, null],
    ["Pirita de hierro", 0.136, "59-208.4", null, null, null],
    ["Revoque de cal", null, null, null, null, "0.25-0.05"],
    ["Aserrín", null, null, 0.21, 68, 0.042],
    ["Sal de roca", 0.219, "55.4-113", null, null, null],
    ["Caucho manufacturado", 0.48, null, "1.0-2.0", 100, 0.92],
    ["Salitre", null, null, 1.07, null, null],
    ["Arena", 0.191, null, "1.4-1.9", 68, 0.188],
    ["Sílice", 0.316, null, null, null, null],
    ["Acero estirado en frío", 0.12, null, 7.83, 32, 28.0],
    ["Piedra", 0.2, null, null, null, null],
    ["Plata fundida", null, null, "10.4-10.6", 64, 244.0],
    ["Nieve recién caída", null, null, 0.125, null, null],
    ["Estaño fundido", 0.053, null, "7.2-7.5", 64, 37.6],
    ["Tungsteno", 0.034, null, 19.22, null, null],
    ["Alquitrán bituminoso", null, null, 1.20, null, null],
    ["Madera de roble", 0.570, null, "0.65-0.84", null, "0.085-0.125"],
    ["Madera (la mayoría varía entre)", "0.45-0.65", null, null, null, null],
    ["Madera de fresno", null, null, "0.55-0.71", null, null],
    ["Madera de abeto", 0.65, null, 0.40, 86, 0.094],
    ["Madera de olmo", null, null, 0.56, null, null],
    ["Madera de nogal americano", null, null, "0.74-0.80", null, null],
    ["Madera de caoba", null, null, "0.56-0.85", null, null],
    ["Madera de arce", null, null, "0.53-0.68", 86, 0.092],
    ["Madera de pino", 0.67, null, "0.43-0.67", 86, "0.065-0.085"],
    ["Madera de picea", null, null, 0.45, null, null],
    ["Madera de nogal", null, null, 0.59, null, null],
    ["Lana", null, null, 1.32, 86, 0.022],
    ["Zinc fundido", null, null, 7.1, 32, 63.0]
  ]
};
CF["tabla12_liquidos"] = {
  "tabla": "Tabla 12 - Properties of Liquids",
  "fuente": "Emerson Climate Technologies, Refrigeration Manual Part 3, Form AE-103 R3, pagina 14-6",
  "version": 1,
  "fecha_actualizacion": "2026-07-25",
  "uso": "Referencia. Para camaras de frio la fila relevante es la salmuera de cloruro de calcio.",
  "anomalias_del_original": [
    "Acetone: punto de congelacion impreso como 203 F sin signo negativo. Valor real aproximado -138.5 F. Verificado a 400 dpi: el error esta en el manual impreso, no en la lectura.",
    "Aniline: punto de ebullicion impreso 63.2 F. Valor real aproximado 363 F.",
    "Hexane: punto de ebullicion impreso 755.6 F. Valor real aproximado 156 F.",
    "Alcohol-ethyl y Alcohol-methyl: la columna k muestra 0.789 y 0.796, que corresponden a la gravedad especifica y no a la conductividad termica. Desalineacion del original."
  ],
  "columnas": ["nombre", "ebullicion_F", "h_vaporizacion_btu_lb", "cp_btu_lb_F", "cp_temp_F", "viscosidad_cP", "visc_temp_F", "congelacion_F", "h_fusion_btu_lb", "densidad_temp_F", "densidad_lb_ft3", "k", "k_temp_F"],
  "filas": [
    ["Acetaldehído", 69.44, 244.8, null, null, 0.275, 32, -190.3, null, null, null, null, null],
    ["Ácido acético", 245.3, 173.0, 0.522, "78.8-203", 1.040, 86, 62.00, 77.7, null, null, 0.099, 68],
    ["Acetona", 132.98, 223.0, 0.506, 32, null, null, 203, 42.1, 68, 49.4, 0.102, "77-86"],
    ["Alcohol alílico", 206.6, 293.0, 0.665, "69.8-204.8", 1.168, 86, -200.2, 48.0, null, null, 0.104, "77-86"],
    ["Alcohol amílico", 280.22, 216.0, null, null, null, null, -109.3, 48.0, null, null, 0.094, 86],
    ["Amoníaco", null, null, 1.099, 32, null, null, null, 94.5, null, null, 0.29, "5-86"],
    ["Alcohol etílico", 172.94, 366.9, 0.548, 0, 1.2, 68, -174.28, 45.6, null, null, 0.789, null],
    ["Alcohol metílico", 148.46, 472.0, 0.601, 64, 0.596, 68, -142.6, 39.6, null, null, 0.796, null],
    ["Anilina", 63.2, 198.0, 0.514, 60, 4.467, 68, 20.77, 48.6, 32, 64.5, null, null],
    ["Benzol", null, null, 0.340, 50, 0.567, 86, null, 55.0, null, null, null, null],
    ["Benceno", 176.18, 167.0, null, null, null, null, null, 54.6, 32, 56.1, 0.092, 86],
    ["Bromo", 137.84, 86.4, 0.107, "13-45", 0.911, 86, null, 29.15, 32, null, null, null],
    ["Alcohol butílico", 243.86, 254.0, 0.687, "20-115", null, null, -129.64, 54.0, null, null, 0.097, 86],
    ["Ácido butírico", 326.3, 205.0, 0.515, "20-100", 1.304, 86, 22.01, 54.2, null, null, null, null],
    ["Salmuera de cloruro de calcio", null, null, 0.764, 5, null, null, null, null, 5, 1.14, null, null],
    ["Salmuera de cloruro de calcio", null, null, 0.787, 68, null, null, null, null, 68, 1.14, "30% = 0.32", 86],
    ["Salmuera de cloruro de calcio", null, null, 0.695, 4, null, null, null, null, 4, 1.20, "15% = 0.34", 86],
    ["Salmuera de cloruro de calcio", null, null, 0.725, 68, null, null, null, null, 68, 1.20, null, null],
    ["Salmuera de cloruro de calcio", null, null, 0.651, -4, null, null, null, null, -4, 1.26, null, null],
    ["Salmuera de cloruro de calcio", null, null, 0.676, 68, null, null, null, null, 68, 1.26, null, null],
    ["Ácido carbólico (fenol)", 359.96, null, 0.561, "57.2-78.8", null, null, null, 52.2, 59, 60.2, null, null],
    ["Disulfuro de carbono", 115.27, 151.3, 0.240, 68, 0.352, 86, -169.24, null, 32, 80.6, 0.093, 86],
    ["Tetracloruro de carbono", 169.16, 83.5, 0.201, 68, 0.848, 86, -9.04, 74.8, null, null, 0.107, 32],
    ["Cloroformo", 142.16, 106.0, 0.226, 59, 0.519, 86, -82.3, null, null, 1.50, 0.080, 86],
    ["Sulfato de cobre", null, null, 0.848, 58, null, null, null, null, null, null, null, null],
    ["Sulfato de cobre", null, null, 0.951, 57, null, null, null, null, null, null, null, null],
    ["Sulfato de cobre", null, null, 0.975, 59, null, null, null, null, null, null, null, null],
    ["Difenilamina", 575.6, null, 0.464, 125, null, null, 127.36, null, null, null, null, null],
    ["Decano", 345.2, 108.2, 0.500, "0-50", 0.77, 72.14, -22, 86.4, null, null, 0.085, 86],
    ["Dow Corning 500 (silicona)", 211.1, null, null, null, null, null, null, null, null, null, null, null],
    ["Dow Corning 500 (silicona)", 305.6, null, null, null, null, null, null, null, null, null, null, null],
    ["Dow Corning 500 (silicona)", 377.6, null, null, null, null, null, null, null, null, null, null, null],
    ["Dow Corning 500 (silicona)", 446.0, null, null, null, null, null, null, null, null, null, null, null],
    ["Éter etílico", 94.08, 159.0, 0.529, 32, 0.223, 86, -176.8, 41.4, null, 0.736, 0.08, 86],
    ["Acetato de etilo", 170.78, "183.5 (a 32 F)", 0.475, 68, null, null, -118.84, 51.1, null, null, 0.101, 68],
    ["Alcohol etílico", 172.94, 367.0, 0.548, 32, null, null, null, 44.8, null, null, 0.105, 68],
    ["Bromuro de etilo", 101.12, 108.0, 0.215, "59-68", 0.368, 86, -182.2, null, null, null, null, null],
    ["Cloruro de etilo", 53.96, 166.5, 0.367, 32, null, null, -217.66, null, null, null, null, null],
    ["Yoduro de etilo", 161.78, 81.3, 0.161, 68, 0.540, 86, -163.3, null, null, null, 0.064, 104],
    ["Bromuro de etileno", 269.06, 83.0, 0.173, 68, 1.475, 86, 50.108, null, null, null, null, null],
    ["Cloruro de etileno", 182.66, 139.0, 0.299, 68, 0.736, 86, -31, null, null, null, null, null],
    ["Etilenglicol", 386.6, 344.0, null, null, null, null, null, null, null, null, 0.153, 32],
    ["Ácido fórmico", 213.44, 216.0, 0.525, "68-212", 1.46, 86, 47.12, 104.4, null, null, null, null],
    ["Glicerina", 554, null, 0.575, "59-120", 830.0, 68.54, 64.58, 85.6, null, null, null, null],
    ["Glicerol", 555.08, null, null, null, 207.0, 68, 64.4, 85.5, null, null, 0.164, 68],
    ["Gasolina", "158-194", null, 0.5, "32-212", null, null, null, null, null, 0.73, null, null],
    ["Heptano", 209.12, 137.1, 0.490, 68, 0.375, 86, -131.08, 60.6, null, null, 0.081, 86],
    ["Hexano", 755.6, 142.5, 0.600, 68, 0.296, 86, -139, 65.0, null, null, 0.080, 86],
    ["Alcohol isobutílico", 224.42, 248.0, null, null, null, null, null, null, null, null, null, null],
    ["Queroseno", null, null, 0.5, "32-212", null, null, null, null, null, "0.78-0.82", 0.086, 68],
    ["Aceite de linaza", null, null, null, null, 33.1, 86, null, null, null, 0.925, null, null],
    ["Acetato de metilo", 134.78, 176.5, 0.468, 59, null, null, -144.49, null, null, null, null, null],
    ["Yoduro de metilo", 108.14, 82.6, null, null, 0.460, 86, -86.98, null, null, null, null, null],
    ["Naftaleno", 424.4, 136.0, 0.396, 185, null, null, 176.396, 64.0, null, null, null, null],
    ["Nitrobenzol", null, null, 0.350, 58, null, null, null, null, null, null, null, null],
    ["Ácido nítrico", 186.8, null, null, null, null, null, -43.6, 17.15, null, "91% = 1.50", null, null],
    ["Nitrobenceno", 411.62, 142.2, 0.350, 57.2, null, null, 42.53, 40.5, null, null, 0.095, 86],
    ["Nonano", 302, null, 0.503, "32-122", 0.62, 72.14, -64.66, null, null, null, 0.084, 86],
    ["Aceite de ricino", null, null, 0.434, null, 451.0, 86, null, null, 59, 60.5, 0.104, 68],
    ["Aceite de cidra", null, null, 0.438, 42, null, null, null, null, null, null, null, null],
    ["Aceite de oliva", null, null, 0.471, 44, 54.0, 86, null, null, 59, 0.906, 0.097, 68],
    ["Aceite de sésamo", null, null, 0.387, null, null, null, null, null, null, null, null, null],
    ["Aceite de colza", null, null, null, null, 42.2, 100.04, null, null, 59, 57.0, null, null],
    ["Aceite de soya", null, null, null, null, 40.6, 86, null, null, 194, 0.919, null, null],
    ["Aceite de esperma de ballena", null, null, null, null, 42.0, 60.08, null, null, 77, 55.0, null, null]
  ]
};
CF["tabla13_almacenamiento"] = {
  "tabla": "Tabla 13 - Storage Requirements and Properties of Perishable Products",
  "fuente": "Emerson Climate Technologies, Refrigeration Manual Part 3, Form AE-103 R3, paginas 14-9 y 14-10. From 1966-1967 ASHRAE Guide & Data Book.",
  "version": 1,
  "fecha_actualizacion": "2026-07-25",
  "uso": "Condiciones recomendadas de conservacion. Sirve para proponer la temperatura y humedad de diseno de la camara segun el producto almacenado.",
  "columnas": ["producto", "temp_almacenamiento_F", "humedad_relativa_pct", "vida_util_aproximada"],
  "filas": [
    ["Manzanas", "30-32", "85-90", "2-6 meses"],
    ["Damascos", "31-32", "85-90", "1-2 semanas"],
    ["Alcachofas (globo)", "31-32", "90-95", "1-2 semanas"],
    ["Aguaturmas", "31-32", "90-95", "2-5 meses"],
    ["Espárragos", "32", "90-95", "2-3 semanas"],
    ["Paltas / aguacates", "45-55", "85-90", "4 semanas"],
    ["Plátanos", null, "85-95", null],
    ["Porotos verdes / ejotes", "45", "85-90", "8-10 días"],
    ["Habas Lima", "32-40", "85-90", "10-15 días"],
    ["Cerveza en barril", "35-40", null, "3-10 semanas"],
    ["Betarragas en manojo", "32", "90-95", "10-14 días"],
    ["Betarragas sin hojas", "32", "90-95", "1-3 meses"],
    ["Moras", "31-32", "85-90", "7 días"],
    ["Arándanos", "31-32", "85-90", "3-6 semanas"],
    ["Pan", "0", null, "varias semanas"],
    ["Brócoli", "32", "90-95", "7-10 días"],
    ["Coles de Bruselas", "32", "90-95", "3-4 semanas"],
    ["Repollo tardío", "32", "90-95", "3-4 meses"],
    ["Confites", "0-34", "40-65", null],
    ["Zanahorias preenvasadas", "32", "80-90", "3-4 semanas"],
    ["Zanahorias sin hojas", "32", "90-95", "4-5 meses"],
    ["Coliflor", "32", "90-95", "2-3 semanas"],
    ["Apionabo", "32", "90-95", "3-4 meses"],
    ["Apio", "31-32", "90-95", "2-4 meses"],
    ["Cerezas", "31-32", "85-90", "10-14 días"],
    ["Cocos", "32-35", "80-85", "1-2 meses"],
    ["Café verde", "35-37", "80-85", "2-4 meses"],
    ["Choclo / maíz dulce", "31-32", "85-90", "4-8 días"],
    ["Arándanos rojos", "36-40", "85-90", "1-4 meses"],
    ["Pepinos", "45-50", "90-95", "10-14 días"],
    ["Grosellas", "32", "80-85", "10-14 días"],
    ["Lácteos: queso", "30-45", "65-70", null],
    ["Lácteos: mantequilla", "32-40", "80-85", "2 meses"],
    ["Lácteos: mantequilla congelada", "0 a -10", "80-85", "1 ano"],
    ["Lácteos: crema azucarada", "-15", null, "varios meses"],
    ["Lácteos: helado", "-15", null, "varios meses"],
    ["Leche entera fluida pasteurizada", "33", null, "7 días"],
    ["Leche condensada azucarada", "40", null, "varios meses"],
    ["Leche evaporada", "temperatura ambiente", null, "1 ano o mas"],
    ["Leche en polvo entera", "45-55", "baja", "pocos meses"],
    ["Leche en polvo descremada", "45-55", "baja", "varios meses"],
    ["Zarzamoras rastreras", "31-32", "85-90", "7-10 días"],
    ["Frutas secas", "32", "50-60", "9-12 meses"],
    ["Berenjena", "45-50", "85-90", "10 días"],
    ["Huevos con cáscara", "29-31", "80-85", "6-9 meses"],
    ["Huevos con cáscara, cámara de predio", "50-55", "70-75", null],
    ["Huevo congelado entero", "0 o menos", null, "1 ano o mas"],
    ["Yema de huevo congelada", "0 o menos", null, "1 ano o mas"],
    ["Clara de huevo congelada", "0 o menos", null, "1 ano o mas"],
    ["Huevo entero en polvo", "35-40", "baja", "6-12 meses"],
    ["Yema en polvo", "35-40", "baja", "6-12 meses"],
    ["Albúmina en escamas", "temperatura ambiente", "baja", "1 ano o mas"],
    ["Albúmina secada por atomización", "temperatura ambiente", "baja", "1 ano o mas"],
    ["Endibia / escarola", "32", "90-95", "2-3 semanas"],
    ["Higos secos", "32-40", "50-60", "9-12 meses"],
    ["Higos frescos", "28-32", "85-90", "5-7 días"],
    ["Pescado fresco", "33-35", "90-95", "5-15 días"],
    ["Pescado congelado", "-10 a 0", "90-95", "8-10 meses"],
    ["Pescado ahumado", "40-50", "50-60", "6-8 meses"],
    ["Pescado salado en salmuera", null, "90-95", "10-12 meses"],
    ["Pescado en curado suave", "28-35", "75-90", "4-8 meses"],
    ["Mariscos frescos", "33", "90-95", "3-7 días"],
    ["Mariscos congelados", "0 a -20", "90-95", "3-8 meses"],
    ["Frutas congeladas envasadas", "-10 a 0", null, "6-12 meses"],
    ["Verduras congeladas envasadas", "-10 a 0", null, "6-12 meses"],
    ["Pieles y textiles", "34-40", "45-55", "varios anos"],
    ["Ajo seco", "32", "70-75", "6-8 meses"],
    ["Uva espina", "31-32", "80-85", "3-4 semanas"],
    ["Pomelo", "50", "85-90", "4-8 semanas"],
    ["Uva americana", "31-32", "85-90", "3-8 semanas"],
    ["Uva europea", "30-31", "85-90", "3-6 meses"],
    ["Miel", null, null, "1 ano o mas"],
    ["Lúpulo", "29-32", "50-60", "varios meses"],
    ["Rábano picante", "32", "90-95", "10-12 semanas"],
    ["Col rizada", "32", "90-95", "2-3 semanas"],
    ["Colinabo", "32", "90-95", "2-4 semanas"],
    ["Manteca de cerdo sin antioxidante", "45", "90-95", "4-8 meses"],
    ["Manteca de cerdo sin antioxidante", "0", "90-95", "12-14 meses"],
    ["Puerros verdes", "32", "90-95", "1-3 meses"],
    ["Limones", "32 o 50-58", "85-90", "1-4 meses"],
    ["Lechuga", "32", "90-95", "3-4 semanas"],
    ["Limas", "48-50", "85-90", "6-8 semanas"],
    ["Moras loganberry", "31-32", "85-90", "5-7 días"],
    ["Carnes: tocino congelado", "-10 a 0", "90-95", "4-6 meses"],
    ["Carnes: tocino curado estilo campo", "60-65", "85", "4-6 meses"],
    ["Carnes: tocino curado industrial", "34-40", "85", "2-6 semanas"],
    ["Carnes: vacuno fresco", "32-34", "88-92", "1-6 semanas"],
    ["Carnes: vacuno congelado", "-10 a 0", "90-95", "9-12 meses"],
    ["Carnes: tocino dorsal", "34-36", "85-90", "0-3 meses"],
    ["Carnes: jamones y paletas frescos", "32-34", "85-90", "7-12 días"],
    ["Carnes: jamones congelados", "-10 a 0", "90-95", "6-8 meses"],
    ["Carnes: jamones curados", "60-65", "50-60", "0-3 anos"],
    ["Carnes: cordero fresco", "32-34", "85-90", "5-12 días"],
    ["Carnes: cordero congelado", "-10 a 0", "90-95", "8-10 meses"],
    ["Carnes: hígados congelados", "-10 a 0", "90-95", "3-4 meses"],
    ["Carnes: cerdo fresco", "32-34", "85-90", "3-7 días"],
    ["Carnes: cerdo congelado", "-10 a 0", "90-95", "4-6 meses"],
    ["Carnes: embutido ahumado", "40-45", "85-90", "6 meses"],
    ["Carnes: tripas para embutido", "40-45", "85-90", null],
    ["Carnes: ternera", "32-34", "90-95", "5-10 días"],
    ["Mangos", "50", "85-90", "2-3 semanas"],
    ["Melón cantalupo", "32-40", "85-90", "5-15 días"],
    ["Melón persa", "45-50", "85-90", "1-2 semanas"],
    ["Melón honeydew", "45-50", "85-90", "2-4 semanas"],
    ["Melón casaba", "45-50", "85-90", "4-6 semanas"],
    ["Sandías", "36-40", "85-90", "2-3 semanas"],
    ["Champiñones", "32-35", "85-90", "3-5 días"],
    ["Micelio de champiñón en estiércol", "34", "75-80", "8 meses"],
    ["Micelio de champiñón en grano", "32-40", "75-80", "2 semanas"],
    ["Plantas de vivero", "32-35", "85-90", "3-6 meses"],
    ["Frutos secos", "32-50", "65-75", "8-12 meses"],
    ["Aceite vegetal comestible", "35", null, "1 ano"],
    ["Quimbombó", "50", "85-95", "7-10 días"],
    ["Margarina", "35", "60-70", "1 ano"],
    ["Aceitunas frescas", "45-50", "85-90", "4-6 semanas"],
    ["Cebollas y bulbillos", "32", "70-75", "6-8 meses"],
    ["Naranjas", "32-34", "85-90", "8-12 semanas"],
    ["Jugo de naranja refrigerado", "30-35", null, "3-6 semanas"],
    ["Papayas", "45", "85-90", "2-3 semanas"],
    ["Chirivías", "32", "90-95", "2-6 meses"],
    ["Duraznos y nectarinas", "31-32", "85-90", "2-4 semanas"],
    ["Peras", "29-31", "85-90", null],
    ["Arvejas verdes", "32", "85-90", "1-2 semanas"],
    ["Pimientos dulces", "45-50", "85-90", "8-10 días"],
    ["Ají seco", "32-40", "65-75", "6-9 meses"],
    ["Caquis", "30", "85-90", "2 meses"],
    ["Piña verde madura", "50-60", "85-90", "3-4 semanas"],
    ["Piña madura", "40-45", "85-90", "2-4 semanas"],
    ["Ciruelas frescas", "31-32", "80-85", "3-4 semanas"],
    ["Granadas", "34-35", "85-90", "2-4 meses"],
    ["Maíz para cabritas", "32-40", "85", null],
    ["Papas tempranas", "50-55", "85-90", null],
    ["Papas tardías", "38-50", "85-90", null],
    ["Aves frescas", "32", "85-90", "1 semana"],
    ["Aves congeladas evisceradas", "-20 a 0", "90-95", "9-10 meses"],
    ["Zapallos", "50-55", "70-75", "2-6 meses"],
    ["Membrillos", "31-32", "85-90", "2-3 meses"],
    ["Rábanos de primavera", "32", "90-95", "10 días"],
    ["Rábanos de invierno", "32", "90-95", "2-4 meses"],
    ["Conejo fresco", "32-34", "90-95", "1-5 días"],
    ["Conejo congelado", "-10 a 0", "90-95", "0-6 meses"],
    ["Frambuesas negras", "31-32", "85-90", "7 días"],
    ["Frambuesas rojas", "31-32", "85-90", "7 días"],
    ["Frambuesas congeladas", "-10 a 0", null, "1 ano"],
    ["Ruibarbo", "32", "90-95", "2-3 semanas"],
    ["Nabo sueco", "32", "90-95", "2-4 meses"],
    ["Salsifí", "32", "90-95", "2-4 meses"],
    ["Espinaca", "32", "90-95", "10-14 días"],
    ["Zapallo bellota", "45-50", "75-85", "5-8 semanas"],
    ["Zapallo italiano", "32-40", "85-95", "10-14 días"],
    ["Zapallo de guarda", "50-55", "70-75", "4-6 meses"],
    ["Frutillas frescas", "31-32", "85-90", "7-10 días"],
    ["Frutillas congeladas", "-10 a 0", null, "1 ano"],
    ["Camotes", "55-60", "90-95", "4-6 meses"],
    ["Mandarinas", "31-38", "90-95", "3-4 semanas"],
    ["Tomates verdes maduros", "57-70", "85-90", "2-4 semanas"],
    ["Tomates maduros firmes", "45-50", "85-90", "2-7 días"],
    ["Nabos", "32", "90-95", "4-5 meses"],
    ["Semilla de hortalizas", "32-50", "50-65", null],
    ["Levadura prensada de panadería", "31-32", null, null]
  ]
};
CF["tabla14_flores"] = {
  "tabla": "Tabla 14 - Storage Conditions for Cut Flowers and Nursery Stock",
  "fuente": "Emerson Climate Technologies, Refrigeration Manual Part 3, Form AE-103 R3, pagina 14-11. From 1966-1967 ASHRAE Guide & Data Book.",
  "version": 1,
  "fecha_actualizacion": "2026-07-25",
  "nota_carga": "Para la carga termica de flores cortadas el manual entrega en la Tabla 10 un valor global de 480 BTU/24h por pie cuadrado de area de piso.",
  "columnas": ["grupo", "producto", "temp_almacenamiento_F", "humedad_relativa_pct", "vida_util_aproximada", "metodo_conservacion", "punto_congelacion_mas_alto_F"],
  "filas": [
    ["Flores cortadas", "Cala", "40", "80-85", "1 semana", "Envase seco", null],
    ["Flores cortadas", "Camelia", "45", "80-85", "3-6 días", "Envase seco", 30.6],
    ["Flores cortadas", "Clavel", "31", "80-85", "1 mes", "Envase seco", 30.8],
    ["Flores cortadas", "Crisantemo", "31", "80-85", "2-5 semanas", "Envase seco", 30.5],
    ["Flores cortadas", "Narciso", "31", "80-85", "1-2 semanas", "Envase seco", null],
    ["Flores cortadas", "Gardenia", "31", "80-85", "2-3 semanas", "Envase seco", 31.0],
    ["Flores cortadas", "Gladiolo", "35", "80-85", "1 semana", "Envase seco", 31.4],
    ["Flores cortadas", "Iris, botón cerrado", "31", "80-85", "2 semanas", "Envase seco", 30.6],
    ["Flores cortadas", "Lirio de Pascua", "31", "80-85", "2 semanas", "Envase seco", 31.1],
    ["Flores cortadas", "Muguete", "31", "80-85", "2-3 semanas", "Envase seco", null],
    ["Flores cortadas", "Orquídea", "45-55", "80-85", "2-3 días", "En agua", 31.4],
    ["Flores cortadas", "Peonía, botón cerrado", "31", "80-85", "6 semanas", "Envase seco", 30.1],
    ["Flores cortadas", "Rosa, botón cerrado", "31", "80-85", "2 semanas", "Envase seco", 31.2],
    ["Flores cortadas", "Arvejilla de olor", "31", "80-85", "2 semanas", "Envase seco", 30.4],
    ["Flores cortadas", "Tulipanes", "31", "80-85", "6-8 semanas", "Envase seco", null],
    ["Follajes", "Helechos", "31", "85-90", "4-5 meses", "Envase seco", 28.9],
    ["Follajes", "Acebo", "31", "85-90", "1-4 semanas", "Envase seco", 27.0],
    ["Follajes", "Arándano silvestre", "31", "85-90", "1-4 semanas", "Envase seco", 26.7],
    ["Follajes", "Laurel", "31", "85-90", "1-4 semanas", "Envase seco", 27.6],
    ["Follajes", "Magnolia", "31", "85-90", "1-4 semanas", "Envase seco", 27.0],
    ["Follajes", "Rododendro", "31", "85-90", "1-4 semanas", "Envase seco", 27.6],
    ["Follajes", "Salal", "31", "85-90", "1-4 semanas", "Envase seco", 26.8],
    ["Bulbos", "Amarilis", "70-75", "75-80", "5 meses", "Seco", 30.8],
    ["Bulbos", "Dalia", "40-45", "75-80", "5 meses", "Seco", 28.7],
    ["Bulbos", "Gladiolo", "40-45", "75-80", "8 meses", "Seco", 28.2],
    ["Bulbos", "Iris holandés y español", "75-80", "75-80", "4 meses", "Seco", null],
    ["Bulbos", "Azucena candidum", "31", "75-80", "3 meses", "Bolsa plástica y turba", null],
    ["Bulbos", "Azucena Croft", "31", "75-80", "2 meses", "Bolsa plástica y turba", null],
    ["Bulbos", "Azucena longiflorum", "31", "75-80", "3 meses", "Bolsa plástica y turba", 28.9],
    ["Bulbos", "Azucena speciosum", "31", "75-80", "3 meses", "Bolsa plástica y turba", null],
    ["Bulbos", "Peonía", "40-45", "75-80", "5 meses", "Seco", null],
    ["Bulbos", "Nardo", "40-45", "75-80", "4 meses", "Seco", null],
    ["Bulbos", "Tulipán", "40-45", "75-80", "1-2 meses", "Seco", 27.6],
    ["Material de vivero", "Árboles y arbustos", "32-35", "80-85", "4-5 meses", null, null],
    ["Material de vivero", "Rosales", "32-35", "85-95", "4-5 meses", "Raíz desnuda con bolsa plástica", null],
    ["Material de vivero", "Plantas de frutilla", "30-32", "80-85", "4-10 meses", "Raíz desnuda con bolsa plástica", 29.9],
    ["Material de vivero", "Esquejes enraizados", "33-40", "85-95", null, "Envuelto en plástico", null],
    ["Material de vivero", "Perennes herbáceas", "27-28 o 33-35", "80-85", null, null, null]
  ]
};
CF["tabla15_embalajes"] = {
  "tabla": "Tabla 15 - Space, Weight, and Density Data for Commodities Stored in Refrigerated Warehouses",
  "fuente": "Emerson Climate Technologies, Refrigeration Manual Part 3, Form AE-103 R3, paginas 14-12 y 14-13. From 1966-1967 ASHRAE Guide & Data Book.",
  "version": 1,
  "fecha_actualizacion": "2026-07-25",
  "uso_en_calculo": [
    "La densidad neta permite estimar cuanto producto cabe en un volumen dado de camara.",
    "La diferencia entre peso bruto y peso neto del bulto es la masa de embalaje, que tambien debe enfriarse y suma carga de producto. El calor especifico del carton y la madera esta en la Tabla 11."
  ],
  "columnas": ["producto", "tipo_envase", "dimensiones_pulg", "peso_bruto_lb", "peso_neto_lb", "densidad_bruta_lb_ft3", "densidad_neta_lb_ft3"],
  "filas": [
    ["Manzanas", "Caja de madera Northwestern", "19 1/2 x 11 x 12 3/16", 50, 42, 33.1, 27.8],
    ["Manzanas", "Cartón con bandeja", "20 1/2 x 12 1/2 x 13 1/4", 46.75, 43, 23.8, 21.9],
    ["Manzanas", "Cartón master", "22 1/2 x 12 1/2 x 13", 44.75, 41, 21.2, 19.4],
    ["Manzanas", "Cartón a granel", "19 x 12 1/2 x 13", 44.75, 41, 25.0, 22.9],
    ["Manzanas", "Caja pallet", "47 x 47 x 30", 1030, 900, 26.9, 23.5],
    ["Vacuno deshuesado", "Cartón", "28 x 18 x 6", 146, 140, 83.4, 80.0],
    ["Vacuno, cuartos delanteros", "Suelto", null, null, null, null, 22.2],
    ["Vacuno, cuartos traseros", "Suelto", null, null, null, null, 22.2],
    ["Apio", "Jabas de madera con alambre", "20 1/4 x 16 x 9 3/4", 60, 55, 32.8, 30.0],
    ["Apio", "Cartón", "16 x 11 x 10", 36, 32, 35.4, 31.4],
    ["Queso", "Aros de quesería", "16 x 16 x 13", 84, 78, 43.6, 40.5],
    ["Queso", "Madera, exportación", "17 x 17 x 14", 87, 76, 37.1, 32.5],
    ["Queso suizo", "Hormas", "32 1/2 x 32 1/2 x 7", null, 171, null, 40.0],
    ["Ajíes", "Sacos", "45 x 21 x 26", 234, 229, 16.5, 16.1],
    ["Naranjas", "Caja", "12 1/8 x 13 1/4 x 26 1/4", 77, 69, 31.5, 28.3],
    ["Naranjas", "Caja Bruce", "13 x 11 x 26 1/4", 88, 83, 40.5, 38.2],
    ["Naranjas", "Pallet de 40 cartones", "40 x 48 x 58 1/2", 1690, 1480, 26.0, 22.8],
    ["Naranjas de California", "Cartón", "16 3/8 x 10 1/16 x 10 1/2", 40, 37, 38.0, 35.2],
    ["Naranjas de Florida", "Cartón", "19 1/4 x 12 1/4 x 8", 45, 37, 41.3, 33.9],
    ["Limones", "Cartón", "16 3/8 x 10 1/16 x 10 1/2", 40, 37, 40.0, 37.0],
    ["Pomelo", "Cartón", "19 1/4 x 12 1/4 x 8", 40, 38, 36.7, 34.9],
    ["Coco rallado", "Sacos", "38 x 18 1/2 x 8", 101, 100, 31.0, 30.7],
    ["Arándanos rojos", "Cartón", "15 3/4 x 11 1/4 x 10 1/2", 26, 24, 24.1, 22.2],
    ["Crema", "Latas", "12 x 12 x 14", 52.75, 50, 45.2, 42.9],
    ["Fruta seca", "Caja de madera", "15 1/2 x 10 x 6 1/2", 26.5, 25, 45.4, 42.9],
    ["Dátiles", "Cartón", "14 x 14 x 11", 32, 30, 25.7, 24.0],
    ["Pasas, ciruelas, higos y duraznos secos", "Cartón", "15 x 11 x 7", 32, 30, 47.9, 44.9],
    ["Huevos con cáscara", "Cajas de madera", "26 x 12 x 13", 55, 45, 23.4, 19.1],
    ["Huevo congelado", "Latas", "10 x 10 x 12 1/2", 32, 30, 44.2, 41.5],
    ["Pesca congelada en bloques", "Cartón de 4 x 13 1/2 lb", "20 3/4 x 12 1/8 x 6 3/4", 56, 54, 57.0, 55.0],
    ["Pesca congelada en bloques", "Cartón de 4 x 16 1/2 lb", "19 3/4 x 10 3/4 x 11 1/4", 68, 66, 49.2, 47.8],
    ["Filetes de pescado congelados", "Cartón de 12 x 16 oz", "12 3/4 x 8 5/8 x 3 13/16", 13.5, 12, 55.8, 49.6],
    ["Filetes de pescado congelados", "Cartón de 10 x 5 lb", "14 1/2 x 10 x 14", 52.25, 50, 44.6, 42.7],
    ["Filetes de pescado congelados", "Cartón de 5 x 10 lb", "14 1/2 x 10 x 14", 52.2, 50, 44.5, 42.7],
    ["Palitos de pescado", "Cartón de 12 x 8 oz", "11 x 8 3/8 x 3 7/8", 6.9, 6, 33.6, 29.3],
    ["Palitos de pescado", "Cartón de 24 x 8 oz", "16 7/16 x 8 5/16 x 4 5/8", 13.8, 12, 37.8, 32.9],
    ["Pescado en bandeja", "Sin envase, glaseado, cajas de madera", null, null, null, null, 35.0],
    ["Porciones de pescado", "Cartónes de 2, 3, 5 y 6 lb, envase a medida", null, null, null, null, "29-33"],
    ["Pescado de fondo entero", "Sin envase, glaseado, apilado suelto", null, null, null, null, "33-35"],
    ["Halibut entero", "Sin envase, glaseado, caja de madera suelto", null, null, null, null, "30-35"],
    ["Halibut entero", "Apilado suelto", null, null, null, null, 38.0],
    ["Salmón entero", "Sin envase, glaseado, apilado suelto", null, null, null, null, "33-35"],
    ["Camarones", "Cartónes de 2 1/2 y 5 lb, envase a medida", null, null, null, null, 35.0],
    ["Filetes", "Paquetes de 1, 5 o 10 lb, envase a medida", null, null, null, null, "50-60"],
    ["Espárragos congelados", "Cartón de 24 x 12 oz", "13 1/2 x 11 3/4 x 8 1/4", 21, 18, 27.7, 23.8],
    ["Porotos verdes congelados", "Cartón de 36 x 10 oz", "12 1/2 x 11 x 8", 25.5, 22.5, 40.1, 35.3],
    ["Arándanos congelados", "Cartón de 24 x 12 oz", "12 x 11 1/2 x 8", 20, 18, 31.3, 28.2],
    ["Brócoli congelado", "Cartón de 24 x 10 oz", "12 1/2 x 11 1/2 x 8 1/2", 18.5, 15, 26.2, 21.2],
    ["Concentrados cítricos", "Cartón de 48 x 6 oz", "13 x 8 3/4 x 7 1/2", 27, 26, 54.7, 52.7],
    ["Duraznos congelados", "Cartón de 24 x 1 lb", "13 1/2 x 11 1/4 x 7 1/2", 27, 24, 41.0, 36.4],
    ["Arvejas", "Cartón de 6 x 5 lb", "17 x 11 x 9 1/2", 32, 30, 31.1, 28.2],
    ["Arvejas", "Cartón de 48 x 12 oz", "21 1/2 x 8 1/2 x 12 1/2", 38, 36, 28.7, 27.2],
    ["Papas fritas congeladas", "Cartón de 12 x 16 oz", null, null, null, null, 28.6],
    ["Papas fritas congeladas", "Cartón de 24 x 9 oz", null, null, null, null, 24.0],
    ["Espinaca", "Cartón de 24 x 14 oz", "12 1/2 x 11 x 8 1/2", 24, 21, 35.5, 31.0],
    ["Frutillas", "Lata de 30 lb", "12 1/2 x 10 x 10", 32, 30, 44.2, 41.5],
    ["Frutillas", "Cartón de 24 x 1 lb", "13 x 11 x 8", 28, 24, 42.3, 36.2],
    ["Frutillas", "Barril de 450 lb", "35 x 25 x 25", null, 450, null, 35.5],
    ["Uva de California", "Jaba de madera", "6 1/2 x 15 x 18", 31, 28, 32.4, 29.2],
    ["Cordero deshuesado", "Caja de cartón", "20 x 15 x 5", 57, 53, 65.7, 61.0],
    ["Manteca de cerdo (2/28 lb)", "Caja de madera de exportación", "18 x 13 1/4 x 7 3/4", 64, 56, 59.8, 52.5],
    ["Lechuga repollada", "Cartón", "20 1/2 x 13 1/2 x 9 1/2", 37.5, 35, 24.7, null],
    ["Lechuga repollada", "Cartón", "21 1/2 x 14 1/4 x 10 1/2", "45-55", "42-52", 26.9, 25.2],
    ["Lechuga repollada", "Pallet de 30 cartones", "42 x 50 x 66", 1350, 1170, 16.8, 14.6],
    ["Leche condensada", "Barriles", "35 x 25 1/2 x 25 1/2", 670, 600, 50.9, 45.6],
    ["Almendras con cáscara", "Sacos", "24 x 15 x 33", 91.5, 90, 13.3, 13.1],
    ["Almendras peladas", "Cajas", "6 3/4 x 23 1/2 x 11", 32, 28, 31.7, 27.7],
    ["Nueces con cáscara", "Sacos", "25 x 11 x 31", 103, 100, 20.9, 20.3],
    ["Nueces peladas", "Cartón", "14 x 14 x 10", 27, 25, 23.8, 22.0],
    ["Maní pelado", "Saco de yute", "35 x 10 x 15", 127, 125, 39.2, 38.6],
    ["Pecanas con cáscara", "Saco de yute", "35 x 22 x 12", 126.5, 125, 23.7, 23.4],
    ["Pecanas peladas", "Cartón", "13 x 13 x 11", 32, 30, 29.8, 27.9],
    ["Duraznos", "Canastos de tres cuartos de bushel", "16 7/8 diametro superior", 41, 38, 43.9, 40.7],
    ["Duraznos", "Canastos de medio bushel", "14 1/2 diametro superior", 28, 25, 45.0, 40.2],
    ["Duraznos", "Jaba de madera con alambre", "19 x 11 3/4 x 11 1/8", 42, 38, 29.2, 26.4],
    ["Duraznos", "Jaba de madera", "18 1/8 x 11 1/2 x 5 3/4", 26, 23, 38.0, 33.1],
    ["Peras", "Caja de madera", "8 1/2 x 11 1/2 x 18", 52, 48, 51.0, 47.1],
    ["Peras en envase ordenado", "Cartón", "18 1/2 x 12 x 10", 52, 46, 40.5, 35.6],
    ["Cerdo, panceta en atados", "Atados", "23 1/2 x 10 1/2 x 7", 57, 57, 57.0, 57.0],
    ["Cerdo, lomos con hueso", "Caja de madera", "28 x 10 x 10", 60, 54, 37.0, 33.3],
    ["Cerdo, lomos deshuesados", "Caja de cartón", "20 x 15 x 5", 57, 52, 65.7, 59.9],
    ["Papas", "Saco", "33 x 17 1/2 x 11", 101, 100, 27.5, 27.2],
    ["Pollo fresco entero, 24-30 por bulto", "Jaba de madera con alambre", "24 x 10 x 7", 65, 60, 27.5, 25.4],
    ["Presas de pollo fresco", "Jaba de madera con alambre", "17 3/4 x 10 x 12 1/2", 54, 50, 42.1, 38.9],
    ["Pato congelado, 6 por bulto", "Cartón", "22 x 16 x 4", 32.5, 31, 39.9, 38.0],
    ["Gallina congelada, 6 por bulto", "Cartón", "20 3/4 x 18 x 5 1/2", 33.5, 31, 28.2, 26.1],
    ["Pollo congelado trozado, 12 por bulto", "Cartón", "17 1/4 x 15 3/4 x 4 1/4", 30.5, 28, 45.4, 41.7],
    ["Pollo de asar congelado, 8 por bulto", "Cartón", "20 3/4 x 18 x 5 1/2", 32.5, 30, 27.3, 25.2],
    ["Pavos 3-6 lb, 6 por bulto", "Cartón", "21 x 17 x 6 1/2", 30, 27, 22.5, 20.1],
    ["Pavos 6-10 lb, 6 por bulto", "Cartón", "26 x 21 1/2 x 7", 52.5, 48, 23.3, 21.2],
    ["Pavos 10-13 lb, 4 por bulto", "Cartón", "26 1/2 x 16 x 7 1/2", 50, 46, 27.2, 25.0],
    ["Pavos 13-16 lb, 4 por bulto", "Cartón", "29 x 18 1/2 x 9", 67.5, 62, 24.2, 22.2],
    ["Pavos 16-20 lb, 2 por bulto", "Cartón", "17 x 16 x 9", 39, 36, 27.7, 25.4],
    ["Pavos 20-24 lb, 2 por bulto", "Cartón", "19 x 16 1/2 x 9 1/2", 47.5, 44, 27.6, 25.5],
    ["Tomates de Florida", "Cartón", "19 x 10 7/8 x 10 3/4", 43, 40, 33.3, 31.0],
    ["Tomates de Florida", "Jaba de madera con alambre", "18 3/4 x 11 15/16 x 11 15/16", 64, 60, 41.3, 38.7],
    ["Tomates de California", "Jaba de madera", "17 1/2 x 14 x 7 3/4", 34, 30, 30.9, 27.3],
    ["Tomates de Texas", "Jaba de madera", "17 1/2 x 14 x 6 5/8", 34, 30, 36.2, 31.9],
    ["Ternera deshuesada", "Cartón", "20 x 15 x 5", 57, 53, 65.7, 61.0]
  ]
};
CF["tabla4_materiales"] = {
  "tabla": "Tabla 4 - Typical Heat Transmission Coefficients",
  "fuente": "Emerson Climate Technologies, Refrigeration Manual Part 3, Form AE-103 R3, paginas 12-3 y 12-4. Extraido del ASHRAE Handbook of Fundamentals.",
  "version": 1,
  "fecha_actualizacion": "2026-07-25",
  "unidades": {
    "densidad": "lb/ft3",
    "k": "BTU/(hr)(ft2)(F) por pulgada de espesor",
    "C": "BTU/(hr)(ft2)(F) para el espesor indicado",
    "R_por_pulgada": "(hr)(ft2)(F)/BTU por pulgada",
    "R_total": "(hr)(ft2)(F)/BTU para el espesor indicado"
  },
  "nota_calculo": "R_total = 1/C + X1/k1 + X2/k2 ... y U = 1/R_total. En muros aislados la resistencia de pelicula superficial es despreciable y el manual la omite.",
  "columnas": ["grupo", "material", "densidad_lb_ft3", "k", "C", "R_por_pulgada", "R_total"],
  "filas": [
    ["Placas y tableros", "Placa de fibrocemento", 120, 4.0, null, 0.25, null],
    ["Placas y tableros", "Yeso o revoque, 1/2 pulg", 50, null, 2.22, null, 0.45],
    ["Placas y tableros", "Contrachapado", 34, 0.80, null, 1.25, null],
    ["Placas y tableros", "Fibra de madera, tablero duro", 50, 0.73, null, 1.37, null],
    ["Barreras y films", "Fieltro permeable al vapor", null, null, 16.70, null, 0.06],
    ["Barreras y films", "Film plástico, barrera de vapor", null, null, null, null, "despreciable"],
    ["Pisos", "Baldosa asfáltica, vinílica o linóleo", null, null, 20.0, null, 0.05],
    ["Pisos", "Piso de madera, 3/4 pulg", null, null, 1.47, null, 0.68],
    ["Aislantes", "Manta de lana de vidrio", 0.5, 0.32, null, 3.12, null],
    ["Aislantes", "Poliuretano expandido, R11", 1.5, 0.16, null, 6.25, null],
    ["Aislantes", "Poliestireno expandido", 1.8, 0.16, null, 6.25, null],
    ["Aislantes", "Cubierta aislante de techo, 2 pulg", null, null, 0.18, null, 5.56],
    ["Aislantes", "Lana mineral a granel", "2.0-5.0", 0.40, null, 2.5, null],
    ["Aislantes", "Perlita expandida", "5.0-8.0", 0.36, null, 2.78, null],
    ["Aislantes", "Celulosa de papel", 3.0, 0.30, null, 3.3, null],
    ["Albanileria", "Hormigón de arena y grava", 140, 9.0, null, 0.11, null],
    ["Albanileria", "Ladrillo común", 120, 5.0, null, 0.20, null],
    ["Albanileria", "Ladrillo a la vista", 130, 9.0, null, 0.11, null],
    ["Albanileria", "Bloque hueco de 2 cámaras, 6 pulg", null, null, 0.66, null, 1.52],
    ["Albanileria", "Bloque de hormigón de arena y grava, 8 pulg", null, null, 0.90, null, 1.11],
    ["Albanileria", "Bloque de hormigón de escoria, 8 pulg", null, null, 0.58, null, 1.72],
    ["Techumbre", "Tejuelas de fibrocemento", 120, null, 4.76, null, 0.21],
    ["Techumbre", "Rollo asfáltico para techo", 70, null, 6.50, null, 0.15],
    ["Techumbre", "Techo multicapa asfáltico, 3/8 pulg", 70, null, 3.0, null, 0.33],
    ["Techumbre", "Tejuelas de madera", null, null, 1.06, null, 0.94],
    ["Revestimiento", "Contrachapado de 3/8 pulg", null, null, 1.59, null, 0.59],
    ["Maderas", "Arce, roble, madera dura", 45, 1.10, null, 0.91, null],
    ["Maderas", "Abeto, pino, madera blanda", 32, 0.80, null, 1.25, null],
    ["Radier", "Radier de 6 pulg, sin aislar", null, null, 0.21, null, null]
  ]
};
CF["tabla5_diseno_exterior"] = {
  "tabla": "Tabla 5 - Summer Outdoor Design Data",
  "fuente": "Emerson Climate Technologies, Refrigeration Manual Part 3, Form AE-103 R3, paginas 12-5, 12-6 y 12-7. Extraido del 1981 ASHRAE Handbook of Fundamentals.",
  "version": 1,
  "fecha_actualizacion": "2026-07-25",
  "definicion": "Temperaturas de bulbo seco y bulbo humedo igualadas o excedidas solo durante el 1% de las horas de los cuatro meses de verano.",
  "aplicabilidad": "Solo cubre Estados Unidos y Canada. Para proyectos en Chile u otros paises la aplicacion debe permitir el ingreso manual de la temperatura de diseno y la humedad relativa exterior. Esta tabla queda como referencia del criterio de seleccion, no como fuente de datos climaticos locales.",
  "columnas": ["pais", "estado_o_provincia", "ciudad", "bulbo_seco_F", "bulbo_humedo_F"],
  "filas": [
    ["USA", "Alabama", "Birmingham", 96, 74],
    ["USA", "Alabama", "Mobile", 95, 77],
    ["USA", "Alaska", "Fairbanks", 82, 62],
    ["USA", "Alaska", "Juneau", 74, 60],
    ["USA", "Arizona", "Phoenix", 109, 71],
    ["USA", "Arizona", "Tucson", 104, 66],
    ["USA", "Arkansas", "Fort Smith", 101, 75],
    ["USA", "Arkansas", "Little Rock", 99, 76],
    ["USA", "California", "Bakersfield", 104, 70],
    ["USA", "California", "Blythe", 112, 71],
    ["USA", "California", "Los Angeles", 93, 70],
    ["USA", "California", "San Francisco", 82, 64],
    ["USA", "California", "Sacramento", 101, 70],
    ["USA", "Colorado", "Denver", 93, 59],
    ["USA", "Connecticut", "Hartford", 91, 74],
    ["USA", "Delaware", "Wilmington", 92, 74],
    ["USA", "D.C.", "Washington", 93, 75],
    ["USA", "Florida", "Jacksonville", 96, 77],
    ["USA", "Florida", "Miami", 91, 77],
    ["USA", "Florida", "Tampa", 92, 77],
    ["USA", "Georgia", "Atlanta", 94, 74],
    ["USA", "Georgia", "Savannah", 96, 77],
    ["USA", "Hawaii", "Honolulu", 87, 73],
    ["USA", "Idaho", "Boise", 96, 65],
    ["USA", "Illinois", "Chicago", 94, 74],
    ["USA", "Illinois", "Springfield", 94, 75],
    ["USA", "Indiana", "Fort Wayne", 92, 73],
    ["USA", "Indiana", "Indianapolis", 92, 74],
    ["USA", "Iowa", "Des Moines", 94, 75],
    ["USA", "Iowa", "Sioux City", 95, 74],
    ["USA", "Kansas", "Dodge City", 100, 69],
    ["USA", "Kansas", "Wichita", 101, 72],
    ["USA", "Kentucky", "Lexington", 93, 73],
    ["USA", "Kentucky", "Louisville", 95, 74],
    ["USA", "Louisiana", "New Orleans", 93, 78],
    ["USA", "Louisiana", "Shreveport", 99, 77],
    ["USA", "Maine", "Portland", 87, 72],
    ["USA", "Maryland", "Baltimore", 94, 75],
    ["USA", "Massachusetts", "Boston", 91, 73],
    ["USA", "Massachusetts", "Worcester", 87, 71],
    ["USA", "Michigan", "Detroit", 91, 73],
    ["USA", "Michigan", "Grand Rapids", 91, 72],
    ["USA", "Minnesota", "Duluth", 85, 70],
    ["USA", "Minnesota", "Minneapolis", 92, 75],
    ["USA", "Mississippi", "Biloxi", 94, 79],
    ["USA", "Mississippi", "Jackson", 97, 76],
    ["USA", "Missouri", "Kansas City", 99, 75],
    ["USA", "Missouri", "St. Louis", 97, 75],
    ["USA", "Montana", "Billings", 94, 64],
    ["USA", "Montana", "Helena", 91, 60],
    ["USA", "Nebraska", "Omaha", 94, 76],
    ["USA", "Nevada", "Las Vegas", 108, 66],
    ["USA", "Nevada", "Reno", 95, 61],
    ["USA", "New Hampshire", "Concord", 90, 72],
    ["USA", "New Jersey", "Newark", 94, 74],
    ["USA", "New Jersey", "Trenton", 91, 75],
    ["USA", "New Mexico", "Albuquerque", 96, 61],
    ["USA", "New Mexico", "Santa Fe", 90, 61],
    ["USA", "New York", "Albany", 91, 73],
    ["USA", "New York", "Buffalo", 88, 71],
    ["USA", "New York", "New York", 92, 74],
    ["USA", "North Carolina", "Charlotte", 95, 74],
    ["USA", "North Dakota", "Bismark", 95, 68],
    ["USA", "Ohio", "Cincinnati", 92, 73],
    ["USA", "Ohio", "Cleveland", 91, 73],
    ["USA", "Oklahoma", "Tulsa", 101, 74],
    ["USA", "Oregon", "Pendleton", 97, 65],
    ["USA", "Oregon", "Portland", 90, 68],
    ["USA", "Pennsylvania", "Philadelphia", 93, 75],
    ["USA", "Pennsylvania", "Pittsburgh", 89, 72],
    ["USA", "Rhode Island", "Providence", 89, 73],
    ["USA", "South Carolina", "Charleston", 94, 78],
    ["USA", "South Dakota", "Sioux Falls", 94, 73],
    ["USA", "Tennessee", "Memphis", 98, 77],
    ["USA", "Tennessee", "Nashville", 97, 75],
    ["USA", "Texas", "Dallas", 102, 75],
    ["USA", "Texas", "El Paso", 100, 64],
    ["USA", "Texas", "Galveston", 90, 79],
    ["USA", "Texas", "Houston", 97, 77],
    ["USA", "Utah", "Salt Lake City", 97, 62],
    ["USA", "Vermont", "Burlington", 88, 72],
    ["USA", "Virginia", "Richmond", 95, 76],
    ["USA", "Virginia", "Roanoke", 93, 72],
    ["USA", "Washington", "Seattle", 84, 68],
    ["USA", "Washington", "Spokane", 93, 64],
    ["USA", "Washington", "Yakima", 96, 65],
    ["USA", "West Virginia", "Charleston", 92, 74],
    ["USA", "Wisconsin", "Milwaukee", 90, 74],
    ["USA", "Wyoming", "Cheyenne", 89, 58],
    ["Canada", "Alberta", "Calgary", 84, 63],
    ["Canada", "British Columbia", "Vancouver", 79, 67],
    ["Canada", "Manitoba", "Winnipeg", 89, 73],
    ["Canada", "New Brunswick", "St. John", 80, 67],
    ["Canada", "Newfoundland", "Gander", 82, 66],
    ["Canada", "Nova Scotia", "Halifax", 79, 66],
    ["Canada", "Ontario", "Toronto", 90, 73],
    ["Canada", "Quebec", "Montreal", 86, 71],
    ["Canada", "Saskatchewan", "Regina", 91, 69],
    ["Canada", "Yukon", "Whitehorse", 80, 59]
  ]
};
CF["tablas18_19_seleccion_rapida"] = {
  "fuente": "Emerson Climate Technologies, Refrigeration Manual Part 3, Form AE-103 R3, pagina 16-12. From 1965-1966 ASHRAE Guide & Data Book.",
  "version": 1,
  "fecha_actualizacion": "2026-07-25",
  "advertencia": "El manual indica que estas capacidades son para aplicaciones promedio. Si la carga es inusual no deben usarse. Las tablas de baja temperatura no incluyen ninguna reserva para carga de congelacion: si el producto se va a congelar se requiere capacidad adicional. Se conservan como contraste de orden de magnitud, no como metodo de seleccion.",
  "nota_comun": "Ganancia de calor basada en aislacion con factor K de 0.25. La capacidad requerida debe corregirse para otro factor K o distinto espesor de aislacion.",

  "tabla18_camaras_35F": {
    "titulo": "Recommended Condensing Unit Capacity for Walk-In Coolers, 35 F",
    "condiciones": "9 pies de altura, 95 F de temperatura ambiente, 4 pulgadas de aislacion, operacion de 16 horas",
    "columnas": ["dimensiones_exteriores_ft", "btu_hr_servicio_promedio", "btu_hr_servicio_intenso"],
    "filas": [
      ["6x5", 2580, 3180], ["6x6", 2960, 3540], ["7x5", 2930, 3540], ["7x6", 3380, 4080], ["7x7", 3790, 4620],
      ["8x5", 3240, 3920], ["8x6", 3710, 4530], ["8x7", 4200, 5170], ["8x8", 4680, 5680], ["9x6", 4080, 4960],
      ["9x7", 4600, 5640], ["9x8", 5080, 6260], ["9x9", 5580, 6920], ["10x6", 4450, 5450], ["10x7", 5010, 6200],
      ["10x8", 5520, 6880], ["10x9", 6080, 7520], ["10x10", 6630, 8150], ["11x6", 4820, 5910], ["11x7", 5380, 6630],
      ["11x8", 6000, 7350], ["11x9", 6520, 9050], ["11x10", 7100, 8800], ["12x6", 5150, 6350],
      ["12x8", 6400, 7700], ["12x10", 7590, 9380], ["12x12", 8800, 10800], ["14x8", 7300, 9050],
      ["14x10", 8640, 10900], ["14x12", 9720, 12300], ["14x14", 10800, 13700], ["16x8", 8140, 10000], ["16x10", 9340, 12000],
      ["16x12", 10700, 13450], ["16x14", 12000, 15000], ["16x16", 13100, 16600], ["18x10", 10300, 13000], ["18x12", 11700, 14800],
      ["18x14", 13100, 16400], ["18x16", 14400, 17400], ["18x18", 15800, 19600], ["20x10", 11300, 13700], ["20x12", 12800, 15700],
      ["20x14", 14300, 17600], ["20x16", 15600, 19400], ["20x18", 17000, 21100], ["20x20", 18700, 22700], ["22x12", 13700, 17100],
      ["22x14", 15300, 18900], ["22x16", 16800, 20800], ["22x18", 18300, 22000], ["24x12", 14700, 18200],
      ["24x14", 16200, 20300], ["24x16", 17300, 22100], ["24x18", 19300, 24000]
    ],
    "anomalia_ocr": "La fila 11x9 muestra 6520 en servicio promedio y 9050 en servicio intenso, un salto que rompe la progresion de la tabla (se esperaria del orden de 8000). Valor reproducido tal como esta impreso en el original; verificar antes de usar."
  },

  "tabla19_camaras_baja_temperatura": {
    "titulo": "Recommended Condensing Unit Capacity for Walk-In Coolers, Low Temperature",
    "condiciones": "9 pies de altura, 90 F de temperatura ambiente, operacion de 18 horas",
    "columnas": ["largo_ft", "ancho_ft", "btu_hr_camara_menos20F_aisl_8pulg", "btu_hr_camara_menos10F_aisl_6pulg", "btu_hr_camara_0F_aisl_6pulg"],
    "filas": [
      [6, 6, 4000, 4500, 3750],
      [6, 10, 5700, 5800, 5050],
      [7, 7, 5000, 5300, 4650],
      [7, 10, 6400, 6450, 5800],
      [8, 8, 5900, 6200, 5500],
      [8, 12, 7200, 7650, 7000],
      [9, 9, 6700, 7000, 6300],
      [10, 10, 7600, 7900, 7100],
      [10, 14, 9200, 9600, 8700],
      [12, 12, 9400, 9900, 9600],
      [12, 16, 11300, 11800, 10900],
      [14, 14, 11400, 12000, 11200],
      [14, 18, 13300, 13900, 12700],
      [16, 16, 13400, 14000, 12900],
      [16, 20, 15100, 16000, 14900],
      [18, 18, 15200, 16100, 15000],
      [18, 20, 16100, 17200, 15600],
      [20, 20, 16800, 18400, 16600]
    ]
  }
};
