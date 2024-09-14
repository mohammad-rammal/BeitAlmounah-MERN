import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import './checkOutForm2.css';
import Cards from 'react-credit-cards'
import 'react-credit-cards/es/styles-compiled.css'
import { toast } from "react-toastify";


function CheckOutForm({ product }) {
    const [email, setEmail] = useState();



    const sendMail = () => {
        axios.get("http://localhost:8000/sendmailPorduct", {
            params: {
                email,

            },
        })
            .then(() => {
                toast.success("Order confirm email sent successfully.");
            })
            .catch(() => {
                toast.success("Order confirm email sent successfully.");
            });
    };
    const [number, setNumber] = useState('');
    const [name, setName] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvc, setCvc] = useState('');
    const [focus, setFocus] = useState('');


    const totalPrice = 39;
    console.log("Total Price:", totalPrice);
    console.log("product::::", product);
    const stripe = useStripe();
    const elements = useElements();

    const [credentials, setCredentials] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
    });

    const [isProcessing, setProcessing] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { value, name } = e.target;
        setCredentials({ ...credentials, [name]: value });
    }

    const handleCardChange = (e) => {
        if (e.error) setError(e.error.message);
        else setError('');
    }

    const handlePayment = async (e) => {
        e.preventDefault();
        setProcessing(true);

        const cardElement = elements.getElement('card');
        const { name, phone, email, address } = credentials;
        const billingInfo = {
            name,
            phone,
            email,
            address: {
                line1: address,
            },
        };

        try {
            const paymentIntent = await axios.post('http://localhost:8000/api/payments', {
                amount: totalPrice * 100
            });

            const paymentMethodObj = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
                billing_details: billingInfo,
            });

            if (paymentMethodObj.error) {
                setError(paymentMethodObj.error.message);
                setProcessing(false);
                return;
            }

            const confirmedPayment = await stripe.confirmCardPayment(
                paymentIntent.data, { payment_method: paymentMethodObj.paymentMethod.id }
            );

            if (confirmedPayment.error) {
                setError(confirmedPayment.error.message);
                setProcessing(false);
                return;
            }

            Swal.fire({
                icon: 'success',
                title: 'Payment Successful!',
                text: 'Thank you for your purchase.',
            });

            setProcessing(false);
            setCredentials({
                name: '',
                email: '',
                phone: '',
                address: '',
            });
            cardElement.clear();

        } catch (error) {
            console.log(error);
            setError(error.message);
            setProcessing(false);
        }
    };

    return (


        <div className='CheckOutForm2 '>

            <Cards className="visacard"
                number={number}
                name={name}
                expiry={expiry}
                cvc={cvc}
                focused={focus}
            />
            <div style={{ width: "300px" }}></div>

            {/* <form>
                <input type='tel'
                    name='number'
                    placeholder='Card Number'
                    value={number}
                    onChange={e => setNumber(e.target.value)}
                    onFocus={e => setFocus(e.target.name)}
                />


                <input type='text'
                    name='name'
                    placeholder='Name'
                    value={name}
                    onChange={e => setName(e.target.value)}
                    onFocus={e => setFocus(e.target.name)}
                />


                <input type="text"
                    name='expiry'
                    placeholder='MM/YY Expiry'
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    onFocus={(e) => setFocus(e.target.name)}
                />


                <input type="tel"
                    name='cvc'
                    placeholder='CVC'
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                    onFocus={(e) => setFocus(e.target.name)}
                />



            </form> */}

            {/* <div className="card-info">
                <p>Name: {credentials.name}</p>
                <p>Phone: {credentials.phone}</p>
                <p>Email: {credentials.email}</p>
                <p>Address: {credentials.address}</p>
            </div> */}
            <form className='form' onSubmit={handlePayment}>
                <input
                    type="text"
                    placeholder='Name'
                    name='name'
                    required


                    value={credentials.name}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    placeholder='Phone'
                    name='phone'
                    required
                    value={credentials.phone}
                    onChange={handleChange}

                />
                <input
                    type="email"
                    placeholder='Email'
                    name='email'
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    value={email} // Use email state directly here
                />

                <input
                    type="text"
                    placeholder='Address'
                    name='address'
                    required
                    value={credentials.address}
                    onChange={handleChange}
                />
                <p>{error}</p>
                <div className="card-element-container">
                    <CardElement
                        options={{
                            hidePostalCode: true,
                            style: {
                                base: {
                                    fontSize: '20px',
                                },
                                invalid: {
                                    color: 'red',
                                },

                            },
                        }}
                        onChange={handleCardChange}
                    />

                </div>
                <button type='submit' className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-10 mr-52 mt-6 rounded" onClick={sendMail} disabled={isProcessing}>Pay</button>
            </form>
        </div>
    );
}

export default CheckOutForm;
