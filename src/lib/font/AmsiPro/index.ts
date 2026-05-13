import localFont from 'next/font/local';

export const AmsiPro = localFont({
	src: [
		{ path: './AmsiPro-Regular.woff2', weight: '400', style: 'normal' },
		{ path: './AmsiPro-SemiBold.woff2', weight: '600', style: 'normal' },
		{ path: './AmsiPro-Bold.woff2', weight: '700', style: 'normal' },
		{ path: './AmsiPro-Italic.woff2', weight: '400', style: 'italic' },
		{ path: './AmsiPro-SemiBoldItalic.woff2', weight: '600', style: 'italic' },
		{ path: './AmsiPro-BoldItalic.woff2', weight: '700', style: 'italic' },
	],
});
