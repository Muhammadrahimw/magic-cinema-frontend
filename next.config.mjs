/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: [
			"s3-alpha-sig.figma.com",
			"posters.movieposterdb.com",
			"th.bing.com",
			"media.themoviedb.org",
			"s2ru1.kinoplan24.ru",
			"s1ru1.kinoplan24.ru",
			`kinoplan.io`,
		],
	},
};

export default nextConfig;
