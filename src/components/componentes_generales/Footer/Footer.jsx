import React from "react";
import "./Footer.css"

import facebook from "../../../assets/iconos/facebook.png"
import instagram from "../../../assets/iconos/instagram.png"
import twitter from "../../../assets/iconos/twitter.png"
import card from "../../../assets/iconos/card.png"
import transf from "../../../assets/iconos/transf.png"
import bitcoin from "../../../assets/iconos/bitcoin.png"

function Footer() {

    return (
        <footer class=" bd-footer py-4 py-md-5 mt-5 form-footer">
            <div class="form-cont-rs-mp border-bottom">
                <div class="form-cont-rs">
                    <h6>Visitanos en nuestras Redes Sociales</h6>
                    <div class="form-cont-icons">
                        <img className="form-img-icons" src={facebook} alt=""></img>
                        <img className="form-img-icons" src={instagram} alt=""></img>
                        <img className="form-img-icons" src={twitter} alt=""></img>
                    </div>
                </div>
                <div class="form-cont-mp">
                    <h6>Conoce nuestros medios de pago</h6>
                    <div class="form-cont-icons">
                        <img className="form-img-icons" src={card} alt=""></img>
                        <img className="form-img-icons" src={transf} alt=""></img>
                        <img className="form-img-icons" src={bitcoin} alt=""></img>
                    </div>
                </div>
            </div>
            <div class="form-cont-da">
                <h5 class="form-texto">©2023 Derechos de Autor  </h5>
                <h6 class="form-texto">Escalona Daimerlis Miranda Sergio Tovar Marglodis</h6>
            </div>
        </footer>

    );
}

export default Footer;