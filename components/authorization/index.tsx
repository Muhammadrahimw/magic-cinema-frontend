"use client";

import {Modal} from "antd";
import {ReactNode, useState} from "react";
import {LoginSection} from "./login";
import {RegisterSection} from "./register";

interface AuthorizationComponentProps {
	trigger?: ReactNode;
}

export const AuthorizationComponent = ({
	trigger,
}: AuthorizationComponentProps) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [activeTab, setActiveTab] = useState<"login" | "register">("login");

	const showModal = () => setIsModalOpen(true);
	const handleCancel = () => setIsModalOpen(false);

	return (
		<>
			<div onClick={showModal} className="inline-block">
				{trigger ? (
					trigger
				) : (
					<div className="py-2 px-8 rounded-full text-[0.9em] bg-primary text-white cursor-pointer">
						Войти
					</div>
				)}
			</div>

			<Modal
				footer={null}
				open={isModalOpen}
				onCancel={handleCancel}
				className="custom-modal">
				<div className="flex justify-center space-x-4 border-b pb-2">
					<button
						type="button"
						className={`px-4 py-2 font-medium ${
							activeTab === "login"
								? "border-b-2 border-primary text-primary"
								: "text-gray-500"
						}`}
						onClick={() => setActiveTab("login")}>
						Войти
					</button>
					<button
						type="button"
						className={`px-4 py-2 font-medium ${
							activeTab === "register"
								? "border-b-2 border-primary text-primary"
								: "text-gray-500"
						}`}
						onClick={() => setActiveTab("register")}>
						Регистрация
					</button>
				</div>

				<div className="p-4">
					{activeTab === "login" ? <LoginSection /> : <RegisterSection />}
				</div>
			</Modal>
		</>
	);
};
