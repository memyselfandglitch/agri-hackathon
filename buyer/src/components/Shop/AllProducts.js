import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';

import ProductList from '../Products/ProductList';
import { useHttpClient } from '../Hooks/http-hook';
import LoadingSpinner from '../Utils/LoadingSpinner';
import ErrorModal from '../Utils/ErrorModal';
import { ShopContext } from '../Context/shop-context';

const AllProducts = () => {
    const shopContext = useContext(ShopContext);
    const [loadedProducts, setLoadedProducts] = useState([]);
    const [countProducts, setCountProducts] = useState(0);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const location = useLocation();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const params = new URLSearchParams(location.search);
                const lat = params.get('lat');
                const lng = params.get('lng');
                const minPrice = params.get('minPrice');
                const maxPrice = params.get('maxPrice');

                const responseData = await sendRequest(
                    `http://localhost:3001/api/products?lat=${lat}&lng=${lng}&minPrice=${minPrice}&maxPrice=${maxPrice}`
                );

                setLoadedProducts(responseData.products);
                setCountProducts(responseData.products.length);
            } catch (err) { }
        };

        fetchProducts();
    }, [sendRequest, location.search]);

    let filteredProducts = loadedProducts.filter(product =>
        product.title.toLowerCase().includes(shopContext.search.toLowerCase())
    );

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (
                <div className="center">
                    <LoadingSpinner />
                </div>
            )}
            {!isLoading && (
                <React.Fragment>
                    <div>
                        <h4>Showing {filteredProducts.length} results</h4>
                    </div>
                    <hr />
                    <ProductList items={filteredProducts} />
                </React.Fragment>
            )}
        </React.Fragment>
    );
}

export default AllProducts;
