import Image from "next/image";
import Link from "next/link";

export const FooterComponent = () => {
	return (
		<footer>
			<div className="bg-[#263238] p-5 py-7 flex items-center justify-between gap-4">
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
				<div className="flex items-center gap-2">
					<Image
						src={"/imgs/appStore.svg"}
						alt="logo image"
						width={150}
						height={150}
						className="w-[10em] h-[4.5em] cursor-pointer max-sm:text-xs max-[450px]:text-[0.55em]"
						priority
					/>
					<Image
						src={"/imgs/google-play.svg"}
						alt="logo image"
						width={150}
						height={150}
						className="w-[10em] h-[4.5em] cursor-pointer max-sm:text-xs max-[450px]:text-[0.55em]"
						priority
					/>
				</div>
			</div>
			<div className="grid grid-cols-4 gap-4 px-5 py-10 bg-black max-[830px]:grid-cols-3 max-sm:grid-cols-2 max-sm:gap-9 max-[360px]:grid-cols-1">
				<div className="text-primary flex flex-col gap-3">
					<p className="text-white mb-1 text-[1.15em] font-medium">Меню</p>
					<Link href={`/`}>Афиша</Link>
					<Link href={`/coming-soon`}>Скоро в кино</Link>
					<Link href={`/cinema`}>Кинотеатр</Link>
					<Link href={`/contact`}>Контакты</Link>
				</div>
				<div className="flex flex-col gap-3 col-span-2 max-[830px]:col-span-1">
					<p className="text-white mb-1 text-[1.15em] font-medium">
						Способы оплаты
					</p>
					<div className="flex items-center gap-2">
						<Link href={`#`}>
							<Image
								src={"/imgs/payme.svg"}
								alt="payment image"
								width={50}
								height={50}
								className="w-[40px] h-[40px] cursor-pointer max-sm:text-xs max-[450px]:text-[0.55em]"
								priority
							/>
						</Link>
						<Link href={`#`}>
							<Image
								src={"/imgs/click.svg"}
								alt="payment image"
								width={50}
								height={50}
								className="w-[40px] h-[40px] cursor-pointer max-sm:text-xs max-[450px]:text-[0.55em]"
								priority
							/>
						</Link>
					</div>
					<p className="text-white mb-1 text-[1.15em] font-medium">
						Социальные сети
					</p>
					<Link href={`#`}>
						<Image
							src={"/imgs/Link.svg"}
							alt="social image"
							width={50}
							height={50}
							className="w-[36px] h-[36px] cursor-pointer max-sm:text-xs max-[450px]:text-[0.55em]"
							priority
						/>
					</Link>
				</div>
				<div className="text-primary">
					<p className="text-white text-[1.15em] font-medium">Ташкент</p>
					<Link
						target="_blank"
						href={`https://yandex.uz/maps/10335/tashkent/?feedback=object%2Fadd&feedback-context=map.controls&ll=69.244953%2C41.304595&z=18`}
						className="font-light">
						ул. Бабура, 174
					</Link>
					<p className="text-white text-[1.15em] font-medium mt-2">Контакты</p>
					<a href="tel:+998712052050" className="font-light text-xl mt-2">
						+998(71) 2052050
					</a>
					<Link href={`/`} className="font-light block mt-2">
						Для Информации
					</Link>
					<p className="text-white text-[1.15em] font-medium mt-4">
						Время работы
					</p>
					<p className="font-light mt-2 text-white">С 10-00 до 23-00</p>
				</div>
			</div>
			<div className="px-5 py-10 bg-black text-white flex items-center justify-between gap-9 flex-wrap max-[480px]:py-5 max-[480px]:pt-0">
				<div>
					<p className="font-light">
						© 2025. Все права защищены <br /> Разработано в{" "}
						<Link
							target="_blank"
							href={`https://kinoplan.ru`}
							className="text-primary">
							Киноплане
						</Link>
					</p>
				</div>
				<button
					type="button"
					className="w-[16em] h-10 rounded bg-white text-black">
					Версия для слабовидящих
				</button>
			</div>
			<p className="px-5 py-10 bg-black text-white text-sm font-light max-[480px]:py-5 max-[480px]:text-xs">
				Все сеансы начинаются с рекламно-информационного блока. <br />
				Точную продолжительность сеансов можно уточнить в кинотеатре.
			</p>
		</footer>
	);
};
