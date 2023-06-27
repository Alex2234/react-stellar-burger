import React from 'react';
import styles from '../../components/burger-ingredients/burger-ingredients.module.css'
import { Counter, CurrencyIcon, Tab} from '@ya.praktikum/react-developer-burger-ui-components'


const BurgerIngredients = ({ data }) => {
    
        const [current, setCurrent] = React.useState('one')
        return (
            <section className={styles.section}>
                <h2 className='text text_type_main-large pt-10 pb-5'>Соберите бургер</h2>
                <div style={{ display: 'flex' }}>
            <Tab value="one" active={current === 'one'} onClick={setCurrent}>
              Булки
            </Tab>
            <Tab value="two" active={current === 'two'} onClick={setCurrent}>
              Соусы
            </Tab>
            <Tab value="three" active={current === 'three'} onClick={setCurrent}>
              Начинки
            </Tab>
          </div>
          <div className={`${styles.container} custom-scroll`}>
          <div>
              <h3 className='text text_type_main-medium pt-10 pb-6'>Булки</h3>
              <div className={`${styles.ingredients} pl-4`}>
                {data.filter(item => item.type === 'bun').map(item => ( 
                  <div key={item._id} className={`${styles.ingredient} pb-8`}>
                    <img src={item.image} alt={item.name} className='pl-4'/>
                    <div className={`${styles.prices} pt-1 pb-1`}>
                      <p className='text text_type_digits-default'>{item.price}</p>
                      <CurrencyIcon/>
                    </div>
                    <p className={`${styles.name} text text_type_main-default`}>{item.name}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className='text text_type_main-medium pt-10 pb-6'>Соусы</h3>
              <div className={`${styles.ingredients} pl-4`}>
                {data.filter(item => item.type === 'sauce').map(item => (
                  <div key={item._id} className={`${styles.ingredient} pb-8`}>
                    <img src={item.image} alt={item.name} className='pl-4'/>
                    <div className={`${styles.prices} pt-1 pb-1`}>
                      <p className='text text_type_digits-default'>{item.price}</p>
                      <CurrencyIcon/>
                    </div>
                    <p className={`${styles.name} text text_type_main-default`}>{item.name}</p>
                  </div>
                ))}
              </div>
            </div>
            </div>
            </section>
        )
      }

export default BurgerIngredients