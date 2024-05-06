import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteOrDecreaseFromCart, IncreaseFromCart } from '../features/products/ProductSlice';
import { addToCart,totalPrice } from '../features/products/ProductSlice';

export default function BasketCount() {
  const carts = useSelector((state) => state.products.cart.items) || [];
  const dispatch = useDispatch();

  useEffect(() => {
    const storedCarts = localStorage.getItem('carts');
    if (storedCarts) {
      const parsedCarts = JSON.parse(storedCarts);

      parsedCarts.forEach((item) => {
        dispatch(addToCart(item)); 
      });
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('carts', JSON.stringify(carts));
  }, [carts]);

  if (carts.length === 0) {
    return <p>Sepetiniz boş.</p>;
  }

  return (
    <div className='bg-white shadow-md min-w-52 flex flex-col gap-3 h-max p-3'>
      {carts.map((item) => (
        <div key={item.id} className='flex flex-nowrap items-center justify-between'>
          <div className='flex flex-col'>
            <span className='text-xs'>{item.name}</span>
            <span className='text-sm'>{item.totalPrice} ₺</span>
          </div>
          <div className='flex items-center'>
            <button onClick={() => dispatch(deleteOrDecreaseFromCart(item),dispatch(totalPrice()))} className='px-2 py-1 bg-gray-100'>-</button>
            <span className='px-2 py-1 bg-blue-500 text-white'>{item.quantity}</span>
            <button onClick={() => dispatch(IncreaseFromCart(item), dispatch(totalPrice()))} className='px-2 py-1 bg-gray-100'>+</button>
          </div>
        </div>
      ))}
    </div>
  );
}
