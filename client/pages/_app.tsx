import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'

export default function App({ Component, pageProps }: AppProps) {
	const queryClient = new QueryClient()

	return (
		<QueryClientProvider client={queryClient}>
			<Component {...pageProps} />
			<Toaster position="bottom-center" />
		</QueryClientProvider>
	)
}
