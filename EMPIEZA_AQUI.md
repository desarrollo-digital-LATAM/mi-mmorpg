# Hack the Andes — kit revisado para el proyecto

Sí puedes continuar con OpenCode. El siguiente trabajo es probar el personaje y crear la primera zona explorable; aún no es el MMORPG completo. OpenCode ya reportó que creó el proyecto Vite y completó Fase 0B; este ZIP es el kit actualizado para que puedas continuar Fase 1. Verifica siempre el estado real de tu checkout.

## Qué se encontró

| Grupo | Estado real | Decisión |
|---|---|---|
| 48 iconos de botín CraftPix | PNG originales, 32×32, transparentes + variantes con fondo | Usar en inventario/recompensas; no son efectos ni animaciones. |
| 50 iconos de criaturas CraftPix | 48 principales + 2 bonus; PNG originales, 32×32 | Usar en bestiario, selección de objetivo y retratos. No son enemigos animados. |
| Escenario recortado | 96 imágenes de tamaños irregulares y transparencia procesada | Conservar como referencia. Reemplazar por tileset fuente antes de construir el mundo. |
| Habilidades, estados y armas | 288 recortes + 288 miniaturas reducidas de capturas | Conservar para dirección visual. No cargarlos como recursos aprobados. |
| Mago | Lámina opaca, 7 bloques de acciones y 3 retratos con fondo | Conseguir exportación original y licencia; no es spritesheet listo. |
| Dungeon | 3 hojas PNG RGBA, dimensiones compatibles con múltiplos de 16 | Candidato técnico; falta autor/licencia y confirmar cuadrícula. No hay mapa ni colisiones. |
| Dos imágenes de inspiración y otras hojas/mapas | Referencias | Fuera de public/. No sustituyen gráficos fuente. |
| Swordsman 1–3 Level | Animaciones PNG fuente + TMX. Cuatro vistas, varios estados. | Candidato de protagonista para Fase 1; comprobar mapeo de frames. |
| Aqua Slime Mobs | Animaciones PNG fuente + TMX. El fabricante anuncia tres ataques. | Candidato de enemigo para Fase 2; no incluirlo en el primer mapa. |
| Path/Road y Chapel | Tilesets PNG y TMX. Suelo/caminos y plaza/capilla. | Candidatos de entorno; aún no son mapa del juego y no componen un bosque completo. |

## Qué se mejoró

- Nombres ASCII descriptivos con número original y variante: `monster_slime_verde_21_transparent.png`, `loot_cristales_morados_17_transparent.png`, `hacha_azul_01_capture.png`.
- `public/assets/` contiene únicamente los iconos originales de los dos packs identificados, dos atlas y su manifest. No contiene capturas.
- Los nombres son descripciones visuales provisionales, no nombres oficiales ni definiciones de habilidades o estadísticas.
- `asset-workbench/` conserva referencias, recortes, miniaturas, dungeon pendiente y los tres PSD fuente útiles. No se sirve al navegador desde Vite por defecto.
- `docs/rename-map.csv` relaciona cada uno de los 906 archivos del ZIP original con su destino o motivo de no volver a empaquetarlo. El ZIP original aportado sigue siendo el respaldo completo.
- Se eliminó una duplicación exacta de la lámina del mago. No se volvió a incluir los ZIP anidados, el catálogo antiguo ni las vistas JPG obsoletas. Los metadatos anteriores quedan identificados como históricos.
- Los PNG conservados tienen los mismos bytes; los atlas nuevos combinan iconos sin reescalar, recortar ni cambiar colores. La revisión no inventa frames ni elimina fondos a ciegas.
- Catálogo offline filtrable, inventario, hashes, comprobador Node y documentación por fases.

## Cómo pasarlo a tu repositorio, que actualmente solo tiene README

