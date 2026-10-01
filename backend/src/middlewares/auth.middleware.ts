import { createMiddleware } from 'hono/factory';
import { jwtVerify } from 'jose';
import { env } from '../config/environment.js';
import { AppError } from '../shared.js';
export const authMiddleware=createMiddleware(async(c,next)=>{const header=c.req.header('Authorization');if(!header?.startsWith('Bearer '))throw new AppError(401,'UNAUTHORIZED','Token requerido');try{const {payload}=await jwtVerify(header.slice(7),new TextEncoder().encode(env.JWT_SECRET));c.set('user',{id:Number(payload.sub),rol:String(payload.role) as 'CLIENTE'|'ADMINISTRADOR'|'RECEPCIONISTA',name:String(payload.name||'')});await next()}catch(error){if(error instanceof AppError)throw error;throw new AppError(401,'INVALID_TOKEN','Token inválido o expirado')}});
export const roles=(...allowed:string[])=>createMiddleware(async(c,next)=>{const user=c.get('user') as {rol:string}|undefined;if(!user||!allowed.includes(user.rol))throw new AppError(403,'FORBIDDEN','Permisos insuficientes');await next()});
