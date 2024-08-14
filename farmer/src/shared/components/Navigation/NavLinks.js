import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';
import { Button } from 'react-bootstrap';
import ChatBox from '../Messenger/Messenger';
import './NavLinks.css';

const NavLinks = props => {
    const auth = useContext(AuthContext);

    return (
        <>
            <ul className="nav-links">
                <li>
                    <NavLink to="/" exact>ALL USERS</NavLink>
                </li>
                {auth.isLoggedIn && (
                    <li>
                        <NavLink to={`/${auth.userId}/products`}>MY PRODUCTS</NavLink>
                    </li>
                )}
                {auth.isLoggedIn && (
                    <li>
                        <NavLink to="/products/new">ADD PRODUCT</NavLink>
                    </li>
                )}
                {!auth.isLoggedIn && (
                <li>
                    <NavLink to="/auth">AUTHENTICATE</NavLink>
                </li>
                )}
                {auth.isLoggedIn && (
                <li>
                    <Button variant="outline-success" onClick={auth.logout}>LOGOUT</Button>
                </li>
                )}
                <li>
                    <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">CHAT BOT</button>
                </li>
            </ul>  

            <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasRightLabel">Here You Can Ask your Doubts!</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <ChatBox />
                </div>
            </div>
        </>
    );
};

export default NavLinks;
