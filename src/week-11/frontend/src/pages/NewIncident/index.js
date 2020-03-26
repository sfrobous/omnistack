import React, { useState } from 'react';
import './styles.css';

import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

export default function NewIncident() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const ngoId = localStorage.getItem('ngoId');
    const history = useHistory();

    async function handleNewIncident(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value
        };

        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ngoId
                }
            });

            history.push('/profile');
        } catch (error) {
            alert('Unexpected error. Try again')
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be the Hero" />

                    <h1>New incident</h1>
                    <p>Describe the incident in detail to find a hero to solve it</p>
                    <Link to="/profile" className="back-link">
                        <FiArrowLeft size={16} color="#E02041" />
                        Return to Home
                    </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input
                        placeholder="Title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input
                        placeholder="Value"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    <button className="button" type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
};