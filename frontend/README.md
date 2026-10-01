# Frontend Hotel Gran Capital

Frontend Astro con TypeScript, Tailwind CSS, Zod y consumo REST.

```bash
npm install
copy .env.example .env
```

Configura `PUBLIC_API_URL` con la URL base del backend. El frontend usa el formato de respuesta `{ success, data, error }`, guarda solamente el JWT y la sesión no sensible en `localStorage`.

Para ejecutarlo posteriormente:

```bash
npm run dev
```
