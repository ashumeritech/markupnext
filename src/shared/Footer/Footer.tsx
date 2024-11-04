// import Logo from '../../assets/Images/markuptag-logo-4.png';

import FooterAd from "../Ads/FooterAd";

const Footer = () => {
    return <div>
        <div className="container">
            <div className="ad-box text-center mt-5">
                <FooterAd />
            </div>
        </div>

        <footer>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <ul>
                            <li><a href="/about-us">About Us</a></li>
                            <li><a href="/contact-us">Contact Us</a></li>
                            <li><a href="/disclaimer">Disclaimer</a></li>
                            <li><a href="/privacy-policy">Privacy Policy</a></li>
                        </ul>
                    </div>

                    <div className="col-md-6">
                        <p>© 2024 <a href="https://www.markuptag.com/">MarkupTag</a> | All Rights Reserved</p>
                    </div>
                </div>
            </div>
        </footer>
    </div>
}

export default Footer;