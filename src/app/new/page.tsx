import { prisma } from "@/db"
import { redirect } from "next/navigation"
import Link from "next/link"
import { getServerSession } from "next-auth";
import { OPTIONS } from "@/authOptions";
async function createTodo(data: FormData) {
  "use server"

  const title = data.get("title")?.valueOf()
  if (typeof title !== "string" || title.length === 0) {
    throw new Error("Invalid Title")
  }

  const session = await getServerSession(OPTIONS);

  await prisma.todo.create({ data: { title, complete: false, email: session?.user?.email || null } })
  redirect("/")
}

export default async function Page() {

  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h2 className="text-2xl">Nové todočko</h2>
      </header>
      <form action={createTodo} className="flex gap-2 flex-col">
        <input
          type="text"
          name="title"
          className="border border-slate-300 bg-white text-black rounded px-2 py-1 outline-none focus-within:border-slate-100"
        />
        <div className="flex gap-1 justify-end">
          <Link
            href=".."
            className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          >
            Ukončiť
          </Link>
          <button
            type="submit"
            className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          >
            Uložiť
          </button>
        </div>
      </form>
    </>
  )
}
