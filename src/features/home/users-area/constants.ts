import { TBarData } from "@/entities/home/users-area/bar/types";
import { TCounterBranches } from "@/entities/home/users-area/map/types";

export const mapArea: Array<TCounterBranches> = Array.from({length: 61}, (_, i) => ({
  id: i.toString(),
  name: `Branch${i}`,
  count: Math.floor(Math.random() * 100)
}));

export const barData: TBarData[] = [
  { id: '1', name: 'Вахдат', percent: 50 },
  { id: '2', name: 'Айни', percent: 30 },
  { id: '3', name: 'Бохтар', percent: 20 },
  { id: '3', name: 'Хорог', percent: 20 },
  { id: '3', name: 'Гиссар', percent: 20 },
  { id: '3', name: 'Яван', percent: 20 },
]
