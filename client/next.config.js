/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	webpack: (config) => {
		config.module.rules.push({
			test: /\.svg$/,
			use: ['@svgr/webpack'],
		})

		return config
	},
	async redirects() {
		return [
			{
				source: '/:code',
				destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/:code`,
				permanent: false,
			},
		]
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 't2.gstatic.com',
				port: '',
				pathname: '/*',
			},
		],
	},
}

module.exports = nextConfig
