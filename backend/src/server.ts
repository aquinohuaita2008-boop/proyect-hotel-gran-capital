import { serve } from '@hono/node-server';import { app } from './app.js';import { env } from './config/environment.js';
serve({fetch:app.fetch,port:env.PORT},(info)=>console.log(`Hotel Gran Capital backend en http://localhost:${info.port}`));
