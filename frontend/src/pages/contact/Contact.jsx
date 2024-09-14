import { useState } from "react";
import "./contact.css";
import MapView from "./mapView";
import axios from "axios"
import { toast } from "react-toastify";
import { useTranslate } from "../../translate/LanguageContext";
const Contact = () => {

  const translate = useTranslate();
  const [email, setEmail] = useState();
  const [subject, setSubject] = useState();
  const [message, setMessage] = useState();


  const sendMail = () => {
    axios.get("http://localhost:8000/sendmail", {
      params: {
        email,
        subject,
        message,
      },
    })
      .then(() => {
        toast.success("Email sent successfully!");
      })
      .catch(() => {
        toast.success("Email sent successfully!");
      });
  };
  const userData = [
    { username: "Workshop 3", coordinates: [33.8938, 35.5018] },
    { username: "Beit Almona", coordinates: [33.8966, 35.4786] },
    { username: "Workshop 1", coordinates: [33.8912, 35.4961] },
    { username: "Workshop 2", coordinates: [33.8943, 35.4997] }
  ];

  return (


    <section className="contact">
      <div className="contact-wrapper">
        <div className="contact-item">
          <div className="contact-item-icon">
            <i className="bi bi-house-fill"></i>
          </div>
          <p className="contact-item-text">{translate('location')}</p>
        </div>
        <div className="contact-item">
          <div className="contact-item-icon">
            <i className="bi bi-telephone-fill"></i>
          </div>
          <p className="contact-item-text">{translate('phone')}</p>
        </div>
        <div className="contact-item">
          <div className="contact-item-icon">
            <i className="bi bi-envelope-fill"></i>
          </div>
          <p className="contact-item-text">beitalmonah@gmail.com</p>
        </div>
      </div>
      <MapView userData={userData} />
      <br></br>
      <div className="contact-form">
        <input className="contact-item-text"
          type='text' placeholder='email' onChange={(e) => setEmail(e.target.value)}
        />
        <input className="contact-form-title"
          type='text' placeholder='Subject' onChange={(e) => setSubject(e.target.value)}
        />
        <br></br>
        <textarea className="contact-textarea"
          placeholder='message' onChange={(e) => setMessage(e.target.value)}
          rows="5"
        ></textarea>
        <button onClick={sendMail} className="contact-btn">
          
          {translate('sendmsg')}
        </button>
      </div>
    </section>
  );
};

export default Contact;
