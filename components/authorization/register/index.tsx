import {Input} from "antd";
import {useRef, useState} from "react";
import {useForm, Controller} from "react-hook-form";
import {LoadingOutlined} from "@ant-design/icons";
import {useNotification} from "@/components/alertMessages";
import {signIn} from "next-auth/react";
import {useAuthStore} from "@/utils/zustand";

interface RegisterFormType {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

interface RegisterSectionProps {
	closeModal: () => void;
}

export const RegisterSection = ({closeModal}: RegisterSectionProps) => {
	const [loading, setLoading] = useState<boolean>(false);
	const [codeStatus, setCodeStatus] = useState<boolean>(false);
	const codeRef = useRef<HTMLInputElement>(null);
	const {showNotification} = useNotification();
	const setLoggedIn = useAuthStore((state) => state.setLoggedIn);

	const {
		control,
		handleSubmit,
		formState: {errors},
	} = useForm<RegisterFormType>();

	const onSubmit = async (data: RegisterFormType) => {
		setLoading(true);
		try {
			const backendResponse = await fetch(
				"http://localhost:6060/auth/sign-up",
				{
					method: "POST",
					headers: {"Content-Type": "application/json"},
					body: JSON.stringify({
						firstName: data.firstName,
						lastName: data.lastName,
						email: data.email,
						password: data.password,
					}),
				}
			);

			const backendData = await backendResponse.json();

			if (backendResponse.ok) {
				showNotification({message: backendData.message, type: "success"});
				localStorage.setItem(`register-email`, data.email);
				setCodeStatus(true);
			} else {
				showNotification({message: backendData.message, type: "warning"});
			}
		} catch (error) {
			showNotification({message: `Something went wrong`, type: "error"});
			console.error("Register xatosi:", error);
		} finally {
			setLoading(false);
		}
	};

	const sendCodeFunc = async () => {
		const code = codeRef.current?.value;
		if (code) {
			setLoading(true);
			const backendResponse = await fetch(
				"http://localhost:6060/auth/verify-email",
				{
					method: "POST",
					headers: {"Content-Type": "application/json"},
					body: JSON.stringify({
						email: localStorage.getItem("register-email"),
						code: code,
					}),
				}
			);

			const backendData = await backendResponse.json();

			if (backendResponse.ok) {
				await signIn("credentials", {
					redirect: false,
					email: backendData.email,
					password: backendData.password,
				});

				setLoggedIn(true);
				localStorage.setItem("token", backendData.token);
				localStorage.setItem("userInfo", JSON.stringify(backendData));

				showNotification({message: backendData.message, type: "success"});

				setCodeStatus(false);
				setLoading(false);
				closeModal();
				localStorage.removeItem("register-email");
			} else {
				setLoading(false);
				showNotification({message: backendData.message, type: "warning"});
			}
		}
	};

	return (
		<div>
			{codeStatus ? (
				<>
					<input
						type="text"
						ref={codeRef}
						placeholder="code"
						className="ant-input css-dev-only-do-not-override-240cud ant-input-outlined rounded-none py-3 mb-3 mt-3"
					/>
					<button
						onClick={sendCodeFunc}
						type="submit"
						className="w-full h-[3.25em] rounded-md mt-6 hover:bg-[#0069D9] bg-[#007BFF] text-white">
						{loading ? <LoadingOutlined className="text-xl" /> : `отправлять`}
					</button>
				</>
			) : (
				<form onSubmit={handleSubmit(onSubmit)}>
					<label htmlFor="firstName">Имя</label>
					<Controller
						name="firstName"
						control={control}
						rules={{
							required: "Имя обязательно!",
							minLength: {value: 2, message: "Минимум 2 символа!"},
						}}
						render={({field}) => (
							<Input
								{...field}
								placeholder="Введите ваше имя"
								className="rounded-none py-3 mb-3 mt-3"
							/>
						)}
					/>
					{errors.firstName && (
						<p className="text-red-500">{errors.firstName.message}</p>
					)}

					<label htmlFor="lastName">Фамилия</label>
					<Controller
						name="lastName"
						control={control}
						rules={{
							required: "Фамилия обязательна!",
							minLength: {value: 2, message: "Минимум 2 символа!"},
						}}
						render={({field}) => (
							<Input
								{...field}
								placeholder="Введите вашу фамилию"
								className="rounded-none py-3 mb-3 mt-3"
							/>
						)}
					/>
					{errors.lastName && (
						<p className="text-red-500">{errors.lastName.message}</p>
					)}

					<label htmlFor="email">Электронная почта</label>
					<Controller
						name="email"
						control={control}
						rules={{
							required: "Электронная почта обязательна!",
							pattern: {
								value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
								message: "Некорректный адрес электронной почты!",
							},
						}}
						render={({field}) => (
							<Input
								{...field}
								placeholder="Введите вашу почту"
								className="rounded-none py-3 mb-3 mt-3"
							/>
						)}
					/>
					{errors.email && (
						<p className="text-red-500">{errors.email.message}</p>
					)}

					<label htmlFor="password">Пароль</label>
					<Controller
						name="password"
						control={control}
						rules={{
							required: "Пароль обязателен!",
							minLength: {value: 5, message: "Минимум 5 символов!"},
						}}
						render={({field}) => (
							<Input.Password
								{...field}
								placeholder="Введите пароль"
								className="mt-1 rounded-none py-3"
							/>
						)}
					/>
					{errors.password && (
						<p className="text-red-500">{errors.password.message}</p>
					)}

					<button
						type="submit"
						className="w-full h-[3.25em] rounded-md mt-6 hover:bg-[#0069D9] bg-[#007BFF] text-white">
						{loading ? (
							<LoadingOutlined className="text-xl" />
						) : (
							`Зарегистрироваться`
						)}
					</button>
				</form>
			)}
		</div>
	);
};
