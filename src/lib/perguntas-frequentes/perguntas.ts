export type IPerguntas = {
	titulo: string;
	descricao: string;
};

const perguntas: Array<IPerguntas> = [
	{
		titulo: 'Como funciona a Extreme?',
		descricao:
			'Nós conectamos você a um Fotógrafo para você aproveitar e registrar momentos incríveis. A plataforma permite que fotógrafos vendam diretamente fotos aos usuários do aplicativo. Utilize o melhor da tecnologia para combinar com seu fotógrafo uma sessão e registre seus melhores momentos.',
	},
	{
		titulo: 'Como encontrar um Fotógrafo?',
		descricao:
			'Você pode encontrar um fotógrafo perto de você, indo em Explorar > Encontre um Fotógrafo perto de você. Você pode solicitar um fotógrafo em qualquer lugar a qualquer momento indo em Explorar > Agendar uma sessão de fotos, ao solicitar, só aguadar o atendimento do Fotógrafo.',
	},
	{
		titulo: 'Como agendar uma Sessão de Fotos?',
		descricao:
			'Você pode solicitar um fotógrafo em qualquer lugar a qualquer momento indo em Explorar > Agendar uma sessão de fotos, ao solicitar, só aguardar o atendimento do Fotógrafo.',
	},
	{
		titulo: 'Como encontrar Minhas Fotos?',
		descricao:
			'Vá em Explorar > Encontre sua foto, seleciona o Estado e/ou Cidade e data ou período que foi fotografado.',
	},
	{
		titulo: 'Formas de Pagamento',
		descricao:
			'Aceitamos os Cartões Mastercard, Visa, Elo, Hipercard, American Express e Hiper.',
	},
	{
		titulo: 'Como baixar Fotos Compradas',
		descricao:
			'Após sua compra, vá em Minha Conta > Minha Compras e clique em Download de cada foto.',
	},
];

export default perguntas;
