import { toast } from "@/components/ui/use-toast";
import { AxiosError } from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatCpfCnpj(value: string) {
	const cleanValue = value.replace(/\D/g, '');
	if (cleanValue.length === 11) {
		return cleanValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
	} else if (cleanValue.length === 14) {
		return cleanValue.replace(
			/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
			'$1.$2.$3/$4-$5',
		);
	} else {
		return value;
	}
}

export function validateCpf(cpf: string): boolean {
	const new_cpf = cpf.replace(/[^\d]+/g, '');
	if (new_cpf.length !== 11 || /^(\d)\1{10}$/.test(new_cpf)) return false;

	let sum = 0;
	let remainder: number;
	for (let i = 1; i <= 9; i++)
		sum += Number.parseInt(new_cpf.substring(i - 1, i)) * (11 - i);
	remainder = (sum * 10) % 11;
	if (remainder === 10 || remainder === 11) remainder = 0;
	if (remainder !== Number.parseInt(new_cpf.substring(9, 10))) return false;

	sum = 0;
	for (let i = 1; i <= 10; i++)
		sum += Number.parseInt(new_cpf.substring(i - 1, i)) * (12 - i);
	remainder = (sum * 10) % 11;
	if (remainder === 10 || remainder === 11) remainder = 0;
	if (remainder !== Number.parseInt(new_cpf.substring(10, 11))) return false;

	return true;
}

export function validateCnpj(cnpj: string): boolean {
	const new_cnpj = cnpj.replace(/[^\d]+/g, '');
	if (new_cnpj.length !== 14) return false;

	if (/^(\d)\1{13}$/.test(new_cnpj)) return false;

	let t = 0;
	for (let i = 0, p = 5; i < 12; i++, p--) {
		p = p < 2 ? 9 : p;
		t += Number.parseInt(new_cnpj[i]) * p;
	}
	let d = ((10 * t) % 11) % 10;
	if (Number.parseInt(new_cnpj[12]) != d) return false;

	t = 0;
	for (let i = 0, p = 6; i < 13; i++, p--) {
		p = p < 2 ? 9 : p;
		t += Number.parseInt(new_cnpj[i]) * p;
	}
	d = ((10 * t) % 11) % 10;
	if (Number.parseInt(new_cnpj[13]) != d) return false;

	return true;
}

export function validateCpfOrCnpj(value: string): boolean {
  if (value.length === 14) {
    return validateCpf(value);
  } else if (value.length === 18) {
    return validateCnpj(value);
  } else {
    return false;
  }
}

export function onError(e: unknown) {
  const error: { message: string } = { message: "" };

  if (e instanceof AxiosError) {
    if (e.response)
      if (e.response.data)
        if (e.response.data.err && e.response.data.err.length > 0)
          error.message = e.response.data.err;
        else
          error.message = "Serviço indisponível.";
  } else error.message = "Tente novamente mais tarde.";

  toast({
    title: "Erro",
    description: error.message,
    variant: "destructive"
  });
}

export function onSucess(message: string) {
  toast({
    title: "Sucesso",
    description: message,
  });
}
