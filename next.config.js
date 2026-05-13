/** @type {import('next').NextConfig} */

const nextConfig = {
	output: 'standalone',
	reactStrictMode: true,
	compiler: {
		removeConsole: process.env.NODE_ENV == 'production',
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
};

module.exports = nextConfig;
