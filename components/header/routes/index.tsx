"use client";

import {AuthorizationComponent} from "@/components/authorization";
import {routePaths} from "@/utils";
import {useAuthStore, useInitAuth} from "@/utils/zustand";
import Link from "next/link";
import {usePathname} from "next/navigation";
import ProfileDropdownModal from "../profileModal";
import SendSms from "../send-sms";

export const LayoutRoutes = () => {
	const pathname = usePathname();
	useInitAuth();
	const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

	return (
		<nav>
			<div className="px-8 flex items-center gap-6 border-b border-gray-300 max-[560px]:overflow-x-auto max-[560px]:whitespace-nowrap max-[900px]:gap-3 max-[830px]:gap-6">
				{routePaths.map((route, idx) => (
					<Link
						href={route.path}
						key={idx}
						className={`cursor-pointer relative before:content-[''] before:w-full before:h-[4px] before:bg-primary before:absolute before:bottom-[-28px] max-[830px]:py-4 max-[830px]:before:bottom-[-1px] ${
							(pathname === "/" && route.path === "/") ||
							pathname.slice(1, 20) === route.path
								? `before:scale-x-100`
								: `before:scale-x-0`
						} before:origin-left before:transition-all before:duration-200 hover:before:scale-x-100`}>
						{route.label}
					</Link>
				))}
				<div className="max-[830px]:hidden">
					{isLoggedIn ? (
						<ProfileDropdownModal />
					) : (
						<AuthorizationComponent
							trigger={
								<div className="py-2 px-8 rounded-full text-[0.9em] bg-primary text-white cursor-pointer max-[830px]:hidden">
									Войти
								</div>
							}
						/>
					)}
				</div>
				<div className="max-[830px]:hidden">
					<SendSms />
				</div>
			</div>
		</nav>
	);
};
