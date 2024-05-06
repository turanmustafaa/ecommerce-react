import React, { useState, useEffect, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { updateFilteredProducts } from "../features/products/ProductSlice";

const Model = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products) || [];
  const [searchTerm, setSearchTerm] = useState("");
  const [models, setModels] = useState([]);
  const [selectedModels, setSelectedModels] = useState([]);

  useEffect(() => {
    const uniqueModels = Array.from(
      new Set(products.map((product) => product.model))
    );
    setModels(uniqueModels);
  }, [products]);

  const filteredModels = useMemo(() => {
    return models.filter((model) =>
      model.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [models, searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleModelSelect = (model) => {
    const isSelected = selectedModels.includes(model);
    let updatedSelectedModels;

    if (isSelected) {
      updatedSelectedModels = selectedModels.filter(
        (selectedModel) => selectedModel !== model
      );
    } else {
      updatedSelectedModels = [...selectedModels, model];
    }

    setSelectedModels(updatedSelectedModels);
    updateFilteredProductsInStore(updatedSelectedModels);
  };

  const updateFilteredProductsInStore = (selectedModels) => {
    if (selectedModels.length === 0) {
      dispatch(updateFilteredProducts(products));
    } else {
      const filteredProducts = products.filter((product) =>
        selectedModels.includes(product.model)
      );
      dispatch(updateFilteredProducts(filteredProducts));
    }
  };

  useEffect(() => {
    updateFilteredProductsInStore([]);
  }, []);

  return (
    <section className="text-[#585858]">
      <label className="text-sm">Search Models:</label>
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
        <ul className=" h-48 overflow-scroll">
          {filteredModels.map((brand, index) => (
            <li key={index}>
              <label>
                <input
                  className="border-blue-500 accent-blue-500"
                  type="checkbox"
                  checked={selectedModels.includes(brand)}
                  onChange={() => handleModelSelect(brand)}
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

export default Model;
