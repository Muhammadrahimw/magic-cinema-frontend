"use client";

import {useAuthStore, useInitAuth} from "@/utils/zustand";
import ProfileDropdownModal from "../profileModal";
import {AuthorizationComponent} from "@/components/authorization";

export const HeaderLoginItem = () => {
	useInitAuth();
	const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
	return (
		<div className="hidden max-[830px]:block">
			{isLoggedIn ? (
				<ProfileDropdownModal />
			) : (
				<AuthorizationComponent
					trigger={
						<div className="py-2 px-5 rounded-full text-[0.9em] bg-primary text-white cursor-pointer">
							Войти
						</div>
					}
				/>
			)}
		</div>
	);
};
