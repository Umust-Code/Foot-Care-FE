import { useAuthStore, useAdminStore } from 'stores/authStore';

// react component 외부에서 zustand 사용
function requestSignin() {
  // useAuthStore.setState({isAuth: true})
  const setAuth = useAuthStore.getState().setIsAuth;
  setAuth(true);
}

function requestAdmin() {
  const setAdmin = useAdminStore.getState().setIsAdmin;
  setAdmin(true);
}

function requestSignout() {
  const setAuth = useAuthStore.getState().setIsAuth;
  const setAdmin = useAdminStore.getState().setIsAdmin;
  setAuth(false);
  setAdmin(false);
}

export { requestSignin, requestSignout, requestAdmin };
