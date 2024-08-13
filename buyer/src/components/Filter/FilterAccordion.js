import React, { useState } from 'react';
import Accordion from './Accordion';
import { Button, Form, InputGroup, Range } from 'react-bootstrap';
import CheckState from './CheckState';

import './Accordion.css';

const FilterAccordion = () => {
    const [price, setPrice] = useState(9999);
    const [distance, setDistance] = useState(1000);

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };

    const handleDistanceChange = (event) => {
        setDistance(event.target.value);
    };

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
                                min="5"
                                max="1000"
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
