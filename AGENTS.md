# Hack the Andes — instrucciones para OpenCode

Leer antes de trabajar: docs/contexto.md, docs/roadmap.md, docs/decisiones-tecnicas.md, docs/progreso.md, docs/integracion-assets.md y docs/licencias-y-origen.md.

- El usuario tiene un repo con README. Inspeccionar primero y conservar contenido existente. Fusionar documentación si ya hay cambios posteriores.
- Stack de esta etapa: Phaser **3.90.0** exacto, TypeScript y Vite. No instalar Phaser `latest` ni mezclar ejemplos Phaser 4. Elegir Vite/TypeScript compatibles con el Node realmente instalado y registrar versiones y lockfile.
- El producto es un RPG 2D web individual, pixel art, top-down con perspectiva visual 3/4. No crear landing comercial, registro, Next.js, Supabase ni servidor por ahora.
- Trabajar solo en la fase pedida, dejando un resultado verificable y docs/progreso.md actualizado. No hacer las seis fases de una vez.
- La Fase 0B ya fue reportada como completada: diagnóstico explícito de recursos. No presentarlo como juego jugable; consultar docs/progreso.md. La siguiente fase autorizada en este kit es Fase 1, siguiendo su prompt.
- Cargar solo recursos elegidos y verificados en public/assets/. asset-workbench/ es material de trabajo local, excluido de Git; los candidatos nuevos aún no están aprobados para runtime. docs/audit-original/ no es documentación vigente.
- `usable_icon` significa UI estática, no entidad animada ni habilidad implementada. `reference_only` y `pending_source` no deben convertirse automáticamente en recursos del juego.
- No usar bloques del mago como spritesheets uniformes. No inferir grid, fps, direcciones, hitbox o derechos de uso por nombre de archivo.
- Nunca fabricar animaciones concatenando criaturas diferentes. No sustituir personajes por cuadrados para dar una fase visual por terminada.
- Mantener nombres y claves estables; actualizar manifest, atlas, ejemplos y mapa de renombres juntos si cambian rutas.
- Resolver URL con import.meta.env.BASE_URL para soportar despliegue en subruta. No importar PNG desde public como módulos TS. Los JSON atlas contienen su metadata de imagen; pasar la URL de imagen explícita a Phaser.
- Pixel art: nearest, pixelArt, roundPixels, escala/zoom entero donde sea posible. No estirar assets a 32×32 indiscriminadamente.
- Revisar licencias separadas del código. No aplicar la licencia del repo a arte de terceros; no forzar `git add -f` para fuentes excluidas.
- Antes de declarar terminada una fase: assets:check, typecheck, build y prueba manual relevante. Registrar lo ejecutado y limitaciones reales; no inventar pruebas pasadas.
- Mantener módulos simples y atributos/datos separados del arte. Comenzar con un protagonista; Guerrero/Mago/Asesino son objetivo posterior hasta tener los tres packs correctos.
