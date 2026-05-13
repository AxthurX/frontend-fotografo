import { LayoutWrapper } from '@/components/LayoutWrapper';
import { Toaster } from '@/components/ui/toaster';
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
				<LayoutWrapper>{children}</LayoutWrapper>
				<Toaster />
			</body>
		</html>
	);
}

reportAccessibility(React);