1. Descarga y descomprime este ZIP. Abre `CATALOGO.html` con doble clic para ver los nombres y estados.
2. Clona tu repositorio de GitHub en tu computadora, si todavía no lo tienes local. Abre esa carpeta en OpenCode.
3. Copia dentro de esa carpeta `AGENTS.md`, `docs/`, `public/`, `scripts/`, `integration-examples/` y `gitignore.fragment`. Copia `asset-workbench/` solo si quieres conservar las referencias localmente. No crees otra carpeta `HackTheAndes_Kit_Proyecto` dentro del repositorio.
4. Conserva tu README actual. Pide a OpenCode añadir enlaces y comandos; este kit no trae un README que lo sobrescriba. Fusiona `gitignore.fragment` con `.gitignore` cuando lo cree.
5. Con Node instalado, puedes ejecutar ya `node scripts/verify-assets.mjs` desde la raíz del repo. No instala paquetes ni necesita Python.
6. No vuelvas a ejecutar el prompt `01-opencode-base.md`: OpenCode reportó Fase 0B completada. Si tus archivos locales no lo reflejan, inspecciona el estado con OpenCode antes de avanzar.
7. Confirma que los scripts `npm run dev`, `npm run typecheck`, `npm run build` y `npm run assets:check` pasan en tu checkout. El reporte de OpenCode dice que Fase 0B y el build funcionan.
8. Copia `asset-workbench/candidates/` desde este ZIP al repo local si aún no existe. Es material local excluido de Git. No copies los nuevos candidatos a `public/` hasta revisar animaciones, escala y mezcla de estilo.
9. Lee `docs/revision-pixel-art-adicional.md` y luego envía completo `docs/prompts/02-opencode-mundo.md` a OpenCode. El prompt ya cubre revisión del Swordsman, plaza/camino, mapa Tiled propio y fallback si falta bosque coherente.
10. Después valida el Slime en juego e implementa combate; luego clases adicionales, UI, misión, inventario y guardado local. Cuentas, Supabase y servidor multijugador quedan para más adelante.

## Qué falta y en qué orden

**Candidato para el primer mundo:** Swordsman + pequeña plaza/capilla o camino tras comprobar escala/paleta. Falta construir mapa Tiled propio y probar si los packs combinan. Para llamar al escenario “bosque”, todavía hacen falta árboles/vegetación adecuados.

**Candidato para combate:** Aqua Slime tiene animaciones, incluidos tres ataques según CraftPix. La Fase 2 debe confirmar mapeo de frames, integrar el enemigo y definir combate. Los iconos de bestiario no cubren esta necesidad.

**Después:** guerrero y asesino fuente, iconos de habilidades con origen claro, casas y NPC para pueblo, VFX, pociones/equipo, interfaz coherente y audio. Los iconos de botín actuales son materiales; no incluyen un inventario completo de equipo y consumibles.

No necesitas conseguirlo todo ahora. Fase 1 puede comenzar con los candidatos nuevos, siempre documentando si no se logra una mezcla de arte coherente. El enemigo queda para Fase 2.

## Publicación y GitHub

La licencia Freebie de CraftPix permite uso en juegos sujeto a sus condiciones y restringe redistribuir el arte como archivos fuente. No es CC0. Mantén imágenes y fuentes fuera de un repo público hasta confirmar la distribución. Para los packs nuevos consulta `docs/licencias-y-origen.md` y `docs/revision-pixel-art-adicional.md`. Ver `docs/licencias-y-origen.md`.

`gitignore.fragment` excluye por defecto las fuentes/capturas y los PNG/atlas CraftPix del commit; los atlas actuales siguen leyéndose en la base técnica. Los candidatos nuevos viven en `asset-workbench/`, no los carga Vite. Si el repo es privado y decides versionar los gráficos, ajusta esas reglas deliberadamente. Un clon sin gráficos necesitará recuperar los archivos del kit antes de comprobar o ejecutar la galería.

## Qué está verificado

Se comprobaron todas las imágenes, rutas, hashes y dimensiones, coincidencia de iconos con los ZIP fuente, nombres únicos y pixels de los 98 frames de atlas. Consulta `docs/validacion.md`. La carga técnica de los atlas se reportó validada en Fase 0B. La animación del Swordsman y una zona explorable todavía requieren Fase 1; no se afirma que ya exista una demo jugable.
