
import Image from "next/image";
import BookagerImage from "../assets/Bookager.jpg"


export default function Home() {

	return (
		<>
			<div className="w-full h-screen relative">
		    <Image
				src={BookagerImage}
				layout='fill'
				objectFit='contain'
				alt="Picture of the author"
			/>
			</div>

		</>
	)
}
