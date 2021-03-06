import React from 'react';
import facebook from '../../images/facebook.png';
import github from '../../images/github.png';


function Footer() {

    return (
        <footer className="footer">
            <p className="footer__copywright">© 2020 Supersite, Powered by News API</p>
            <div className="footer__content-container">
            <ul className="footer__content footer__content_links">
                <li className="footer__item"><a className="footer__link" href="/">Home</a></li>
                <li className="footer__item"><a className="footer__link" href="https://practicum.yandex.com/" target="_blank" rel="noreferrer">Practicum by Yandex</a></li>
            </ul>
            <ul className="footer__content footer__content_icons">
                <li><a  href="https://github.com/larkceresin" target="_blank" rel="noreferrer"><img src={github} alt="github" className=" footer__icon"/></a></li>
                <li><a href="https://www.facebook.com/shamanlvr/" target="_blank" rel="noreferrer"><img src={facebook} alt="facebook" className="footer__icon "/></a></li>
            </ul>
            </div>
        </footer>
    )
}
export default Footer;
