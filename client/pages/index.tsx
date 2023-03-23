import styles from '../styles/main.module.css'
import LinkIcon from '../icons/link-sharp.svg'
import { useState } from 'react'

export default function Home() {
	const [color, setColor] = useState(false)

	return (
		<div className={styles.mainDiv}>
			<h1 className={styles.ShortYTitleText}>
				ShortY
				<br />
				URL Shortener
			</h1>
			<div
				className={styles.URLinput}
				style={color ? { outlineColor: 'blueviolet', outlineWidth: '3px' } : {}}
			>
				<LinkIcon className={styles.linkLogo} />
				<label htmlFor="Enter Link" />
				<input
					onFocus={() => setColor(true)}
					onBlur={() => setColor(false)}
					className={styles.Urlinputbox}
					id="Enter Link"
					placeholder="Enter Link Here"
				></input>
				<button className={styles.ShortifyButton}>
					<div className={styles.ShortifyButtonBackground}></div>
					<p>Shortify✨</p>
				</button>
			</div>
		</div>
	)
}
