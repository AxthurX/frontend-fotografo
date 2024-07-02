/** @type {import("next").NextConfig} */

const nextConfig = {
	output: 'standalone',
	compiler: {
		removeConsole: process.env.NODE_ENV == 'production',
	},
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'www.placemonkeys.com',
			},
			{
				protocol: 'https',
				hostname: 'www.sedam.ro.gov.br',
			},
			{
				protocol: 'http',
				hostname: 'www.sedam.ro.gov.br',
			},
			{
				protocol: 'https',
				hostname: 'cogeo.sedam.ro.gov.br',
			},
			{
				protocol: 'http',
				hostname: 'cogeo.sedam.ro.gov.br',
			},
			{
				protocol: 'https',
				hostname: 'coreh.sedam.ro.gov.br',
			},
			{
				protocol: 'http',
				hostname: 'coreh.sedam.ro.gov.br',
			},
			{
				protocol: 'https',
				hostname: 'rondonia.ro.gov.br',
			},
			{
				protocol: 'http',
				hostname: 'rondonia.ro.gov.br',
			},
			{
				protocol: 'https',
				hostname: 'data.portal.sistemas.ro.gov.br',
			},
			{
				protocol: 'http',
				hostname: 'data.portal.sistemas.ro.gov.br',
			},
			{
				protocol: 'https',
				hostname: 'picsum.photos',
			},
			{
				protocol: 'http',
				hostname: 'sedam-cloud.sedam.ro.gov.br',
			},
			{
				protocol: 'https',
				hostname: 'sedam-cloud.sedam.ro.gov.br',
			},
			{
				protocol: 'https',
				hostname: '172.16.6.162',
			},
			{
				protocol: 'http',
				hostname: '172.16.6.162',
			},
			{
				protocol: 'http',
				hostname: 'cuc.sedam.ro.gov.br',
			},
			{
				protocol: 'http',
				hostname: 'educacaoambiental.sedam.ro.gov.br',
			},
			{
				protocol: 'http',
				hostname: 'sedam.ro.gov.br',
			},
			{
				protocol: 'http',
				hostname: 'colmam.sedam.ro.gov.br',
			},
			{
				protocol: 'http',
				hostname: 'codef.sedam.ro.gov.br',
			},
			{
				protocol: 'http',
				hostname: 'ciearo.ro.gov.br',
			},
			{
				protocol: 'https',
				hostname: 'ciearo.ro.gov.br',
			},
			{
				protocol: 'http',
				hostname: 'copam.sedam.ro.gov.br',
			},
		],
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	async rewrites() {
		return [
			{
				source: '/api/:service/sendfile/:id',
				destination: `${process.env.SERVICES_BACKEND_IP}/:service/sendfile/:id`,
			},
			{
				source: '/api/post/:path*',
				destination: `${process.env.BLOG_SERVICE_IP}/blog/:path*`,
			},
			{
				source: '/api/dla/sendfile',
				destination: `${process.env.BACKEND_DLA_URL}/dla/sendfile`,
			},
			{
				source: '/api/ati/sendfile',
				destination: `${process.env.BACKEND_ATI_URL}/ati/sendfile`,
			},
			{
				source: "/api/asf/sendfile",
				destination: `${process.env.BACKEND_ASF_URL}/asf/sendfile`,
			},			
			{
				source: '/api/dof/sendfile',
				destination: `${process.env.BACKEND_DOF_URL}/dof/sendfile`,
			},
			{
				source: '/api/auf/sendfile',
				destination: `${process.env.BACKEND_AUF_URL}/auf/sendfile`,
			},
			{
				source: '/api/deaf/sendfile',
				destination: `${process.env.SERVICES_BACKEND_IP}/deaf/sendfile`,
			},
			{
				source: '/api/casc/sendfile',
				destination: `${process.env.BACKEND_CASC_URL}/casc/sendfile`,
			},
			{
				source: '/api/lpca/sendfile',
				destination: `${process.env.BACKEND_LPCA_URL}/lpca/sendfile`,
			},
			{
				source: '/api/pisc/sendfile',
				destination: `${process.env.BACKEND_PISC_URL}/pisc/sendfile`,
			},
			{
				source: '/api/pdf/:service/:params*',
				destination: `${process.env.SERVICES_BACKEND_IP}/:service/pdf:params*`,
			},

			{
				source: '/ext-files',
				destination: '/404',
			},
			{
				source: '/arquivos/:path*',
				destination: `${process.env.BUCKET_URL}/sedam-blog/sedam/:path*`,
			},
			{
				source: '/ext-files/:path*',
				destination: `${process.env.BUCKET_URL}/sedam-blog/:path*`,
			},
		];
	},
};

module.exports = nextConfig;
