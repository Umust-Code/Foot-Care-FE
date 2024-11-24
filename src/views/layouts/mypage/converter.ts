interface ChartData {
  id: string;
  data: { x: string; y: number }[];
}

function transformChartData(inputData: any): ChartData[] {
  if (!inputData) return [];
  const keys = ['d1', 'd2', 'd3', 'd4', 'd5', 'd6'];

  const result: ChartData[] = keys.map((key) => ({
    id: key,
    data: [],
  }));

  inputData.forEach((entry: any) => {
    keys.forEach((key) => {
      const matchingEntry = result.find((item) => item.id === key);
      if (matchingEntry) {
        matchingEntry.data.push({
          x: entry.date,
          y: entry[key],
        });
      }
    });
  });

  console.log('차트 데이터: ', result);
  return result;
}

export { transformChartData };
