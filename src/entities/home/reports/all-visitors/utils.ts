export const getPercent = (data: { range: string; count: number; fill: string }[]) => {
  const total = data.reduce((sum, entry) => sum + entry.count, 0);
  return data.map((entry) => ({
    ...entry,
    percent: Math.floor((entry.count / total) * 100),
  }));
};
