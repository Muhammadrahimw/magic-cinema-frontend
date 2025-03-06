import {Skeleton} from "antd";

export const BaseSessionSkeleton = () => {
	return (
		<div>
			<Skeleton.Image className="!w-full !h-[27em] !rounded-xl" />
			<Skeleton.Input className="!w-[95%] rounded-xl mt-3 max-sm:!hidden" />
			<div className="flex items-center gap-2 w-full max-sm:hidden">
				{Array.from({length: 3}).map((_, index) => (
					<Skeleton.Button className="!w-20 rounded-xl mt-2" />
				))}
			</div>
		</div>
	);
};
