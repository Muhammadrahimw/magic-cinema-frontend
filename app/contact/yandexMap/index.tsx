"use client";

import {useEffect} from "react";

const YandexMap = () => {
	useEffect(() => {
		if (!document.getElementById("yandex-map-script")) {
			const script = document.createElement("script");
			script.id = "yandex-map-script";
			script.src = `https://api-maps.yandex.ru/2.1/?apikey=${process.env.NEXT_PUBLIC_YANDEX_MAP_API_KEY}&lang=ru_RU`;
			script.async = true;
			script.onload = () => {
				if (typeof window !== "undefined" && window.ymaps) {
					window.ymaps.ready(() => {
						const map = new window.ymaps.Map("map", {
							center: [41.304546, 69.244921],
							zoom: 12,
							controls: ["zoomControl", "searchControl", "routeButtonControl"],
						});

						const placemark = new window.ymaps.Placemark(
							[41.304546, 69.244921],
							{
								hintContent: "Sizning manzilingiz",
								balloonContent: "<strong>Bu yer Magic City!</strong>",
							},
							{
								preset: "islands#redDotIcon",
							}
						);

						map.geoObjects.add(placemark);
					});
				}
			};

			document.body.appendChild(script);
		}
	}, []);

	return <div id="map" style={{width: "100%", height: "18em"}} />;
};

export default YandexMap;
