'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Cart } from '@/components/ui/cart';
import {
	NavigationMenu,
	NavigationMenuLink,
	NavigationMenuList,
} from '@/components/ui/navigation-menu';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetTrigger,
} from '@/components/ui/sheet';
import { isAuthorized } from '@/lib/utils';
import { ChevronDown, MenuIcon, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
	const pathname = usePathname();
	const is_authorized = isAuthorized(pathname);

	return is_authorized ? (
		<div className='bg-slate-50/30'>
			<div className='container bg-slate-50/30 px-4 shadow shadow-white'>
				<header className='flex min-h-20 w-full items-center gap-8'>
					<Sheet>
						<SheetTrigger asChild>
							<Button
								className='justify-start-start flex lg:hidden'
								variant='link'
								size='icon'
							>
								<MenuIcon className='h-6 w-6' />
								<span className='sr-only'>Ativar menu de navegação</span>
							</Button>
						</SheetTrigger>
						<SheetContent className='p-4' side='left'>
							<div className='grid gap-4 py-6'>
								<SheetClose asChild>
									<Link className='flex justify-center' href='/'>
										<Image
											src={encodeURI('/images/logo.png')}
											width={190}
											height={60}
											alt='Logo'
										/>
									</Link>
								</SheetClose>
								<SheetClose asChild>
									<Link
										className='rounded p-2 hover:bg-accent'
										href='/buscar-fotos'
									>
										Buscar fotos
									</Link>
								</SheetClose>
								<SheetClose asChild>
									<Link
										className='rounded p-2 hover:bg-accent'
										href='/vender-fotos'
									>
										Vender fotos
									</Link>
								</SheetClose>
								<SheetClose asChild>
									<Link
										className='rounded p-2 hover:bg-accent'
										href='/servicos'
									>
										Serviços
									</Link>
								</SheetClose>
							</div>
						</SheetContent>
					</Sheet>
					<Link href='/'>
						<Image
							src={encodeURI('/images/logo.png')}
							width={240}
							height={80}
							alt='Logo'
						/>
					</Link>
					<NavigationMenu className='hidden lg:flex'>
						<NavigationMenuList className='flex gap-3'>
							<NavigationMenuLink asChild>
								<Link
									className='font-medium text-sm hover:text-red-900'
									href='/buscar-fotos'
								>
									Buscar fotos
								</Link>
							</NavigationMenuLink>
							<p className='m-0 p-0 font-light text-sm'>|</p>
							<NavigationMenuLink asChild>
								<Link
									className='font-medium text-sm hover:text-red-900'
									href='/vender-fotos'
								>
									Vender fotos
								</Link>
							</NavigationMenuLink>
							<p className='m-0 p-0 font-medium text-sm'>|</p>
							<NavigationMenuLink asChild>
								<Popover>
									<PopoverTrigger asChild>
										<Button
											variant='ghost'
											className=' font-medium text-gray-700 text-sm hover:bg-white hover:text-red-900'
										>
											Serviços
											<ChevronDown className='ml-2 h-4 w-4' />
										</Button>
									</PopoverTrigger>
									<PopoverContent
										className='w-50 rounded-lg border-none bg-white px-5 py-4 font-semibold text-base'
										align='start'
									>
										<div className='flex flex-col space-y-6'>
											<div className='flex flex-col space-y-4'>
												<Link
													href=''
													className='hover:text-red-900 hover:underline'
												>
													Fotos para eventos
												</Link>
												<Link
													href=''
													className='hover:text-red-900 hover:underline'
												>
													Contrate um fotógrafo
												</Link>
											</div>
										</div>
									</PopoverContent>
								</Popover>
							</NavigationMenuLink>
						</NavigationMenuList>
					</NavigationMenu>

					<div className='flex flex-1 items-center gap-2 rounded-lg bg-gray-50 px-4 py-2'>
						<Search className='h-5 w-5 text-gray-400' />
						<input
							type='text'
							placeholder='Pesquise suas fotos...'
							className='flex-1 bg-transparent text-gray-950 text-sm outline-none placeholder:text-gray-400'
						/>
					</div>
					<div className='hidden items-center gap-6 lg:flex'>
						<Link
							className='font-medium text-gray-700 text-sm hover:text-red-900'
							href='/suas-fotos'
						>
							Baixar fotos
						</Link>
						<p className='m-0 p-0 font-medium text-gray-700 text-sm'>|</p>
						<Cart />
						<Popover>
							<PopoverTrigger asChild>
								<Button
									variant='ghost'
									className=' font-medium text-gray-700 text-sm hover:bg-white hover:text-red-900'
								>
									<Avatar>
										<AvatarImage />
										<AvatarFallback className='bg-red-900 text-white'>
											CN
										</AvatarFallback>
									</Avatar>
									<ChevronDown className='ml-2 h-4 w-4' />
								</Button>
							</PopoverTrigger>
							<PopoverContent
								className='rounded-lg border-none bg-white px-5 py-6 font-semibold'
								align='end'
							>
								<div className='flex h-96 w-64 flex-col space-y-6'>
									<div className='flex flex-col space-y-4'>
										<Link href='/suas-fotos' className='hover:underline'>
											Suas fotos
										</Link>
										<Link href='/suas-propostas' className='hover:underline'>
											Suas propostas
										</Link>
										<Link href='/seu-perfil' className='hover:underline'>
											Sua conta
										</Link>
										<Link href='/vender-fotos' className='hover:underline'>
											Sou fotógrafo
										</Link>
									</div>
									<hr />
									<div className='flex flex-col space-y-4'>
										<Link href='/sobre' className='hover:underline'>
											Quem somos
										</Link>
										<Link href='/contato' className='hover:underline'>
											Suporte
										</Link>
										<Button
											variant='ghost'
											className='m-0 flex cursor-pointer self-start px-0 text-red-500 hover:bg-transparent hover:text-red-900 hover:underline'
										>
											Sair da conta
										</Button>
									</div>
									<hr />
									<div className='flex justify-center space-x-6'>
										<div className='h-6 w-6 rounded-full bg-gray-300' />
										<div className='h-6 w-6 rounded-full bg-gray-300' />
										<div className='h-6 w-6 rounded-full bg-gray-300' />
										<div className='h-6 w-6 rounded-full bg-gray-300' />
										<div className='h-6 w-6 rounded-full bg-gray-300' />
									</div>
								</div>
							</PopoverContent>
						</Popover>
					</div>
				</header>
			</div>
		</div>
	) : null;
}
