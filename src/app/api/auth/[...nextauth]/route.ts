import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {},
                password: {},
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) {
                    return null;
                }
                const user = await prisma.user.findUnique({
                    where: {
                        username: credentials.username as string,
                    },
                });

                if (!user) {
                    return null;
                }
                const isValid = await bcrypt.compare(
                    credentials.password as string,
                    user.passwordHash,
                );

                if (!isValid) {
                    return null;
                }

                return {
                    id: user.id,
                    name: user.username,
                };
            }
        }),
    ],
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 60,
    },
    jwt: {
        maxAge: 30 * 60,
    },
});

export { handler as GET, handler as POST };