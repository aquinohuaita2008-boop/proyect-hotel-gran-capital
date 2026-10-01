export type Role = 'CLIENTE' | 'ADMINISTRADOR' | 'RECEPCIONISTA';
export type AuthUser = { id: number; rol: Role; name: string; email?: string };
export type ReservationStatus = 'PENDIENTE' | 'CONFIRMADA' | 'CANCELADA' | 'COMPLETADA';
export type RoomStatus = 'DISPONIBLE' | 'RESERVADA' | 'OCUPADA' | 'LIMPIEZA' | 'MANTENIMIENTO';
export type PaymentStatus = 'PENDIENTE' | 'PARCIAL' | 'PAGADO' | 'REEMBOLSADO';
