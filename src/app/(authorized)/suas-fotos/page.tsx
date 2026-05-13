'use client';

import { Button } from '@/components/ui/button';
import { Camera, Package, Plus, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

export default function YourPhotos() {
	const [activeTab, setActiveTab] = useState<'compras' | 'entregas'>('compras');

	return (
		<div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6'>
			<div className='mx-auto max-w-6xl'>
				<div className='mb-8'>
					<h1 className='mb-4 font-bold text-3xl text-gray-800'>Suas fotos</h1>

					{/* Tabs */}
					<div className='flex space-x-1 rounded-lg border bg-white p-1 shadow-sm'>
						<button
							type='button'
							onClick={() => setActiveTab('compras')}
							className={`flex items-center space-x-2 rounded-md px-6 py-3 font-medium transition-all duration-200 ${
								activeTab === 'compras'
									? 'bg-red-800 text-white shadow-md'
									: 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
							}`}
						>
							<ShoppingCart size={18} />
							<span>Compras</span>
						</button>
						<button
							type='button'
							onClick={() => setActiveTab('entregas')}
							className={`flex items-center space-x-2 rounded-md px-6 py-3 font-medium transition-all duration-200 ${
								activeTab === 'entregas'
									? 'bg-red-800 text-white shadow-md'
									: 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
							}`}
						>
							<Package size={18} />
							<span>Entregas</span>
						</button>
					</div>
				</div>

				<div className='rounded-2xl border border-gray-200 bg-white p-12 shadow-lg'>
					<div className='mx-auto max-w-md text-center'>
						<div className='mb-6'>
							<div className='mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-red-100 to-red-200'>
								<Camera size={40} className='text-red-600' />
							</div>
						</div>

						<h2 className='mb-3 font-bold text-2xl text-gray-800'>
							{activeTab === 'compras'
								? 'Suas fotos estão vazias'
								: 'Nenhuma entrega ainda'}
						</h2>

						<p className='mb-8 text-gray-600 leading-relaxed'>
							{activeTab === 'compras'
								? 'Adicione fotos ao seu carrinho e depois pague para ver todos os detalhes aqui'
								: 'Suas fotos compradas aparecerão aqui quando estiverem prontas para entrega'}
						</p>

						<Button className='rounded-lg bg-red-600 px-8 py-3 font-medium text-white shadow-md transition-colors duration-200 hover:bg-red-900 hover:shadow-lg'>
							<Plus size={18} className='mr-2' />
							{activeTab === 'compras' ? 'Explorar Fotos' : 'Ver Compras'}
						</Button>
					</div>
				</div>

				<div className='mt-8 grid gap-6 md:grid-cols-2'>
					<div className='rounded-xl border border-gray-200 bg-white p-6 shadow-sm'>
						<div className='mb-3 flex items-center space-x-3'>
							<div className='flex h-10 w-10 items-center justify-center rounded-lg bg-green-100'>
								<ShoppingCart size={20} className='text-green-600' />
							</div>
							<h3 className='font-semibold text-gray-800'>Como comprar</h3>
						</div>
						<p className='text-gray-600 text-sm'>
							Navegue pelas categorias, adicione suas fotos favoritas ao
							carrinho e finalize a compra.
						</p>
					</div>

					<div className='rounded-xl border border-gray-200 bg-white p-6 shadow-sm'>
						<div className='mb-3 flex items-center space-x-3'>
							<div className='flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100'>
								<Package size={20} className='text-purple-600' />
							</div>
							<h3 className='font-semibold text-gray-800'>Entregas rápidas</h3>
						</div>
						<p className='text-gray-600 text-sm'>
							Suas fotos ficam prontas em até 24 horas e você recebe notificação
							por email.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
