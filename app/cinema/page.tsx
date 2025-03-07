import Image from "next/image";

const Cinema = () => {
	return (
		<section className="p-5 max-md:text-sm max-[480px]:text-xs max-[400px]:text-[0.5em]">
			<h2 className="text-4xl font-bold">О кинотеатре</h2>
			<div className="flex flex-col items-center gap-5 mt-4">
				<Image
					src={`/imgs/cinema-1.png`}
					alt="session-image"
					width={1000}
					height={1000}
					className="w-[48em] h-[28em] object-cover max-[830px]:w-full max-sm:h-[20em]"
					priority
				/>
				<Image
					src={`/imgs/cinema-2.png`}
					alt="session-image"
					width={1000}
					height={1000}
					className="w-[48em] h-[28em] object-cover max-[830px]:w-full max-sm:h-[20em]"
					priority
				/>
			</div>
			<p className="mt-3">
				Сложно удивить современного кинозрителя. Для него важно не только
				смотреть кино, но и ощутить полное погружение в ту или иную историю
				киноленты. Качество изображения и звука в совокупности играет
				немаловажную роль, чтобы искушенный зритель оторвался от онлайн
				просмотров и посетил кинотеатр.
			</p>
			<p className="mt-5 text-[1.5em] font-bold">
				Теперь каждый из вас может открыть для себя новые возможности при
				просмотре кино через <br />
				призму передовых технологий.
			</p>
			<p className="mt-3 text-[1.5em] font-bold">
				Magic Cinema – первый в Узбекистане лазерный кинотеатр с системой звука
				Dolby Digital, являющейся скачком в мире кинотехнологий. Насыщенное,
				яркое и четкое изображение в сочетании с кристальным звуком, все что
				нужно, чтобы зритель стал частью событий, погрузился в волшебные миры и
				испытывал все эмоции главных героев фильма.
			</p>
			<p className="mt-3 text-[1.5em] font-bold">
				Первый лазерный кинотеатр Magic Cinema, включает в себя 6 залов со
				вместимостью 430 человек. Каждый ценитель кино, от мала до велика,
				найдет то, что по душе именно ему.
			</p>
			<p className="mt-3 text-[1.5em] font-bold">
				Кино должно заставить забыть зрителя о том, что он сидит в кино, что
				осуществимо в Magic Cinema!
			</p>
		</section>
	);
};

export default Cinema;
