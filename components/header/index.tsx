import Image from "next/image";
import Link from "next/link";
import {PiInstagramLogo} from "react-icons/pi";
import React from "react";
import {HeaderMenu} from "./menu";
import {LayoutRoutes} from "./routes";
import {HeaderLoginItem} from "./headerLogin-item";
import {Carousel} from "antd";

const showcaseImageUrl = [
	`https://s3-alpha-sig.figma.com/img/61ae/e255/4806cefb0060287f42f1e7ad54f40421?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Ibwon9jPg3i47MNCXZImX7rKejXWJEMHkwY6REFEJWuUEFjEof~yw6m2dopuiuqLfgxyB-OD9jyRAK83X9lufu5LPcIoiSOETSK29bH8IxkNcVYgeYfxB0Ye-ngX9k7R2XpOBX5~oswnJFm2Av~2DQ9cgOCq012f6NiOpXHEORSygV7E39AALJDzY5pCGQpn43a2eBr9VUfyVh5vkZBkp3HifRSpiUYGoAc0vxlL6-0Se7mpRCQgtJu1Kv9L4d84hJi2Od6wliU6emAPc8vB9Ud6dp3HACfqpsHItGK-nD~AIhpojWT6nt54Okgn6SiZrgPYUUyVLKf02D7Et8fYMw__`,
	`https://kinoplan.io/uploads/banners/8211/2025/2/19/images/67b5999f3c0000890099556f/desktop.jpg?1739954592`,
	`https://kinoplan.io/uploads/banners/8211/2025/2/12/images/67acab633a00003f00415faf/desktop.jpg?1739369315`,
];

export const HeaderComponent = () => {
	return (
		<header>
			<nav className="bg-[#263238] px-8 py-3 flex items-center justify-between gap-4 max-[360px]:text-xs">
				<div className="flex items-center gap-12">
					<Link href={`/`}>
						<Image
							src={"/imgs/logo.svg"}
							alt="logo image"
							width={200}
							height={200}
							className="w-[5em] h-[4.5em] max-sm:text-xs max-[450px]:text-[0.55em]"
							priority
						/>
					</Link>
					<Link
						target="_blank"
						href={`https://yandex.uz/maps/10335/tashkent/?feedback=object%2Fadd&feedback-context=map.controls&ll=69.244953%2C41.304595&z=18`}
						className="text-white max-[830px]:hidden">
						<p className="text-[1.15em]">Ташкент</p>
						<p className="font-light text-xs text-gray-300">
							Парк Magic City, <br />
							ул. Бабура, 174
						</p>
					</Link>
					<div className="max-[830px]:hidden">
						<a className="text-white font-medium" href={`tel:+998712052050`}>
							+998(71) 2052050
						</a>
						<p className="font-light text-xs text-gray-300">Для Информации</p>
					</div>
				</div>
				<div className="flex items-center gap-6">
					<HeaderLoginItem />
					<HeaderMenu />
					<div className="w-8 h-8 rounded-full flex hover:bg-primary cursor-pointer items-center justify-center bg-[rgb(168,173,175)] max-[830px]:hidden">
						<Link
							target="_blank"
							href={`https://www.instagram.com/magic_cinema_uz/?igsh=MTk4YXl1MHpubjY3aA%3D%3D#`}>
							<PiInstagramLogo className="text-xl" />
						</Link>
					</div>
					<Link
						href={`https://kinokassa.ru/refund?cinemaID=8211`}
						target="_blank"
						className="flex items-center bg-primary rounded-full text-white py-2 px-6 cursor-pointer max-[830px]:hidden">
						Мне не пришёл билет
					</Link>
				</div>
			</nav>
			<nav>
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
			</nav>
			<LayoutRoutes />
		</header>
	);
};
