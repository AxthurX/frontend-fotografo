import Card from '@/components/Card';
import Link from 'next/link';

/**
 * Esse componente existe pra isolar a lógica de requisição de dados caso criemos um jeito de criarem links importantes sem precisar da GERDES.
 * Pode ser pra não renderizar antes de entrar em viewport também. Sei lá.
 */

const HomeImportantLinks = () => {
	return (
		<div className='mx-auto mb-16 grid max-w-screen-xl grid-cols-1 justify-items-center gap-y-12 text-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
			<Link
				href='https://transparencia.sedam.ro.gov.br/'
				target='_blank'
				prefetch={false}
			>
				<Card
					title='Portal da Transparência da SEDAM'
					url={'/ext-files/website-icons/Logo-esic-whitebg.png'}
				/>
			</Link>
			<Link
				href='/ext-files/files/planejamento-estrategico-sedam-2023-2027.pdf'
				target='_blank'
				prefetch={false}
			>
				<Card
					imageClassName=''
					title='Planejamento Estratégico - 2023 a 2027'
					url='/ext-files/website-icons/2023.png'
				/>
			</Link>
			<Link
				href='https://rondonia.ro.gov.br/servico/sispar/'
				target='_blank'
				prefetch={false}
			>
				<Card
					title='SISPAR'
					description='Parcerias e Descentralização da Execução das Políticas Públicas e Serviços Públicos não Exclusivos do Estado'
					url='/ext-files/website-icons/Logo_sispar-whitebg.png'
				/>
			</Link>
			<Link
				href='https://observatorio.sepog.ro.gov.br/'
				target='_blank'
				prefetch={false}
			>
				<Card
					title='Observatório do Desenvolvimento Regional'
					url={'/ext-files/website-icons/Logo-odr-whitebg.png'}
				/>
			</Link>
			<Link href='/noticias?tags=Pdseai'>
				<Card
					title='PDSEAI'
					url={'/ext-files/website-icons/Logo-att-PDSEAI-whitebg.png'}
					description='Projeto de Desenvolvimento Socioeconômico e Ambiental Integrado'
				/>
			</Link>

			<Link href='/pgsa'>
				<Card
					imageClassName=''
					title='PGSA'
					url='/ext-files/website-icons/logo-pgsa.png'
					description='Política Estadual de Governança Climática e Serviços Ambientais'
				/>
			</Link>
			<Link
				href='https://www.fundoamazonia.gov.br/'
				target='_blank'
				prefetch={false}
			>
				<Card
					title='Fundo Amazônia'
					url={'/ext-files/website-icons/Logo_arara_fundo_amazonia.png'}
					description='O Brasil cuida. O mundo apoia. Todos ganham.'
				/>
			</Link>
			<Link href='https://www.bndes.gov.br/' target='_blank' prefetch={false}>
				<Card
					title='BNDES'
					url={'/ext-files/website-icons/Logo-bndes-whitebg.png'}
					description='Banco Nacional de Desenvolvimento Econômico e Social'
				/>
			</Link>
			<Link
				href='https://geoportal.sedam.ro.gov.br/'
				target='_blank'
				prefetch={false}
			>
				<Card
					imageClassName='bg-beige-700'
					title='Geoportal'
					url='/ext-files/website-icons/cogeo.png'
					description='Acesso a dados geoespaciais e informações ambientais.'
				/>
			</Link>
		</div>
	);
};

export default HomeImportantLinks;
