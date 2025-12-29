import {Carousel} from "antd";
import Image from "next/image";

const showcaseImageUrl = [
	`https://kinoplan.io/uploads/banners/8211/2025/6/25/images/685bff113b000041005667e7/desktop.jpg?1750859537`,
	`https://kinoplan.io/uploads/banners/8211/2025/2/19/images/67b5999f3c0000890099556f/desktop.jpg?1739954592`,
	`https://kinoplan.io/uploads/banners/8211/2025/2/12/images/67acab633a00003f00415faf/desktop.jpg?1739369315`,
];

export default function CarouselClient() {
	return (
		<Carousel arrows infinite={false}>
			{Array.from({length: 3}).map((_, idx) => (
				<div key={idx} className="bg-[#364d79] m-0 h-[70%] text-[#fff]">
					<Image
						src={showcaseImageUrl[idx]}
						alt="showcase movie image"
						width={1200}
						height={1200}
						className="w-full object-cover h-full"
						priority
					/>
				</div>
			))}
		</Carousel>
	);
}
