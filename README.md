# Asistencia TPC

App web instalable (PWA) para traslado de pacientes críticos: revisiones por día, ampulario, herramientas (dosis, oxígeno, parada con metrónomo, registro de avisos por guardia) y guías/algoritmos ERC 2025.

## Publicar en GitHub Pages
1. Crea un repositorio y sube **todo el contenido de esta carpeta** (incluida `guias/`), no la carpeta en sí.
2. Settings → Pages → Source: *Deploy from a branch* → `main` / `(root)`.
3. Abre `https://TU-USUARIO.github.io/NOMBRE-REPO/` desde el móvil y elige «Añadir a pantalla de inicio».

## Actualizar
Tras cualquier cambio en `index.html`, guías o iconos, sube el número de `VERSION` en `sw.js` (`tpc-v10` → `tpc-v11`) para que los móviles descarguen la versión nueva.

## Pantalla de inicio
- Saludo según la hora, fondo que cambia (mañana, tarde, atardecer, noche) y la UVI integrada en la escena.
- Perfil (nombre y profesión), accesos rápidos y buscador se guardan solo en el móvil (`localStorage`: `tpc-perfil`, `tpc-accesos`, `tpc-busq`, `tpc-relevo`, `tpc-relevo-out`).
- Para cambiar el catálogo de accesos o las palabras clave del buscador, edita `ACC`, `AKW` y `GKW` en `index.html`.

## Relevo entre compañeros
Mensajes dirigidos a **todos, Enfermería, TES, Médicos o un compañero concreto (por su código)**, que aparecen en el inicio como «Relevo». Cada mensaje va firmado con nombre, código, profesión y UVI. Como la app es solo una web estática, los mensajes pasan por un pequeño servicio propio (Google Apps Script + una hoja de cálculo), gratuito y sin servidor.

### Puesta en marcha (una sola vez, la hace una persona)
1. En Google Drive crea una **hoja de cálculo nueva** (por ejemplo «Relevo TPC»).
2. Menú **Extensiones → Apps Script**. Borra lo que haya, pega el contenido de `relevo-backend.gs` y deja `CLAVE` vacía (es opcional, ver «Protección de datos»).
3. **Implementar → Nueva implementación → Aplicación web**. *Ejecutar como*: **Yo**. *Quién tiene acceso*: **Cualquier usuario**. Acepta los permisos y copia la **URL** (acaba en `/exec`).
4. En `index.html` busca `const RELEVO_URL=""` y pega la URL entre las comillas.
5. Sube `index.html` y `sw.js` a GitHub (`VERSION` ya está en `tpc-v9`).
6. Cada compañero, en **Personalizar inicio**, rellena **Nombre**, **nº de profesional**, **Base** y **Unidad**. El nº de profesional es su identificador: con él firma los relevos y por él se le pueden dirigir mensajes personales.

Si más adelante cambias el script, ve a *Implementar → Gestionar implementaciones → ✏️ → Versión nueva*: la URL no cambia.

### Cómo funciona
- Se sincroniza al abrir la app, cada minuto con la app abierta y al recuperar la conexión. Sin cobertura, el mensaje queda en cola en el móvil y se envía solo después. **No hay notificaciones push**: el compañero lo ve al abrir la app.
- «Hecho» es compartido: cuando alguien lo marca, el resto ve «Hecho por…». Solo el autor puede eliminar su relevo.
- Los mensajes de más de 15 días dejan de mostrarse (siguen en la hoja; `limpiar()` borra los de más de 60).
- **Por base** (Málaga, Almería, Granada, Córdoba, Jaén): un relevo para Todos o para una profesión solo lo ve quien tenga esa base en su perfil, y además solo la profesión indicada (un relevo para TES no le sale a Enfermería). Al redactar, la base destino viene preseleccionada con la tuya. Los mensajes a un compañero concreto le llegan siempre, sea de la base que sea.

### Protección de datos
No escribáis **nombres, DNI ni NUHSA de pacientes** en los relevos (la app lo recuerda al redactar): usad nº de aviso o iniciales. Los datos viven en vuestra hoja de Google. La app no pide contraseña: el nº de profesional solo identifica y firma, no protege. Quien conozca la URL del servicio podría leer o escribir relevos. Si el repositorio es privado o la URL no se difunde, el riesgo es bajo; si queréis un candado extra, rellenad `CLAVE` en el script y la misma en `RELEVO_CLAVE` de `index.html` (nadie la teclea, pero en un repositorio público sería visible). Si queréis usarlo de forma oficial, consultadlo antes con vuestro responsable de protección de datos.

## Herramientas (menú) y calculadoras
- **Herramientas** es ahora un menú de botones: Dosis, Perfusiones, Ventilación, Intubación, Escalas, Oxígeno, Parada y Avisos. Dentro de cada una, el botón «← Herramientas» vuelve al menú.
- **Perfusiones:** dosis ↔ ml/h según cantidad, volumen final y peso (mcg/kg/min, mg/kg/h, mcg/min, mg/h, UI/h…). Rechaza combinaciones de unidades incompatibles.
- **Ventilación:** peso ideal por altura y sexo, volumen corriente (6–8 ml/kg), volumen minuto, tiempos inspiración/espiración y PaO₂/FiO₂.
- **Intubación (secuencia rápida):** dosis por peso, tubo orientativo y plan de vía aérea. Los rangos de dosis están en la lista `IOTD` de `index.html`: **que los revise vuestro responsable clínico** y se ajustan allí si el protocolo difiere.
- **Escalas:** Glasgow, NEWS2, qSOFA e índice de shock.
- **C.O.C. Córdoba (957 25 24 50):** acceso rápido de llamada. Se añade en Inicio → Accesos rápidos → Añadir → *Llamar*.

## Avisos: ruta y tiempo
- En cada aviso, el botón **🧭 Ruta y tiempo** calcula el tiempo desde tu ubicación (o desde el punto que escribas) hasta el origen y del origen al destino (traslados), o hasta la dirección (primarios), con hora estimada de llegada. Abre la navegación en Google Maps, Waze o Apple Maps.
- El cálculo usa servicios públicos y gratuitos: **OpenStreetMap (Nominatim)** para localizar los lugares y **OSRM** para la ruta. Solo se envían los lugares escritos y tu ubicación, y solo al pulsar «Calcular tiempo». Nunca el nombre ni el diagnóstico. Son servicios con uso limitado; si fallan, los botones de navegación siguen funcionando.
- Es una estimación por carretera con tráfico normal, sin tráfico en tiempo real ni prioridad del vehículo.
- En los **primarios** ya no hay hospital ni médico de destino.
- **Soporte** se elige con botones (Monitor, Vía, Oxígeno, Ventilación mecánica, Perfusiones, Marcapasos, Drenajes, Inmovilización) y admite texto libre.
