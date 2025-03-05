import {useQuery} from "@tanstack/react-query";

interface fetchProps {
	url: string;
	method?: "GET" | "POST" | "DELETE" | "PUT";
	body?: any;
	headers?: HeadersInit;
	params?: any;
}

export const useFetchFunc = () => {
	const response = async ({
		url,
		method = "GET",
		body,
		headers,
		params,
	}: fetchProps) => {
		const queryParams = params
			? "?" + new URLSearchParams(params as Record<string, string>).toString()
			: "";

		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}${url}${queryParams}`,
			{
				method,
				body: body ? JSON.stringify(body) : undefined,
				headers: {
					"Content-Type": "application/json",
					...headers,
				},
			}
		);

		const data = await res.json();
		return data;
	};

	return response;
};

export const useFetchQuery = (
	queryKey: string[],
	url: string,
	params?: any
) => {
	const fetchFunc = useFetchFunc();

	return useQuery({
		queryKey,
		queryFn: () => fetchFunc({url, params}),
	});
};
