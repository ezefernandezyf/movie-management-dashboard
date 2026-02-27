# Movie Management Dashboard

Proyecto simple para listar y gestionar películas en una interfaz React + Vite.

**Descripción:**
- Frontend en React + Vite que consume una API (ej. `json-server`) situada en `http://localhost:3000/movies`.

**Requisitos**
- Node.js 16+ y npm

**Instalación**

```bash
npm install
```

**Desarrollo**

Inicia el servidor de desarrollo:

```bash
npm run dev
```

Abrir en el navegador `http://localhost:5173` (o la URL que indique Vite).

Si usas `json-server` para datos locales (opcional):

```bash
npx json-server --watch db.json --port 3000
```

**Estructura mínima**
- `src/` : código fuente React
- `db.json` : datos de ejemplo para `json-server`
- `index.html`, `vite.config.ts`, `package.json`



