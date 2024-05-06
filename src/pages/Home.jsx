import React from 'react'
import Products from '../features/products/Products'
import LeftSortBar from '../components/LeftSortBar'
import BasketCount from '../particuls/BasketCount'
import TotalPrice from '../particuls/TotalPrice'
export default function Home() {
  return (
    <div className='flex gap-2'>
        <LeftSortBar />
        <Products />
        <div className='flex flex-col gap-2'>
        <BasketCount />
        <TotalPrice />
        </div>
    </div>
  )
}
