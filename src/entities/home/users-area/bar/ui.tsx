import { FC } from "react";
import { BarUIProps } from "./types";
import { ProgressBar } from "@ui";

export const BarUI: FC<BarUIProps> = ({ data }) => {
  return (
    <div className="flex flex-col gap-5 p-4 border-t">
      {data.map((item) => (
        <div className="flex justify-between" key={item.id}>
          <h1 className="flex-1">{item.name}</h1>
          <ProgressBar className="flex-[3]" percent={item.percent} showPercent />
        </div>
      ))}
    </div>
  )
}
