import "./globals.css"
import { Inter } from "next/font/google"
import Providers from "@/components/Providers";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
    title: "Todo App",
}

export default function RootLayout({
   children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body
            className={`${inter.className} bg-slate-800 text-slate-100 container mx-auto p-4`}
        >
        <Providers>
            <h1 className="text-4xl mb-3">TODO APPKA - aws ec2</h1>
            <Header/>
            {children}
        </Providers>

        </body>
        </html>
    )
}
