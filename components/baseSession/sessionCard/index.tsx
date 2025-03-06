import {useModal} from "@/context/ModalContext";
import Image from "next/image";

export interface sessionCardType {
	_id: string;
	date: string;
	time: [string];
	price: number;
	places: [number];
	movieId: {
		_id: string;
		title: string;
		description: string;
		genre: [string];
		releaseDate: string;
		duration: number;
		rating: number;
		director: string;
		actors: [string];
		posterUrl: string;
		state: string;
		ageLimit: number;
		comingSoon: boolean;
	};
}

export const SessionCard = ({session}: {session: sessionCardType}) => {
	const {openModal} = useModal();
	return (
		<div>
			<Image
				src={session.movieId.posterUrl}
				alt="session-image"
				width={300}
				height={500}
				className="w-full h-[27em] object-cover rounded-xl"
			/>
			<p className="text-xl font-semibold mt-2">
				{session.movieId.title?.slice(0, 20)}
			</p>
			<div className="flex gap-2 mt-3 flex-wrap">
				<div className="px-2 h-6 rounded bg-[#F2F2F5] flex items-center justify-center">
					<p className="text-xs font-light text-gray-500">
						{session.movieId.ageLimit}+
					</p>
				</div>
				{session.movieId.genre?.map((genre, idx) => (
					<div
						key={idx}
						className="px-2 h-6 rounded bg-[#F2F2F5] flex items-center justify-center">
						<p className="text-xs font-light text-gray-500">{genre}</p>
					</div>
				))}
			</div>
			<div className="w-full flex items-center gap-2 mt-3">
				{session.time.map((time, idx) => (
					<div
						onClick={() => openModal(session)}
						key={idx}
						className="bg-primary px-2 py-1 rounded cursor-pointer">
						<p className="font-light text-sm text-white">{time}</p>
					</div>
				))}
			</div>
			<p className="text-xs font-light text-black mt-2">{session.price} сум</p>
		</div>
	);
};
