"use client";

import {useFetchFunc} from "@/hooks/axios";
import {useEffect, useState} from "react";
import {sessionCardType} from "../baseSession/sessionCard";
import {SessionRawCard} from "./sessionCard";
import {SessionSleleton} from "../loadings";

export const SessionsComponent = () => {
	const axios = useFetchFunc();
	const [loading, setLoading] = useState(true);
	const [sessions, setSessions] = useState<sessionCardType[]>([]);
	const [filter, setFilter] = useState<"today" | "tomorrow">("today");
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
				setLoading(false);
			})
			.catch((err) => {
				console.error(err);
				setLoading(false);
			});
	}, []);

	useEffect(() => {
		const filtered = sessions.filter((session) => session.date === filter);
		const flatten = filtered.flatMap((session) =>
			session.time.map((time, index) => ({
				...session,
				time: [time] as [string],
				places: [session.places[index] || 0] as [number],
			}))
		);

		const sorted = flatten.sort((a, b) => {
			const [aHours, aMinutes] = a.time[0].split(":").map(Number);
			const [bHours, bMinutes] = b.time[0].split(":").map(Number);
			return aHours * 60 + aMinutes - (bHours * 60 + bMinutes);
		});

		setFilteredSessions(sorted);
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
			<div className="p-2 max-[360px]:text-xs">
				{loading ? (
					<SessionSleleton />
				) : (
					filteredSessions.map((session, idx) => (
						<SessionRawCard key={idx} session={session} />
					))
				)}
			</div>
		</>
	);
};
