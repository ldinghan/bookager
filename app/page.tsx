
import Image from "next/image";
import BookagerImage from "../assets/Bookager.jpg"


export default function Home() {

	return (
		<>
			<div className="w-full h-screen relative">
		    <Image
				src={BookagerImage}
				fill
				alt="background image"
			/>
			</div>

		</>
	)
}
