import styles from '../styles/LinkCard.module.css'
import CopyIcon from '../icons/clipboard-outline.svg'
import DeleteIcon from '../icons/trash-outline.svg'
import CheckIcon from '../icons/checkmark-outline.svg'
import { FC, useState } from 'react'
import Image from 'next/image'
import toast from 'react-hot-toast'

interface props {
	shortUrl: string
	originalUrl: string
	deleteFn: () => void
}

const LinkCard: FC<props> = ({ shortUrl, originalUrl, deleteFn }) => {
	const [copy, setCopy] = useState<boolean>(false)
	const [enlarge, setEnlarge] = useState<boolean>(false)

	const copyText = (text: string) => {
		navigator.clipboard.writeText(text)
		// toast.success('copied to clipboard')
	}

	return (
		<li
			className={styles.linkCard}
			style={enlarge ? { transform: 'scale(1.03)' } : {}}
		>
			<div className={styles.websiteLogo}>
				<Image
					src={`https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${originalUrl}`}
					alt={`${new URL(originalUrl).hostname}`}
					fill
				/>
			</div>
			<div className={styles.textDiv}>
				<div style={{ color: 'rgb(30 64 175)', fontWeight: 700 }}>
					{shortUrl.replace(/^https?:\/\//, '')}
				</div>
				<div className={styles.originalUrlDiv}>{originalUrl}</div>
			</div>
			<button
				className={styles.deleteButton}
				onClick={() => {
					setEnlarge(true)
					deleteFn()
					setTimeout(() => setEnlarge(false), 100)
				}}
			>
				<DeleteIcon className={styles.deleteIcon} />
			</button>
			<button
				className={styles.copyButton}
				onClick={() => {
					setCopy(true)
					setEnlarge(true)
					copyText(shortUrl)
					setTimeout(() => setEnlarge(false), 150)
					setTimeout(() => setCopy(false), 2000)
				}}
			>
				{!copy ? (
					<CopyIcon className={styles.copyIcon} />
				) : (
					<CheckIcon className={styles.copyIcon} />
				)}
			</button>
		</li>
	)
}

export default LinkCard
