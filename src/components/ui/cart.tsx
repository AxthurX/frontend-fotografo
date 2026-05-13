'use client';

import { Button } from '@/components/ui/button';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { ShoppingCart, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface CartItem {
	id: string;
	photographer: string;
	photoCount: number;
	price: number;
	title: string;
	image: string;
	description?: string;
	originalPrice?: number;
}

export function Cart() {
	const [cartItems, setCartItems] = useState<CartItem[]>([
		{
			id: '10********',
			photographer: 'Morre cedo',
			photoCount: 1,
			price: 20.9,
			originalPrice: 22.0,
			title: 'FOTOS E VÍDEOS',
			image: '/images/images.png',
		},
		{
			id: '11******',
			photographer: 'Morre cedo',
			photoCount: 1,
			price: 20.9,
			originalPrice: 22.0,
			title: 'FOTOS E VÍDEOS',
			image: '/placeholder.svg',
		},
		{
			id: '12*******',
			photographer: 'Arthuro Montana',
			photoCount: 1,
			price: 5.5,
			title: 'FOTOS E VÍDEOS',
			image: '/placeholder.svg',
		},
	]);

	const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);

	const removeItem = (id: string) => {
		setCartItems(cartItems.filter((item) => item.id !== id));
	};

	const clearCart = () => {
		setCartItems([]);
	};

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button
					variant='ghost'
					className='relative font-medium text-gray-700 text-sm hover:bg-white hover:text-red-900'
					size='icon'
				>
					<ShoppingCart className='h-5 w-5 ' />
					{cartItems.length > 0 && (
						<span className='-right-1 -top-1 absolute flex h-4 w-4 items-center justify-center rounded-full bg-red-900 text-white text-xs'>
							{cartItems.length}
						</span>
					)}
				</Button>
			</SheetTrigger>
			<SheetContent className='w-[95%] max-w-full sm:w-[80%] md:w-[60%] lg:w-[540px]'>
				<SheetHeader>
					<SheetTitle className='font-semibold text-xl'>
						Seu Carrinho
					</SheetTitle>
					<p className='text-muted-foreground text-sm'>
						Confira as fotos que você adicionou ao carrinho.
					</p>
				</SheetHeader>

				{cartItems.length > 0 ? (
					<div className='mt-8 flex max-h-[calc(100vh-280px)] flex-col gap-6 overflow-y-auto pr-4 pb-[120px] sm:pb-0'>
						{/* Group items by photographer */}
						{Object.entries(
							cartItems.reduce(
								(groups, item) => {
									if (!groups[item.photographer]) {
										groups[item.photographer] = [];
									}
									groups[item.photographer].push(item);
									return groups;
								},
								{} as Record<string, CartItem[]>,
							),
						).map(([photographer, items]) => {
							const photographerTotal = items.reduce(
								(sum, item) => sum + item.price,
								0,
							);

							return (
								<div key={photographer} className='border-b pb-6'>
									<div className='mb-4'>
										<h3 className='font-medium text-lg'>{photographer}</h3>
										<p className='text-muted-foreground text-sm'>
											{items.length} {items.length === 1 ? 'foto' : 'fotos'} -
											R$ {photographerTotal.toFixed(2)}
										</p>
									</div>

									<div className='space-y-4'>
										<h4 className='font-medium text-sm'>Fotos</h4>
										{items.map((item) => (
											<div key={item.id} className='relative'>
												<div className='flex gap-4'>
													<div className='relative h-20 w-20 overflow-hidden rounded-lg'>
														<Image
															src={item.image ? item.image : '/placeholder.svg'}
															alt={item.title}
															fill
															className='h-20 w-20 object-cover'
														/>
													</div>
													<div className='flex flex-1 flex-col'>
														<p className='font-medium text-sm'>
															R$ {item.price.toFixed(2)}
														</p>
														{item.originalPrice && (
															<p className='text-muted-foreground text-sm line-through'>
																R$ {item.originalPrice.toFixed(2)}
															</p>
														)}
														<p className='mt-1 text-muted-foreground text-sm'>
															{item.title} - ID {item.id}
														</p>
													</div>
													<Button
														variant='ghost'
														size='icon'
														className='h-8 w-8'
														onClick={() => removeItem(item.id)}
													>
														<X className='h-4 w-4' />
													</Button>
												</div>
											</div>
										))}
									</div>
								</div>
							);
						})}
					</div>
				) : (
					<div className='mt-8 text-center text-muted-foreground'>
						Seu carrinho está vazio
					</div>
				)}

				{cartItems.length > 0 && (
					<div className='fixed right-0 bottom-0 left-0 mt-auto border-t bg-white p-4 sm:relative sm:right-auto sm:left-auto'>
						<div className='mb-8 flex items-center justify-between'>
							<span className='font-medium'>Subtotal</span>
							<span className='font-medium'>R$ {subtotal.toFixed(2)}</span>
						</div>
						<div className='grid grid-cols-2 gap-3'>
							<Button variant='outline' onClick={clearCart}>
								Limpar
							</Button>
							<Button className='bg-red-800 hover:bg-red-900'>
								Finalizar compra
							</Button>
						</div>
					</div>
				)}
			</SheetContent>
		</Sheet>
	);
}
