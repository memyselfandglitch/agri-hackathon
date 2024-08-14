import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram, faGooglePlus } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

const Footer = () => {
    return (
        <section id="footer">
            <div className="container">
                <div className="row text-center">
                    <div className="col-xs-12 col-sm-4 col-md-4">
                        <h5>Quick Access</h5>
                        <ul className="quick-links">
                            <li><a href="/#"><FontAwesomeIcon icon={faAngleDoubleRight} /> Home</a></li>
                            <li><a href="/#"><FontAwesomeIcon icon={faAngleDoubleRight} /> About</a></li>
                            <li><a href="/#"><FontAwesomeIcon icon={faAngleDoubleRight} /> FAQ</a></li>
                            <li><a href="/#"><FontAwesomeIcon icon={faAngleDoubleRight} /> Videos</a></li>
                        </ul>
                    </div>
                </div>
                <div className="row text-center">
                    <ul className="social">
                        <li><a href="/#"><FontAwesomeIcon icon={faFacebook} /></a></li>
                        <li><a href="/#"><FontAwesomeIcon icon={faTwitter} /></a></li>
                        <li><a href="/#"><FontAwesomeIcon icon={faInstagram} /></a></li>
                        <li><a href="/#"><FontAwesomeIcon icon={faGooglePlus} /></a></li>
                        <li><a href="/#" target="_blank"><FontAwesomeIcon icon={faEnvelope} /></a></li>
                    </ul>
                </div>
                <div className="row">
				<div className="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-2 text-center text-white">
                  <p><u><a href="/#">AgriTech Solutions</a></u> is a proud partner of AgriSeva., a leader in sustainable farming technologies.</p>
                  <p className="h6">© All rights reserved. <a className="text-green ml-2" href="/#" target="_blank">AgriSeva</a></p>
               </div>

                </div>
            </div>
        </section>
    );
};

export default Footer;
