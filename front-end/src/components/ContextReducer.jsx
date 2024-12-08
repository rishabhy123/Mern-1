import React, { createContext, useReducer, useContext } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return [...state, {
        id: action.id, name: action.name, qty: action.qty,
        size: action.size, price: action.price, img: action.img
      }]
    case 'REMOVE_ITEM':
      let newArr = [...state]
      newArr.splice(action.index, 1)
      return newArr;

    case 'UPDATE_ITEM':
      let arr = [...state]
      arr.find((food, index) => {
        if (food.id === action.id) {
          arr[index] = { ...food, qty: parseInt(action.qty) + food.qty, price: action.price + food.price }
        }
        return arr
      })
      return arr
    case 'DROP_ITEM':
      let empArray = []
      return empArray
    default:
      console.log('Error');
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, []);

  return (
    <CartStateContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  );
};

export const useCartState = () => useContext(CartStateContext);
export const useCartDispatch = () => useContext(CartDispatchContext);
