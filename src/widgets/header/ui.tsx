import { MoreVertical, Bell } from "lucide-react"

export const Header = () => {
  return (
    <header className="bg-white w-full p-4 flex justify-end items-center gap-3">
      <Bell className="cursor-pointer" />
      <MoreVertical className="cursor-pointer" />
    </header>
  )
}
