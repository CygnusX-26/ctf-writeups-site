import Layout from "../../components/layout"
import { getAllWriteups, getWriteupData } from "@/lib/poster"
import styles from "../../styles/id.module.css"
import Image from "next/image"
import ThemeChanger from "@/components/themechanger"

export default function Writeup({ pageContent }) {
    return (
        <Layout>
            <div className={styles.headers}>Write-up for <strong>{pageContent.metadata.title}</strong></div>
            <div className={styles.profileImage}>
                <Image 
                    src={`../${pageContent.metadata.image}`} 
                    style={{['border-radius']: 50}}
                    alt={'me when no iamg'} 
                    width={100} 
                    height={100} 
                />
            </div>
            <ThemeChanger />
            <div className={styles.subHeaders}>By {pageContent.metadata.author}</div>
            <div className={styles.subHeadersDate}>{pageContent.metadata.date}</div>
            <div className={styles.pageContent} dangerouslySetInnerHTML={{ __html: pageContent.content }} />
            
        </Layout>
    )
}

export function getStaticProps({ params }) {
    const pageContent = getWriteupData(params);
    return {
        props: {
            pageContent
        }
    }
}

export function getStaticPaths() {
    const paths = getAllWriteups();
    return {
        paths,
        fallback: false
    }
}