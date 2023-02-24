import React from "react";
import "./Footer.css"

import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp, FaBtc, FaCreditCard } from "react-icons/fa";

function Footer() {
    return (
        <footer className=" bd-footer form-footer">
            <div className="border-bottom">
                <div className="form-cont-rs-mp ">
                    <FaFacebook className='form-img-icons' />
                    <FaInstagram className='form-img-icons' />
                    <FaTwitter className='form-img-icons' />
                    <FaWhatsapp className='form-img-icons' />
                    <FaBtc className='form-img-icons' />
                    <FaCreditCard className='form-img-icons' />
                </div>
            </div>
            <div className="form-cont-da">
                <h6 className="form-texto">©2023 Derechos de Autor  </h6>
                <h6 className="form-texto">Escalona Daimerlis Miranda Sergio Tovar Marglodis</h6>
            </div>
        </footer>
    );
}

export default Footer;