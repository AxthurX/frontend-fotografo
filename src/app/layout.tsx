import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import NavbarLogin from '@/components/v0/NavbarLogin';
import { sen } from '@/lib/font/Sen';
import reportAccessibility from '@/lib/reportAccessibility';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
	title: 'Extreme | Encontre um fotógrafo',
	description: 'Site de fotografias',
	icons: {
		icon: '/favicon.ico',
	},
	authors: [
		{
			name: 'Agrodev',
		},
	],
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='pt-BR' data-theme='theme'>
			<body className={sen.className}>
				<main className='flex min-h-screen flex-col'>
					<NavbarLogin />
					<div className={`${sen.className} w-full`}>{children}</div>
					<Footer />
					<Toaster />
				</main>
				<Toaster />
			</body>
		</html>
	);
}

reportAccessibility(React);
