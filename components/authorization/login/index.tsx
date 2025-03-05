import {Input} from "antd";
import {useForm, Controller} from "react-hook-form";

interface LoginFormType {
	email: string;
	password: string;
}

export const LoginSection = () => {
	const {
		control,
		handleSubmit,
		formState: {errors},
	} = useForm<LoginFormType>();

	const onSubmit = (data: LoginFormType) => {
		console.log("Login ma'lumotlari:", data);
	};

	return (
		<div>
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
							placeholder="ваш адрес электронной почты"
							className="rounded-none py-3 mb-3 mt-3"
						/>
					)}
				/>
				{errors.email && <p className="text-red-500">{errors.email.message}</p>}
				<label htmlFor="password">Пароль</label>
				<Controller
					name="password"
					control={control}
					rules={{
						required: "Пароль обязателен!",
						minLength: {
							value: 6,
							message: "Пароль должен содержать минимум 6 символов!",
						},
					}}
					render={({field}) => (
						<Input.Password
							{...field}
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
					Войти
				</button>
			</form>
			<p className="text-[#007BFF] text-[1.1em] cursor-pointer text-center mt-5">
				Не помню пароль
			</p>
		</div>
	);
};
