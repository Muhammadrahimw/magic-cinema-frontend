"use client";

export const dynamic = "force-dynamic";
import {CustomAxiosErrorResponse} from "@/@types";
import {useNotification} from "@/components/alertMessages";
import {useFetchFunc} from "@/hooks/axios";
import {useAuthStore} from "@/utils/zustand";
import {useRouter, useSearchParams} from "next/navigation";
import {useCallback, useEffect} from "react";

const VerifyToken = () => {
	const searchParams = useSearchParams();
	const axios = useFetchFunc();
	const router = useRouter();
	const token = searchParams.get("token");
	const {showNotification} = useNotification();
	const setLoggedIn = useAuthStore((state) => state.setLoggedIn);
	const verifyToken = useCallback(async () => {
		try {
			const {data} = await axios({
				url: `/auth/change-email-token?token=${token}`,
			});
			localStorage.setItem(`userInfo`, JSON.stringify(data));
			showNotification({
				message: data.message || "Successfully verified!",
				type: "success",
			});
			setLoggedIn(true);
			router.push("/");
		} catch (error: unknown) {
			const err = error as CustomAxiosErrorResponse;

			showNotification({
				message: err.response?.data?.message || "Verification failed!",
				type: "warning",
			});

			console.error("Verification error:", error);
			router.push("/");
		}
	}, [token, router, showNotification, axios, setLoggedIn]);

	useEffect(() => {
		verifyToken();
	}, [verifyToken]);

	return (
		<div className="w-screen h-screen fixed top-0 z-[51] left-0 flex items-center justify-center bg-gray-900/50 backdrop-blur-lg">
			<div className="text-center p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
				<span className="text-xl font-semibold text-gray-800 dark:text-gray-200">
					Verifying your account...
				</span>
				<div className="mt-4 animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
			</div>
		</div>
	);
};

export default VerifyToken;
