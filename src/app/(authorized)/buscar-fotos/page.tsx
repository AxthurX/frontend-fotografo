'use client';

import AlbumTable, { type Album } from '@/components/AlbumTable';
import {
	type Categories,
	categories,
} from '@/components/HomeTemplate/categories';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { type Cities, cities } from '@/lib/cities';
import { zodErrorMap } from '@/lib/zodErrorMap';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Search } from 'lucide-react';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

export interface ISearchSchema {
	value: string;
}

export const SEARCH_ZOD_OBJECT = z.object({
	value: z.string(),
});

async function getCategoria(name: string) {
	try {
		const res = await axios.get('/api/categoria', {
			params: {
				name: name,
			},
		});

		return res.data;
	} catch (error) {
		console.log(error);
		return null;
	}
}

export default function BuscarFoto({
	params,
}: { params: { categoria: string } }) {
	const methods = useForm<ISearchSchema>({
		resolver: zodResolver(SEARCH_ZOD_OBJECT, { errorMap: zodErrorMap }),
	});

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
			photographer_name: 'Antonio Silva',
			status: 'Pro',
			title: 'bigcup sp',
			location: 'APS - Sul - São Paulo, SP',
			date: '22/07/2024 08:00 / 18:00',
		},
		{
			id: 499596,
			image:
				'https://d2hk32cswy6zx7.cloudfront.net/cee1cb3a9a52865b738aebb64106684a/v2_0055cc3a-7cb6-4737-92c4-1432bcdf6a0b.jpg',
			photographer_image:
				'https://d2hk32cswy6zx7.cloudfront.net/fotografos/v2_fa7d866a-9856-4858-b5a9-6abf3e985717.jpg',
			photographer_name: 'Daniel Silva',
			status: 'Pro',
			title: 'ipecu sp',
			location: 'CAPES - Centro - Porto velho, PVH',
			date: '22/07/2024 08:00 / 18:00',
		},
		{
			id: 499597,
			image:
				'https://d2hk32cswy6zx7.cloudfront.net/cee1cb3a9a52865b738aebb64106684a/v2_0055cc3a-7cb6-4737-92c4-1432bcdf6a0b.jpg',
			photographer_image:
				'https://d2hk32cswy6zx7.cloudfront.net/fotografos/v2_fa7d866a-9856-4858-b5a9-6abf3e985717.jpg',
			photographer_name: 'John Doe',
			status: 'Pro',
			title: 'ipecu sp',
			location: 'CAPES - Centro de - Porto velho, PVH',
			date: '22/07/2024 08:00 / 18:00',
		},
		{
			id: 499598,
			image:
				'https://d2hk32cswy6zx7.cloudfront.net/cee1cb3a9a52865b738aebb64106684a/v2_0055cc3a-7cb6-4737-92c4-1432bcdf6a0b.jpg',
			photographer_image:
				'https://d2hk32cswy6zx7.cloudfront.net/fotografos/v2_fa7d866a-9856-4858-b5a9-6abf3e985717.jpg',
			photographer_name: 'Antonio Silva',
			status: 'Pro',
			title: 'bigcup sp',
			location: 'APS - Sul - São Paulo, SP',
			date: '22/07/2024 08:00 / 18:00',
		},
		{
			id: 499599,
			image:
				'https://d2hk32cswy6zx7.cloudfront.net/cee1cb3a9a52865b738aebb64106684a/v2_0055cc3a-7cb6-4737-92c4-1432bcdf6a0b.jpg',
			photographer_image:
				'https://d2hk32cswy6zx7.cloudfront.net/fotografos/v2_fa7d866a-9856-4858-b5a9-6abf3e985717.jpg',
			photographer_name: 'Daniel Silva',
			status: 'Pro',
			title: 'ipecu sp',
			location: 'CAPES - Centro - Porto velho, PVH',
			date: '22/07/2024 08:00 / 18:00',
		},
		{
			id: 499515,
			image:
				'https://d2hk32cswy6zx7.cloudfront.net/cee1cb3a9a52865b738aebb64106684a/v2_0055cc3a-7cb6-4737-92c4-1432bcdf6a0b.jpg',
			photographer_image:
				'https://d2hk32cswy6zx7.cloudfront.net/fotografos/v2_fa7d866a-9856-4858-b5a9-6abf3e985717.jpg',
			photographer_name: 'John Doe',
			status: 'Pro',
			title: 'ipecu sp',
			location: 'CAPES - Centro de - Porto velho, PVH',
			date: '22/07/2024 08:00 / 18:00',
		},
	];

	return (
		<div className='container my-20 w-full'>
			<FormProvider {...methods}>
				<form className='mb-6'>
					<h1 className='mb-6 font-bold text-4xl'>Encontre suas fotos</h1>

					<div className='mb-8 flex flex-col gap-4 md:flex-row'>
						<div className='relative flex-1'>
							<Search className='-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 transform text-gray-400' />
							<input
								type='text'
								placeholder='Pesquise suas fotos...'
								className='w-full rounded-md border py-2 pr-4 pl-10 focus:outline-none focus:ring-2 focus:ring-primary'
							/>
						</div>

						<Select>
							<SelectTrigger className='w-full md:w-[180px]'>
								<SelectValue placeholder='Categoria' />
							</SelectTrigger>
							<SelectContent>
								{categories.map((category: Categories) => (
									<SelectItem key={category.name} value={category.name}>
										{category.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>

						<Select>
							<SelectTrigger className='w-full md:w-[180px]'>
								<SelectValue placeholder='Cidade' />
							</SelectTrigger>
							<SelectContent>
								{cities.map((city: Cities) => (
									<SelectItem key={city.name} value={city.name}>
										{city.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>

						<Select>
							<SelectTrigger className='w-full md:w-[180px]'>
								<SelectValue placeholder='Data' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='recent'>Mais recentes</SelectItem>
								<SelectItem value='older'>Mais antigas</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</form>
			</FormProvider>

			<AlbumTable albums={albums} />
		</div>
	);
}
