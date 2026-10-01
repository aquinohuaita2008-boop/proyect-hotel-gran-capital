export type Role = 'CLIENTE' | 'ADMINISTRADOR' | 'RECEPCIONISTA';
export type Session = { id: number; nombre: string; rol: Role; correo?: string };
export type ApiResponse<T> = { success: boolean; message?: string; data?: T; error?: { code: string; message: string; details?: unknown[] } };
export type Room = { id:number; numero:number|string; tipo:string; descripcion?:string; capacidad:number; precio:number|string; estado:string; imagen_url?:string; caracteristicas?:string };
export type Client = { id:number; nombre:string; apellido?:string; documento:string; telefono:string; correo:string };
export type Reservation = { id:number; codigo?:string; clienteId:number; habitacionId:number; habitacion?:string; fechaEntrada:string; fechaSalida:string; cantidadHuespedes:number; total?:number|string; estado:string };
export type Payment = { id:number; reservaId:number; total?:number|string; monto:number|string; saldo?:number|string; metodoPago:string; estado:string; fechaPago?:string };
export type Service = { id:number; nombre:string; descripcion:string; precio:number|string; disponible:boolean };
export type ServiceRequest = { id:number; reservaId:number; clienteId:number; servicioId:number; cantidad:number; estado:string; fechaSolicitud?:string };
export type Dashboard = Record<string, number|string>;

