import { post } from './api';import { storage } from '@/utils/storage';import type { Session } from '@/types/api.types';
export async function login(usuario:string,contrasena:string){const result=await post<{token:string;user:Session}>('/auth/login',{usuario,contrasena});storage.setSession(result.token,result.user);return result}
export async function register(data:unknown){const result=await post<{token:string;user:Session}>('/auth/register',data);storage.setSession(result.token,result.user);return result}
export async function logout(){try{await post('/auth/logout',{})}finally{storage.clear();location.href='/login'}}

