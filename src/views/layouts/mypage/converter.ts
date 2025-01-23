interface ChartData {
  id: string;
  data: { x: string; y: number }[];
}

const diseaseMap: { [key: string]: string } = {
  d1: '족저근막염',
  d2: '발부종',
  d3: '당뇨병성 발',
  d4: '발 뒤꿈치 통증',
  d5: '무좀(발냄새)',
  d6: '발목 염좌',
};

function transformChartData(inputData: any): ChartData[] {
  if (!inputData) return [];

  const sortedInputData = [...inputData].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );
  const keys = ['d1', 'd2', 'd3', 'd4', 'd5', 'd6'];

  const result: ChartData[] = keys.map((key) => ({
    id: diseaseMap[key],
    data: [],
  }));

  sortedInputData.forEach((entry: any) => {
    keys.forEach((key) => {
      const matchingEntry = result.find((item) => item.id === diseaseMap[key]);
      if (matchingEntry) {
        matchingEntry.data.push({
          x: entry.date,
          y: entry[key],
        });
      }
    });
  });

  console.log('변환된 차트 데이터: ', result);
  return result;
}

const calculateDiseaseAverages = (data: any) => {
  if (!data) return [];

  const getStatusMessage = (score: number): string => {
    if (score >= 16) {
      return '현재 발 건강이 양호한 상태입니다. 꾸준한 관리로 건강을 유지하세요.';
    }
    if (score >= 11) {
      return '발 건강이 악화될 수 있는 초기 증상이 있습니다. 예방적 관리가 필요합니다.';
    }
    if (score >= 6) {
      return '발 건강이 위험한 상태입니다. 전문의와 상담이 필요합니다.';
    }
    return '발 건강이 매우 심각한 상태입니다. 즉시 전문의의 진료가 필요합니다.';
  };
  const sum = data.reduce(
    (acc: any, curr: any) => ({
      d1: acc.d1 + curr.d1,
      d2: acc.d2 + curr.d2,
      d3: acc.d3 + curr.d3,
      d4: acc.d4 + curr.d4,
      d5: acc.d5 + curr.d5,
      d6: acc.d6 + curr.d6,
    }),
    { d1: 0, d2: 0, d3: 0, d4: 0, d5: 0, d6: 0 },
  );

  const count = data.length;

  return [
    {
      name: '족저근막염',
      value: +(sum.d1 / count).toFixed(1),
      status: getStatusMessage(sum.d1 / count),
    },
    {
      name: '발부종',
      value: +(sum.d2 / count).toFixed(1),
      status: getStatusMessage(sum.d2 / count),
    },
    {
      name: '당뇨병성 발',
      value: +(sum.d3 / count).toFixed(1),
      status: getStatusMessage(sum.d3 / count),
    },
    {
      name: '발 뒤꿈치 통증',
      value: +(sum.d4 / count).toFixed(1),
      status: getStatusMessage(sum.d4 / count),
    },
    {
      name: '무좀(발냄새)',
      value: +(sum.d5 / count).toFixed(1),
      status: getStatusMessage(sum.d5 / count),
    },
    {
      name: '발목 염좌',
      value: +(sum.d6 / count).toFixed(1),
      status: getStatusMessage(sum.d6 / count),
    },
  ];
};

const convertToNameValue = (data: any) => {
  if (!data || data.length === 0) return [];

  const firstEntry = data[0];
  return Object.entries(diseaseMap).map(([key, name]) => ({
    name,
    value: firstEntry[key],
  }));
};

export { transformChartData, calculateDiseaseAverages, convertToNameValue };
