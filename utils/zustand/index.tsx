"use client";

import {create} from "zustand";
import {useEffect} from "react";

type AuthState = {
	isLoggedIn: boolean;
	setLoggedIn: (value: boolean) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
	isLoggedIn: false,
	setLoggedIn: (value) => set({isLoggedIn: value}),
}));

export const useInitAuth = () => {
	const setLoggedIn = useAuthStore((state) => state.setLoggedIn);

	useEffect(() => {
		if (typeof window !== "undefined") {
			const token = localStorage.getItem("token");
			setLoggedIn(!!token);
		}
	}, [setLoggedIn]);
};
