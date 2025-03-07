import {sessionCardType} from "@/components/baseSession/sessionCard";
import {useModal} from "@/context/ModalContext";
import Link from "next/link";

export const SessionRawCard = ({session}: {session: sessionCardType}) => {
	const {openModal} = useModal();
	return (
		<div
			onClick={() => openModal(session)}
			className="flex items-start gap-4 border-b pb-5 pt-2 hover:bg-[#f8f8f8] cursor-pointer rounded-sm px-3">
			<div className="rounded bg-primary text-white mt-2 min-w-[5em] py-2 flex items-center justify-center">
				<p className="text-[1.15em]">{session?.time}</p>
			</div>
			<div>
				<Link
					href={`/movie/${session._id}`}
					className="text-[1.15em] font-bold mt-1">
					{session.movieId.title}
				</Link>
				<div className="flex gap-2 mt-1 flex-wrap">
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
				<p className="text-xs font-light text-gray-600 mt-2">
					{session.price} сум
				</p>
			</div>
		</div>
	);
};
