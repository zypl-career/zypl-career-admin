import { PieLabel } from "@ui";
import { Pie, PieChart, Label } from "recharts";

const data = [
  { name: "0–14 лет", value: 15, fill: "#EEC980" },
  { name: "15–64 года", value: 79, fill: "#F36565" },
  { name: "60 - 74 лет  ", value: 5, fill: "#F39865" },
  { name: "75 - 89 лет", value: 1, fill: "#89C858" },
];

export const AllVisitorsUI = () => {
  return (
    <div className="bg-white rounded-md shadow">
      <header className="flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">Все посетители</h1>
      </header>
      <div className="flex flex-col items-center justify-center">
        <PieChart width={436} height={436}>
          <Pie
            cornerRadius={10}
            innerRadius={140}
            outerRadius={200}
            data={data}
            dataKey="value"
          >
            <Label
              position="center"
              content={
                <PieLabel>
                  <p className="text-[#212B36] text-2xl font-bold">2548</p>
                  <p className="text-[#637381] text-sm font-medium">
                    Пользователей
                  </p>
                </PieLabel>
              }
            />
          </Pie>
        </PieChart>
        <div className="grid grid-cols-2 items-center py-4 gap-x-14 gap-y-2 place-content-center">
          {data.map((item, i) => (
            <div className="flex items-center justify-between gap-3" key={i}>
              <div className="flex items-center gap-1.5">
                <div
                  style={{ backgroundColor: item.fill }}
                  className="size-2.5 rounded-full"
                />
                <span>{item.name}</span>
              </div>
              <p>{item.value}%</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
