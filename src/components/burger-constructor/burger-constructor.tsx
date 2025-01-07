import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector } from '../../services/store';
import {
  createOrder,
  getConstructorItems,
  getLoadingState,
  getOrderData,
  resetBurgerConstructor
} from '../../services/slices/burgerConstructorSlice';
import { useDispatch } from '../../services/store';
import { getAuthorized } from '../../services/slices/userSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector(getConstructorItems);
  const orderRequest = useSelector(getLoadingState);
  const orderModalData = useSelector(getOrderData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authorized = useSelector(getAuthorized);

  const onOrderClick = () => {
    if (!authorized) {
      navigate('/login');
      return;
    } else {
      if (!constructorItems.bun || orderRequest) return;
      const ingredientsOrder = [
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((ingredient) => ingredient._id),
        constructorItems.bun._id
      ];
      dispatch(createOrder(ingredientsOrder));
    }
  };
  const closeOrderModal = () => {
    dispatch(resetBurgerConstructor());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
