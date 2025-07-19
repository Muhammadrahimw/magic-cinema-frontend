"use client";

import {useFetchFunc} from "@/hooks/axios";
import {useEffect, useState} from "react";
import {SessionCard, sessionCardType} from "./sessionCard";
import {BaseSessionSkeleton} from "../loadings";

export const BaseSessionComponent = () => {
	const axios = useFetchFunc();
	const [loading, setLoading] = useState(true);
	const [sessions, setSessions] = useState([]);
	const [filter, setFilter] = useState<`today` | `tomorrow`>(`today`);
	const [filteredSessions, setFilteredSessions] = useState<sessionCardType[]>(
		[]
	);

	useEffect(() => {
		axios({
			url: `/session`,
			headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},
		})
			.then((res) => {
				setSessions(res.data);
				setFilteredSessions(res.data);
				setLoading(false);
			})
			.catch((err) => {
				console.error(err);
				setLoading(false);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		setFilteredSessions(
			sessions.filter((session: sessionCardType) => session.date === filter)
		);
	}, [filter, sessions]);

	return (
		<>
			<div className="w-full bg-[#F2F2F5] px-8 py-2 flex items-center gap-4">
				<p
					onClick={() => setFilter("today")}
					className={`py-2 px-5 rounded-full text-[0.9em] tr cursor-pointer ${
						filter === "today"
							? "bg-primary text-white"
							: "bg-white text-black border"
					}`}>
					Сегодня
				</p>
				<p
					onClick={() => setFilter("tomorrow")}
					className={`py-2 px-5 rounded-full text-[0.9em] tr cursor-pointer ${
						filter === "tomorrow"
							? "bg-primary text-white"
							: "bg-white text-black border"
					}`}>
					Завтра
				</p>
			</div>
			<div className="px-5 py-6 grid grid-cols-4 gap-4 max-[1150px]:text-sm max-lg:text-xs max-[830px]:grid-cols-3 max-[830px]:text-[0.9em] max-md:text-xs max-sm:grid-cols-2 max-sm:text-base max-[550px]:text-sm max-[480px]:text-[0.65em] max-[370px]:text-[0.5em] max-[320px]:text-[0.4em]">
				{filteredSessions?.map((session, idx: number) =>
					loading ? (
						<BaseSessionSkeleton key={idx} />
					) : (
						<SessionCard key={idx} session={session} />
					)
				)}
			</div>
		</>
	);
};
