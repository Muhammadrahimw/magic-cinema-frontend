export interface sessionCardItemType {
	_id: string;
	title: string;
	description: string;
	genre: [string];
	releaseDate: string;
	duration: number;
	rating: number;
	director: string;
	actors: [string];
	posterUrl: string;
	state: string;
	ageLimit: number;
	comingSoon: boolean;
}
