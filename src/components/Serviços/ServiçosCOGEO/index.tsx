import Link from 'next/link';
import Card from '../../Card';

const ServicosCOGEO = () => {
	return (
		<div className='mt-4 grid grid-cols-12 w-10/12 mx-auto'>
			<div className='col-span-4 col-start-3 max-md:col-span-full max-md:my-2 mx-auto'>
				<Link
					href='https://geoportal.sedam.ro.gov.br/'
					target='_blank'
					prefetch={false}
				>
					<Card
						imageClassName='bg-beige-700 object-none'
						imageHeight={122}
						imageWidth={122}
						title='Geoportal'
						url='/ext-files/website-icons/logo_geoportal_beta.webp'
						description='Acesso a dados geoespaciais e informações ambientais.'
					/>
				</Link>
			</div>
			<div className='col-span-4 max-md:col-span-full max-md:my-2 mx-auto'>
				<Link
					href='/post/cogeo-sala-de-situacao'
					target='_blank'
					prefetch={false}
				>
					<Card
						imageClassName='bg-beige-700 object-fill'
						title='Sala de Situação'
						url={'/ext-files/website-icons/RONDONIA.svg'}
						description='Centro de monitoramento de eventos hidrometeorológicos'
					/>
				</Link>
			</div>
		</div>
	);
};

export default ServicosCOGEO;
