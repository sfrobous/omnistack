import React, { useState } from 'react';

import './styles.css';

import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

export default function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');

    const history = useHistory();

    async function handleSignUp(e) {
        e.preventDefault();
        const data = {
            name,
            email,
            whatsapp,
            city,
            state
        };

        try {
            const response = await api.post('/ngos', data);
            console.log(response.data);
            alert(`Your access ID: ${response.data.Id}`);
            history.push('/');
        } catch (error) {
            alert(`Unexpected error. Try again`);
        }
    }

    return (
        <div className="signup-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be the Hero" />

                    <h1>Sign Up</h1>
                    <p>Register yourself and help people find your NGO's incidents</p>
                    <Link to="/" className="back-link">
                        <FiArrowLeft size={16} color="#E02041" />
                        Create your account
                    </Link>
                </section>
                <form onSubmit={handleSignUp}>
                    <input
                        placeholder="NGO name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        placeholder="WhatsApp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                    />
                    <div className="input-group">
                        <input
                            placeholder="City"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />
                        <input
                            placeholder="State"
                            value={state}
                            onChange={e => setState(e.target.value)}
                            style={{ width: 120 }}
                        />
                    </div>
                    <button className="button" type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    )
}