import { getAllWriteups, getWriteupImages } from "@/lib/poster";
import Link from "next/link";
import HomeLayout from "@/components/homelayout";
import HomeButton from "@/components/homebutton";
import ThemeChanger from "@/components/themechanger";

export default function Home({data}) {
    return (
        <HomeLayout>
            <ThemeChanger />
            <div>
                {data.map((data) => (
                    <div key={data.id}>
                        <HomeButton id={data.id} image={data.image}>{data.id}</HomeButton>
                    </div>
                ))}
            </div>
        </HomeLayout>
    )
}

export function getStaticProps() {
    const data = getWriteupImages();
    return {
        props: {
            data
        }
    }
}