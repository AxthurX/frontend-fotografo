import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import NavbarV4 from '@/components/v0/NavbarV4';
import { sen } from '@/lib/font/Sen';
import reportAccessibility from '@/lib/reportAccessibility';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
	title: 'Secretaria de Estado do Desenvolvimento Ambiental',
	description:
		'O Portal da Secretaria de Estado do Desenvolvimento Ambiental (SEDAM) é uma plataforma projetada para facilitar o acesso às informações e serviços oferecidos pela SEDAM aos cidadãos. Através deste portal, é possível acessar diversos serviços, incluindo licenciamento, dispensas e declarações, de maneira prática e eficiente.',
	applicationName:
		'Portal da Secretaria de Estado do Desenvolvimento Ambiental',
	authors: [
		{
			name: 'GERDES  - Gerência de Desenvolvimento',
		},
	],
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='pt-BR' data-theme='sedam'>
			<body className={sen.className}>
				<div className='flex min-h-screen flex-col'>
					<NavbarV4 />
					<main className={`${sen.className} flex flex-grow flex-col`}>
						{children}
					</main>
					{/* <CookieNotice /> */}
					<Toaster />
					<Footer />
				</div>
				<Toaster />
			</body>
		</html>
	);
}

reportAccessibility(React);
