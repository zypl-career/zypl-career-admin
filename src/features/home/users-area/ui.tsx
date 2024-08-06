import { BarUI, MapUI } from "@/entities/home"
import { mapArea, barData } from "./constants"

export const UsersArea = () => {
  return (
    <div className="bg-white rounded-md shadow flex-1">
      <header className="flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">Пользователи по районам</h1>
      </header>
      <MapUI data={mapArea} />
      <BarUI data={barData} />
    </div>
  )
}
