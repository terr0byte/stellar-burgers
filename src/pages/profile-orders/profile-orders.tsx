import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch } from '../../services/store';
import {
  fetchUserOrders,
  getUserOrders
} from '../../services/slices/userSlice';
import { useSelector } from 'react-redux';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(getUserOrders);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserOrders());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
