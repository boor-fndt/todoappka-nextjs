import NextAuth from "next-auth/next";
import { OPTIONS } from "@/authOptions";

const handler = NextAuth(OPTIONS)

export { handler as GET, handler as POST }
