import Modes from "../mode/Modes";
import "./footer.css";
import olive from "./olive.png";
import { Link } from "react-router-dom";
import { useTranslate } from "../../translate/LanguageContext";
const Footer = () => {
  const translate = useTranslate();
  return (
    <footer className="footer">

      <div className="footer-links-wrapper">
        <div className="footer-links-item">
          <div className="footer-links-item-main">
            <h3 className="footer-links-item-title1"> {translate('beit_almonah')}</h3>
            <span><img className="olive-icon" src={olive} alt="olive oil"></img></span>
          </div>
          <ul className="footer-links" style={{ marginTop: "20px" }} >
            <li className="footer-link">{translate('home')}</li>
            <li className="footer-link">{translate('products')}</li>
            <li className="footer-link">{translate('workshops')}</li>
            <li className="footer-link">{translate('about')}</li>
            <li className="footer-link">{translate('contact')}</li>
          </ul>
        </div>
        <div className="footer-links-item">
          <h3 className="footer-links-item-title">{translate('contact_information')}</h3>
          <div className="footer-address-wrapper">
            <div className="footer-address-item">
              <i className="bi bi-geo-alt-fill"></i>
              {translate('location')}
            </div>
            <div className="footer-address-item">
              <i className="bi bi-telephone-fill"></i>
              {translate('phone')}
            </div>
            <div className="footer-address-item">
              <i className="bi bi-envelope-fill"></i>
              beitalmoneh@gmail.com
            </div>
          </div>
        </div>
        <div className="footer-links-item">
          <h3 className="footer-links-item-title">{translate('about')}</h3>
          <p className="footer-description">
          {translate('about_us_more')}
          </p>
        </div>
      </div>

      <div className="footer-social-media-icons-main">
        <Modes />
        <div className="footer-social-media-icons">
          <div className="footer-social-media-icon">
            <i className="bi bi-instagram"></i>
          </div>
          <div className="footer-social-media-icon">
            <i className="bi bi-facebook"></i>
          </div>
          <div className="footer-social-media-icon">
            <i className="bi bi-telegram"></i>
          </div>
          <div className="footer-social-media-icon">
            <i className="bi bi-youtube"></i>
          </div>
        </div>
      </div>


    </footer>
  );
};

export default Footer;
