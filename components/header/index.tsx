import Image from "next/image";
import Link from "next/link";
import {PiInstagramLogo} from "react-icons/pi";
import React from "react";
import {HeaderMenu} from "./menu";
import {LayoutRoutes} from "./routes";
import {HeaderLoginItem} from "./headerLogin-item";
import {Skeleton} from "antd";
import dynamic from "next/dynamic";
const ShowcaseCarousel = dynamic(() => import("./showcaseCarousel"), {
	ssr: false,
	loading: () => (
		<div>
			<Skeleton active className="!w-full h-[333px] !rounded-xl" />
		</div>
	),
});

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
				<ShowcaseCarousel />
			</nav>
			<LayoutRoutes />
		</header>
	);
};
