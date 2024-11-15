import { BarUI, MapUI } from "@/entities/home"
import { barData, regions } from "./constants"

export const UsersArea = () => {
  return (
    <div className="bg-white rounded-md shadow flex-1">
      <header className="flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">Пользователи по районам</h1>
      </header>
      <MapUI data={regions.map((r, i) => ({ ...r, id: i, name: r.district }))} />
      <BarUI data={barData} />
    </div>
  )
}
