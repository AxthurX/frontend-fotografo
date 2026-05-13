'use client';

import AlbumTable, { type Album } from '@/components/AlbumTable';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useEffect } from 'react';

async function getCategoria(name: string) {
	try {
		const res = await axios.get('/api/categoria', {
			params: {
				name: name,
			},
		});
		return res.data;
	} catch (error) {
		console.error(error);
		return null;
	}
}

const capitalizeFirstLetter = (texto: string) => {
	return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
};

export default function Categoria({
	params,
}: { params: { categoria: string } }) {
	useEffect(() => {
		getCategoria(params.categoria).then(async (post) => {
			if (post) {
				console.log(post);
			}
		});
	}, [params.categoria]);

	const albums: Album[] = [
		{
			id: 499595,
			image:
				'https://d2hk32cswy6zx7.cloudfront.net/cee1cb3a9a52865b738aebb64106684a/v2_0055cc3a-7cb6-4737-92c4-1432bcdf6a0b.jpg',
			photographer_image:
				'https://d2hk32cswy6zx7.cloudfront.net/fotografos/v2_fa7d866a-9856-4858-b5a9-6abf3e985717.jpg',
			photographer_name: 'John Doe',
			status: 'Pro',
			title: 'ibero sp',
			location: 'CPUS - Centro de... - São Paulo, SP',
			date: '22/07/2024 08:00 / 18:00',
		},
		{
			id: 499595,
			image:
				'https://d2hk32cswy6zx7.cloudfront.net/cee1cb3a9a52865b738aebb64106684a/v2_0055cc3a-7cb6-4737-92c4-1432bcdf6a0b.jpg',
			photographer_image:
				'https://d2hk32cswy6zx7.cloudfront.net/fotografos/v2_fa7d866a-9856-4858-b5a9-6abf3e985717.jpg',
			photographer_name: 'John Doe',
			status: 'Pro',
			title: 'bigcup sp',
			location: 'CEREUS - Centro de... - São Paulo, SP',
			date: '22/07/2024 08:00 / 18:00',
		},
		{
			id: 499595,
			image:
				'https://d2hk32cswy6zx7.cloudfront.net/cee1cb3a9a52865b738aebb64106684a/v2_0055cc3a-7cb6-4737-92c4-1432bcdf6a0b.jpg',
			photographer_image:
				'https://d2hk32cswy6zx7.cloudfront.net/fotografos/v2_fa7d866a-9856-4858-b5a9-6abf3e985717.jpg',
			photographer_name: 'John Doe',
			status: 'Pro',
			title: 'iberos sp',
			location: 'CAPES - Centro de... - São Paulo, SP',
			date: '22/07/2024 08:00 / 18:00',
		},
	];

	return (
		<>
			<div className='mb-10 flex h-[45vh] items-center bg-center bg-cover bg-slate-600/80 shadow-inner'>
				<div className='flex flex-col pl-8 font-semibold text-white'>
					<h1 className='text-7xl'>
						{capitalizeFirstLetter(params.categoria)}
					</h1>
					<h2 className='text-5xl'>compre suas fotos</h2>
				</div>
			</div>

			<div className='p-5'>
				<AlbumTable albums={albums} />
			</div>
			<div>
				<Button className='btn btn-block bg-slate-800 hover:bg-slate-600/80'>
					<b>Mostrar mais álbuns</b>
				</Button>
			</div>
			<br />
			<br />
		</>
	);
}
