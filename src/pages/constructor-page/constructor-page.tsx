import { useSelector } from '../../services/store';

import styles from './constructor-page.module.css';

import { BurgerIngredients } from '../../components';
import { BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';
import { FC, useEffect } from 'react';
import { getLoading } from '../../services/slices/ingredientsSlice';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';
import { useDispatch } from '../../services/store';

export const ConstructorPage: FC = () => {
  const dispatch = useDispatch();
  /** TODO: взять переменную из стора */
  const isIngredientsLoading = useSelector(getLoading);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, []);

  return (
    <>
      {isIngredientsLoading ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
