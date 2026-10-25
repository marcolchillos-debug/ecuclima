/* nombre-legible.js - cómo se MUESTRAN los nombres de los repuestos.
   Una sola regla para el catálogo (partes.html) y para las páginas repuestos/<id>.html (las genera catalogo-sync\fichas\generar_fichas.js).
   No cambia FileMaker ni el catálogo: solo lo que se ve. Si la oficina corrige el nombre en FileMaker, esto no hace nada (ya viene bien).
   - Si el nombre viene casi todo en MAYÚSCULAS, lo pasa a Mayúscula Inicial (conserva siglas de hasta 3 letras y todo lo que lleve números).
   - Pone las tildes de las palabras más comunes y corrige errores de escritura frecuentes (selenoide, controldor...).
   - Quita palabras repetidas seguidas, ordena las comas y deja la primera letra en mayúscula. */
(function (g) {
  var MENORES = { de: 1, del: 1, la: 1, el: 1, las: 1, los: 1, y: 1, para: 1, con: 1, en: 1, a: 1, por: 1, o: 1, al: 1, sin: 1 };
  var TILDES = {
    'cigueñal': 'cigüeñal', valvula: 'válvula', valvulas: 'válvulas', manometro: 'manómetro', presion: 'presión', coneccion: 'conexión', conexion: 'conexión',
    energia: 'energía', piston: 'pistón', fleare: 'flare', electrico: 'eléctrico', electricos: 'eléctricos', electrica: 'eléctrica', electricas: 'eléctricas',
    electronica: 'electrónica', electronicas: 'electrónicas', electronico: 'electrónico', electronicos: 'electrónicos', expancion: 'expansión', expansion: 'expansión',
    servico: 'servicio', selenoide: 'solenoide', controldor: 'controlador', neplo: 'niple', realy: 'relay', bushin: 'bushing', rele: 'relé', termico: 'térmico',
    termica: 'térmica', liquido: 'líquido', linea: 'línea', succion: 'succión', retencion: 'retención', camara: 'cámara', frigorifica: 'frigorífica',
    mecanico: 'mecánico', mecanica: 'mecánica', standar: 'estándar', automatico: 'automático', automatica: 'automática', conversion: 'conversión',
    tuberia: 'tubería', pistoc: 'pistón', proteccion: 'protección', termometro: 'termómetro', refrigeracion: 'refrigeración', maquina: 'máquina',
    hidraulico: 'hidráulico', neumatico: 'neumático', diametro: 'diámetro', regulacion: 'regulación', condensacion: 'condensación', seccion: 'sección'
  };
  var LETRAS = 'A-Za-zÁÉÍÓÚÑáéíóúñ';
  function bonito(n) {
    var letras = n.replace(new RegExp('[^' + LETRAS + ']', 'g'), '');
    var mayus = letras.replace(/[^A-ZÁÉÍÓÚÑ]/g, '');
    if (!letras || mayus.length / letras.length < 0.6) return n;                  // ya viene en mayúsculas y minúsculas
    return n.split(' ').map(function (w, i) {
      if (/\d/.test(w)) return w;                                                 // modelos y medidas se dejan igual
      var nucleo = w.replace(/[^A-Za-zÁÉÍÓÚÑáéíóúñ]/g, '');                      // "LR" con comillas, (HP), etc.
      if (nucleo.length > 0 && nucleo.length <= 3 && nucleo === nucleo.toUpperCase() && !MENORES[nucleo.toLowerCase()]) return w;   // siglas
      var l = w.toLowerCase();
      if (i > 0 && MENORES[l]) return l;
      return l.charAt(0).toUpperCase() + l.slice(1);
    }).join(' ');
  }
  function nombreLegible(n) {
    var s = bonito(String(n == null ? '' : n).replace(/\s+/g, ' ').trim());
    s = s.replace(new RegExp('[' + LETRAS + ']+', 'g'), function (w) {            // tildes (respeta MAYÚSCULAS / Capitalizada / minúscula)
      var r = TILDES[w.toLowerCase()]; if (!r) return w;
      return w === w.toUpperCase() && w.length > 1 ? r.toUpperCase() : (w.charAt(0) === w.charAt(0).toUpperCase() ? r.charAt(0).toUpperCase() + r.slice(1) : r);
    });
    s = s.replace(new RegExp('\\b([' + LETRAS + ']{3,})(\\s+\\1)+\\b', 'gi'), '$1');   // palabra repetida seguida ("Danfoss Danfoss")
    s = s.replace(/\s*,\s*/g, ', ').replace(/\s{2,}/g, ' ').trim();
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
  g.nombreLegible = nombreLegible;
  if (typeof module !== 'undefined' && module.exports) module.exports = { nombreLegible: nombreLegible, bonito: bonito };
})(typeof window !== 'undefined' ? window : this);
