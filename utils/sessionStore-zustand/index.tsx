"use client";

import {create} from "zustand";

type SessionsState = {
	needRefresh: boolean;
	setNeedRefresh: (value: boolean) => void;
};

export const useSessionsStore = create<SessionsState>((set) => ({
	needRefresh: false,
	setNeedRefresh: (value) => set({needRefresh: value}),
}));
