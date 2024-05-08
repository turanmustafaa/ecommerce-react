import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import BasketCount from '../particuls/BasketCount';
import { addToCart } from '../features/products/ProductSlice';
import TotalPrice from '../particuls/TotalPrice';
import { totalPrice } from "../features/products/ProductSlice";
import {toast} from 'react-toastify';
const CardDetail = () => {
  const dispatch = useDispatch()
  const { id } = useParams();
  const product = useSelector(state => state.products.products.find(p => p.id === id));
  const handleAddToCart = () => {
    dispatch(addToCart(product));
    dispatch(totalPrice())
    toast.success('ürün eklendi')
  };
  return (
    <div className='flex gap-4 h-3/4'>
      <div className='w-3/4 bg-white shadow-sm flex gap-3 p-3'>
        <div className='w-1/2'>
            <img className=' object-cover w-full h-full' src={product.image} alt="" />
        </div>
        <div className='w-1/2 flex flex-col items-left gap-2'>
            <span className='text-2xl'>{product.name}</span>
            <span className='text-blue-500'>{product.price} ₺</span>
            <button className='w-full py-2 bg-blue-500 text-white' onClick={handleAddToCart}>Add to Cart</button>
            <span className=' overflow-scroll text-sm'>{product.description}</span>
        </div>
      </div>
      <div className='w-1/4'>
        <BasketCount />
        <TotalPrice />
      </div>
    </div>
  );
};

export default CardDetail;
