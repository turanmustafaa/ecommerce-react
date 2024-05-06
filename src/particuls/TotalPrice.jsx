import React from 'react'
import { useSelector } from 'react-redux';
export default function TotalPrice() {
    const totalPrice = useSelector((state) => state.products.totalPriceBasket) || 0;
  return (
    <div>
        <div className='w-full bg-white p-3 flex flex-col gap-2 shadow-sm'>
            <div>
                <span>Total Price :</span>
                <span className='text-blue-500'>{totalPrice} ₺</span>
            </div>
            <button className='w-full py-1 bg-blue-500 text-white'>Checkout</button>
        </div>
    </div>
  )
}
