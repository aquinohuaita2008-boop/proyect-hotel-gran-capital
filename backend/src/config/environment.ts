import 'dotenv/config';
import { z } from 'zod';

const schema = z.object({
  PORT: z.coerce.number().int().positive().default(3001),
  DATABASE_URL: z.string().min(1),
  DATABASE_SSL: z.enum(['true','false']).default('false').transform((value) => value === 'true'),
  CORS_ORIGIN: z.string().default('http://localhost:4321'),
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRES_IN: z.string().default('1h'),
  BCRYPT_ROUNDS: z.coerce.number().int().refine((value) => value === 8, 'BCRYPT_ROUNDS debe ser exactamente 8').default(8),
});

export const env = schema.parse(process.env);
