import { z } from 'zod';

export interface ILoginSchema {
	email: string;
	senha: string;
}

export const LOGIN_ZOD_OBJECT = z.object({
	email: z.string(),
	senha: z.string(),
});
