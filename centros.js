/* Asistencia TPC · centros hospitalarios de Andalucía + intérprete de lo que se escribe en Avisos.
   Para añadir o corregir un centro, edita una línea de la lista D:
   corto | nombre oficial | localidad | provincia (Al Ca Co Gr Hu Ja Ma Se) | alias (palabras sueltas, sin tildes) | consulta de mapa (opcional) */
const CE=(()=>{
const P={Al:"Almería",Ca:"Cádiz",Co:"Córdoba",Gr:"Granada",Hu:"Huelva",Ja:"Jaén",Ma:"Málaga",Se:"Sevilla"};
const D=`TORRECÁRDENAS|Hospital Universitario Torrecárdenas|Almería|Al|torrecardenas
PONIENTE|Hospital de Poniente|El Ejido|Al|poniente ejido
LA INMACULADA|Hospital La Inmaculada|Huércal-Overa|Al|inmaculada huercal overa
PUERTA DEL MAR|Hospital Universitario Puerta del Mar|Cádiz|Ca|puerta mar hupm
PUERTO REAL|Hospital Universitario de Puerto Real|Puerto Real|Ca|puerto real
JEREZ|Hospital Universitario de Jerez de la Frontera|Jerez de la Frontera|Ca|jerez
PUNTA DE EUROPA|Hospital Universitario Punta de Europa|Algeciras|Ca|punta europa algeciras
LA LÍNEA|Hospital de La Línea de la Concepción|La Línea de la Concepción|Ca|linea concepcion
SANTA MARÍA DEL PUERTO|Hospital Santa María del Puerto|El Puerto de Santa María|Ca|santa maria puerto
REINA SOFÍA|Hospital Universitario Reina Sofía|Córdoba|Co|reina sofia hurs general materno infantil
INFANTA MARGARITA|Hospital Infanta Margarita|Cabra|Co|infanta margarita cabra
VALLE DE LOS PEDROCHES|Hospital Valle de los Pedroches|Pozoblanco|Co|pedroches pozoblanco
HUVN · GENERAL (RDA)|Hospital Universitario Virgen de las Nieves – Hospital General (Ruiz de Alda)|Granada|Gr|huvn virgen nieves rda ruiz alda hmq medico quirurgico general|Hospital Universitario Virgen de las Nieves, Avenida de las Fuerzas Armadas, Granada
HUVN · MATERNO-INFANTIL|Hospital Universitario Virgen de las Nieves – Materno-Infantil|Granada|Gr|huvn virgen nieves hmi materno infantil pediatria maternidad|Hospital Materno Infantil, Avenida de las Fuerzas Armadas, Granada
HUVN · NEUROTRAUMA Y REHAB.|Hospital Universitario Virgen de las Nieves – Neurotraumatología y Rehabilitación|Granada|Gr|huvn virgen nieves hnt hnr neuro neurotrauma neurotraumatologia rehabilitacion traumatologia|Hospital de Neurotraumatología y Rehabilitación, Avenida Juan Pablo II, Granada
SAN CECILIO (PTS)|Hospital Universitario Clínico San Cecilio (PTS – Campus de la Salud)|Granada|Gr|san cecilio sancecilio pts campus clinico|Hospital Universitario San Cecilio, Avenida de la Investigación, Granada
SANTA ANA|Hospital Santa Ana|Motril|Gr|santa ana motril
BAZA|Hospital de Baza|Baza|Gr|baza
JUAN RAMÓN JIMÉNEZ|Hospital Universitario Juan Ramón Jiménez|Huelva|Hu|jrj juan ramon jimenez
INFANTA ELENA|Hospital Infanta Elena|Huelva|Hu|infanta elena
RIOTINTO|Hospital de Riotinto|Minas de Riotinto|Hu|riotinto
HNT JAÉN|Complejo Hospitalario de Jaén – Hospital Neurotraumatológico (HNT)|Jaén|Ja|hnt neuro neurotrauma neurotraumatologico neurotraumatologia|Hospital Neurotraumatológico, Jaén
HMQ JAÉN|Complejo Hospitalario de Jaén – Hospital Médico-Quirúrgico (HMQ)|Jaén|Ja|hmq medico quirurgico medicoquirurgico|Hospital Médico Quirúrgico, Jaén
HMI JAÉN|Complejo Hospitalario de Jaén – Hospital Materno-Infantil (HMI)|Jaén|Ja|hmi materno infantil pediatria maternidad|Hospital Materno Infantil, Jaén
SAN AGUSTÍN|Hospital San Agustín|Linares|Ja|san agustin linares
SAN JUAN DE LA CRUZ|Hospital San Juan de la Cruz|Úbeda|Ja|san juan cruz ubeda
ALTO GUADALQUIVIR|Hospital Alto Guadalquivir|Andújar|Ja|alto guadalquivir andujar
ALCALÁ LA REAL|Hospital de Alta Resolución de Alcalá la Real|Alcalá la Real|Ja|alcala real har
HRU MÁLAGA (CARLOS HAYA)|Hospital Regional Universitario de Málaga|Málaga|Ma|hru regional carlos haya general materno infantil
HOSPITAL CIVIL|Hospital Civil (Regional Universitario de Málaga)|Málaga|Ma|civil hru|Hospital Civil, Málaga
VIRGEN DE LA VICTORIA|Hospital Universitario Virgen de la Victoria|Málaga|Ma|virgen victoria hvv clinico
COSTA DEL SOL|Hospital Universitario Costa del Sol|Marbella|Ma|costa sol marbella
AXARQUÍA|Hospital de la Axarquía|Vélez-Málaga|Ma|axarquia velez
SERRANÍA|Hospital de la Serranía|Ronda|Ma|serrania ronda
ANTEQUERA|Hospital de Antequera|Antequera|Ma|antequera
MARÍTIMO|Hospital Marítimo de Torremolinos|Torremolinos|Ma|maritimo torremolinos
VIRGEN DEL ROCÍO|Hospital Universitario Virgen del Rocío|Sevilla|Se|hvr virgen rocio general infantil maternidad traumatologia rehabilitacion
VIRGEN MACARENA|Hospital Universitario Virgen Macarena|Sevilla|Se|macarena virgen
VIRGEN DE VALME|Hospital Universitario Virgen de Valme|Sevilla|Se|valme virgen
SJD ALJARAFE|Hospital San Juan de Dios del Aljarafe|Bormujos|Se|sj dios aljarafe
OSUNA|Hospital de Osuna|Osuna|Se|osuna
UTRERA|Hospital de Alta Resolución de Utrera|Utrera|Se|utrera har`.split("\n").map(l=>{const a=l.split("|");return{c:a[0],n:a[1],loc:a[2],p:P[a[3]],a:a[4],q:a[5]||a[1].replace(/\s*\(.*\)/,"")+", "+a[2]}});
const N=s=>String(s||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g," ").trim();
D.forEach(h=>{h.t=new Set(N(h.c+" "+h.n+" "+h.loc+" "+h.a).split(" "));h.e=new Set(N(h.a).split(" "))});
const STOP=new Set("hospital hosp hospitales universitario univ de del la las el los y en h hu complejo hospitalario".split(" "));
const SV={uci:"UCI",ucig:"UCI",criticos:"Cuidados críticos",rea:"Reanimación",reanimacion:"Reanimación",ucip:"UCI pediátrica",ucin:"UCI neonatal",urg:"Urgencias",urgs:"Urgencias",urgencias:"Urgencias",upu:"Urgencias",planta:"Planta",pl:"Planta",hospitalizacion:"Planta",quirofano:"Quirófano",qx:"Quirófano",hemodinamica:"Hemodinámica",cardiologia:"Cardiología",neurocirugia:"Neurocirugía",pediatria:"Pediatría",paritorio:"Paritorio",observacion:"Observación",box:"Box",cama:"Cama",sala:"Sala"};
const pre=(h,k)=>k.length>2&&[...h.t].some(x=>x.startsWith(k));
/* Interpreta «UCI RDA», «urg huvn», «neuro», «planta 3 san cecilio»… → hospitales posibles + servicio + detalle */
function parse(text,base){
  const hs=[],sv=[],det=[];
  String(text||"").split(/[\s,;·/]+/).filter(Boolean).forEach(w=>{const k=N(w);if(!k||STOP.has(k))return;
    if(SV[k])sv.push(SV[k]);else if(/\d/.test(k))det.push(w);else hs.push(k)});
  const s=[...new Set(sv)].join(" · ");
  if(!hs.length)return{l:[],s,d:det.join(" "),ok:false};
  const sc=D.map(h=>{let m=0,x=0;hs.forEach(k=>{if(h.t.has(k)){x+=3;m++}else if(pre(h,k)){x+=2;m++}});return{h,m,x:x+(h.p===base?1.5:0)}})
    .filter(r=>r.m>0).sort((a,b)=>b.m-a.m||b.x-a.x||a.h.c.length-b.h.c.length);
  if(!sc.length)return{l:[],s,d:det.concat(hs).join(" "),ok:false};
  const best=sc[0].m,l=sc.filter(r=>r.m===best).slice(0,5).map(r=>r.h),t=l[0];
  hs.forEach(k=>{if(!t.t.has(k)&&!pre(t,k))det.push(k)});
  return{l,s,d:det.join(" "),ok:best===hs.length||hs.some(k=>t.e.has(k))};
}
const label=(r,h)=>[h.n,r.s,r.d].filter(Boolean).join(" · ");
/* Direcciones: expande abreviaturas y quita piso/puerta, que confunden al buscador */
const AB=[[/\bc\s?\/\s*/g,"calle "],[/\bcl\.?\s+/g,"calle "],[/\bavda?\.?\s+/g,"avenida "],[/\bav\.\s*/g,"avenida "],[/\bpza\.?\s+/g,"plaza "],[/\bctra\.?\s+/g,"carretera "],[/\burb\.?\s+/g,"urbanizacion "],[/\bbda\.?\s+/g,"barriada "],[/\bpol\.?\s+ind\.?/g,"poligono industrial"],[/\bn[ºo°]\.?\s*(?=\d)/g,""],[/\bs\/n\b/g,""],[/\b(piso|portal|esc|escalera|puerta|pta|bloque|bl|planta)\.?\s*\w+/g,""],[/\b\d{1,2}\s*[ºª°]\s*[a-z]?\b/g,""],[/\b\d+\s*(izq|izda|dcha|der)\b/g,""]];
const addr=t=>{let s=String(t||"").toLowerCase();AB.forEach(([r,x])=>s=s.replace(r,x));return s.replace(/[;|]+/g,",").replace(/\s+/g," ").replace(/\s*,[\s,]*/g,", ").replace(/^,\s*|,\s*$/g,"").trim()};
const KNOWN=[...Object.values(P),...D.map(h=>h.loc)].map(N);
const hint=(a,b)=>b&&a&&a.split(",").length<2&&!KNOWN.some(k=>N(a).includes(k))?a+", "+b:a;
/* Lista de textos a probar, de más a menos precisa */
function cands(t,b,hosp){
  const r=hosp?parse(t,b):null;if(r&&r.ok){const h=r.l[0];return[h.q,h.n.replace(/\s*\(.*\)/,"")+", "+h.loc]}
  const a=addr(t),h=hint(a,b),sn=h.replace(/\b\d{1,4}[a-z]?\b/g,"").replace(/\s+/g," ").replace(/\s,/g,",").trim();
  return[...new Set([h,a,sn].filter(Boolean))];
}
return{parse,label,cands,dest:(t,b,hosp)=>cands(t,b,hosp)[0]||""};
})();
