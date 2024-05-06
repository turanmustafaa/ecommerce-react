import React, { useState, useEffect, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { updateFilteredProducts } from "../features/products/ProductSlice";

const Brands = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products) || [];
  const [searchTerm, setSearchTerm] = useState("");
  const [brands, setBrands] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  useEffect(() => {
    const uniqueBrands = Array.from(
      new Set(products.map((product) => product.brand))
    );
    setBrands(uniqueBrands);
  }, [products]);

  const filteredBrands = useMemo(() => {
    return brands.filter((brand) =>
      brand.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [brands, searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleBrandSelect = (brand) => {
    const isSelected = selectedBrands.includes(brand);
    let updatedSelectedBrands;

    if (isSelected) {
      updatedSelectedBrands = selectedBrands.filter(
        (selectedBrand) => selectedBrand !== brand
      );
    } else {
      updatedSelectedBrands = [...selectedBrands, brand];
    }

    setSelectedBrands(updatedSelectedBrands);
    updateFilteredProductsInStore(updatedSelectedBrands);
  };

  const updateFilteredProductsInStore = (selectedBrands) => {
    if (selectedBrands.length === 0) {
      dispatch(updateFilteredProducts(products));
    } else {
      const filteredProducts = products.filter((product) =>
        selectedBrands.includes(product.brand)
      );

      dispatch(updateFilteredProducts(filteredProducts));
    }
  };

  useEffect(() => {
    updateFilteredProductsInStore([]);
  }, []);

  return (
    <section className="text-[#585858]">
      <label className="text-sm">Search Brands:</label>
      <div className="flex flex-col gap-2 bg-white shadow-md p-3">
        <div className="relative">
          <input
            type="text"
            className="pl-10 pr-4 py-1 text-black bg-slate-100"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FontAwesomeIcon className="text-gray-500" icon={faSearch} />
          </div>
        </div>
        <ul className="h-48 overflow-scroll">
          {filteredBrands.map((brand, index) => (
            <li key={index}>
              <label>
                <input
                  className="border-blue-500 accent-blue-500"
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => handleBrandSelect(brand)}
                />
                <span className="ml-2">{brand}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Brands;
