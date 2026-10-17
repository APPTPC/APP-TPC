# Asistencia TPC

App web instalable (PWA) para traslado de pacientes críticos: revisiones por día, ampulario, herramientas (dosis, oxígeno, parada con metrónomo, registro de avisos por guardia) y guías/algoritmos ERC 2025.

## Publicar en GitHub Pages
1. Crea un repositorio y sube **todo el contenido de esta carpeta** (incluida `guias/`), no la carpeta en sí.
2. Settings → Pages → Source: *Deploy from a branch* → `main` / `(root)`.
3. Abre `https://TU-USUARIO.github.io/NOMBRE-REPO/` desde el móvil y elige «Añadir a pantalla de inicio».

## Actualizar
Tras cualquier cambio en `index.html`, guías o iconos, sube el número de `VERSION` en `sw.js` (`tpc-v8` → `tpc-v9`) para que los móviles descarguen la versión nueva.

## Pantalla de inicio
- Saludo según la hora, fondo que cambia (mañana, tarde, atardecer, noche) y la UVI integrada en la escena.
- Perfil (nombre y profesión), accesos rápidos y buscador se guardan solo en el móvil (`localStorage`: `tpc-perfil`, `tpc-accesos`, `tpc-busq`).
- Para cambiar el catálogo de accesos o las palabras clave del buscador, edita `ACC`, `AKW` y `GKW` en `index.html`.
