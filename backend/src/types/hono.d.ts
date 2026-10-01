import type { AuthUser } from './domain.types.js';
declare module 'hono' { interface ContextVariableMap { user: AuthUser } }
