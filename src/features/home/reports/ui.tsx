import { AllVisitorsUI, DevicesUI } from "@/entities/home/reports";

export const Reports = () => {
  return (
    <div className="flex flex-col gap-6 flex-1">
      <AllVisitorsUI />
      <DevicesUI />
    </div>
  );
};
