import React, { useState, useEffect } from 'react';
import Accordion from './Accordion';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import axios from 'axios'; // Assuming you use axios for HTTP requests

import './Accordion.css';

const FilterAccordion = ({ lat, lng, onDistanceChange }) => {
    const [price, setPrice] = useState(9999);
    const [distance, setDistance] = useState(10000);
    const location = useLocation();

    // Handle price change (no API request here)
    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };

    // Handle distance change and trigger API request
    const handleDistanceChange = (event) => {
        const newDistance = event.target.value;
        setDistance(newDistance);

        if (onDistanceChange) {
            onDistanceChange(newDistance); // Notify parent component
        }
    };

    // Effect to fetch products based on distance
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const params = new URLSearchParams(location.search);
                const lat = params.get('lat');
                const lng = params.get('lng');
                const response = await axios.get(`http://localhost:3001/api/products?lat=${lat}&lng=${lng}&dist=${distance}`);
                console.log('Fetched products:', response.data);
                // You can handle the response here or update local state
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [distance, lat, lng]); // Depend on distance, lat, and lng

    return (
        <div>
            <div className="clear-filter-div">
                <Button variant="outline-success">CLEAR ALL</Button>
            </div>
            <Accordion title="Price">
                <Form>
                    <Form.Group controlId="formPriceRange">
                        <Form.Label>Price (Up to {price} rupees)</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type="range"
                                min="1"
                                max="9999"
                                value={price}
                                onChange={handlePriceChange}
                            />
                        </InputGroup>
                    </Form.Group>
                </Form>
            </Accordion>
            <Accordion title="Location">
                <Form>
                    <Form.Group controlId="formDistanceRange">
                        <Form.Label>Distance (Up to {distance} km)</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type="range"
                                min="0"
                                max="10000"
                                value={distance}
                                onChange={handleDistanceChange}
                            />
                        </InputGroup>
                    </Form.Group>
                </Form>
            </Accordion>
        </div>
    );
};

export default FilterAccordion;
