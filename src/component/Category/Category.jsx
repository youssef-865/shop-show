import React, { useEffect, useState } from 'react';
import Loader from '../loader/Loader';
import axios from 'axios';
import { Link } from 'react-router-dom';  // ✅ Fixed incorrect import

export default function Category(props) {
    let category = props.categoryName;

    const [products, setProducts] = useState([]); 
    const [isLoading, setLoading] = useState(true);

    function getRelatedProducts() {
        axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
        .then(({ data }) => {
            setLoading(false);                      
            console.log("All Products:", data.data);
                                              
            // ✅ Corrected filtering logic
            const filteredProducts = data.data.filter(prod => prod.category.name === category);
            setProducts(filteredProducts);
        })
        .catch((error) => {
            setLoading(false);
            console.error("Error fetching product details:", error);
        });
    }

    useEffect(() => {
        getRelatedProducts();
    }, [category]); // ✅ Added category as a dependency

    if (isLoading) return <Loader />;

    return (
        <div className="container mx-auto p-4"> {/* ✅ Centered & added padding */}

            {/* ✅ FLEXBOX: Used `flex-wrap` for responsiveness */}
            <div className="flex flex-wrap justify-center gap-4">
                
                {products.length > 0 ? products.map((productInfo) => (
                    <div 
                        key={productInfo.id} 
                        className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 bg-white p-3 rounded-lg shadow-md"
                    >
                        <Link 
                            to={`/productDetails/${productInfo.id}/${productInfo.category.name}`} 
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} // ✅ Smooth scroll to top
                        >
                            {/* ✅ Ensuring images scale properly */}
                            <img 
                                src={productInfo.imageCover} 
                                alt={productInfo.title} 
                                className="w-full h-40 object-cover rounded-md"
                            />
                            <span className="block text-md font-light text-green-600 mt-2">
                                {productInfo.category.name}
                            </span>
                            <span className="block text-lg font-semibold text-gray-700">
                                {productInfo.title.split(" ").splice(0, 3).join(" ")}
                            </span>
                            <div className="flex justify-between items-center my-2">
                                <span className="text-gray-800 font-bold">{productInfo.price} EGP</span>
                                <span className="flex items-center">
                                    {productInfo.ratingsQuantity}
                                    <i className="fas fa-star text-yellow-400 ml-1"></i>
                                </span>
                            </div>
                        </Link>
                    </div>
                )) : (
                    <p className="text-center text-gray-600 w-full">No products found in this category.</p> 
                    // ✅ Centered message if no products
                )}
            </div>
        </div>
    );
}
