import { useReducer, useEffect } from 'react';

// 상태 타입 정의
interface AsyncState<T> {
  loading: boolean;
  data: T | null;
  error: Error | null;
}

// 액션 타입 정의
type AsyncAction<T> =
  | { type: 'LOADING' }
  | { type: 'SUCCESS'; data: T }
  | { type: 'ERROR'; error: Error };

// 리듀서 함수에 제네릭 타입 적용
function reducer<T>(state: AsyncState<T>, action: AsyncAction<T>): AsyncState<T> {
  switch (action.type) {
    case 'LOADING':
      return {
        loading: true,
        data: null,
        error: null,
      };
    case 'SUCCESS':
      return {
        loading: false,
        data: action.data,
        error: null,
      };
    case 'ERROR':
      return {
        loading: false,
        data: null,
        error: action.error,
      };
    default:
      throw new Error('Unhandled action type');
  }
}

// useAsync 훅에 제네릭 타입 적용
function useAsync<T>(
  callback: () => Promise<T>,
  deps: any[] = [],
): [AsyncState<T>, () => Promise<void>] {
  const [state, dispatch] = useReducer(reducer<T>, {
    loading: false,
    data: null,
    error: null,
  });

  const fetchData = async () => {
    dispatch({ type: 'LOADING' });
    try {
      const data = await callback();
      dispatch({ type: 'SUCCESS', data });
    } catch (e) {
      dispatch({ type: 'ERROR', error: e instanceof Error ? e : new Error('An error occurred') });
    }
  };

  useEffect(() => {
    fetchData();
  }, deps);

  return [state, fetchData];
}

export { useAsync };
