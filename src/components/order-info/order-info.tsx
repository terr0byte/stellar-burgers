import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useSelector } from 'react-redux';
import { getIngredients } from '../../services/slices/ingredientsSlice';
import { useLocation, useParams } from 'react-router-dom';
import {
  fetchUserOrders,
  getUserOrders
} from '../../services/slices/userSlice';
import { useDispatch } from '../../services/store';
import { fetchFeed, getFeedOrders } from '../../services/slices/feedSlice';

export const OrderInfo: FC = () => {
  const params = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  /** TODO: взять переменные orderData и ingredients из стора */
  const feedOrders = useSelector(getFeedOrders);
  const userOrders = useSelector(getUserOrders);
  const orders = feedOrders.concat(userOrders);
  const orderData = orders.filter(
    (order) => order.number.toString() === params.number
  )[0];

  useEffect(() => {
    if (location.state) return;
    dispatch(fetchFeed());
    dispatch(fetchUserOrders());
  }, []);

  const ingredients: TIngredient[] = useSelector(getIngredients);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
