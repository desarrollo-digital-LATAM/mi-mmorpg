# Contexto

Hack the Andes es un RPG 2D de navegador con pixel art, estética de MMORPG clásico y vista top-down con perspectiva 3/4. Las referencias inspiran la composición; solo los PNG fuente con origen/licencia documentados pueden pasar al juego.

Primero se desarrolla una demo individual sin cuentas ni servidor. El ciclo futuro es explorar campamento/pueblo y bosque, luchar, recoger botín, ganar experiencia, subir de nivel y completar una misión sencilla. Se empieza con un protagonista; las clases Guerrero/Mago/Asesino se amplían cuando haya recursos válidos.

El repositorio GitHub se creó con README. OpenCode reportó completada la Fase 0B: Vite + TypeScript + Phaser 3.90.0, galería de diagnóstico para los 98 iconos, validación, responsive y build. Esa galería no es un juego jugable.

Nuevos candidatos: Swordsman nivel 1 para el primer héroe y Aqua Slime para enemigo posterior; ambos incluyen PNG y metadata TMX de CraftPix. Los caminos y la capilla sirven de candidatos visuales, pero las muestras TMX no son mapas de campaña. La capilla no sustituye a un bosque con árboles. Ver `docs/revision-pixel-art-adicional.md`.

Combate en tiempo real se mantiene para una fase posterior. Aún hay que validar frame mappings, escala, anclajes y mezcla visual, crear mapa propio Tiled y resolver cómo recuperar assets locales en un clon de GitHub sin publicar fuentes de terceros por accidente.
