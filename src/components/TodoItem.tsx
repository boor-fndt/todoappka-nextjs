"use client"

type TodoItemProps = {
  id: string
  title: string
  email: string | null
  complete: boolean
  toggleTodo: (id: string, complete: boolean, content: string, email?: string) => void
}

export function TodoItem({ id, title, complete, email, toggleTodo }: TodoItemProps) {
  return (
    <li className="flex gap-1 items-center">
      <input
        id={id}
        type="checkbox"
        className="cursor-pointer peer"
        defaultChecked={complete}
        onChange={e => toggleTodo(id, e.target.checked, title, email ?? undefined)}
      />
      <label
        htmlFor={id}
        className="cursor-pointer peer-checked:line-through peer-checked:text-slate-500"
      >
        {title} {email ? ` - od ${email}` : ''}
      </label>
    </li>
  )
}
