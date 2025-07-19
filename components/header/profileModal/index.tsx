"use client";

import {useState, useEffect} from "react";
import {Dropdown, MenuProps, Button, Modal, Input} from "antd";
import {useFetchFunc} from "@/hooks/axios";
import {useNotification} from "@/components/alertMessages";
import {signOut} from "next-auth/react";
import {LoadingOutlined} from "@ant-design/icons";
import OrderCard from "./orderCard";
import {useSessionsStore} from "@/utils/sessionStore-zustand";
import {useAuthStore} from "@/utils/zustand";

const ProfileDropdownModal = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [modalTitle, setModalTitle] = useState("");
	const {showNotification} = useNotification();
	const [orderList, setOrderList] = useState([]);
	const needRefresh = useSessionsStore((state) => state.needRefresh);
	const setNeedRefresh = useSessionsStore((state) => state.setNeedRefresh);
	const setLoggedIn = useAuthStore((state) => state.setLoggedIn);

	const [userInfo, setUserInfo] = useState(() =>
		JSON.parse(localStorage.getItem(`userInfo`) || "{}")
	);
	const axios = useFetchFunc();

	const [firstName, setFirstName] = useState(userInfo.firstName || "");
	const [lastName, setLastName] = useState(userInfo.lastName || "");
	const [birthDate, setBirthDate] = useState(userInfo.birthday || "");
	const [infoLoading, setInfoLoading] = useState(false);

	const [originalFirstName, setOriginalFirstName] = useState(firstName);
	const [originalLastName, setOriginalLastName] = useState(lastName);
	const [originalBirthDate, setOriginalBirthDate] = useState(birthDate);

	const [email, setEmail] = useState(userInfo.email || "");
	const [isEmailEditable, setIsEmailEditable] = useState(false);
	const [emailLoading, setEmailLoading] = useState(false);

	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [isPasswordEditable, setIsPasswordEditable] = useState(false);
	const [passLoading, setPassLoading] = useState(false);

	const hasChanges =
		firstName !== originalFirstName ||
		lastName !== originalLastName ||
		birthDate !== originalBirthDate;

	useEffect(() => {
		const currentUserInfo = JSON.parse(
			localStorage.getItem(`userInfo`) || "{}"
		);
		setUserInfo(currentUserInfo);

		setFirstName(currentUserInfo.firstName || "");
		setLastName(currentUserInfo.lastName || "");
		setBirthDate(currentUserInfo.birthday || "");

		setOriginalFirstName(currentUserInfo.firstName || "");
		setOriginalLastName(currentUserInfo.lastName || "");
		setOriginalBirthDate(currentUserInfo.birthday || "");

		setEmail(currentUserInfo.email || "");
	}, []);

	const openModal = (title: string) => {
		setModalTitle(title);
		setIsOpen(true);
	};

	const saveUserInfo = async () => {
		setInfoLoading(true);
		axios({
			url: `/auth/change-info`,
			method: "PUT",
			body: {firstName, lastName, birthday: birthDate},
			headers: {Authorization: `Bearer ${localStorage.getItem(`token`)}`},
		})
			.then((response) => {
				console.log(response);
				setInfoLoading(false);
				showNotification({message: response.message, type: "success"});

				localStorage.setItem(`userInfo`, JSON.stringify(response.data));

				setOriginalFirstName(firstName);
				setOriginalLastName(lastName);
				setOriginalBirthDate(birthDate);

				setUserInfo(response.data);
			})
			.catch((error) => {
				console.log(error);
				setInfoLoading(false);
				showNotification({message: `Something went wrong`, type: "error"});
			});
	};

	const saveEmail = () => {
		if (userInfo.email !== email) {
			setEmailLoading(true);
			axios({
				url: `/auth/change-email`,
				method: "POST",
				body: {newEmail: email},
				headers: {Authorization: `Bearer ${localStorage.getItem(`token`)}`},
			})
				.then((response) => {
					console.log(response);
					if (response.status === 200) {
						setEmailLoading(false);
						showNotification({message: response.message, type: "success"});
						const updatedUserInfo = {...userInfo, email: email};
						localStorage.setItem(`userInfo`, JSON.stringify(updatedUserInfo));
						setUserInfo(updatedUserInfo);
					} else {
						setEmailLoading(false);
						showNotification({message: response.message, type: "warning"});
					}
				})
				.catch((error) => {
					console.log(error);
					setEmailLoading(false);
					showNotification({message: `Something went wrong`, type: "error"});
				});
		}
		setIsEmailEditable(false);
	};

	const savePassword = () => {
		if (oldPassword && newPassword) {
			setPassLoading(true);
			axios({
				url: `/auth/change-password`,
				method: "PUT",
				body: {oldPassword, newPassword},
				headers: {Authorization: `Bearer ${localStorage.getItem(`token`)}`},
			})
				.then((response) => {
					if (response.status === 200) {
						showNotification({
							message: response.message || "Password updated successfully",
							type: "success",
						});
					} else {
						showNotification({
							message: response.message,
							type: "warning",
						});
					}
					setPassLoading(false);
					setOldPassword("");
					setNewPassword("");
				})
				.catch((error) => {
					console.log(error);
					setPassLoading(false);
					showNotification({
						message: error?.message || `Something went wrong`,
						type: "error",
					});
				});
		} else {
			showNotification({
				message: `Please fill all password fields`,
				type: "warning",
			});
			return;
		}
		setIsPasswordEditable(false);
	};

	// orders

	useEffect(() => {
		axios({
			url: `/auth/get-order`,
			headers: {Authorization: `Bearer ${localStorage.getItem(`token`)}`},
		})
			.then((response) => {
				setOrderList(response.data);
				// setOrderLoading(false);
				if (response.status === 401) {
					// signOut();
					setLoggedIn(false);
					localStorage.removeItem("token");
					localStorage.removeItem("userInfo");
					showNotification({message: response.message, type: "warning"});
				}

				if (needRefresh) {
					setNeedRefresh(false);
				}
			})
			.catch((err) => {
				console.log(err);
				// setOrderLoading(false);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [needRefresh]);

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
					className="py-2 px-8 rounded-full text-[0.9em] bg-primary text-white cursor-pointer">
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
							value={birthDate.split("T")[0]}
							onChange={(e) => setBirthDate(e.target.value)}
							className="rounded-md py-3 mb-3"
						/>

						<Button
							onClick={saveUserInfo}
							disabled={!hasChanges}
							className={`w-full h-[3.25em] rounded-md mt-2 bg-gray-200 text-gray-800 ${
								!hasChanges ? "opacity-50 cursor-not-allowed" : ""
							}`}>
							{infoLoading ? <LoadingOutlined /> : `Сохранить`}
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
							{isEmailEditable ? (
								"Сохранить Email"
							) : (
								<p>{emailLoading ? <LoadingOutlined /> : `Изменить Email`}</p>
							)}
						</Button>

						{isPasswordEditable && (
							<>
								<Input
									type="password"
									placeholder="Текущий пароль"
									value={oldPassword}
									onChange={(e) => setOldPassword(e.target.value)}
									className="rounded-md py-3 mb-3 mt-3"
								/>
								<Input
									type="password"
									placeholder="Новый пароль"
									value={newPassword}
									onChange={(e) => setNewPassword(e.target.value)}
									className="rounded-md py-3 mb-3"
								/>
							</>
						)}
						<Button
							onClick={
								isPasswordEditable
									? savePassword
									: () => setIsPasswordEditable(true)
							}
							className="w-full h-[3.25em] rounded-md mt-2 bg-gray-200 text-gray-800">
							{isPasswordEditable ? (
								<p>Сохранить Пароль</p>
							) : (
								<p>
									{passLoading ? (
										<LoadingOutlined className="text-xl" />
									) : (
										`Изменить Пароль`
									)}
								</p>
							)}
						</Button>
					</div>
				)}

				{modalTitle === "Мои заказы" && (
					<div>
						{orderList?.map((order, idx) => (
							<OrderCard key={idx} order={order} />
						))}
					</div>
				)}

				{modalTitle === "Выйти" && (
					<div>
						<p>Вы уверены, что хотите выйти?</p>
						<Button
							type="primary"
							danger
							className="mt-5"
							onClick={() => {
								signOut();
								localStorage.removeItem("token");
								localStorage.removeItem("userInfo");
								window.location.href = "/";
							}}>
							Выйти
						</Button>
					</div>
				)}
			</Modal>
		</>
	);
};

export default ProfileDropdownModal;
