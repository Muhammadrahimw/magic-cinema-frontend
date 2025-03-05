"use client";

import Link from "next/link";
import {useState} from "react";
import {FaBars} from "react-icons/fa";
import {FaXmark} from "react-icons/fa6";

export const HeaderMenu = () => {
	const [active, setActive] = useState<boolean>(false);
	return (
		<>
			<FaBars
				onClick={() => setActive(!active)}
				className="text-2xl text-primary hidden max-[830px]:block tr"
			/>
			<div
				className={`w-full h-screen bg-[#000000d0] backdrop-blur-md py-3 px-8 text-white fixed z-50 top-0 text-xl tr ${
					active ? `right-0` : `right-[-200%]`
				}`}>
				<FaXmark
					onClick={() => setActive(!active)}
					className="text-4xl text-primary hidden max-[830px]:block fixed top-3 right-3"
				/>
				<Link
					target="_blank"
					href={`https://yandex.uz/maps/10335/tashkent/?feedback=object%2Fadd&feedback-context=map.controls&ll=69.244953%2C41.304595&z=18`}
					className="text-white hidden max-[830px]:block">
					<p className="text-[1.15em]">Ташкент</p>
					<p className="font-light text-xs text-gray-300">
						Парк Magic City, <br />
						ул. Бабура, 174
					</p>
				</Link>
				<div className=" max-[830px]:block hidden mt-4">
					<a className="text-white font-medium" href={`tel:+998712052050`}>
						+998(71) 2052050
					</a>
					<p className="font-light text-xs text-gray-300">Для Информации</p>
				</div>
				<div className="max-[830px]:flex hidden flex-col gap-4 mt-4">
					<div className="py-2 rounded-full text-[0.9em] bg-primary text-white cursor-pointer flex justify-center w-[10.5em]">
						Написать отзыв
					</div>
					<Link
						href={`https://kinokassa.ru/refund?cinemaID=8211`}
						target="_blank"
						className="flex justify-center bg-primary rounded-full text-white py-2 px-6 cursor-pointer w-[13.75em]">
						Мне не пришёл билет
					</Link>
				</div>
			</div>
		</>
	);
};
