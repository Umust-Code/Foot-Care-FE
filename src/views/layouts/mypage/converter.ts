function transformData(data: any[]) {
  // Record<string, any[]>는 문자열 키와 배열 값을 가진 객체 타입입니다
  const result: Record<string, any[]> = {};

  for (let i = 1; i <= 6; i++) {
    const key = `d${i}`;
    result[key] = data.map((item) => ({
      x: item[key],
      y: item.date,
    }));
  }

  return result;
}
