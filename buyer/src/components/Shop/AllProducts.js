import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import ProductList from '../Products/ProductList';
import { useHttpClient } from '../Hooks/http-hook';
import LoadingSpinner from '../Utils/LoadingSpinner';
import ErrorModal from '../Utils/ErrorModal';
import { ShopContext } from '../Context/shop-context';

const AllProducts = ({ maxDistance }) => {
    const shopContext = useContext(ShopContext);
    const [loadedProducts, setLoadedProducts] = useState([]);
    const [countProducts, setCountProducts] = useState(0);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const location = useLocation();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                console.log("Fetching products");
                const params = new URLSearchParams(location.search);
                console.log({ params });

                const lat = params.get('lat');
                const lng = params.get('lng');

                // Check if lat and lng are valid
                if (!lat || !lng) {
                    throw new Error('Latitude or Longitude is missing');
                }

                const responseData = await sendRequest(
                    `http://localhost:3001/api/products?lat=${lat}&lng=${lng}&dist=${maxDistance}`
                );
                console.log({ responseData });

                setLoadedProducts(responseData.products || []);
                setCountProducts(responseData.products ? responseData.products.length : 0);
            } catch (err) {
                console.error(err);
                // Handle the error or show a message
            }
        };

        fetchProducts();
    }, [sendRequest, location.search, maxDistance]);

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
                        <h4>Showing {countProducts} results</h4>
                    </div>
                    <hr />
                    <ProductList items={loadedProducts} />
                </React.Fragment>
            )}
        </React.Fragment>
    );
};

export default AllProducts;
