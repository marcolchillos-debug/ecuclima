// generar_feed.js - Archivo de productos para Google Merchant Center (ofertas-feed.tsv).
// Lee web/ofertas-datos.js y web/ofertas-config.js (lo mismo que muestra la pagina) y escribe web/ofertas-feed.tsv.
// El precio del archivo es el precio de oferta SIN IVA, igual que el que se ve en la pagina y en el dato estructurado de la ficha.
// Uso:  node generar_feed.js [carpeta]
'use strict';
const fs = require('fs');
const path = require('path');

const AQUI = __dirname, WEB = process.argv[2] ? path.resolve(process.argv[2]) : path.join(AQUI, 'web');   // opcional: carpeta con ofertas-datos.js y ofertas-config.js (la usa la actualizacion semanal)
const BASE = 'https://ecuclima.com/';
const cargar = (f, nombre) => new Function('var window={};' + fs.readFileSync(path.join(WEB, f), 'utf8') + ';return window.' + nombre + ';')();
const DATOS = cargar('ofertas-datos.js', 'OFERTAS_DATOS');
const CFG = cargar('ofertas-config.js', 'OFERTAS_CONFIG');

const limpio = (s) => String(s == null ? '' : s).replace(/[\t\r\n]+/g, ' ').replace(/\s{2,}/g, ' ').trim();
const absoluta = (ruta) => (/^https?:\/\//.test(ruta) ? ruta : BASE + String(ruta).replace(/^\//, ''));
const pct = (it) => { const d = CFG.descuentos && CFG.descuentos[it.id]; const v = typeof d === 'number' ? d : (CFG.descuentoGeneral || 0); return Math.max(0, Math.min(0.95, v)); };
const precio = (it) => Math.round(it.p * (1 - pct(it)) * 100) / 100;
const espec = (it, ...nombres) => { const f = (it.e || []).find((r) => nombres.some((n) => String(r[0]).toLowerCase() === n.toLowerCase())); const v = f ? limpio(f[1]) : ''; return v === '—' ? '' : v; };

const COLUMNAS = ['id', 'title', 'description', 'link', 'image_link', 'additional_image_link', 'availability', 'price', 'condition', 'brand', 'mpn', 'identifier_exists', 'product_type'];
const corto = (s) => (s && s.length <= 30 && !/[,;]/.test(s)) ? s : '';   // modelos y partes largos (listas de compatibilidad) no sirven de titulo ni de MPN
const filas = DATOS.map((it) => {
  const parte = espec(it, 'N° de parte', 'No. de parte', 'Numero de parte');
  const modelo = espec(it, 'Modelo');
  const mpn = corto(parte) || corto(modelo) || corto(limpio(it.ref));
  const contiene = (a, b) => limpio(a).toLowerCase().indexOf(limpio(b).toLowerCase()) >= 0;
  const base = contiene(it.n, it.m) ? limpio(it.n) : limpio(it.m + ' ' + it.n);   // sin repetir la marca
  const extra = corto(parte) ? (contiene(it.n, parte) ? '' : ' N° ' + corto(parte)) : (corto(modelo) && !contiene(it.n, modelo) ? ' ' + corto(modelo) : '');
  const titulo = base + extra;
  const imagenes = [it.f].concat(it.g || []).filter((x, i, a) => x && a.indexOf(x) === i);
  return {
    id: it.ec,
    title: titulo.slice(0, 150),
    description: limpio(it.d || (limpio(it.m + ' ' + it.n) + '. Repuesto disponible en Quito, Ecuador.')).slice(0, 4900),
    link: BASE + it.u,
    image_link: absoluta(imagenes[0]),
    additional_image_link: imagenes.slice(1, 10).map(absoluta).join(','),
    availability: it.s > 0 ? 'in_stock' : 'out_of_stock',
    price: precio(it).toFixed(2) + ' USD',
    condition: 'new',
    brand: limpio(it.m),
    mpn: mpn,
    identifier_exists: (mpn && limpio(it.m)) ? 'yes' : 'no',   // sin marca no hay identificador que valga
    product_type: limpio(it.c),
  };
});

const texto = [COLUMNAS.join('\t')].concat(filas.map((f) => COLUMNAS.map((c) => limpio(f[c])).join('\t'))).join('\n') + '\n';
fs.writeFileSync(path.join(WEB, 'ofertas-feed.tsv'), texto, 'utf8');
console.log('ofertas-feed.tsv: ' + filas.length + ' productos, ' + COLUMNAS.length + ' columnas');
filas.forEach((f) => console.log('  ' + f.id + ' | ' + f.price + ' | ' + f.availability + ' | mpn ' + (f.mpn || '-') + ' | ' + f.title));
