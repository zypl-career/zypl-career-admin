import { AllVisitorsUI, DevicesUI } from '@/entities/home/reports';

export const Reports = () => {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <AllVisitorsUI />
      <DevicesUI />
    </div>
  );
};
