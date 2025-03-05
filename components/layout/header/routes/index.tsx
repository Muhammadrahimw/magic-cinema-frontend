"use client";

import {routePaths} from "@/utils";
import Link from "next/link";
import {usePathname} from "next/navigation";

export const LayoutRoutes = () => {
	const pathname = usePathname();

	return (
		<nav>
			<div className="px-8 py-4 flex items-center gap-6 border-b border-gray-300 max-[560px]:overflow-x-auto max-[560px]:whitespace-nowrap">
				{routePaths.map((route, idx) => (
					<Link
						href={route.path}
						key={idx}
						className={`cursor-pointer relative before:content-[''] before:w-full before:h-[4px] before:bg-primary before:absolute before:bottom-[-22px] ${
							(pathname === "/" && route.path === "/") ||
							pathname.slice(1, 20) === route.path
								? `before:scale-x-100`
								: `before:scale-x-0`
						} before:origin-left before:transition-all before:duration-200 hover:before:scale-x-100`}>
						{route.label}
					</Link>
				))}
				<div className="py-2 px-8 rounded-full text-[0.9em] bg-primary text-white cursor-pointer max-[830px]:hidden">
					Войти
				</div>
				<div className="py-2 px-8 rounded-full text-[0.9em] bg-primary text-white cursor-pointer max-[830px]:hidden">
					Написать отзыв
				</div>
			</div>
		</nav>
	);
};
