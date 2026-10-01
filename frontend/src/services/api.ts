import { storage } from '@/utils/storage';
import type { ApiResponse } from '@/types/api.types';
const base=import.meta.env.PUBLIC_API_URL || 'http://localhost:3001/api';
export class ApiError extends Error { constructor(public status:number, message:string, public code?:string){super(message)} }
export async function request<T>(path:string, options:RequestInit={}){const headers=new Headers(options.headers);headers.set('Content-Type','application/json');const token=storage.getToken();if(token)headers.set('Authorization',`Bearer ${token}`);const response=await fetch(`${base}${path}`,{...options,headers});let body:ApiResponse<T>|undefined;try{body=await response.json()}catch{body=undefined}if(!response.ok||body?.success===false)throw new ApiError(response.status,body?.error?.message||'No se pudo completar la solicitud',body?.error?.code);return (body?.data ?? body) as T}
export const get=<T>(path:string)=>request<T>(path);export const post=<T>(path:string,data:unknown)=>request<T>(path,{method:'POST',body:JSON.stringify(data)});export const put=<T>(path:string,data:unknown)=>request<T>(path,{method:'PUT',body:JSON.stringify(data)});export const patch=<T>(path:string,data?:unknown)=>request<T>(path,{method:'PATCH',body:data?JSON.stringify(data):undefined});

