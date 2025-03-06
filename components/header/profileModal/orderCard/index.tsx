import React from "react";

type OrderProps = {
	order: {
		_id: string;
		date: string;
		time: string;
		price: number;
		movieId: {
			_id: string;
			title: string;
		};
	};
};

const OrderCard: React.FC<OrderProps> = ({order}) => {
	return (
		<div className="w-full mt-4 bg-white rounded-xl shadow-md border border-gray-300 p-3">
			<h2 className="text-lg font-semibold text-gray-900">
				{order.movieId.title}
			</h2>
			<div className="mt-1 flex justify-between text-sm text-gray-600">
				<span>{order.date}</span>
				<span>{order.time}</span>
			</div>
			<div className="mt-2 text-right text-base font-medium text-gray-900">
				{order.price.toLocaleString()} UZS
			</div>
		</div>
	);
};

export default OrderCard;
