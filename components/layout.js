import Link from "next/link";
import styles from "../styles/layout.module.css"

export default function Layout({children}) {
    return (
        <>
        <div>{children}</div>
        <Link href="/" className={styles.goBack}>→ Go Home</Link>
        </>
    )
}