import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const OPTIONS: NextAuthOptions = {
    secret: process.env.AUTH_SECRET,
    providers: [GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID ?? "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    })]
}
