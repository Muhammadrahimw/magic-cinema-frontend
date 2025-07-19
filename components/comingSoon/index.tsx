"use client";

import {useFetchFunc} from "@/hooks/axios";
import {useEffect, useState} from "react";
import type {sessionCardItemType} from "@/@types";
import {SoonCard} from "./soonCard";
import {BaseSessionSkeleton} from "../loadings";

export const ComingSoonComponent = () => {
	const axios = useFetchFunc();
	const [soonMovies, setSoonMovies] = useState<sessionCardItemType[]>([]);

	useEffect(() => {
		axios({url: `/movie/coming-soon`})
			.then((response) => {
				setSoonMovies(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<div className="px-5 py-6 grid grid-cols-4 gap-4 max-[1150px]:text-sm max-lg:text-xs max-[830px]:grid-cols-3 max-[830px]:text-[0.9em] max-md:text-xs max-sm:grid-cols-2 max-sm:text-base max-[550px]:text-sm max-[480px]:text-[0.65em] max-[370px]:text-[0.5em] max-[320px]:text-[0.4em]">
			{soonMovies
				? soonMovies?.map((movie) => <SoonCard key={movie._id} movie={movie} />)
				: Array.from({length: 4}).map((_, idx) => (
						<BaseSessionSkeleton key={idx} />
				  ))}
		</div>
	);
};
