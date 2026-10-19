/* Asistencia TPC · códigos de traslado (propuesta final de codificación) + CIE-9-MC orientativo + RTPS.
   Sugerencias locales, sin conexión ni IA externa: puntúa palabras del diagnóstico. SIEMPRE las confirma el médico/codificación.
   Para añadir un diagnóstico, añade una línea a DX:  CIE-9 | descripción | palabras (sin tildes) | cód. traslado | cód. prealerta (1 ictus, 3 angioplastia, 4 trauma, 12 sepsis) */
const COD=(()=>{
const TR=`PC01|Arteriografía
PC02|RNM
PC03|TAC
PC04|Otras pruebas complementarias
TH01|Residencia geográfica
TH02|Libre elección
TH03|Falta de camas
TH04|Retorno al hospital de origen
TH05|Otro (mismo recurso)
CV01|Cirugía cardiovascular adulto
CV02|Cirugía cardiovascular pediátrica
CV03|ICP primaria
CV04|ICP programada
CV05|Electrofisiología / ECG
NE01|Valoración neurología
NE02|Valoración neurocirugía
NE03|Neurointervencionismo / trombectomía
TR01|Cirugía plástica
TR02|U. quemados
TR03|C. reimplante
TR04|Cirugía maxilofacial
TR05|U. columna
TR06|Politraumatismo
TR07|Otros trauma
UC01|UCI adultos
UC02|UCI neonatal
UC03|UCI neonatal: protocolo hipotermia
UC04|UCI pediátrica
OM01|CPRE
OM02|Endoscopia digestiva
OM03|Valoración nefrología
OM04|Diálisis
OM05|Oncología pediátrica
OM06|Oxigenoterapia hiperbárica
OM07|U. trasplante (donante)
OM08|U. trasplante (receptor)
OM09|Otro no contemplado
OM10|Gestante amenaza de parto`.split("\n").map(l=>l.split("|"));
const CE={1:"Código ictus (1)",3:"Código angioplastia (3)",4:"Código trauma (4)",12:"Código sepsis (12)"};
const DX=`410.91|IAM (fase aguda)|infarto miocardio agudo iam sca scacest scasest stemi elevacion st supradesnivelacion inferior anterior lateral septal coronario coronaria angioplastia|CV03|3
411.1|Angina inestable / SCA sin elevación ST|angina inestable sca coronario|CV04
413.9|Angina de pecho|angina dolor toracico opresivo|CV04
427.5|Parada cardiaca|parada pcr rcp reanimacion paro cardiaco|UC01
427.41|Fibrilación ventricular|fibrilacion ventricular fv|UC01
427.1|Taquicardia ventricular|taquicardia ventricular tv|CV05
427.0|Taquicardia supraventricular paroxística|taquicardia supraventricular tsv paroxistica|CV05
427.31|Fibrilación auricular|fibrilacion auricular fa arritmia|CV05
427.89|Bradicardia / otras arritmias|bradicardia arritmia sinusal|CV05
426.0|Bloqueo AV completo|bloqueo av completo auriculoventricular marcapasos|CV05
428.0|Insuficiencia cardiaca|insuficiencia cardiaca icc descompensada|UC01
518.4|Edema agudo de pulmón|edema agudo pulmon eap|UC01
785.51|Shock cardiogénico|shock cardiogenico|UC01
423.3|Taponamiento cardiaco|taponamiento cardiaco pericardico derrame pericardico|CV01
441.0|Disección aórtica|diseccion aorta aortica aortico|CV01
441.3|Aneurisma aórtico roto|aneurisma aorta abdominal roto rotura|CV01
415.1|Embolia pulmonar|tep embolia embolismo pulmonar tromboembolismo|UC01
434.91|Ictus isquémico (infarto cerebral)|ictus isquemico infarto cerebral oclusion arteria cerebral trombectomia hemiparesia afasia|NE03|1
436|Ictus agudo no especificado|ictus accidente cerebrovascular acv|NE01|1
435.9|AIT (isquemia cerebral transitoria)|ait isquemia transitoria|NE01
431|Hemorragia intracerebral|hemorragia intracerebral hic parenquimatosa cerebral|NE02|1
430|Hemorragia subaracnoidea|hemorragia subaracnoidea hsa aneurisma cerebral|NE02|1
432.1|Hematoma subdural no traumático|hematoma subdural cronico agudo hsd|NE02
345.3|Estatus epiléptico|estatus status epileptico epiléptico crisis convulsiva refractaria|UC01
780.39|Convulsiones|convulsion convulsiones crisis comicial epilepsia|NE01
780.01|Coma|coma inconsciente glasgow bajo|UC01
322.9|Meningitis|meningitis meningoencefalitis encefalitis|UC01
959.01|Traumatismo craneoencefálico|tce traumatismo craneal craneoencefalico cabeza golpe|NE02|4
852.2|Hemorragia/hematoma subdural traumático|subdural traumatico hematoma traumatico epidural|NE02|4
851.8|Contusión cerebral|contusion cerebral hemorragia traumatica|NE02|4
805|Fractura de columna vertebral|fractura vertebral columna raquis lumbar dorsal cervical|TR05|4
952.9|Lesión medular|lesion medular tetraplejia paraplejia medula|TR05|4
807.0|Fractura de costillas|fractura costal costillas volet torax|TR07|4
860.0|Neumotórax / hemotórax traumático|neumotorax hemotorax traumatico drenaje pleural torax|TR06|4
864|Lesión hepática traumática|hepatica higado traumatismo abdominal|TR06|4
865|Lesión esplénica traumática|esplenica bazo traumatismo abdominal|TR06|4
808|Fractura de pelvis|fractura pelvis pelvica pelvico|TR06|4
820|Fractura de cadera / fémur|fractura cadera femur cuello femoral|TR07
802|Fractura facial|fractura facial maxilofacial mandibula malar orbita|TR04
959.8|Politraumatismo|politraumatismo politraumatizado multiple accidente trafico|TR06|4
958.4|Shock traumático|shock traumatico hipovolemico hemorragia traumatica|TR06|4
949.0|Quemaduras|quemadura quemaduras quemado fuego escaldadura|TR02|4
887|Amputación traumática (miembro superior)|amputacion traumatica mano brazo dedo reimplante|TR03|4
897|Amputación traumática (miembro inferior)|amputacion traumatica pierna pie reimplante|TR03|4
994.1|Ahogamiento / semiahogamiento|ahogamiento semiahogamiento sumersion|UC01
991.6|Hipotermia|hipotermia congelacion|UC01
992.0|Golpe de calor|golpe calor hipertermia|UC01
994.8|Electrocución|electrocucion electrico descarga rayo|UC01
995.0|Anafilaxia|anafilaxia anafilactico alergia grave|UC01
038.9|Septicemia / sepsis|sepsis septicemia bacteriemia infeccion grave|UC01|12
995.92|Sepsis grave|sepsis grave disfuncion organica|UC01|12
785.52|Shock séptico|shock septico sepsis|UC01|12
785.59|Shock hipovolémico / otro shock|shock hipovolemico hemorragico|UC01
785.50|Shock no especificado|shock inestable hipotension grave|UC01
518.81|Insuficiencia respiratoria aguda|insuficiencia respiratoria aguda ventilacion mecanica intubado hipoxemia|UC01
518.82|SDRA / otra insuficiencia pulmonar|sdra distres respiratorio adulto ecmo|UC01
486|Neumonía|neumonia|UC01
491.21|EPOC reagudizado|epoc reagudizacion reagudizado agudizado agudizacion exacerbacion exacerbado bronquitis|UC01
493.92|Asma agudizada|asma agudizacion crisis asmatica|UC01
493.91|Estado asmático|estado asmatico|UC01
512.8|Neumotórax espontáneo|neumotorax espontaneo|UC01
799.1|Parada respiratoria|parada respiratoria apnea|UC01
577.0|Pancreatitis aguda|pancreatitis aguda|UC01
578.9|Hemorragia digestiva|hemorragia digestiva hda hdb melenas hematemesis sangrado|OM02
456.0|Varices esofágicas sangrantes|varices esofagicas sangrantes cirrosis|OM02
576.1|Colangitis|colangitis ictericia obstructiva|OM01
574.5|Coledocolitiasis|coledocolitiasis colelitiasis colecistitis calculo biliar cpre|OM01
567.9|Peritonitis|peritonitis perforacion abdomen agudo|UC01
560.9|Obstrucción intestinal|obstruccion intestinal oclusion ileo|OM09
557.0|Isquemia mesentérica|isquemia mesenterica intestinal|CV01
570|Insuficiencia hepática aguda|insuficiencia hepatica aguda fulminante hepatitis|OM07
572.2|Encefalopatía hepática|encefalopatia hepatica|UC01
584.9|Fracaso renal agudo|fracaso renal agudo fra insuficiencia renal oliguria|OM03
585.6|Enfermedad renal terminal|enfermedad renal terminal dialisis hemodialisis erc|OM04
250.10|Cetoacidosis diabética|cetoacidosis diabetica cad diabetes descompensada|UC01
251.0|Hipoglucemia con coma|hipoglucemia coma|UC01
977.9|Intoxicación medicamentosa|intoxicacion farmacos sobredosis medicamentos|UC01
965.0|Intoxicación por opiáceos|opiaceos opioides heroina sobredosis metadona|UC01
969.4|Intoxicación por benzodiacepinas|benzodiacepinas intoxicacion|UC01
980.0|Intoxicación etílica|etilica alcohol intoxicacion etanol|UC01
986|Intoxicación por monóxido de carbono|monoxido carbono co intoxicacion|OM06
989.3|Intoxicación por organofosforados|organofosforados insecticida pesticida|UC01
348.82|Muerte encefálica (posible donante)|muerte encefalica donante donacion trasplante organos|OM07
642.6|Eclampsia|eclampsia convulsion embarazada|OM10
642.5|Preeclampsia grave|preeclampsia grave hellp hipertension embarazo|OM10
644.03|Amenaza de parto prematuro|amenaza parto prematuro gestante contracciones embarazada|OM10
641.9|Hemorragia anteparto|hemorragia anteparto placenta previa desprendimiento|OM10
769|Distrés respiratorio del recién nacido|distres respiratorio neonato recien nacido neonatal|UC02
765.1|Prematuridad|prematuro prematuridad pretermino bajo peso|UC02
768.5|Asfixia perinatal grave|asfixia perinatal hipoxia neonatal hipotermia terapeutica encefalopatia hipoxico|UC03
746.9|Cardiopatía congénita|cardiopatia congenita ductus pediatrica|CV02`.split("\n").map(l=>{const a=l.split("|");return{c:a[0],d:a[1],k:a[2],t:a[3]||"OM09",e:a[4]||""}});
const N=s=>String(s||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g," ").trim();
const SW=new Set("con sin por para del los las una uno que por tras como ante desde".split(" "));
DX.forEach(x=>x.s=new Set(N(x.k+" "+x.d).split(" ")));
const trN=c=>{const r=TR.find(x=>x[0]===c);return r?{c,d:r[1]}:null};
/* puntúa el texto libre contra palabras clave; devuelve los mejores diagnósticos */
function dx(txt,n){if(typeof CIE9!=="undefined")return CIE9.top(txt,n);const q=N(txt).split(" ").filter(w=>w.length>=3&&!SW.has(w));if(!q.length)return[];
  return DX.map(x=>{let p=0;q.forEach(w=>{if(x.s.has(w))p+=3;else for(const k of x.s)if(k.length>=4&&(k.startsWith(w)||w.startsWith(k))){p+=1.5;break}});return{x,p}})
   .filter(r=>r.p>0).sort((a,b)=>b.p-a.p).slice(0,n||4).map(r=>r.x)}
/* sugerencia: diagnósticos CIE-9 + códigos de traslado (propuesta de codificación) + prealerta */
function sug(o){
  const l=dx(o.dx,4),tr=[],ce=new Set();
  if(o.tipo!=="Primario"){
    const add=c=>{const t=trN(c);if(t&&!tr.some(y=>y.c===c))tr.push(t)};
    const d=N((o.des||"")+" "+(o.ud||"")),dd=N(o.dx);
    if(l[0])add(l[0].t);
    if(/hemodinam/.test(d)&&!/^CV0[34]$/.test(l[0]&&l[0].t))add("CV04");
    if(/ucip|uci pediat/.test(d))add("UC04");else if(/ucin|uci neonat/.test(d))add("UC02");else if(/\buci\b|criticos|reanim/.test(d))add("UC01");
    if(/neurocir/.test(d))add("NE02");if(/quemad/.test(d))add("TR02");if(/dialisis/.test(d))add("OM04");
    if(/\btac\b|tomograf/.test(d+" "+dd))add("PC03");if(/\brm\b|\brnm\b|resonancia/.test(d+" "+dd))add("PC02");if(/arteriograf|angiograf/.test(d+" "+dd))add("PC01");
    if(/retorno|vuelta|repatri/.test(dd+" "+d))add("TH04");if(/falta de cama|sin cama|saturacion/.test(dd))add("TH03");
    if(!tr.length)add("OM09");
    l.slice(0,1).forEach(x=>x.e&&ce.add(x.e));
  }
  return{cie:l.map(x=>({c:x.c,d:x.d})),tr:tr.slice(0,4),ce:[...ce].map(k=>CE[k])};
}
/* RTPS: Escala de valoración de riesgo en el traslado */
const RT=[["Hemodinámica",["Estable","Inestable (<15 ml/h)","Inestable (>15 ml/h)"]],["Monitor",["No","Deseable","Imprescindible"]],["Arritmias",["No","Sí, no graves","Sí, graves"]],["Vía venosa",["No","Periférica","Central"]],["MP transitorio",["No","No invasivo","Intracavitario"]],["Respiración",["FR 10-24","FR 25-35","FR <10 o >35 irreg./apnea"]],["Vía aérea",["No aislada","Tubo orofaríngeo","T. endotraqueal"]],["Apoyo ventilatorio",["No","Oxigenoterapia","V. mecánica"]],["Glasgow",["15","8-14","<8 o focalidad neuro"]],["Fármacos",["No","Grupo I (sedantes, analgésicos, anticomiciales, esteroides)","Grupo II (inotropos, antiarrítmicos, HCO3Na, vasodilatador, manitol, anestésicos, curarizantes)"]]];
const rtTot=s=>[...String(s||"")].reduce((a,c)=>a+(+c||0),0);
const rtRec=t=>t>=7?"SVA medicalizada":t>=3?"SVA con enfermero":"Ambulancia convencional";
return{TR,DX,RT,dx,sug,rtTot,rtRec,CE};
})();
