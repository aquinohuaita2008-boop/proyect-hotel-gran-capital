import type { Role } from '@/types/api.types';export const isStaff=(role?:Role)=>role==='ADMINISTRADOR'||role==='RECEPCIONISTA';export const canManage=(role?:Role)=>isStaff(role);

