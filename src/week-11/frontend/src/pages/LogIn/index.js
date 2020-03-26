import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi';

import './styles.css';

import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

export default function LogIn(props) {
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('sessions', { id });
            console.log(response.data);
            localStorage.setItem('ngoId', id);
            localStorage.setItem('ngoName', response.data.Name);

            history.push('/profile');
        } catch (error) {
            alert('Login failed. Try again')
        }
    }

    return (
        <div className="login-container">
            <section className="form">
                <img src={logoImg} alt="Be the Hero" />

                <form onSubmit={handleLogin}>
                    <h1>Log on</h1>
                    <input
                        placeholder="Your ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="submit">Log In</button>

                    <Link to="/signup" className="back-link">
                        <FiLogIn size={16} color="#E02041" />
                        Create your account
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt="Heroes" />
        </div>
    );
};