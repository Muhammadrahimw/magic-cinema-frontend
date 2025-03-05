"use client";

import {useState} from "react";
import {Dropdown, MenuProps, Button, Modal, Input} from "antd";
import {useFetchFunc} from "@/hooks/axios";
import {useNotification} from "@/components/alertMessages";

const ProfileDropdownModal = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [modalTitle, setModalTitle] = useState("");
	const {showNotification} = useNotification();

	// user ma'lumotlari
	const userInfo = JSON.parse(localStorage.getItem(`userInfo`) || "");
	const axios = useFetchFunc();
	console.log(userInfo);

	// User ma'lumotlari
	const [firstName, setFirstName] = useState(userInfo.firstName);
	const [lastName, setLastName] = useState(userInfo.lastName);
	const [birthDate, setBirthDate] = useState(userInfo.birthday);

	// O'zgarishlarni kuzatish uchun
	const [originalFirstName] = useState(firstName);
	const [originalLastName] = useState(lastName);
	const [originalBirthDate] = useState(birthDate);

	const hasChanges =
		firstName !== originalFirstName ||
		lastName !== originalLastName ||
		birthDate !== originalBirthDate;

	// Email va parol uchun state
	const [email, setEmail] = useState(userInfo.email);
	const [isEmailEditable, setIsEmailEditable] = useState(false);

	const [password, setPassword] = useState("");
	const [isPasswordEditable, setIsPasswordEditable] = useState(false);

	// Modal ochish
	const openModal = (title: string) => {
		setModalTitle(title);
		setIsOpen(true);
	};

	// Ma'lumotlarni saqlash
	const saveUserInfo = async () => {
		axios({
			url: `/auth/change-info`,
			method: "PUT",
			body: {firstName, lastName, birthDate},
			headers: {Authorization: `Bearer ${localStorage.getItem(`token`)}`},
		})
			.then((response) => {
				console.log(response);
				// if (response.ok)
				showNotification({message: response.message, type: "success"});
				localStorage.setItem(`userInfo`, JSON.stringify(response.data));
			})
			.catch((error) => {
				console.log(error);
				showNotification({message: `Something wet wrong`, type: "error"});
			});
	};

	const saveEmail = () => {
		console.log("Yangi Email:", email);
		if (userInfo.email !== email) {
			axios({
				url: `/auth/change-email`,
				method: "POST",
				body: {newEmail: email},
				headers: {Authorization: `Bearer ${localStorage.getItem(`token`)}`},
			})
				.then((response) => {
					console.log(response);
					if (response.status === 200) {
						showNotification({message: response.message, type: "success"});
					} else {
						showNotification({message: response.message, type: "warning"});
					}
				})
				.catch((error) => {
					console.log(error);
					showNotification({message: `Something wet wrong`, type: "error"});
				});
		}
		setIsEmailEditable(false);
	};

	const savePassword = () => {
		console.log("Yangi Parol:", password);
		setIsPasswordEditable(false);
	};

	const menuItems: MenuProps["items"] = [
		{
			key: "1",
			label: "Профиль",
			onClick: () => openModal("Профиль"),
		},
		{
			key: "2",
			label: "Мои заказы",
			onClick: () => openModal("Мои заказы"),
		},
		{
			key: "3",
			label: "Выйти",
			onClick: () => openModal("Выйти"),
			danger: true,
		},
	];

	return (
		<>
			<Dropdown menu={{items: menuItems}} trigger={["click"]}>
				<button
					type="button"
					className="py-2 px-8 rounded-full text-[0.9em] bg-primary text-white cursor-pointer max-[830px]:hidden">
					Профиль
				</button>
			</Dropdown>

			<Modal
				title={modalTitle}
				open={isOpen}
				onCancel={() => setIsOpen(false)}
				footer={null}>
				{modalTitle === "Профиль" && (
					<div>
						{/* Ism, Familiya, Tug‘ilgan sana */}
						<Input
							type="text"
							placeholder="Имя"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							className="rounded-md py-3 mb-3"
						/>
						<Input
							type="text"
							placeholder="Фамилия"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
							className="rounded-md py-3 mb-3"
						/>
						<Input
							type="date"
							placeholder="День рождения"
							value={birthDate}
							onChange={(e) => setBirthDate(e.target.value)}
							className="rounded-md py-3 mb-3"
						/>

						<Button
							onClick={saveUserInfo}
							disabled={!hasChanges}
							className={`w-full h-[3.25em] rounded-md mt-2 bg-gray-200 text-gray-800 ${
								!hasChanges ? "opacity-50 cursor-not-allowed" : ""
							}`}>
							Сохранить данные
						</Button>

						{/* Email Input */}
						{isEmailEditable && (
							<Input
								type="text"
								placeholder="Электронная почта"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="rounded-md py-3 mb-3 mt-3"
							/>
						)}
						<Button
							onClick={
								isEmailEditable ? saveEmail : () => setIsEmailEditable(true)
							}
							className="w-full h-[3.25em] rounded-md mt-2 bg-gray-200 text-gray-800">
							{isEmailEditable ? "Сохранить Email" : "Изменить Email"}
						</Button>

						{/* Parol Input */}
						{isPasswordEditable && (
							<Input
								type="password"
								placeholder="Новый пароль"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="rounded-md py-3 mb-3 mt-3"
							/>
						)}
						<Button
							onClick={
								isPasswordEditable
									? savePassword
									: () => setIsPasswordEditable(true)
							}
							className="w-full h-[3.25em] rounded-md mt-2 bg-gray-200 text-gray-800">
							{isPasswordEditable ? "Сохранить Пароль" : "Изменить Пароль"}
						</Button>
					</div>
				)}

				{modalTitle === "Мои заказы" && (
					<div>
						<p>Этот раздел будет отображать заказы пользователя...</p>
					</div>
				)}

				{modalTitle === "Выйти" && (
					<div>
						<p>Вы уверены, что хотите выйти?</p>
						<Button type="primary" danger onClick={() => console.log("Logout")}>
							Выйти
						</Button>
					</div>
				)}
			</Modal>
		</>
	);
};

export default ProfileDropdownModal;
