import type { ErrorHandler } from 'hono';
import { AppError, fail } from '../shared.js';
export const errorMiddleware:ErrorHandler= (error,c)=>{console.error('[backend-error]',error);const e=error instanceof AppError?error:new AppError(500,'INTERNAL_ERROR','Error interno del servidor');return c.json(fail(e),e.status as 400)};
