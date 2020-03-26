import React, { useEffect, useState } from 'react';
import './styles.css';

import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import api from '../../services/api';


export default function Profile() {
    const ngoId = localStorage.getItem('ngoId');
    const ngoName = localStorage.getItem('ngoName');
    const [incidents, setIncidents] = useState([]);
    const history = useHistory();

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: localStorage.getItem('ngoId')
            }
        }).then(response => {
            setIncidents(response.data);
        });
    }, [ngoId]);

    async function handleDelete(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: localStorage.getItem('ngoId')
                }
            });
            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch (error) {
            alert('Unexpected error. Try again')
        }
    }

    async function handleLogOut(id) {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero" />
                <span>Welcome, {ngoName}</span>
                <Link className="button" to="/incidents/new">New Incident</Link>
                <button type="button" onClick={handleLogOut}>
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Incidents</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>INCIDENT: </strong>
                        <p>{incident.Title}</p>

                        <strong>DESCRIPTION: </strong>
                        <p>{incident.Description}</p>

                        <strong>VALUE:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.Value)}</p>

                        <button type="button" onClick={() => handleDelete(incident.id)}>
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}