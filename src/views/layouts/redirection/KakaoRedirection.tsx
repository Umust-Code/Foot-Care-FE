import { useNavigate } from 'react-router-dom';
import { useAsync } from 'hooks/useAsync';
import { Skeleton } from 'antd';
import { kakaoLoginReq } from 'api/requests/requestUser';

const KakaoRedirection = () => {
  const navigate = useNavigate();
  const url = new URL(window.location.href);
  const KAKAO_CODE = url.searchParams.get('code');
  const [state] = useAsync<any>(() => {
    return kakaoLoginReq(KAKAO_CODE);
  }, [KAKAO_CODE]);
  const { loading, data, error } = state;
  if (loading) {
    return <Skeleton />;
  }
  if (error) {
    console.log(error);
  }
  if (data) {
    const userId = data.data.userId;
    localStorage.setItem('userId', userId);
    console.log('userId', userId);
    navigate('/');
  }
};

export { KakaoRedirection };
