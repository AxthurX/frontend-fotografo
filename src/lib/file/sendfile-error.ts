export class SendFileError extends Error {
	code: number;
	constructor(mensagem: string, code = 500) {
		super(mensagem);
		this.name = mensagem; // Nome opcional para a classe de erro personalizada
		this.code = code; // Você pode adicionar informações adicionais, como códigos de status HTTP
	}
}

export function throwSendFileError(mensagem: string, code: number): never {
	throw new SendFileError(mensagem, code);
}
