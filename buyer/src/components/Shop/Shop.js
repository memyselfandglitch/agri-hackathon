import React, { useState, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import FilterSidediv from '../Filter/FilterSidediv';
import AllProducts from './AllProducts';
import SearchBar from './SearchBar';
import { ShopContext } from '../Context/shop-context';

const Shop = () => {
    const [maxDistance, setMaxDistance] = useState(10000);

    const handleFilterChange = (distance) => {
        console.log("Handle filter change")
        setMaxDistance(distance);
        console.log("Shop", distance)
    };

    const shopContext = useContext(ShopContext);
    const handleInput = (e) => {
        console.log("handle input")
        shopContext.searched(e.target.value);
    }

    return (
        <React.Fragment>
            <Container className="shopping-content">
                <Row>
                    <Col xl={3} lg={3} md={3} className="filter-sidebar">
                        <FilterSidediv onDistanceChange={handleFilterChange} />
                    </Col>
                    <Col>
                        <SearchBar handleInput={handleInput} />
                        <AllProducts maxDistance={maxDistance} />
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
};

export default Shop;
