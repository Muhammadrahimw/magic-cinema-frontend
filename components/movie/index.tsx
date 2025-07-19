"use client";

import {useFetchFunc} from "@/hooks/axios";
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import {sessionCardType} from "../baseSession/sessionCard";
import Image from "next/image";
import {useModal} from "@/context/ModalContext";

export const MovieComponent = () => {
	const axios = useFetchFunc();
	const {id} = useParams();
	const [session, setSession] = useState<sessionCardType>();
	const [loading, setLoading] = useState(true);
	const {openModal} = useModal();
	useEffect(() => {
		axios({url: `/session/${id}`})
			.then((response) => {
				setSession(response.data);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	console.log(session);

	return (
		<div className="p-5">
			{loading ? (
				""
			) : (
				<div className="flex items-start justify-start gap-8 max-md:text-sm max-sm:text-xs max-[550px]:flex-col-reverse max-[360px]:text-[0.6em]">
					<div>
						<Image
							src={session?.movieId.posterUrl || ""}
							alt="session-image"
							width={300}
							height={500}
							className="w-[24em] h-[27em] object-cover rounded-xl max-[360px]:w-full"
							priority
						/>
					</div>
					<div className="w-full">
						<div className="flex items-center gap-2">
							{session?.movieId.genre?.map((genre, idx) => (
								<div
									key={idx}
									className="px-2 h-6 rounded bg-[#F2F2F5] flex items-center justify-center">
									<p className="text-xs font-light text-gray-500">{genre}</p>
								</div>
							))}
						</div>
						<p className="text-4xl font-bold mt-1">{session?.movieId.title}</p>
						<div className="w-full flex items-center gap-2 mt-3">
							{session?.time.map((time, idx) => (
								<div
									onClick={() => openModal(session)}
									key={idx}
									className="bg-primary px-3 py-1 rounded cursor-pointer">
									<p className="font-light text-white">{time}</p>
								</div>
							))}
						</div>
						<p className="text-xs font-light text-black mt-2">
							{session?.price} сум
						</p>
						<div className="bg-[#f6f5f3] p-6 w-full rounded-lg mt-[3.5em]">
							<div className="grid grid-cols-4 gap-4 max-lg:grid-cols-2">
								<p className="">Режиссёр</p>
								<div className="col-span-3 max-lg:col-span-1">
									{session?.movieId.director}
								</div>
							</div>
							<div className="grid grid-cols-4 gap-4 mt-4 max-lg:grid-cols-2">
								<p className="">В ролях</p>
								<div className="col-span-3 max-lg:col-span-1 flex items-center gap-4 flex-wrap max-md:gap-2">
									{session?.movieId.actors?.map((actor, idx) => (
										<div key={idx}>
											<strong className="text-sm">{actor}</strong>
										</div>
									))}
								</div>
							</div>
							<div className="grid grid-cols-4 gap-4 mt-4 max-lg:grid-cols-2">
								<p className="">Хронометраж</p>
								<div className="col-span-3 max-lg:col-span-1">
									{session?.movieId.duration} мин.
								</div>
							</div>
							<div className="grid grid-cols-4 gap-4 mt-4 max-lg:grid-cols-2">
								<p className="">Страна</p>
								<div className="col-span-3 max-lg:col-span-1">
									{session?.movieId.state}
								</div>
							</div>
							<div className="grid grid-cols-4 gap-4 mt-4 max-lg:grid-cols-2">
								<p className="">Год</p>
								<div className="col-span-3 max-lg:col-span-1">
									{session?.movieId.releaseDate}
								</div>
							</div>
						</div>
						<p className="mt-12">{session?.movieId.description}</p>
					</div>
				</div>
			)}
		</div>
	);
};
