'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaChevronDown, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi';
import { HiMiniMagnifyingGlassPlus } from 'react-icons/hi2';
import { IoIosHelpCircleOutline, IoMdClose } from 'react-icons/io';
import { LuRefreshCw } from 'react-icons/lu';

export const albums = [
	{
		id: 499595,
		albumImage:
			'https://d2hk32cswy6zx7.cloudfront.net/cee1cb3a9a52865b738aebb64106684a/v2_0055cc3a-7cb6-4737-92c4-1432bcdf6a0b.jpg',
		photographerImage:
			'https://d2hk32cswy6zx7.cloudfront.net/fotografos/v2_fa7d866a-9856-4858-b5a9-6abf3e985717.jpg',
		photographerName: 'John Doe',
		photographerStatus: 'Pro',
		albumTitle: 'ibere sp',
		albumLocation: 'CAPES - Centro de... - São Paulo, SP',
		albumDate: '22/07/2024 08:00 / 18:00',
	},
	{
		id: 499595,
		albumImage:
			'https://d2hk32cswy6zx7.cloudfront.net/cee1cb3a9a52865b738aebb64106684a/v2_0055cc3a-7cb6-4737-92c4-1432bcdf6a0b.jpg',
		photographerImage:
			'https://d2hk32cswy6zx7.cloudfront.net/fotografos/v2_fa7d866a-9856-4858-b5a9-6abf3e985717.jpg',
		photographerName: 'John Doe',
		photographerStatus: 'Pro',
		albumTitle: 'ibercup sp',
		albumLocation: 'CEPEUSP - Centro de... - São Paulo, SP',
		albumDate: '22/07/2024 08:00 / 18:00',
	},
	{
		id: 499595,
		albumImage:
			'https://d2hk32cswy6zx7.cloudfront.net/cee1cb3a9a52865b738aebb64106684a/v2_0055cc3a-7cb6-4737-92c4-1432bcdf6a0b.jpg',
		photographerImage:
			'https://d2hk32cswy6zx7.cloudfront.net/fotografos/v2_fa7d866a-9856-4858-b5a9-6abf3e985717.jpg',
		photographerName: 'John Doe',
		photographerStatus: 'Pro',
		albumTitle: 'bigcup sp',
		albumLocation: 'CEREUS - Centro de... - São Paulo, SP',
		albumDate: '22/07/2024 08:00 / 18:00',
	},
];

async function getAlbumById(id: string) {
	try {
		console.log(id);
		// const res = await axios.get('/api/album', {
		// 	params: {
		// 		id: id,
		// 	},
		// });
		// return res.data;
		return {
			id: 499595,
			albumImage:
				'https://d2hk32cswy6zx7.cloudfront.net/cee1cb3a9a52865b738aebb64106684a/v2_0055cc3a-7cb6-4737-92c4-1432bcdf6a0b.jpg',
			photographerImage:
				'https://d2hk32cswy6zx7.cloudfront.net/fotografos/v2_fa7d866a-9856-4858-b5a9-6abf3e985717.jpg',
			photographerName: 'John Doe',
			photographerStatus: 'Pro',
			albumTitle: 'iberas sp',
			albumLocation: 'CEDEU - Centro de... - São Paulo, SP',
			albumDate: '22/07/2024 08:00 / 18:00',
		};
	} catch (error) {
		console.log(error);
		return null;
	}
}

