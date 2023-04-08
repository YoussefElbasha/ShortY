import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import Head from 'next/head'

export const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<Component {...pageProps} />
			<Toaster
				position="top-center"
				toastOptions={{ style: { fontFamily: 'Inter' } }}
			/>
		</QueryClientProvider>
	)
}
