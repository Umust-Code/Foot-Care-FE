import { Survey } from 'api/models/request';

interface ScoreResult {
  categoryId: number;
  score: number;
}

const calculateScores = (answers: number[]): Survey['scores'] => {
  return Array.from({ length: 6 }, (_, index) => {
    const startIdx = index * 4;
    const sum = answers.slice(startIdx, startIdx + 4).reduce((acc, curr) => acc + curr, 0);

    return {
      categoryId: index + 1,
      score: sum,
    };
  });
};

export { calculateScores };
