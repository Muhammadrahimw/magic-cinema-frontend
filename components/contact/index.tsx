import YandexMap from "@/app/contact/yandexMap";
import Link from "next/link";
import {PiInstagramLogo} from "react-icons/pi";

export const ContactComponent = () => {
	return (
		<div>
			<h2 className="text-4xl font-bold mb-3">Magic Cinema</h2>
			<YandexMap />
			<div className="grid grid-cols-3 gap-4 mt-4 max-sm:grid-cols-2 max-sm:gap-7 max-[420px]:grid-cols-1">
				<div>
					<p className="text-xl font-medium">Контакты</p>
					<p className="mt-2">Для Информации:</p>
					<a href="tel:+998712052050" className="text-primary">
						+998(71) 2052050
					</a>
					<p className="mt-7">Социальные сети</p>
					<Link
						className="flex items-center gap-1"
						target="_blank"
						href={`https://www.instagram.com/magic_cinema_uz/?igsh=MTk4YXl1MHpubjY3aA%3D%3D#`}>
						<div className="px-1 py-1 rounded-full flex items-center justify-center bg-red-500">
							<PiInstagramLogo className="text-white" />
						</div>
						<p className="text-primary">Instagram</p>
					</Link>
				</div>
				<div>
					<p className="text-xl font-medium">Адрес</p>
					<a
						target="_blank"
						href="https://yandex.uz/maps/10335/tashkent/?feedback=object%2Fadd&feedback-context=map.controls&ll=69.244953%2C41.304595&z=18"
						className="text-primary mt-2">
						Ташкент <br />
						ул. Бабура, 174
					</a>
				</div>
				<div>
					<p className="text-xl font-medium">Режим работы</p>
					<p className="mt-2">С 10-00 до 23-00</p>
				</div>
			</div>
		</div>
	);
};
