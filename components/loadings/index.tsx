import {Skeleton} from "antd";

export const BaseSessionSkeleton = () => {
	return (
		<div>
			<Skeleton.Image active className="!w-full !h-[27em] !rounded-xl" />
			<Skeleton.Input
				active
				className="!w-[95%] rounded-xl mt-3 max-sm:!hidden"
			/>
			<div className="flex items-center gap-2 w-full max-sm:hidden">
				{Array.from({length: 3}).map((_, index) => (
					<Skeleton.Button active className="!w-20 rounded-xl mt-2" />
				))}
			</div>
		</div>
	);
};

export const SessionSleleton = () => {
	return (
		<div>
			{Array.from({length: 10}).map((_, idx) => (
				<Skeleton.Input
					key={idx}
					className="!w-full !h-[8.5em] rounded-sm"
					active
				/>
			))}
		</div>
	);
};
