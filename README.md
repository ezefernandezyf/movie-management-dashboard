# Movie Management Dashboard

Demo: https://moviesdashboard.vercel.app/  
Repositorio: https://github.com/ezefernandezyf/movie-management-dashboard

Descripción

- Dashboard para gestionar un catálogo de películas (CRUD) pensado para uso interno: listar, crear, editar y eliminar películas.
- Autenticación y datos gestionados mediante Supabase (Auth + Database). Solo usuarios autenticados pueden crear/editar/eliminar; solo el autor de una película puede modificarla o borrarla; los visitantes pueden ver la lista pública.

Tecnologías

- React + Vite (TypeScript)
- Tailwind CSS
- @tanstack/react-query (fetching & cache)
- react-hook-form + Zod (formularios y validación)
- @supabase/supabase-js (Auth, Database, Realtime)
- Vitest + @testing-library/react (tests)
- ESLint, Prettier

Estado

- Producción: desplegado en Vercel (URL arriba).
- Autenticación implementada en Supabase; RLS esperadas para seguridad de datos.

Requisitos

- Node.js 18+ y npm
- Cuenta y proyecto en Supabase (para entorno real)
- Git

Quick Start (local)

1. Clona el repositorio:
   git clone https://github.com/ezefernandezyf/movie-management-dashboard.git
   cd movie-management-dashboard

2. Instala dependencias:
   npm install

3. Crea un fichero `.env` local (no subir) basado en `.env.example` y añade tus VITE*SUPABASE*\*:
   - VITE_SUPABASE_URL
   - VITE_SUPABASE_ANON_KEY

   Ejemplo (.env):

   ```
   VITE_SUPABASE_URL=https://your-project-ref.supabase.co
   VITE_SUPABASE_ANON_KEY=public-anon-key
   ```

4. Ejecuta la app en modo desarrollo:
   npm run dev
   Abre la URL que muestre Vite (por defecto http://localhost:5173)

Scripts importantes (package.json)

- npm run dev — servidor de desarrollo
- npm run build — compilar (tsc + vite)
- npm run preview — probar build localmente
- npm run lint — ESLint
- npm run lint:fix — ESLint (--fix)
- npm run format — Prettier (format)
- npm run test — Vitest
- npm run test:watch — Vitest en watch
- npm run test:coverage — cobertura de tests

Supabase — recomendaciones rápidas

- Usa `import.meta.env.VITE_SUPABASE_URL` y `import.meta.env.VITE_SUPABASE_ANON_KEY` en el frontend.
- Asegúrate de que las políticas RLS (Row Level Security) en Supabase protejan la mutación de datos. Ejemplo de policies recomendadas para la tabla `movies`:
  - `owner_id` debe contener el `auth.uid()` del creador al insertar (puede establecerse desde la función RPC o desde el frontend si la política lo permite y validates con RLS).

Seguridad y buenas prácticas

- Nunca subir `.env` ni claves. Publica sólo `.env.example`.
- Mantén políticas RLS estrictas: no confiar en la ANON KEY para seguridad; esta se usa con RLS habilitado.
- Rotar claves si se exponen; no incluir secretos en commits.
- Añade un `SECURITY.md` si el proyecto será usado en producción.

Testing

- Unit / integration con Vitest + Testing Library.
- Comando:
  npm run test

  ```

  ```

Arquitectura y convenciones

- Rutas principales y archivos:
  - src/ — código fuente React
  - src/components — componentes UI
  - src/hooks — react-query / supabase hooks
  - src/pages — vistas / rutas
  - vitest.config.ts — configuración de tests
  - vite.config.ts — configuración Vite
- Convenciones de Git:
  - Branches: feature/<short-desc>, fix/<short-desc>
  - Commits: Conventional Commits (ej.: `feat(movies): add supabase movie hooks`)

Build & Deploy (Vercel)

- El repo ya contiene configuración de Vercel. Conecta el repositorio en Vercel y añade las variables de entorno VITE*SUPABASE*\* en el dashboard.
- URL de producción: https://moviesdashboard.vercel.app/

Resolución de problemas (debugging rápido)

- Si las variables de entorno no se reflejan, reinicia el servidor Vite.
- Para comprobar llamadas a Supabase: pestaña Network en DevTools; añade console.log de `supabase.auth.getUser()`/respuesta del cliente cuando sea necesario.
- Si ves errores de permisos al mutar datos, verifica las policies RLS en Supabase.

Contribuir

- Fork / branch / PR:
  - git checkout -b feature/<short-desc>
  - git commit -m "feat(movies): description"
  - Abre PR contra `main` describiendo cambios y pruebas
- Añade tests donde proceda y asegúrate que lint y tests pasen antes de merge.

Licencia

- Este repositorio usa licencia MIT `LICENSE`.

Contacto

- Autor: @ezefernandezyf
- Para dudas sobre despliegue, RLS o políticas, incluir pasos reproducibles en el PR para facilitar revisión.
