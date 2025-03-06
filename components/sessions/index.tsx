"use client";

import {useFetchFunc} from "@/hooks/axios";
import {useEffect, useState} from "react";
import {sessionCardType} from "../baseSession/sessionCard";

export const SessionsComponent = () => {
	const axios = useFetchFunc();
	const [loading, setLoading] = useState(false);
	const [sessions, setSessions] = useState([]);
	const [filter, setFilter] = useState<`today` | `tomorrow`>(`today`);
	const [filteredSessions, setFilteredSessions] = useState<sessionCardType[]>(
		[]
	);

	useEffect(() => {
		setLoading(true);
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
					onClick={() => setFilter(`today`)}
					className={`py-2 px-5 rounded-full text-[0.9em] bg-primary text-white tr cursor-pointer ${
						filter !== `today` ? `bg-white text-black border` : `bg-primary`
					}`}>
					Сегодня
				</p>
				<p
					onClick={() => setFilter(`tomorrow`)}
					className={`py-2 px-5 rounded-full text-[0.9em] bg-primary text-white tr cursor-pointer ${
						filter !== `tomorrow` ? `bg-white text-black border` : `bg-primary`
					}`}>
					Завтра
				</p>
			</div>
			<div>
                
            </div>
		</>
	);
};
