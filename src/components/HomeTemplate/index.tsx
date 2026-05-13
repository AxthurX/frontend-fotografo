'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CardV2 } from '../CardV2';
import { Button } from '../ui/button';
import { type Categories, categories } from './categories';

const HomeTemplate = () => {
	return (
		<>
			<div className='min-h-20'>
				<div className='container mx-auto px-5 pt-12 pb-5'>
					<div className='mb-12 flex flex-col justify-center text-center'>
						<h1 className='mb-2 font-bold text-4xl text-red-600'>
							Navegue pelas categorias
						</h1>
						<p className='mx-auto max-w-2xl font-semibold text-gray-600 text-lg'>
							Compre suas fotos praticando suas atividades favoritas
						</p>
					</div>
					<div className='flex flex-wrap justify-around gap-8'>
						{categories.map((category: Categories) => (
							<Link
								key={category.name}
								className='category-card block rounded-xl bg-black'
								href={category.link}
							>
								<CardV2 className='shadow-lg transition-all duration-300 hover:shadow-xl'>
									<CardV2.Image
										src={category.image}
										height={240}
										width={380}
										alt={category.name}
										className='relative h-60 w-full rounded-xl'
									/>
									<div className='absolute right-0 bottom-0 left-0 z-20 flex items-center justify-center p-4'>
										<div className='font-bold text-white text-xl transition-all duration-300 group-hover:text-red-400'>
											{category.name}
										</div>
									</div>
								</CardV2>
							</Link>
						))}
					</div>
					<Button variant='destructive' className='mt-12 w-full'>
						<b>Ver todos os álbuns</b>
					</Button>
				</div>
			</div>
			<br /> <br />
			<div className='min-h-[300px] bg-gradient-to-r from-red-700/90 to-red-950/90 p-5'>
				<Image
					src='/images/logo.png'
					alt='Extreme Logo'
					height={60}
					width={300}
				/>
				<p className='pl-9 text-2xl text-white'>
					Seus melhores momentos num click.
				</p>
			</div>
			<div className='flex min-h-[600px] items-center bg-[url("/images/fotografo.png")] bg-center bg-cover bg-no-repeat'>
				<div className='max-w-[48%] p-10'>
					<p className='font-bold text-lg text-white opacity-60'>
						Oportunidades onde quer que você esteja
					</p>
					<h1 className='mt-4 font-bold text-4xl text-white'>
						Você é fotógrafo?
					</h1>
					<p className='text-white'>
						Com a ajuda da Extreme, os fotógrafos podem expandir seus negócios
						de maneira mais eficiente.
					</p>
					<Button variant='destructive' className='btn-lg mt-6 px-10 text-xl'>
						Sou fotógrafo
					</Button>
				</div>
			</div>
			<br />
			<div className='flex flex-col items-center justify-center'>
				<h2 className='py-6 text-center font-semibold text-3xl text-red-800'>
					Nossas vantagens
				</h2>
				<div className='flex items-end justify-center gap-8 py-6'>
					<div className='flex flex-col items-center justify-center text-center'>
						<Image src='/images/alvo.svg' alt='imagem' height={70} width={70} />
						<b className='text-2xl text-slate-500'>Programa de metas</b>
					</div>
					<div className='flex flex-col items-center justify-center text-center'>
						<Image
							src='/images/certificado.svg'
							alt='imagem'
							height={70}
							width={70}
						/>
						<b className='text-2xl text-slate-500'>Retirada rápida via PIX</b>
					</div>
					<div className='flex flex-col items-center justify-center text-center'>
						<Image
							src='/images/diamante.svg'
							alt='imagem'
							height={70}
							width={70}
						/>
						<b className='text-2xl text-slate-500'>Suporte 24/7</b>
					</div>
					<div className='flex flex-col items-center justify-center text-center'>
						<Image
							src='/images/drink.svg'
							alt='imagem'
							height={70}
							width={70}
						/>
						<b className='text-2xl text-slate-500'>Comissões baixas</b>
					</div>
				</div>
			</div>
			<br /> <br />
		</>
	);
};

export default HomeTemplate;
