import React from 'react';
import './Footer.css';
// import Logo from '../Assets/Logo';
import Poster from '../Assets/Footer/Poster';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer">
            <div className='footer-first'>
                <div className="footer-left">
                    <div className='footer-logo' >
                        {/* <Logo /> */}
                        <img src={'https://res.cloudinary.com/dffy79nhw/image/upload/v1726073757/logo_sy_3_2_l3m2k0.png'} alt='logo' />
                    </div>
                    <p className='footer-heading' >Innovate, Connect, Stay informed with Us!</p>
                    <p className='footer-subheading' >Stay Ahead Of The Startup Curve With StartupNews.Fyi!</p>
                </div>
                <div className="footer-bottom">
                    <div className='poster'>
                        <Poster />
                    </div>
                    <p className='footer-copyright' >© 2023 StartupNews.Fyi | DOTFYI Media Ventures Private Limited. All Rights Reserved.</p>
                </div>
            </div>
            <div className='footer-second'>
                <div className="footer-center">
                    <h3 className='right-heading' >Explore</h3>
                    <ul className='footer-ul' >
                        <li><Link to="/about-us/" className='Links' >About Us</Link></li>
                        <li><Link to="/privacy-policy/" className='Links' >Privacy Policy</Link></li>
                        <li><Link to="/terms-and-condition/" className='Links'>Terms & Conditions</Link></li>
                        <li><Link to="/refund/" className='Links' >Return & Refund Policy</Link></li>
                        {/* <li><Link className='Links' to={'https://startupnews.fyi/advertise-with-us/'}>Advertise With Us</Link></li> */}
                        <li><Link to="/partners/" className='Links' >Partners</Link></li>
                    </ul>
                </div>
                <div className="footer-right">
                    <h3 className='right-heading' >StartupNews.Fyi</h3>
                    <ul className='footer-ul'>
                        <li><a className='Links' href='/'>Startup News</a></li>
                        <li><a className='Links' href='/events'>Startup Events</a></li>
                        {/* <li><Link className='Links' to={'https://startupnews.fyi/startup-videos/'}>Startup Video</Link></li> */}
                        {/* <li><Link className='Links'>Startup Jobs</Link></li> */}
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
