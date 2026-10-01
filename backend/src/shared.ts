export class AppError extends Error { constructor(public status: number, public code: string, message: string, public details: unknown[] = []) { super(message); } }
export const ok = (data: unknown, message = 'OK') => ({ success: true, message, data });
export const fail = (error: AppError) => ({ success: false, error: { code: error.code, message: error.message, details: error.details } });
