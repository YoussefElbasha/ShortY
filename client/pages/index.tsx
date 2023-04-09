import styles from '../styles/main.module.css'
import LinkIcon from '../icons/link-sharp.svg'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import LinkCard from '@/components/LinkCard'
import Head from 'next/head'

interface link {
	shortUrl: string
	shortUrlCode: string
	originalUrl: string
}

export default function Home() {
	const [color, setColor] = useState<boolean>(false)
	const [url, setUrl] = useState<string>('')
	const [links, setLinks] = useState<link[]>([])

	useEffect(() => {
		setLinks(JSON.parse(localStorage.getItem('links') || '[]'))
	}, [])

	useEffect(() => {
		localStorage.setItem('links', JSON.stringify(links))
	}, [links])

	const shortenMutation = useMutation({
		mutationFn: ({ url }: { url: string }) => {
			return axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/`, { url: url })
		},
		onSuccess: (res) => {
			const newLink = {
				shortUrl: res.data.shortUrl,
				shortUrlCode: res.data.shortUrlCode,
				originalUrl: res.data.originalUrl,
			}

			if (!links.find((link) => link.shortUrl === newLink.shortUrl)) {
				setLinks([newLink, ...links])
			} else {
				setLinks((prevState) => {
					const tempLinks = prevState.filter(
						(link) => link.shortUrl != newLink.shortUrl
					)
					return [newLink, ...tempLinks]
				})
			}

			setUrl('')
		},
		onError: (error: any) => {
			toast.error(`${error.response.data.message}`)
		},
	})

	const deleteMutation = useMutation({
		mutationFn: ({ shortUrlCode }: { shortUrlCode: string }) =>
			axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${shortUrlCode}`),
		retry: 0,
		onSuccess: async (res) => {
			toast.success(`data successfully deleted`)
			setLinks((prevState) => {
				const tempLinks = prevState.filter(
					(link) => link.shortUrlCode != res.data.shortUrlCode
				)
				return tempLinks
			})
		},
		onError: (error: any) => {
			toast.error(`${error.response.data.message}`)
		},
	})

	return (
		<div className={styles.mainDiv}>
			<Head>
				<title>ShortY</title>
			</Head>
			<h1 className={styles.ShortYTitleText}>
				ShortY
				<br />
				URL Shortener
			</h1>
			<div
				className={styles.URLinput}
				style={color ? { outlineColor: '#5433ff', outlineWidth: '3px' } : {}}
			>
				<LinkIcon
					className={styles.linkLogo}
					style={color ? { color: '#5433ff' } : {}}
				/>
				<label htmlFor="Enter Link" />
				<input
					onFocus={() => setColor(true)}
					onBlur={() => setColor(false)}
					className={styles.Urlinputbox}
					id="Enter Link"
					placeholder="Enter Link Here"
					onChange={(e: any) => setUrl(e.target.value)}
					value={url}
				></input>
				<button
					type="submit"
					className={styles.ShortifyButton}
					disabled={shortenMutation.isLoading}
					onClick={() => {
						shortenMutation.mutate({ url: url })
					}}
				>
					<div className={styles.ShortifyButtonBackground}></div>
					<p>Shortify✨</p>
				</button>
			</div>
			<ul className={styles.linkList}>
				{links.map((link, index) => (
					<LinkCard
						key={link.shortUrl}
						shortUrl={link.shortUrl}
						originalUrl={link.originalUrl}
						deleteFn={() =>
							deleteMutation.mutate({ shortUrlCode: link.shortUrlCode })
						}
						animationDelay={index * 0.1}
					></LinkCard>
				))}
			</ul>
		</div>
	)
}
