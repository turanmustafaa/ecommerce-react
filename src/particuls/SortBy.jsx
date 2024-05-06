// src/particuls/sortBy.jsx
import React from "react";
import { useDispatch } from 'react-redux';
import { sort } from '../features/products/ProductSlice';

const SortBy = () => {
  const dispatch = useDispatch();

  const handleSortChange = (e) => {
    const sortByType = e.target.value;
    dispatch(sort({ sortByType }));
  };

  return (
    <section className="text-[#585858]">
      <label className="text-sm">Sort By:</label>
      <div className="flex flex-col gap-2 bg-white shadow-md p-3">
        <div className="flex gap-2">
          <input
            type="radio"
            id="oldToNew"
            name="sortBy"
            value="oldToNew"
            onChange={handleSortChange}
          />
          <label htmlFor="oldToNew">Old to New</label>
        </div>
        <div className="flex gap-2">
          <input
            type="radio"
            id="newToOld"
            name="sortBy"
            value="newToOld"
            onChange={handleSortChange}
          />
          <label htmlFor="newToOld">New to Old</label>
        </div>
        <div className="flex gap-2">
          <input
            type="radio"
            id="priceHighToLow"
            name="sortBy"
            value="priceHighToLow"
            onChange={handleSortChange}
          />
          <label htmlFor="priceHighToLow">Price High to Low</label>
        </div>
        <div className="flex gap-2">
          <input
            type="radio"
            id="priceLowToHigh"
            name="sortBy"
            value="priceLowToHigh"
            onChange={handleSortChange}
          />
          <label htmlFor="priceLowToHigh">Price Low to High</label>
        </div>
      </div>
    </section>
  );
};

export default SortBy;
