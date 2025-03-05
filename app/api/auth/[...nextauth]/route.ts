import CredentialsProvider from "next-auth/providers/credentials";
import {AuthOptions} from "next-auth";
import NextAuth from "next-auth";

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
		// async session({session, token}) {
		// 	session.user.id = token.id;
		// 	session.user.email = token.email;
		// 	return session;
		// },
	},
	session: {strategy: "jwt"},
	secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};
