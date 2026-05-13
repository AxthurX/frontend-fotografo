import FormContainer from '@/components/FormStructure/FormContainer';
import { Header } from '@/components/FormStructure/Header';
import perguntas from '@/lib/perguntas-frequentes/perguntas';

export default function PerguntasFrequentes() {
	return (
		<FormContainer>
			<Header className='min-h-[auto]'>
				<Header.Title>Perguntas Frequentes</Header.Title>
			</Header>
			<div className='relative mx-auto pb-20'>
				{perguntas.map((pergunta) => (
					<div
						key={pergunta.titulo}
						className='collapse-arrow collapse my-4 mb-2 rounded-lg bg-gray-50 shadow shadow-gray-200'
					>
						<input
							type='checkbox'
							name={`${pergunta.titulo}`}
							className='h-auto w-auto'
						/>
						<h2 className='collapse-title font-bold text-md md:text-xl'>
							{pergunta.titulo}
						</h2>
						<div className='collapse-content'>
							<p>
								<span className='font-bold'> {pergunta.descricao}</span>
							</p>
						</div>
					</div>
				))}
			</div>
		</FormContainer>
	);
}
