'use client';

import Image from 'next/image';

const QuemSomos = () => {
	return (
		<>
			<div className='mt-0 h-[90vh] min-h-[750px] w-full bg-[url("/images/fotografo.png")] bg-center bg-cover bg-no-repeat'>
				<div className='pt-40 pl-60'>
					<Image
						src={'/images/logo.png'}
						style={{ filter: 'brightness(10)' }}
						alt='imagem'
						height='150'
						width='500'
					/>
				</div>
			</div>
			<div
				className='container mx-auto px-5'
				style={{
					background:
						'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, /f5f5f5 100%)',
				}}
			>
				<br />
				<br />
				<br />
				<div className='-mx-4 flex flex-wrap justify-center pt-5 pb-2'>
					<div className='col-span-12 text-center'>
						<h2 className='font-semibold text-3xl text-red-800'>
							Nossas vantagens
						</h2>
					</div>
				</div>
				<div className='-mx-4 flex flex-wrap justify-center pb-5'>
					<div className='max-w-[16.666667%] flex-[0_0_16.666667%]' />
					<div className='my-12 flex max-w-[16.666667%] flex-[0_0_16.666667%] flex-col items-center py-12 text-center'>
						<Image src='/images/alvo.svg' alt='imagem' height='70' width='70' />
						<br />
						<br />
						<b className='text-2xl text-slate-500'>
							Programa de
							<br />
							metas
						</b>
					</div>
					<div className='my-12 flex max-w-[16.666667%] flex-[0_0_16.666667%] flex-col items-center py-12 text-center'>
						<Image
							src='/images/certificado.svg'
							alt='imagem'
							height='70'
							width='70'
						/>
						<br />
						<br />
						<b className='text-2xl text-slate-500'>
							Retirada rápida
							<br />
							via PIX
						</b>
					</div>
					<div className='my-12 flex max-w-[16.666667%] flex-[0_0_16.666667%] flex-col items-center py-12 text-center'>
						<Image
							src='/images/diamante.svg'
							alt='imagem'
							height='70'
							width='70'
						/>
						<br />
						<br />
						<b className='text-2xl text-slate-500'>
							Suporte
							<br />
							24/7
						</b>
					</div>
					<div className='my-12 flex max-w-[16.666667%] flex-[0_0_16.666667%] flex-col items-center py-12 text-center'>
						<Image
							src='/images/drink.svg'
							alt='imagem'
							height='70'
							width='70'
						/>
						<br />
						<br />
						<b className='text-2xl text-slate-500'>
							Comissões
							<br />
							baixas
						</b>
					</div>
					<div className='max-w-[16.666667%] flex-[0_0_16.666667%]' />
				</div>
				<br />
				<br />
				<br />
			</div>
			<div className='container mx-auto px-4 md:px-6 lg:px-8'>
				<div className='container mx-auto px-4 md:px-6 lg:px-8"'>
					<div className='my-5 grid grid-cols-12 py-5'>
						<div className='col-span-6'>
							<br />
							<h2 className='font-normal text-4xl text-red-800'>Quem somos</h2>
							<br />
							<p className='font-bold text-base text-gray-500'>
								A Extreme é uma plataforma inovadora para fotógrafos.
							</p>
							<br />
							<small className='font-semibold text-gray-500 text-sm'>
								Olá, somos a Extreme, a melhor plataforma para venda de fotos e
								serviços online.
								<br />
								<br />
								Acreditamos que a tecnologia é a chave para revolucionar a forma
								como vivemos, trabalhamos e nos relacionamos. É por isso que
								criamos a Extreme, com o objetivo de tornar o processo de venda
								de fotos e serviços online mais fácil e acessível para todos.
							</small>
							<br />
							<br />
						</div>
						<div className='col-start-10'>
							<Image
								src='/images/images.png'
								alt='imagem'
								className='mt-4'
								width={300}
								height={300}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default QuemSomos;
