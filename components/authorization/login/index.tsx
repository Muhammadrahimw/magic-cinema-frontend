import {Input, message} from "antd";
import {signIn} from "next-auth/react";
import {useRef, useState} from "react";
import {useForm, Controller} from "react-hook-form";
import {LoadingOutlined} from "@ant-design/icons";
import {useNotification} from "@/components/alertMessages";
import {useAuthStore} from "@/utils/zustand";

export interface LoginFormType {
	email: string;
	password: string;
}

interface LoginSectionProps {
	closeModal: () => void;
}

export const LoginSection = ({closeModal}: LoginSectionProps) => {
	const [loading, setLoading] = useState<boolean>(false);
	const [forgotStatus, setForgotStatus] = useState<boolean>(false);
	const emailRef = useRef<HTMLInputElement>(null);
	const {showNotification} = useNotification();
	const setLoggedIn = useAuthStore((state) => state.setLoggedIn);

	const {
		control,
		handleSubmit,
		formState: {errors},
	} = useForm<LoginFormType>();

	const onSubmit = async (data: LoginFormType) => {
		setLoading(true);
		try {
			const backendResponse = await fetch(
				"http://localhost:6060/auth/sign-in",
				{
					method: "POST",
					headers: {"Content-Type": "application/json"},
					body: JSON.stringify({
						email: data.email,
						password: data.password,
					}),
				}
			);

			const backendData = await backendResponse.json();

			if (backendResponse.ok) {
				await signIn("credentials", {
					redirect: false,
					email: data.email,
					password: data.password,
				});
				localStorage.setItem(`token`, backendData.data.token);
				localStorage.setItem(`userInfo`, JSON.stringify(backendData.data));
				showNotification({message: backendData.message, type: "success"});
				setLoggedIn(true);
				closeModal();
			} else {
				showNotification({message: backendData.message, type: "warning"});
			}
		} catch (error) {
			showNotification({message: `Something wet wrong`, type: "error"});
			console.error("Login xatosi:", error);
		} finally {
			setLoading(false);
		}
	};

	const sendEmailFunc = async () => {
		const email = emailRef.current?.value;
		if (email) {
			setLoading(true);
			const backendResponse = await fetch(
				"http://localhost:6060/auth/forgot-password",
				{
					method: "POST",
					headers: {"Content-Type": "application/json"},
					body: JSON.stringify({
						email: email,
					}),
				}
			);

			const backendData = await backendResponse.json();

			if (backendData.message === `Verify link sent to your email`) {
				showNotification({message: backendData.message, type: "success"});
				setForgotStatus(false);
				setLoading(false);
				setLoggedIn(true);
				closeModal();
			} else {
				showNotification({message: backendData.message, type: "warning"});
				setLoading(false);
			}
		}
	};

	return (
		<div>
			{forgotStatus ? (
				<>
					<input
						type="email"
						ref={emailRef}
						placeholder="email"
						className="ant-input css-dev-only-do-not-override-240cud ant-input-outlined rounded-none py-3 mb-3 mt-3"
					/>
					<button
						onClick={sendEmailFunc}
						type="submit"
						className="w-full h-[3.25em] rounded-md mt-6 hover:bg-[#0069D9] bg-[#007BFF] text-white">
						{loading ? <LoadingOutlined className="text-xl" /> : `отправлять`}
					</button>
				</>
			) : (
				<form onSubmit={handleSubmit(onSubmit)}>
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
								type="email"
								placeholder="ваш адрес электронной почты"
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
							minLength: {
								value: 5,
								message: "Пароль должен содержать минимум 5 символов!",
							},
						}}
						render={({field}) => (
							<Input.Password
								{...field}
								type="password"
								placeholder="Пароль"
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
						{loading ? <LoadingOutlined className="text-xl" /> : `Войти`}
					</button>
				</form>
			)}
			<div className="text-[#007BFF] text-[1.1em] cursor-pointer text-center mt-5">
				{forgotStatus ? (
					<p onClick={() => setForgotStatus(false)}>Я помню пароль</p>
				) : (
					<p onClick={() => setForgotStatus(true)}>Не помню пароль</p>
				)}
			</div>
		</div>
	);
};
