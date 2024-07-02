'use client';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	NavigationMenu,
	NavigationMenuLink,
	NavigationMenuList,
} from '@/components/ui/navigation-menu';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetTrigger,
} from '@/components/ui/sheet';
import { ChevronDown, ExternalLink, MenuIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

/*
 * Essa navbar é meio que 2 componentes em um. O Sheet é o que aparece no mobile, o NavigationMenu é o que aparece no desktop.
 * Eles dividem o mesmo <header /> e compartilham a logo mas só um dos dois é visível dependendo do tamanho da tela.
 */

/*
 function format(date) {
    //Dias da semana em português
   const diasDaSemana = [
     "Domingo",
     "Segunda-feira",
     "Terça-feira",
     "Quarta-feira",
     "Quinta-feira",
     "Sexta-feira",
     "Sábado",
   ];
    //Meses em português
   const meses = [
     "janeiro",
     "fevereiro",
     "março",
     "abril",
     "maio",
     "junho",
     "julho",
     "agosto",
     "setembro",
     "outubro",
     "novembro",
     "dezembro",
   ];

   const diaDaSemana = diasDaSemana[date.getDay()];
   const dia = date.getDate();
   const mes = meses[date.getMonth()];
   const ano = date.getFullYear();

   return `${diaDaSemana}, ${dia} de ${mes} de ${ano}`;
 }
   */
export default function NavbarV4() {
	return (
		<div className='bg-calpolygreen-980'>
			<div className='container bg-calpolygreen-980 px-4 text-beige-50'>
				<header className='flex min-h-24 w-full items-center'>
					<Sheet>
						<SheetTrigger asChild>
							<Button className='bg-calpolygreen-900 md:hidden' size='icon'>
								<MenuIcon className='h-6 w-6' />
								<span className='sr-only'>Ativar menu de navegação</span>
							</Button>
						</SheetTrigger>
						<SheetContent
							className='border-r-calpolygreen-900 bg-calpolygreen-980 p-4 text-beige-50'
							side='left'
						>
							<div className='grid gap-1 py-6 text-base'>
								<SheetClose asChild>
									<Link className='rounded p-1 hover:bg-sage-500' href='/'>
										Página inicial
									</Link>
								</SheetClose>

                <SheetClose asChild>
                  <Link
                    className="rounded p-1 hover:bg-sage-500"
                    href="/noticias"
                  >
                    Notícias
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    className="rounded p-1 hover:bg-sage-500"
                    href="/legislacao"
                  >
                    Legislação
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    className="rounded p-1 hover:bg-sage-500"
                    href="/contato"
                  >
                    Contato
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    className="rounded p-1 hover:bg-sage-500"
                    href="/produtos"
                  >
                    Produtos
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    className="rounded p-1 hover:bg-sage-500"
                    href="/conselhos"
                  >
                    Conselhos
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    className="rounded p-1 hover:bg-sage-500"
                    href="/enderecos-regionais"
                  >
                    Endereços Regionais
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    className="rounded p-1 hover:bg-sage-500"
                    href="/coordenadorias"
                  >
                    Coordenadorias
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    className="rounded p-1 hover:bg-sage-500"
                    href="/ouvidoria"
                  >
                    Ouvidoria
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link className="rounded p-1 hover:bg-sage-500" href="/lgpd">
                    LGPD
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    className="rounded p-1 hover:bg-sage-500"
                    href="https://transparencia.sedam.ro.gov.br/"
                    prefetch={false}
                    target="_blank"
                  >
                    Transparência
                    <ExternalLink className="ml-1 inline size-4 align-text-top" />
                  </Link>
                </SheetClose>
                <details className="group">
                  <summary className="list-none rounded p-1">
                    Gabinete{" "}
                    <ChevronDown className="inline size-4 align-middle group-open:rotate-180" />
                  </summary>
                  <ul className="bg-calpolygreen-980">
                    <li className="rounded px-6 py-1.5 hover:bg-sage-500">
                      <SheetClose asChild>
                        <Link href="/gabinete">Gabinete</Link>
                      </SheetClose>
                    </li>
                    <li className="rounded px-6 py-1.5 hover:bg-sage-500">
                      <SheetClose asChild>
                        <Link
                          target="_blank"
                          href="https://mrday.sistemas.ro.gov.br/AgendaPublica?Unidade=35"
                        >
                          Agenda dos secretários
                          <ExternalLink className="ml-1 inline size-4 align-text-top" />
                        </Link>
                      </SheetClose>
                    </li>

										<li className='rounded px-6 py-1.5 hover:bg-sage-500'>
											<SheetClose asChild>
												<Link
													target='_blank'
													prefetch={false}
													href='https://mrday.sistemas.ro.gov.br/'
												>
													Como agendar?
													<ExternalLink className='ml-1 inline size-4 align-text-top' />
												</Link>
											</SheetClose>
										</li>
									</ul>
								</details>
								<details className='group'>
									<summary className='list-none rounded p-1'>
										Institucional{' '}
										<ChevronDown className='inline size-4 align-middle group-open:rotate-180' />
									</summary>
									<ul className='bg-calpolygreen-980'>
										<li className='rounded px-6 py-1.5 hover:bg-sage-500'>
											<SheetClose asChild>
												<Link href='/institucional/secretaria'>
													A secretaria
												</Link>
											</SheetClose>
										</li>
										<li className='rounded px-6 py-1.5 hover:bg-sage-500'>
											<SheetClose asChild>
												<Link href='/institucional/quem-e-quem'>
													Quem é quem
												</Link>
											</SheetClose>
										</li>
										<li className='rounded px-6 py-1.5 hover:bg-sage-500'>
											<SheetClose asChild>
												<Link href='/ext-files/files/Portaria_n__85_de_27_de_fevereiro_de_2020_Codigo_de_Etica_SEDAM.pdf'>
													Código de ética{' '}
													<ExternalLink className='inline size-4 align-text-bottom' />
												</Link>
											</SheetClose>
										</li>
										<li className='rounded px-6 py-1.5 hover:bg-sage-500'>
											<SheetClose asChild>
												<Link
													href='/ext-files/files/carta de serviços sedam 2024.pdf'
													target='_blank'
													prefetch={false}
												>
													Carta de serviços{' '}
													<ExternalLink className='inline size-4 align-text-bottom' />
												</Link>
											</SheetClose>
										</li>
										<li className='rounded px-6 py-1.5 hover:bg-sage-500'>
											<SheetClose asChild>
												<Link
													href='/ext-files/files/legislacao/ORGANOGRAMA___SEDAM__.pdf'
													target='_blank'
													prefetch={false}
												>
													Organograma{' '}
													<ExternalLink className='inline size-4 align-text-bottom' />
												</Link>
											</SheetClose>
										</li>
									</ul>
								</details>
							</div>
						</SheetContent>
					</Sheet>

					<div className='ml-auto flex flex-col gap-2 md:mx-2'>
						<Link className='flex shrink justify-start' href={'/'}>
							<Image
								src={encodeURI('/ext-files/website-icons/logologosedam.png')}
								width={150}
								height={54.53}
								alt='Logo'
							/>
						</Link>

						<span className='sr-only'>
							Secretaria de Estado do Desenvolvimento Ambiental
						</span>
						{/* <div>
              <span>{format(new Date())}</span>
            </div> */}
          </div>
          <NavigationMenu className="ml-auto hidden  max-w-[700px] md:flex md:grow md:justify-between">
            <NavigationMenuList className="flex flex-wrap gap-x-1 gap-y-1">
              <NavigationMenuLink asChild>
                <Link
                  className="rounded p-1 px-3 hover:bg-sage-600"
                  prefetch={false}
                  href="/noticias"
                >
                  Notícias
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link
                  className="rounded p-1 px-3 hover:bg-sage-600"
                  href="/legislacao"
                >
                  Legislação
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link
                  className="rounded p-1 px-3 hover:bg-sage-600"
                  href="/contato"
                >
                  Contato
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link
                  className="rounded p-1 px-3 hover:bg-sage-600"
                  href="/lgpd"
                >
                  LGPD
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link className="rounded p-1 px-3 hover:bg-sage-600" href="/conselhos">
                  Conselhos
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link
                  className="rounded p-1 px-3 hover:bg-sage-600"
                  href="/enderecos-regionais"
                >
                  Endereços Regionais
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link
                  className="rounded p-1 px-3 hover:bg-sage-600"
                  href="/coordenadorias"
                >
                  Coordenadorias
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link
                  className="rounded p-1 px-3 hover:bg-sage-600"
                  href="/ouvidoria"
                >
                  Ouvidoria
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link
                  className="rounded p-1 px-3 hover:bg-sage-600"
                  href="https://transparencia.sedam.ro.gov.br/"
                  prefetch={false}
                  target="_blank"
                >
                  Transparência
                  <ExternalLink className="ml-1 inline size-4 align-text-top" />
                </Link>
              </NavigationMenuLink>
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <li className="rounded p-1 px-3 hover:cursor-pointer hover:bg-sage-600">
                    Gabinete <ChevronDown className="inline size-4" />
                  </li>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-50 mt-2 rounded-md border border-sage-600 bg-calpolygreen-800 text-beige-50">
                  <DropdownMenuItem
                    className="hover:cursor-pointer hover:!bg-sage-500 hover:!text-beige-50"
                    asChild
                  >
                    <Link className="rounded !text-base" href="/gabinete/">
                      Gabinete
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="hover:cursor-pointer hover:!bg-sage-500 hover:!text-beige-50"
                    asChild
                  >
                    <Link
                      className="rounded !text-base"
                      target="_blank"
                      href="https://mrday.sistemas.ro.gov.br/AgendaPublica?Unidade=35"
                    >
                      Agenda dos secretários
                      <ExternalLink className="ml-1 inline size-4 align-text-top" />
                    </Link>
                  </DropdownMenuItem>

									<DropdownMenuItem
										className='hover:cursor-pointer hover:!bg-sage-500 hover:!text-beige-50'
										asChild
									>
										<Link
											className='rounded !text-base'
											target='_blank'
											prefetch={false}
											href='https://mrday.sistemas.ro.gov.br/'
										>
											Como agendar?
											<ExternalLink className='ml-1 inline size-4 align-text-top' />
										</Link>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
							<DropdownMenu modal={false}>
								<DropdownMenuTrigger asChild>
									<li className='rounded p-1 px-3 hover:cursor-pointer hover:bg-sage-600'>
										Institucional <ChevronDown className='inline size-4' />
									</li>
								</DropdownMenuTrigger>
								<DropdownMenuContent className='mt-2 w-48 rounded-md border border-sage-600 bg-calpolygreen-800 text-beige-50'>
									<DropdownMenuItem
										className='hover:cursor-pointer hover:!bg-sage-500 hover:!text-beige-50'
										asChild
									>
										<Link
											className='rounded !text-base'
											href='/institucional/secretaria'
										>
											A secretaria
										</Link>
									</DropdownMenuItem>
									<DropdownMenuItem asChild>
										<Link
											className='rounded !text-base hover:cursor-pointer hover:!bg-sage-500 hover:!text-beige-50'
											href='/institucional/quem-e-quem'
										>
											Quem é quem
										</Link>
									</DropdownMenuItem>
									<DropdownMenuItem asChild>
										<Link
											className='rounded !text-base hover:cursor-pointer hover:!bg-sage-500 hover:!text-beige-50'
											href='/ext-files/files/Portaria_n__85_de_27_de_fevereiro_de_2020_Codigo_de_Etica_SEDAM.pdf'
											target='_blank'
											prefetch={false}
										>
											Código de ética
											<ExternalLink className='ml-1 inline size-4 align-text-top' />
										</Link>
									</DropdownMenuItem>
									<DropdownMenuItem asChild>
										<Link
											href='/ext-files/files/carta de serviços sedam 2024.pdf'
											className='rounded !text-base hover:cursor-pointer hover:!bg-sage-500 hover:!text-beige-50'
											target='_blank'
											prefetch={false}
										>
											Carta de serviços
											<ExternalLink className='ml-1 inline size-4 align-text-top' />
										</Link>
									</DropdownMenuItem>
									<DropdownMenuItem asChild>
										<Link
											href='/ext-files/files/legislacao/ORGANOGRAMA___SEDAM__.pdf'
											target='_blank'
											prefetch={false}
											className='rounded !text-base hover:cursor-pointer hover:!bg-sage-500 hover:!text-beige-50'
										>
											Organograma
											<ExternalLink className='ml-1 inline size-4 align-text-top' />
										</Link>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</NavigationMenuList>
					</NavigationMenu>
					{/* <div className="form-control">
            <input type="text" placeholder="Pesquisar" className="input active:bg-opacity-80 active:bg-primary focus:bg-primary  focus:text-slate-50 input-bordered input-ghost w-24 md:w-auto" />
          </div> */}
				</header>
			</div>
		</div>
	);
}
