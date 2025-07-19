import type {Metadata} from "next";
import "./globals.css";
import {Inter} from "next/font/google";
import {HeaderComponent} from "@/components/header";
import {FooterComponent} from "@/components/footer";
import {ModalProvider} from "@/context/ModalContext";

const inter = Inter({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
	display: "swap",
});

export const metadata: Metadata = {
	title: "Magic Cinema – Онлайн-кинотеатр и расписание фильмов",
	description:
		"Magic Cinema – современная онлайн-платформа для просмотра фильмов и покупки билетов в кинотеатры Узбекистана.",
	authors: [
		{
			name: "Собиржонов Мухаммадрахим",
		},
	],
	applicationName: "Magic Cinema",
	keywords: [
		"Magic Cinema",
		"кинотеатр",
		"онлайн кино",
		"фильмы Узбекистана",
		"купить билет",
		"афиша фильмов",
		"новинки кино",
	],
	robots: {
		index: true,
		follow: true,
	},
	openGraph: {
		title: "Magic Cinema – Онлайн-кинотеатр",
		description:
			"Смотрите новинки кино, узнайте расписание сеансов и бронируйте билеты онлайн с Magic Cinema.",
		url: "https://cinema.magiccity.uz",
		siteName: "Magic Cinema",
		locale: "ru_RU",
		type: "website",
		images: [
			{
				url: "https://cinema.magiccity.uz/og-image.jpg",
				width: 1200,
				height: 630,
				alt: "Логотип Magic Cinema",
			},
		],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${inter.className} antialiased`}>
				<ModalProvider>
					<HeaderComponent />
					{children}
					<FooterComponent />
				</ModalProvider>
			</body>
		</html>
	);
}
