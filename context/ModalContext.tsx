"use client";

import {createContext, useContext, useState} from "react";
import {Modal} from "antd";
import {useFetchFunc} from "@/hooks/axios";
import {useNotification} from "@/components/alertMessages";
import {useSessionsStore} from "@/utils/sessionStore-zustand";

interface ModalContextType {
	openModal: (data: any) => void;
	closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

export const ModalProvider = ({children}: {children: React.ReactNode}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [modalData, setModalData] = useState<any>(null);
	const [selectedTimeIndex, setSelectedTimeIndex] = useState<number | null>(
		null
	);
	const axios = useFetchFunc();
	const {showNotification} = useNotification();
	const setNeedRefresh = useSessionsStore((state) => state.setNeedRefresh);

	const openModal = (data: any) => {
		setModalData(data);
		setSelectedTimeIndex(null);
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
		setModalData(null);
		setSelectedTimeIndex(null);
	};

	const handleTimeSelection = (index: number) => {
		setSelectedTimeIndex(index);
	};

	const handleOrder = () => {
		if (selectedTimeIndex !== null && modalData) {
			const selectedTime = modalData.time[selectedTimeIndex];
			axios({
				url: `/auth/create-order`,
				method: `POST`,
				body: {time: selectedTime, sessionId: modalData._id},
				headers: {Authorization: `Bearer ${localStorage.getItem(`token`)}`},
			})
				.then((response) => {
					if (response.status === 200) {
						showNotification({message: response.message, type: "success"});
					} else {
						showNotification({message: response.message, type: "warning"});
					}
					setNeedRefresh(true);
				})
				.catch((error) => {
					console.log(error);
					showNotification({message: `Something wet wrong`, type: "error"});
				});
			closeModal();
		}
	};

	return (
		<ModalContext.Provider value={{openModal, closeModal}}>
			{children}
			<Modal open={isOpen} onCancel={closeModal} footer={null} width={500}>
				{modalData ? (
					<div className="p-5 rounded-2xl">
						{/* Movie Title & Genre */}
						<div className="space-y-1">
							<h2 className="text-xl font-bold">{modalData.movieId.title}</h2>
							<div className="text-gray-500 flex items-center gap-2 py-2">
								{modalData.movieId.genre?.map((genre: string, idx: number) => (
									<div
										key={idx}
										className="px-2 h-6 rounded bg-[#F2F2F5] flex items-center justify-center">
										<p className="text-xs font-light text-gray-500">{genre}</p>
									</div>
								))}
							</div>
							<div className="text-xs text-gray-400 mt-2">
								{modalData.movieId.duration} мин {modalData.movieId.ageLimit}+
							</div>
						</div>

						{/* Session Info */}
						<div className="mt-3 bg-gray-50 rounded-lg">
							<div className="flex items-center justify-between text-sm text-gray-800">
								<div className="flex items-center gap-2">
									<span className="text-gray-500">Дата:</span>
									<span className="font-medium">{modalData.date}</span>
								</div>
								<div className="flex items-center gap-2">
									<span className="text-gray-500">Цена:</span>
									<span className="font-semibold">{modalData.price} сум</span>
								</div>
							</div>
						</div>

						{/* Time & Places */}
						<div className="mt-4">
							<p className="text-sm font-medium text-gray-700 mb-2">
								Выберите время:
							</p>
							<div className="grid grid-cols-3 gap-2 mt-2">
								{modalData.time.map((time: string, idx: number) => (
									<button
										key={idx}
										className={`px-3 py-2 border rounded-lg text-sm transition-all ${
											selectedTimeIndex === idx
												? "bg-primary text-white border-primary"
												: "hover:bg-gray-100 border-gray-200"
										}`}
										onClick={() => handleTimeSelection(idx)}>
										<div className="font-medium">{time}</div>
										<div className="text-xs">{modalData.places[idx]} мест</div>
									</button>
								))}
							</div>
						</div>

						{/* Price & Order Button */}
						<div className="mt-6 flex justify-between items-center">
							<p className="text-lg font-semibold">{modalData.price} сум</p>
							<button
								className={`px-4 py-2 rounded-lg transition-all ${
									selectedTimeIndex !== null
										? "bg-primary text-white hover:opacity-90"
										: "bg-gray-200 text-gray-500 cursor-not-allowed"
								}`}
								disabled={selectedTimeIndex === null}
								onClick={handleOrder}>
								Заказать
							</button>
						</div>
					</div>
				) : (
					<p>Ma'lumot mavjud emas</p>
				)}
			</Modal>
		</ModalContext.Provider>
	);
};

export const useModal = () => {
	const context = useContext(ModalContext);
	if (!context) {
		throw new Error("useModal must be used within a ModalProvider");
	}
	return context;
};
