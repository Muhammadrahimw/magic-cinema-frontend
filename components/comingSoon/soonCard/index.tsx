import {sessionCardItemType} from "@/@types";
// import {useModal} from "@/context/ModalContext";
import Image from "next/image";

export const SoonCard = ({movie}: {movie: sessionCardItemType}) => {
	// const {openModal} = useModal();
	return (
		<div>
			<Image
				src={movie.posterUrl}
				alt="session-image"
				width={300}
				height={500}
				className="w-full h-[27em] object-cover rounded-xl"
				priority
			/>
			<p className="text-xl font-semibold mt-2">{movie.title?.slice(0, 20)}</p>
			<div className="flex gap-2 mt-3 flex-wrap">
				<div className="px-2 h-6 rounded bg-[#F2F2F5] flex items-center justify-center">
					<p className="text-xs font-light text-gray-500">{movie.ageLimit}+</p>
				</div>
				{movie.genre?.map((genre, idx) => (
					<div
						key={idx}
						className="px-2 h-6 rounded bg-[#F2F2F5] flex items-center justify-center">
						<p className="text-xs font-light text-gray-500">{genre}</p>
					</div>
				))}
			</div>
		</div>
	);
};
