import { FC, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getCookie } from '../../utils/cookie';
import { useSelector } from 'react-redux';
import { fetchUser, getAuthorized } from '../../services/slices/userSlice';
import { useDispatch } from '../../services/store';

type TProtectedRouteProps = {
  children: ReactNode;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = (props: TProtectedRouteProps) => {
  const location = useLocation();
  const dispatch = useDispatch();
  dispatch(fetchUser);
  const auth = useSelector(getAuthorized);
  if (!auth && !props.onlyUnAuth) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  if (auth && props.onlyUnAuth) {
    return <Navigate replace to={location.state.from || '/profile'} />;
  }

  return props.children;
};
