import {TodoItem} from "@/components/TodoItem"
import {prisma} from "@/db"
import Link from "next/link"
import {getServerSession} from "next-auth";
import {OPTIONS} from "@/authOptions";

async function getTodos() {
    const session = await getServerSession(OPTIONS);

    return prisma.todo.findMany({
        where: {
            email: session?.user?.email || null
        }
    })
}

async function toggleTodo(id: string, complete: boolean, content: string, email?: string) {
    "use server"

    await prisma.todo.update({where: {id}, data: {complete}})

    if (complete) {
        try {
            if (email) {
                const nodemailer = require("nodemailer");

                const transporter = nodemailer.createTransport({
                    host: process.env.mail_host,
                    port: process.env.mail_port,
                    auth: {
                        user: process.env.mail_user,
                        pass: process.env.mail_password
                    }
                });

                await transporter.sendMail({
                    from: 'Todo Appka <todo@localhost>', // sender address
                    to: email, // list of receivers
                    subject: "Todo hotové ✔", // Subject line
                    text: "Nasledujúce todo bolo označené ako done: \n" + content,
                    html: "<b>Nasledujúce todo bolo označené ako done:</b><br/>" + content,
                });
            }
        } catch (e) {
            console.log(e)
        }
    }
}



export default async function Home() {
    const todos = await getTodos()

    return (
        <>
            <header className="flex justify-between items-center mb-4">
                <h2 className="text-2xl">Zoznam Todočiek</h2>
                <Link
                    className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
                    href="/new"
                >
                    Nové Todo
                </Link>
            </header>
            <ul className="pl-4">
                {todos.map(todo => (
                    <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo}/>
                ))}
            </ul>
        </>
    )
}
