import { FC, PropsWithChildren } from "react"

export const PieLabel: FC<PropsWithChildren> = ({ children }) => {
  return (
    <foreignObject x={0} y={0} textAnchor="middle" dominantBaseline="central" width="100%" height="100%">
      <div className="flex flex-col items-center justify-center h-full">
        {children}
      </div>
   </foreignObject>
  )
}
