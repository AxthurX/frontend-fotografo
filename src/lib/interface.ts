import type { ILoginSchema } from '@/app/(unauthorized)/entrar/lib/interface';

export interface ICombinedSchema extends ILoginSchema {}

export function cepRondonia(value: string) {
	const cep = value.replace(/[^0-9]/g, '');
	return /^76[89]\d{2}-?\d{3}$/.test(cep);
}
