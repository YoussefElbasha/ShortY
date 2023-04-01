import styles from '../styles/main.module.css'
import LinkIcon from '../icons/link-sharp.svg'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import LinkCard from '@/components/LinkCard'

interface link {
	shortUrl: string
	originalUrl: string
}

export default function Home() {
	const [color, setColor] = useState(false)
	const [url, setUrl] = useState('')
	const [links, setLinks] = useState<link[]>([])

	useEffect(() => {
		setLinks(JSON.parse(localStorage.getItem('links') || '[]'))
	}, [])

	useEffect(() => {
		if (links.length != 0) {
			localStorage.setItem('links', JSON.stringify(links))
		}
	}, [links])

	const shortenMutation = useMutation({
		mutationFn: ({ url }: { url: string }) => {
			return axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/`, { url: url })
		},
		onSuccess: (res) => {
			const newLink = {
				shortUrl: res.data.shortUrl,
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
		},
		onError: (error: any) => {
			toast.error(`${error.response.data.message}`)
		},
	})

	return (
		<div className={styles.mainDiv}>
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
				></input>
				<button
					type="submit"
					className={styles.ShortifyButton}
					disabled={shortenMutation.isLoading}
					onClick={(e: any) => {
						shortenMutation.mutate({ url: url })
					}}
				>
					<div className={styles.ShortifyButtonBackground}></div>
					<p>Shortify✨</p>
				</button>
			</div>
			<ul className={styles.linkList}>
				{links.map((link) => (
					<LinkCard
						key={link.shortUrl}
						shortUrl={link.shortUrl}
						originalUrl={link.originalUrl}
					></LinkCard>
				))}
			</ul>
		</div>
	)
}
