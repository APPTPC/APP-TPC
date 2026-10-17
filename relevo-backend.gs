/**
 * Relevo · Asistencia TPC
 * Servicio de mensajes entre compañeros.
 * Se pega en "Extensiones → Apps Script" de una hoja de cálculo de Google (ver README).
 */
const CLAVE = "CAMBIA-ESTA-CLAVE";   // la misma que escribirá cada compañero en la app (Personalizar → Clave del equipo)
const DIAS_VISIBLES = 15;            // los relevos más antiguos dejan de mostrarse en la app
const HOJA = "relevo";
const COLS = ["id","ts","de","cod","prof","uni","para","paraCod","base","urg","txt","hecho","hechoPor","hechoTs","borrado"];
const PARAS = ["General","Enfermería","TES","Médico","Persona"];
const BASES = ["Málaga","Almería","Granada","Córdoba","Jaén"];

function hoja_() {
  const ss = SpreadsheetApp.getActive();
  let h = ss.getSheetByName(HOJA);
  if (!h) {
    h = ss.insertSheet(HOJA);
    h.getRange(1, 1, h.getMaxRows(), COLS.length).setNumberFormat("@");   // todo como texto: nada se interpreta como fórmula
    h.getRange(1, 1, 1, COLS.length).setValues([COLS]);
    h.setFrozenRows(1);
  }
  return h;
}
const out_ = o => ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
const s_ = (v, n) => String(v == null ? "" : v).slice(0, n);

function doGet(e) {
  const p = (e && e.parameter) || {};
  if (p.k !== CLAVE) return out_({ ok: false, err: "clave" });
  const h = hoja_(), n = h.getLastRow();
  if (n < 2) return out_({ ok: true, items: [] });
  const ini = Math.max(2, n - 399);                                  // últimas 400 filas
  const filas = h.getRange(ini, 1, n - ini + 1, COLS.length).getValues();
  const limite = Date.now() - DIAS_VISIBLES * 864e5;
  const items = filas.filter(r => r[14] !== "1" && Number(r[1]) > limite).map(r => ({
    id: r[0], ts: Number(r[1]), de: r[2], cod: r[3], prof: r[4], uni: r[5], para: r[6], paraCod: r[7],
    base: r[8], urg: r[9] === "1", txt: r[10],
    hecho: r[11] === "1", hechoPor: r[12], hechoTs: Number(r[13]) || 0
  }));
  return out_({ ok: true, items });
}

function doPost(e) {
  let b;
  try { b = JSON.parse(e.postData.contents); } catch (x) { return out_({ ok: false, err: "formato" }); }
  if (b.k !== CLAVE) return out_({ ok: false, err: "clave" });
  const lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    const h = hoja_(), n = h.getLastRow();
    const ids = n > 1 ? h.getRange(2, 1, n - 1, 1).getValues().map(r => r[0]) : [];
    const fila = id => { const i = ids.lastIndexOf(id); return i < 0 ? 0 : i + 2; };

    if (b.op === "add") {
      const m = b.m || {};
      const id = s_(m.id, 30);
      if (!/^[a-z0-9]+$/.test(id)) return out_({ ok: false, err: "id" });
      if (fila(id)) return out_({ ok: true, dup: true });              // reenvío de un mensaje ya guardado
      const txt = s_(m.txt, 600).trim();
      if (!txt || PARAS.indexOf(m.para) < 0) return out_({ ok: false, err: "datos" });
      if (m.para === "Persona" && !s_(m.paraCod, 30).trim()) return out_({ ok: false, err: "datos" });
      if (m.para !== "Persona" && BASES.indexOf(m.base) < 0) return out_({ ok: false, err: "datos" });
      const ahora = Date.now(), ts = Number(m.ts);
      const fecha = (ts > ahora - 3 * 864e5 && ts < ahora + 36e5) ? ts : ahora;
      const reg = [id, fecha, s_(m.de, 60), s_(m.cod, 30), s_(m.prof, 20), s_(m.uni, 30), m.para, s_(m.paraCod, 30),
                   BASES.indexOf(m.base) < 0 ? "" : m.base, m.urg ? "1" : "", txt, "", "", "", ""].map(String);
      const r = n + 1;
      if (r > h.getMaxRows()) h.insertRowsAfter(h.getMaxRows(), 200);
      const rg = h.getRange(r, 1, 1, COLS.length);
      rg.setNumberFormat("@");
      rg.setValues([reg]);
      return out_({ ok: true });
    }
    if (b.op === "done") {
      const r = fila(s_(b.id, 30));
      if (!r) return out_({ ok: false, err: "noexiste" });
      const hecho = !!b.hecho;
      h.getRange(r, 12, 1, 3).setValues([[hecho ? "1" : "", hecho ? s_(b.por, 80) : "", hecho ? String(Date.now()) : ""]]);
      return out_({ ok: true });
    }
    if (b.op === "del") {
      const r = fila(s_(b.id, 30));
      if (!r) return out_({ ok: false, err: "noexiste" });
      const autor = String(h.getRange(r, 4).getValue()).toUpperCase();
      if (!autor || autor !== s_(b.cod, 30).toUpperCase()) return out_({ ok: false, err: "nopermiso" });
      h.getRange(r, 15).setValue("1");
      return out_({ ok: true });
    }
    return out_({ ok: false, err: "op" });
  } finally {
    lock.releaseLock();
  }
}

/** Opcional: bórrala de la hoja los relevos de más de 60 días. Puedes programarla con un activador mensual. */
function limpiar() {
  const h = hoja_(), n = h.getLastRow();
  if (n < 2) return;
  const ts = h.getRange(2, 2, n - 1, 1).getValues();
  const limite = Date.now() - 60 * 864e5;
  for (let i = ts.length - 1; i >= 0; i--) if (Number(ts[i][0]) < limite) h.deleteRow(i + 2);
}
