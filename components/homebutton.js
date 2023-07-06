import styles from "../styles/homebutton.module.css"
import Link from "next/link"
import Router from "next/router"

export default function HomeButton({id, image}) {
    return (
        <>
        <div className={styles.homeButton} onClick={() => Router.push(`/writeups/${id}`)}>
            <span style={{backgroundImage: `url(${image})`}}></span>
            <p className={styles.text}>{id}</p>
        </div>
        </>
    )
}