# Contexto

Hack the Andes es un RPG 2D de navegador con pixel art, estética de MMORPG clásico y vista top-down con perspectiva 3/4. Las referencias inspiran la composición; solo los PNG fuente con origen/licencia documentados pueden pasar al juego.

Primero se desarrolla una demo individual sin cuentas ni servidor. El ciclo futuro es explorar campamento/pueblo y bosque, luchar, recoger botín, ganar experiencia, subir de nivel y completar una misión sencilla. Se empieza con un protagonista; las clases Guerrero/Mago/Asesino se amplían cuando haya recursos válidos.

El repositorio GitHub se creó con README. La Fase 0B está completada: Vite + TypeScript + Phaser 3.90.0, galería de diagnóstico para los 98 iconos, validación, responsive y build. La Fase 1 conserva esa galería y una escena de locomoción sobre tiles de Path and Road, ahora con la vista de cuatro direcciones del candidato unarmed de Base 4-Direction. Es una zona de prueba, no un mapa final.

Base 4-Direction Unarmed se integró como vista provisional del primer héroe; Swordsman nivel 1 se conserva como diagnóstico alternativo y Aqua Slime como candidato de enemigo posterior. Los caminos y la capilla sirven de candidatos visuales, pero sus TMX son muestras, no mapas de campaña. La capilla no sustituye a un bosque con árboles. Ver `docs/prototipos-fase-1.md` y `docs/revision-pixel-art-adicional.md`.

Combate en tiempo real se mantiene para una fase posterior. Aún hay que validar frame mappings, escala, anclajes y mezcla visual, crear mapa propio Tiled y resolver cómo recuperar assets locales en un clon de GitHub sin publicar fuentes de terceros por accidente.
