import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../products/ProductSlice';
import Product from './Product';
import Pagination from '../../components/Pagination';

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products) || [];
  const filteredProducts = useSelector((state) => state.products.filteredProducts) || [];
  const [pageNumber, setPageNumber] = useState(0);
  const productsPerPage = 12;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const pageCount = Math.ceil(filteredProducts.length / productsPerPage);

  const displayedProducts = filteredProducts.slice(
    pageNumber * productsPerPage,
    (pageNumber + 1) * productsPerPage
  );

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };
  return (
    <div>
      <div className="flex flex-wrap justify-start gap-8">
        {displayedProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
      <Pagination pageCount={pageCount} onPageChange={handlePageChange} />
    </div>
  );
};

export default Products;
