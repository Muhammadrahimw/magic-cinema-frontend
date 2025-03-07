"use client";

import {useState} from "react";
import {Modal, Button, Input} from "antd";
import {useFetchFunc} from "@/hooks/axios";
import {useNotification} from "@/components/alertMessages";

const {TextArea} = Input;

export default function SendSms() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [message, setMessage] = useState("");
	const axios = useFetchFunc();
	const {showNotification} = useNotification();

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const handleSubmit = () => {
		if (message) {
			axios({
				url: `/admin/send-sms`,
				method: "POST",
				body: {message},
				headers: {Authorization: `Bearer ${localStorage.getItem(`token`)}`},
			})
				.then((response) => {
					if (response.status === 201) {
						showNotification({message: response.message, type: "success"});
					} else {
						showNotification({message: response.message, type: "warning"});
					}
				})
				.catch((error) => console.log(error));
		}
		setMessage("");
		setIsModalOpen(false);
	};

	return (
		<div className="p-5">
			<Button
				type="primary"
				onClick={showModal}
				className="!h-11 px-8 rounded-full bg-primary text-white cursor-pointer max-[830px]:hidden">
				Написать отзыв
			</Button>

			<Modal
				title="Написать отзыв"
				open={isModalOpen}
				onCancel={handleCancel}
				width={470}
				footer={null}
				closeIcon={<span className="text-lg">×</span>}>
				<div>
					<p className="text-[#505050] text-sm m-0 mb-4">
						Поделитесь своими впечатлениями от похода в наш кинотеатр. Ваш отзыв
						поможет нам стать лучше.
					</p>

					<div>
						<p className="m-0 mb-2 text-sm">Текст сообщения*</p>
						<TextArea
							rows={4}
							placeholder="Ваш отзыв"
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							className="resize-none rounded-sm"
						/>
					</div>
				</div>

				<div className="flex justify-between mt-4">
					<Button onClick={handleCancel} className="rounded-sm h-9 px-4">
						Отменить
					</Button>
					<Button
						type="primary"
						onClick={handleSubmit}
						className="rounded-sm h-9 px-4 bg-[#1890ff]">
						Отправить
					</Button>
				</div>
			</Modal>
		</div>
	);
}
