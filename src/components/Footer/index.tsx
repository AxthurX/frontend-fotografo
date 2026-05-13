'use client';

import { sen } from '@/lib/font/Sen';
import { isAuthorized } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Footer = () => {
	const pathname = usePathname();
	const is_authorized = isAuthorized(pathname);

	return is_authorized ? (
		<footer
			className={`relative bg-red-950 py-4 text-beige-100 ${sen.className}`}
		>
			<div className='container mx-auto px-4 md:px-6 lg:px-8'>
				<div className='container mx-auto px-4 md:px-6 lg:px-8"'>
					<br />
					<div className='flex justify-around px-4 pt-5 pb-2 md:px-6 lg:px-8'>
						<div>
							<b className='mb-5 font-bold text-black text-xl'>
								Nosso serviços
							</b>
							<Link
								href='/buscar-fotos'
								className='mt-4 mb-3 block font-bold text-sm'
							>
								Encontre sua foto
							</Link>
						</div>
						<div>
							<b className='mb-5 font-bold text-black text-xl'>Empresa</b>
							<Link
								href='/quem-somos'
								className='mt-4 mb-3 block font-bold text-sm'
							>
								Quem somos
							</Link>
							<Link
								href='/se-torne-um-fotografo'
								className='mt-3 mb-3 block font-bold text-sm'
							>
								Se torne um fotógrafo
							</Link>
							<Link
								href='/perguntas-frequentes'
								className='mt-3 mb-3 block font-bold text-sm'
							>
								Perguntas frequentes
							</Link>
						</div>
						<div>
							<b className='mb-5 font-bold text-black text-xl'>Contato</b>
							<Link
								href='https://api.whatsapp.com/send?phone=55&amp;text='
								target='_blank'
								className='mt-4 mb-3 block font-bold text-sm'
								rel='noreferrer'
							>
								Whatsapp
							</Link>
							<Link
								href='https://instagram.com/'
								target='_blank'
								className='mt-3 mb-3 block font-bold text-sm'
								rel='noreferrer'
							>
								Insta:
							</Link>
							<Link
								href='mailto:sac@'
								className='mt-3 mb-3 block font-bold text-sm'
							>
								E-mail
							</Link>
							<Link href='/ajuda' className='mt-3 mb-3 block font-bold text-sm'>
								Ajuda
							</Link>
						</div>
					</div>
					<br />
					<div className='flex items-center justify-around gap-4'>
						<div className='text-center text-sm'>
							&copy; Todos os Direitos Reservados - 2024
						</div>
						<Image
							src={encodeURI('/images/logo.png')}
							width={130}
							height={85}
							alt='Image'
						/>
					</div>
				</div>
			</div>
		</footer>
	) : null;
};

export default Footer;
