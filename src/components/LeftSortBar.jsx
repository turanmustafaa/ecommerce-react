import React from 'react'
import Brands from '../particuls/Brands'
import Model from '../particuls/Model'
import SortBy from '../particuls/SortBy'

export default function LeftSortBar() {
  return (
    <div className='flex flex-col gap-4'>
        <SortBy />
        <Brands />
        <Model />
    </div>
  )
}
