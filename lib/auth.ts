// lib/auth.ts
import {AuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
	providers: [
		CredentialsProvider({
			name: "credentials",
			credentials: {
				email: {label: "Email", type: "text"},
				password: {label: "Password", type: "password"},
			},
			async authorize(credentials) {
				if (!credentials) return null;
				return {
					id: "user_id",
					email: credentials.email,
				};
			},
		}),
	],
	callbacks: {
		async jwt({token, user}) {
			if (user) {
				token.id = user.id;
				token.email = user.email;
			}
			return token;
		},
	},
	session: {strategy: "jwt"},
	secret: process.env.NEXTAUTH_SECRET,
};