export default function Component({ params }: { params: { album: string } }) {
	const images = [
		'https://via.placeholder.com/300x200?text=Image1',
		'https://via.placeholder.com/300x200?text=Image2',
		'https://via.placeholder.com/300x200?text=Image3',
		'https://via.placeholder.com/300x200?text=Image4',
		'https://via.placeholder.com/300x200?text=Image5',
		'https://via.placeholder.com/300x200?text=Image6',
		'https://via.placeholder.com/300x200?text=Image7',
		'https://via.placeholder.com/300x200?text=Image8',
		'https://via.placeholder.com/300x200?text=Image9',
		'https://via.placeholder.com/300x200?text=Image10',
		'https://via.placeholder.com/300x200?text=Image11',
		'https://via.placeholder.com/300x200?text=Image12',
		'https://via.placeholder.com/300x200?text=Image13',
		'https://via.placeholder.com/300x200?text=Image14',
		'https://via.placeholder.com/300x200?text=Image15',
	];

	const [selected_image_index, set_selected_image_index] = useState<
		number | null
	>(null);

	useEffect(() => {
		console.log(params.album);
		getAlbumById(params.album).then(async (post) => {
			if (post) {
				console.log(post);
			}
		});
	}, [params.album]);

	const openDialog = (index: number) => {
		set_selected_image_index(index);
	};

	const closeDialog = () => {
		set_selected_image_index(null);
	};

	const nextImage = () => {
		set_selected_image_index((prev) => {
			if (prev) {
				console.log(prev);
				return (prev + 1) % images.length;
			} else {
				return 1;
			}
		});
	};

	const prevImage = () => {
		set_selected_image_index((prev) => {
			if (prev) {
				console.log(prev);
				return (prev - 1 + images.length) % images.length;
			} else {
				return images.length - 1;
			}
		});
	};

	return (
		<>
			<div className='flex min-h-[100vh] flex-col bg-gradient-to-b bg-opacity-55 from-[#471616] to-[#881414] text-white'>
				<div className='grid grid-cols-2 items-end p-4'>
					<div className='text-center font-bold text-4xl'>Extreme</div>
					<div className='flex justify-between space-x-4 px-14 font-bold'>
						<IoIosHelpCircleOutline className='size-8' />
						<LuRefreshCw className='size-8' />
						<IoMdClose className='size-8 hover:cursor-pointer' />
					</div>
				</div>

				<div className='mt-32 flex flex-col items-center'>
					<Avatar>
						<AvatarImage src='/placeholder-user.jpg' />
						<AvatarFallback>LG</AvatarFallback>
					</Avatar>
					<div className='font-semibold text-lg'>Leandro Patti</div>
				</div>

				<div className='flex min-h-[85vh] flex-col items-center justify-between pt-20'>
					<div className='text-center font-bold'>
						<div className='text-5xl'>Treino sub 15</div>
						<div className='text-xl'>30/07/2024 / 16:39 - 20:39</div>
						<div className='text-xl'>Mimoso do Sul - Mimoso do Sul - ES</div>
					</div>
					<FaChevronDown className='mt-4 h-12 w-12 justify-self-end font-bold' />
				</div>
			</div>

			<div className='relative text-white'>
				<div className='p-4'>
					<Select>
						<SelectTrigger aria-label='Pesquise pelo horário'>
							<SelectValue placeholder='Pesquise pelo horário' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='horario'>Pesquise pelo horário</SelectItem>
							<SelectItem value='manha'>10h - 11h</SelectItem>
							<SelectItem value='tarde'>11h - 12h</SelectItem>
						</SelectContent>
					</Select>
					<div className='container mx-auto mt-4 grid grid-cols-5 gap-1 p-2'>
						{images.map((image, index) => (
							<div
								key={image}
								className='relative flex items-center justify-center bg-opacity-80 text-white'
							>
								<Dialog>
									<DialogTrigger onClick={() => openDialog(index)}>
										<Image
											width={220}
											height={200}
											src={image}
											alt={`Image ${index + 1}`}
											className='w-full'
										>
											{/* <FiPlusCirc	le className='absolute inset-0 flex h-8 w-8 items-center justify-center bg-black bg-opacity-50 text-white' /> */}
										</Image>
									</DialogTrigger>
								</Dialog>
							</div>
						))}
					</div>
					{selected_image_index !== null && (
						<Dialog
							open={selected_image_index !== null}
							onOpenChange={closeDialog}
						>
							<DialogContent
								closeButton={false}
								className='h-full w-full max-w-none bg-black bg-opacity-90'
							>
								<div className='grid grid-cols-2 items-end self-start text-white'>
									<div className='flex items-center justify-between space-x-4 px-14 font-bold'>
										<div className='text-center font-bold text-4xl'>
											Extreme
										</div>
										<HiMiniMagnifyingGlassPlus className='h-8 w-8 font-bold' />
									</div>
									<div className='flex items-center justify-between space-x-4 px-14 font-bold'>
										<span>R$ 5,50</span>
										<FiShoppingCart className='h-8 w-8 hover:cursor-pointer' />
										<IoMdClose
											className='h-8 w-8 hover:cursor-pointer'
											onClick={closeDialog}
										/>
									</div>
								</div>
								<div className='flex items-center justify-between'>
									<FaChevronLeft
										onClick={prevImage}
										className='h-8 w-8 text-white hover:cursor-pointer'
									/>

									<Image
										src={images[selected_image_index]}
										width={400}
										height={400}
										alt={`Image ${selected_image_index + 1}`}
										className='max-h-full max-w-full'
									/>

									<FaChevronRight
										onClick={nextImage}
										className='h-8 w-8 text-white hover:cursor-pointer'
									/>
								</div>
							</DialogContent>
						</Dialog>
					)}
				</div>
			</div>
		</>
	);
}
