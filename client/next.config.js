/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
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
}

module.exports = nextConfig
