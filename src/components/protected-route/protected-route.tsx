import { FC, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getCookie } from '../../utils/cookie';
import { useSelector } from 'react-redux';
import { getUserData } from '../../services/slices/userSlice';

type TProtectedRouteProps = {
  children: ReactNode;
};

export const ProtectedRoute = (props: TProtectedRouteProps) => {
  const location = useLocation();
  const user = useSelector(getUserData);
  if (!getCookie('accessToken')) {
    if (
      location.pathname === '/register' ||
      location.pathname === '/forgot-password' ||
      location.pathname === '/login' ||
      location.pathname === '/reset-password'
    )
      return props.children;
    return <Navigate replace to='/login' />;
  }

  if (getCookie('accessToken')) {
    if (
      location.pathname === '/register' ||
      location.pathname === '/forgot-password' ||
      location.pathname === '/login' ||
      location.pathname === '/reset-password'
    )
      return <Navigate replace to='/profile' />;
    return props.children;
  }

  return props.children;
};
