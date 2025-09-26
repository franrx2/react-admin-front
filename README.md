# React Admin Front

Cliente mínimo en React + TypeScript para consumir la API Catalog.

## Desarrollo
```bash
npm install
npm run dev
```
Configura un proxy a `http://localhost:8080` para `/api` en `vite.config.ts` si lo deseas:
```ts
server: { proxy: { '/api': 'http://localhost:8080' } }
```
