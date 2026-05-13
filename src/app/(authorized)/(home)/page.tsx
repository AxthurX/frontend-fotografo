import HomeTemplate from '@/components/HomeTemplate';
import Link from 'next/link';

export default function Home() {
	return (
		<>
			<div
				className='flex min-h-[700px] w-full items-center bg-[url("/images/home.jpg")] bg-black bg-center bg-cover bg-no-repeat'
				style={{
					boxShadow: 'inset 600px -150px 200px 0px rgba(0, 0, 0, 0.75)',
				}}
			>
				<div className='container pt-5'>
					<div className='row'>
						<div className='mt-0 md:mt-4'>
							<span style={{ textShadow: '0px 0px 10px #000000' }}>
								<h1 className='text-4xl text-white'>
									Compre suas fotos
									<br />
									praticando suas
									<br />
									atividades favoritas!
								</h1>
								<br />
								<p className='text-white opacity-90'>
									Encontre seus melhores cliques e compartilhe
									<br /> nas redes sociais. Mostre seu comprometimento
									<br /> e dedicação com suas atividades favoritas para <br />
									inspirar e motivar!
								</p>
								<br /> <br />
								<Link
									href='/entrar'
									className='btn btn-lg btn-error w-[240px] px-5 text-xl'
								>
									Sou cliente
								</Link>
								<br /> <br />
								<Link
									href='/entrar'
									className='btn btn-lg h-[50px] w-[240px] border border-white bg-transparent px-5 text-white text-xl hover:bg-transparent hover:opacity-80'
								>
									Sou fotógrafo
								</Link>
							</span>
						</div>
					</div>
				</div>
			</div>

			<HomeTemplate />
		</>
	);
}
