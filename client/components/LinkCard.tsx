import styles from '../styles/LinkCard.module.css'
import CopyIcon from '../icons/clipboard-outline.svg'
import DeleteIcon from '../icons/trash-outline.svg'
import { FC } from 'react'
import { parseFavicon } from 'parse-favicon'
import Image from 'next/image'

interface props {
	shortUrl: string
	originalUrl: string
	deleteFn: () => void
}

const LinkCard: FC<props> = ({ shortUrl, originalUrl, deleteFn }) => {
	const copyText = (text: string) => {
		navigator.clipboard.writeText(text)
	}

	return (
		<li className={styles.linkCard}>
			<div className={styles.websiteLogo}>
				<Image
					src={`https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${originalUrl}`}
					alt={`${new URL(originalUrl).hostname}`}
					fill
				/>
			</div>
			<div className={styles.textDiv}>
				<div>{shortUrl}</div>
				<div>{originalUrl}</div>
			</div>
			<button onClick={deleteFn}>
				<DeleteIcon className={styles.deleteIcon} />
			</button>
			<button onClick={() => copyText(shortUrl)}>
				<CopyIcon className={styles.copyIcon} />
			</button>
		</li>
	)
}

export default LinkCard
