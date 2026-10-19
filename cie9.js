/* Asistencia TPC · buscador CIE-9-MC por sospecha clínica (local, sin conexión, no es IA externa).
   Motor: abreviaturas + sinónimos → pesos por rareza de palabra → cobertura de la descripción → frases → negaciones.
   Para añadir un diagnóstico: una línea en EXTRA:  CIE-9 | descripción | palabras/sinónimos sin tildes
   SIEMPRE orientativo: lo confirma el médico o codificación (4.º/5.º dígito, lateralidad, episodio). */
const CIE9=(()=>{
const EXTRA=`786.50|Dolor torácico NE|dolor toracico precordial pecho opresivo punzante
786.05|Disnea / falta de aire|disnea ahogo falta aire dificultad respiratoria
786.2|Tos|tos
786.30|Hemoptisis|hemoptisis esputo sangre
799.02|Hipoxemia|hipoxemia saturacion baja desaturacion
780.2|Síncope y colapso|sincope desmayo perdida conocimiento lipotimia colapso
780.4|Mareo / vértigo|mareo vertigo inestabilidad
780.60|Fiebre NE|fiebre febricula
784.0|Cefalea|cefalea dolor cabeza
789.00|Dolor abdominal NE|dolor abdominal abdomen
787.01|Náuseas con vómitos|nauseas vomitos
787.91|Diarrea|diarrea
780.97|Alteración del nivel de conciencia|alteracion nivel conciencia obnubilacion estupor somnolencia desorientacion confusion
293.0|Delirium|delirium delirio confusional agitacion
785.1|Palpitaciones|palpitaciones
785.0|Taquicardia NE|taquicardia sinusal
796.2|Presión arterial elevada sin HTA|presion arterial elevada cifras tensionales altas
458.9|Hipotensión|hipotension tension baja
458.0|Hipotensión ortostática|hipotension ortostatica postural
782.5|Cianosis|cianosis
784.3|Afasia|afasia
781.94|Parálisis facial / asimetría facial|asimetria facial paralisis facial desviacion comisura
781.3|Ataxia / falta de coordinación|ataxia incoordinacion
781.0|Movimientos anormales involuntarios|temblor movimientos involuntarios
724.2|Lumbalgia|lumbalgia dolor lumbar espalda
723.1|Cervicalgia|cervicalgia dolor cervical cuello
788.0|Cólico renal|colico renal nefritico
592.0|Litiasis renal|litiasis renal calculo rinon piedra
599.0|Infección urinaria|infeccion urinaria itu cistitis
590.80|Pielonefritis|pielonefritis
599.70|Hematuria|hematuria sangre orina
788.20|Retención urinaria|retencion urinaria globo vesical
466.0|Bronquitis aguda|bronquitis aguda
466.11|Bronquiolitis por VRS|bronquiolitis vrs lactante sibilancias
464.4|Crup|crup laringitis estridor
464.30|Epiglotitis|epiglotitis
487.1|Gripe|gripe influenza sindrome gripal
480.9|Neumonía vírica|neumonia virica viral
507.0|Neumonía por aspiración|neumonia aspirativa aspiracion broncoaspiracion
511.9|Derrame pleural|derrame pleural
518.0|Atelectasia|atelectasia
496|EPOC no especificado|epoc enfermedad pulmonar obstructiva cronica
493.90|Asma NE|asma bronquial
162.9|Neoplasia maligna de pulmón|cancer pulmon neoplasia pulmonar
191.9|Neoplasia maligna cerebral|tumor cerebral neoplasia cerebro glioma
401.9|Hipertensión arterial|hipertension arterial hta
401.0|Hipertensión maligna / emergencia hipertensiva|emergencia hipertensiva crisis hipertensiva maligna
421.0|Endocarditis aguda|endocarditis
422.9|Miocarditis aguda|miocarditis
420.9|Pericarditis aguda|pericarditis
425.4|Miocardiopatía|miocardiopatia cardiomiopatia dilatada
427.32|Flúter auricular|flutter aleteo auricular
427.2|Taquicardia paroxística NE|taquicardia paroxistica
427.81|Disfunción sinusal|enfermedad seno disfuncion sinusal pausas
453.40|Trombosis venosa profunda|tvp trombosis venosa profunda miembro inferior
444.22|Embolia arterial de miembro inferior|embolia arterial isquemia aguda pierna miembro
451.9|Tromboflebitis|tromboflebitis flebitis
357.0|Síndrome de Guillain-Barré|guillain barre polineuropatia aguda
358.00|Miastenia gravis|miastenia
332.0|Enfermedad de Parkinson|parkinson
331.0|Enfermedad de Alzheimer|alzheimer demencia
348.4|Compresión / herniación cerebral|herniacion cerebral compresion cerebral enclavamiento
348.5|Edema cerebral|edema cerebral hipertension intracraneal
331.4|Hidrocefalia obstructiva|hidrocefalia derivacion valvula
324.0|Absceso intracraneal|absceso cerebral
320.9|Meningitis bacteriana|meningitis bacteriana meningococo
346.90|Migraña|migrana jaqueca
344.60|Síndrome de cauda equina|cauda equina
336.9|Enfermedad de la médula espinal|mielopatia compresion medular
780.31|Convulsión febril|convulsion febril
535.50|Gastritis|gastritis
558.9|Gastroenteritis NE|gastroenteritis
562.11|Diverticulitis|diverticulitis
569.3|Hemorragia rectal|rectorragia hemorragia rectal sangrado anal
578.0|Hematemesis|hematemesis vomito sangre
578.1|Melenas|melenas heces negras
575.0|Colecistitis aguda|colecistitis aguda
540.9|Apendicitis aguda|apendicitis aguda apendicular
550.90|Hernia inguinal|hernia inguinal
787.20|Disfagia|disfagia
571.5|Cirrosis hepática|cirrosis hepatica
572.4|Síndrome hepatorrenal|hepatorrenal
789.59|Ascitis|ascitis
276.1|Hiponatremia|hiponatremia sodio bajo
276.0|Hipernatremia|hipernatremia sodio alto
276.7|Hiperpotasemia|hiperpotasemia potasio alto
276.8|Hipopotasemia|hipopotasemia potasio bajo
276.2|Acidosis|acidosis metabolica
276.51|Deshidratación|deshidratacion hipovolemia
250.20|Descompensación hiperosmolar diabética|hiperosmolar hiperglucemia diabetes coma
250.00|Diabetes mellitus|diabetes hiperglucemia
244.9|Hipotiroidismo|hipotiroidismo mixedema
242.90|Tirotoxicosis|tirotoxicosis hipertiroidismo tormenta tiroidea
285.1|Anemia aguda posthemorrágica|anemia aguda hemorragica sangrado
285.9|Anemia NE|anemia
287.5|Trombocitopenia|trombocitopenia plaquetas bajas
286.6|Coagulación intravascular diseminada|cid coagulacion intravascular diseminada
682.9|Celulitis|celulitis erisipela
728.86|Fascitis necrotizante|fascitis necrotizante gangrena
053.9|Herpes zóster|herpes zoster
042|Infección por VIH|vih sida
011.90|Tuberculosis pulmonar|tuberculosis pulmonar tbc
084.6|Paludismo|paludismo malaria
633.90|Embarazo ectópico|embarazo ectopico
634.90|Aborto espontáneo|aborto espontaneo
640.03|Amenaza de aborto|amenaza aborto sangrado primer trimestre
644.21|Parto prematuro|parto prematuro pretermino
650|Parto normal|parto normal expulsivo parto domicilio
614.9|Enfermedad inflamatoria pélvica|enfermedad inflamatoria pelvica
779.0|Convulsiones neonatales|convulsiones neonatales
774.6|Ictericia neonatal|ictericia neonatal
771.81|Sepsis neonatal|sepsis neonatal
775.6|Hipoglucemia neonatal|hipoglucemia neonatal
756.6|Hernia diafragmática congénita|hernia diafragmatica congenita
560.0|Invaginación intestinal|invaginacion intestinal
933.1|Cuerpo extraño en laringe|cuerpo extrano laringe atragantamiento obstruccion via aerea
934.8|Cuerpo extraño en bronquio|cuerpo extrano bronquio aspiracion
938|Cuerpo extraño digestivo|cuerpo extrano digestivo ingestion cuerpo extrano
810.00|Fractura de clavícula|fractura clavicula
812.20|Fractura de húmero|fractura humero
813.80|Fractura de antebrazo|fractura antebrazo radio cubito
814.00|Fractura de carpo|fractura carpo muneca escafoides
821.00|Fractura de diáfisis femoral|fractura diafisis femur femoral
823.80|Fractura de tibia y peroné|fractura tibia peroné pierna
824.8|Fractura de tobillo|fractura tobillo maleolo
825.20|Fractura de pie|fractura pie metatarsiano calcaneo
831.00|Luxación de hombro|luxacion hombro
835.00|Luxación de cadera|luxacion cadera
845.00|Esguince de tobillo|esguince tobillo
879.8|Herida abierta NE|herida abierta laceracion corte
925.1|Aplastamiento de cara/cuello|aplastamiento cara cuello
929.9|Aplastamiento NE|aplastamiento atrapamiento
990|Efectos de radiación|radiacion irradiacion
995.1|Angioedema|angioedema edema glotis lengua
708.0|Urticaria alérgica|urticaria alergica
989.5|Efecto tóxico de veneno animal|picadura mordedura veneno serpiente abeja avispa medusa
970.81|Intoxicación por cocaína|cocaina intoxicacion
291.81|Abstinencia alcohólica|abstinencia alcoholica delirium tremens
292.0|Síndrome de abstinencia de drogas|abstinencia drogas sindrome abstinencia
298.9|Psicosis NE|psicosis brote psicotico alucinaciones
300.01|Crisis de pánico|crisis panico ansiedad hiperventilacion
300.00|Ansiedad|ansiedad nerviosismo
311|Depresión|depresion
V62.84|Ideación suicida|ideacion suicida autolisis intento suicidio autolitico
798.1|Muerte instantánea|muerte instantanea fallecimiento fallecido exitus
798.2|Muerte en menos de 24 h de síntomas|muerte menos 24 horas fallecimiento exitus
798.9|Muerte sin testigos|muerte sin testigos hallazgo cadaver exitus
V66.7|Cuidados paliativos|paliativo paliativos terminal final vida`.split("\n");
const NOTAS={"410.91":"4.º dígito según localización: 410.1x anterior, 410.4x inferior, 410.7x subendocárdico (sin elevación ST). 5.º dígito 1 = episodio inicial.","434.91":"Si se conoce el mecanismo: 434.11 embolia, 434.01 trombosis. 5.º dígito 1 = con infarto.","948":"948.xy: x = % de superficie corporal quemada, y = % de 3.er grado.","949.0":"Si se conoce: 941–947 por zona y 948 por % de superficie.","250.10":"5.º dígito: 0 = DM2 / 1 = DM1 (250.11).","805":"4.º dígito = nivel (805.0 cervical, .2 dorsal, .4 lumbar, .6 sacro); 5.º 0 cerrada / 1 abierta.","807.0":"5.º dígito = nº de costillas (807.01 una … 807.09 nueve o más).","959.8":"No hay un código único de politraumatismo: codifica cada lesión y añade 959.8 si procede.","852.2":"5.º dígito: 0 sin pérdida de conocimiento… (ver nivel de conciencia).","851.8":"5.º dígito según pérdida de conciencia.","038.9":"Con disfunción orgánica añade 995.92; con shock, 785.52.","995.92":"Con shock séptico añade 785.52.","785.52":"No es diagnóstico principal: va tras 038.x + 995.92.","345.3":"No confundir con 345.2 (petit mal) ni 780.39 (convulsión aislada).","436":"Preferible 434.91 (isquémico) o 431/430 (hemorrágico) si el TC lo confirma.","644.03":"Amenaza de parto prematuro (644.0x; 5.º dígito 3 = anteparto).","977.9":"Si conoces el fármaco, busca su código específico (960-979) y añade E-código de intención."};
const SYM=/^(78\d|79[0-7]|799\.0|799\.2|799\.3)/,KEEP=new Set(["780.01","780.39","785.50","785.51","785.52","785.59","780.31"]);
const SW=new Set("de la el en y o a al los las del un una uno con sin por para que se su tras como ante desde es son hay probable posible sospecha sospechoso compatible cuadro clinico paciente varon mujer hombre anos ano edad horas dias presenta presentando refiere referido signos secundario secundaria tipo nivel grado leve".split(" "));
const ABR={iam:"infarto miocardio",sca:"sindrome coronario agudo",scacest:"infarto miocardio elevacion",scasest:"angina inestable infarto subendocardico",tce:"traumatismo craneoencefalico craneal",hda:"hemorragia digestiva",hdb:"hemorragia digestiva",epoc:"enfermedad pulmonar obstructiva cronica",fa:"fibrilacion auricular",tep:"embolia pulmonar",acv:"ictus accidente cerebrovascular",avc:"ictus accidente cerebrovascular",eap:"edema agudo pulmon",icc:"insuficiencia cardiaca",sdra:"distres respiratorio",ira:"insuficiencia respiratoria aguda",bav:"bloqueo auriculoventricular",tv:"taquicardia ventricular",tsv:"taquicardia supraventricular",fv:"fibrilacion ventricular",ait:"isquemia cerebral transitoria",hsa:"hemorragia subaracnoidea",hic:"hemorragia intracerebral",itu:"infeccion urinaria",tvp:"trombosis venosa profunda",pcr:"parada cardiaca",rcp:"parada cardiaca reanimacion",hta:"hipertension arterial",dm:"diabetes",cad:"cetoacidosis diabetica",fra:"fracaso renal agudo",erc:"enfermedad renal cronica",ira:"insuficiencia respiratoria aguda",ecg:"electrocardiograma",tc:"traumatismo craneal",ptx:"neumotorax",vm:"ventilacion mecanica",sne:"neurologico",irc:"insuficiencia renal cronica",ep:"embolia pulmonar",pr:"parada respiratoria",ahr:"amenaza"};
const N=s=>String(s||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9.]+/g," ").trim();
const DB=COD.DX.map(x=>({c:x.c,d:x.d,k:x.k,t:x.t,e:x.e})).concat(EXTRA.map(l=>{const a=l.split("|");return{c:a[0],d:a[1],k:a[2],t:"",e:""}}));
const tk=s=>N(s).split(" ").filter(w=>w.length>=2&&!SW.has(w));
const df=new Map();
DB.forEach(x=>{x.dt=new Set(tk(x.d));x.kt=new Set(tk(x.k));x.all=new Set([...x.dt,...x.kt]);x.str=" "+N(x.d+" "+x.k)+" ";x.all.forEach(w=>df.set(w,(df.get(w)||0)+1))});
const M=DB.length,idf=w=>Math.log((M+1)/((df.get(w)||0)+1))+1;
const sim=(a,b)=>{if(a===b)return 1;let i=0;const m=Math.min(a.length,b.length);while(i<m&&a[i]===b[i])i++;return i>=5&&i>=.75*m?.7:0};
const best=(w,set)=>{let b=0;for(const k of set){const s=sim(w,k);if(s>b){b=s;if(b===1)break}}return b};
/* texto → palabras útiles (abreviaturas expandidas, negaciones fuera) */
function prep(txt){const raw=N(txt).split(" ").filter(Boolean),out=[];let neg=0;
  for(const w of raw){if(/^(sin|no|descarta|descartado|descartada|negativo|ausencia|niega)$/.test(w)){neg=2;continue}
    if(neg>0){neg--;continue}
    if(ABR[w])out.push(...ABR[w].split(" "),w);else if(!SW.has(w)&&w.length>=2)out.push(w)}
  return out}
function score(q,x){let mw=0,tw=0,dm=0;
  q.forEach(w=>{const i=idf(w);let b=Math.max(best(w,x.dt)*1.25,best(w,x.kt));if(b>0&&best(w,x.dt)>0)dm++;mw+=i*Math.min(b,1.25);if(df.has(w)||[...df.keys()].some(k=>sim(w,k)>0))tw+=i});
  if(!mw||!tw)return 0;
  let ph=0;for(let i=0;i<q.length-1;i++)if(x.str.includes(" "+q[i]+" "+q[i+1]+" "))ph+=.12;
  const dn=[...x.dt].filter(w=>w.length>=3).length||1;
  return .6*Math.min(mw/tw,1)+.28*Math.min(dm/dn,1)+Math.min(ph,.24)}
function rankQ(q,n){const r=DB.map(x=>({x,s:score(q,x)})).filter(r=>r.s>.12).sort((a,b)=>b.s-a.s).slice(0,n||4),t=r[0]?r[0].s:0;
  return r.map((o,i)=>{const qm=q.filter(w=>best(w,o.x.all)>=.7),own=qm.length?score(qm,o.x):0;
    return{...o.x,s:o.s,conf:own>=.72?"alta":own>=.5?"media":"baja",nota:NOTAS[o.x.c]||"",cerca:i>0&&t-o.s<.08,qm}})}
/* varias sospechas en un mismo texto: elige el mejor código, retira las palabras que explica y repite */
function cover(q){const out=[];let rest=q.slice();for(let i=0;i<3&&rest.length;i++){const r=rankQ(rest,1)[0];if(!r||(i&&r.s<.5))break;out.push(r);const u=new Set(r.qm);rest=rest.filter(w=>!u.has(w))}return out}
const top=(txt,n)=>{const q=prep(txt),c=cover(q),seen=new Set(c.map(x=>x.c));return c.concat(rankQ(q,n||4).filter(x=>!seen.has(x.c))).slice(0,n||4)};
function segs(txt){const out=[];String(txt||"").split(/[,;\n+]|\s\/\s/).map(s=>s.trim()).filter(Boolean).forEach(s=>{
  const p=s.split(/\s+y\s+/i);
  if(p.length>1&&p.every(a=>{const r=rankQ(prep(a),1);return r[0]&&r[0].s>=.5}))out.push(...p);else out.push(s)});return out}
function buscar(txt){const S=segs(txt).map(q=>{const p=prep(q);return{q,res:rankQ(p,4),cov:cover(p)}}).filter(s=>s.res.length);
  const dx=S.flatMap(s=>s.cov),hayDx=dx.some(x=>!SYM.test(x.c)||KEEP.has(x.c)),res=[],omit=[];
  dx.forEach(x=>{if(res.some(y=>y.c===x.c)||omit.some(y=>y.c===x.c))return;if(hayDx&&SYM.test(x.c)&&!KEEP.has(x.c)){omit.push(x);return}res.push(x)});
  return{segs:S,resumen:res,omitidos:omit}}
return{buscar,top,DB}})();
