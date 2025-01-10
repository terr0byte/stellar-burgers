import { ReactNode, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  fetchUser,
  getAuthorized,
  getIsLodaing
} from '../../services/slices/userSlice';
import { useDispatch } from '../../services/store';
import { Preloader } from '@ui';

type TProtectedRouteProps = {
  children: ReactNode;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = (props: TProtectedRouteProps) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const userLoading = useSelector(getIsLodaing);
  const auth = useSelector(getAuthorized);
  useEffect(() => {
    dispatch(fetchUser);
    console.log(auth);
  }, []);
  if (!auth && !props.onlyUnAuth && !userLoading) {
    return userLoading ? (
      <Preloader />
    ) : (
      <Navigate to='/login' state={{ from: location }} />
    );
  }

  if (auth && props.onlyUnAuth) {
    return <Navigate replace to={location.state?.from || '/profile'} />;
  }

  return props.children;
};
