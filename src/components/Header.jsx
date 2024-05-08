import React, { useState,useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBriefcase, faUser } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { updateFilteredProducts } from '../features/products/ProductSlice';
import { Link } from "react-router-dom";
export default function Header() {
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products) || [] ;
    const totalPrice = useSelector((state) => state.products.totalPriceBasket) || 0;
    
    const handleSearchChange = (e) => {
        const searchTerm = e.target.value;
        setSearchTerm(searchTerm);

        const filteredProducts = products.filter(item => item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
        dispatch(updateFilteredProducts(filteredProducts));

    };

    return (
        <header className="bg-blue-600 text-white p-2 flex justify-between items-center px-24">
            <div className="font-bold text-lg">
            <Link to={'/'}>ETARATION</Link>
            </div>
            <div className="relative">
                <input
                    type="text"
                    className="pl-10 pr-4 py-2 border text-black"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FontAwesomeIcon className="text-gray-500" icon={faSearch} />
                </div>
            </div>
            <div className="flex gap-5">
                <div>
                    <span className="mr-2"><FontAwesomeIcon className="text-white" icon={faBriefcase} /></span>
                    <span>${totalPrice}</span>
                </div>
                <div>
                    <span className="mr-2"><FontAwesomeIcon className="text-white" icon={faUser} /></span>
                    <span>User</span>
                </div>
            </div>
        </header>
    );
}
