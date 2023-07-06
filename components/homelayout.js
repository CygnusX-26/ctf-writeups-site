import Image from "next/image"
import styles from '../styles/homelayout.module.css'

export default function HomeLayout({children}) {
    return (
        <>
        <div className={styles.titleText}>
            <Image
                src={`../swan-svgrepo-com.svg`} 
                style={{['border-radius']: 50}}
                alt={'me when no iamg'} 
                width={100} 
                height={100} 
            />
        </div>
        <div className={styles.titleText}>
            <span>CygnusX26&apos;s Writeups</span>
        </div>
        <div className={styles.titleText}>
            <p>Member and Treasurer of team b01lers</p>
        </div>
        <div>{children}</div>
        </>
    )
}