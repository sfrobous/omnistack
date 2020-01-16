import React, { useState, useEffect } from 'react';
import { parseStringAsArray } from '../../utils/utils';

function DevForm({ onSubmit }) {
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [githubUsername, setGithubUsername] = useState('');
    const [techs, setTechs] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;

            setLatitude(latitude);
            setLongitude(longitude);
        },
            (err) => {
                console.log(err);
            },
            {
                timeout: 30000,
            });
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        const techsArray = parseStringAsArray(techs);
        const obj = {
            githubUsername,
            latitude,
            longitude,
            techsArray
        };

        await onSubmit(obj);

        setGithubUsername('');
        setTechs('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-block">
                <label htmlFor="githubUsername">Github user</label>
                <input
                    name="githubUsername"
                    id="githubUsername"
                    required
                    value={githubUsername}
                    onChange={e => setGithubUsername(e.target.value)}
                />
            </div>

            <div className="input-block">
                <label htmlFor="techs">Technologies</label>
                <input
                    name="techs"
                    id="techs"
                    required
                    value={techs}
                    onChange={e => setTechs(e.target.value)}
                />
            </div>
            <div className="input-group">
                <div className="input-block">
                    <label htmlFor="latitude">Latitude</label>
                    <input
                        type="number"
                        name="latitude"
                        id="latitude"
                        required
                        value={latitude}
                        onChange={e => setLatitude(e.target.value)}
                    />
                </div>

                <div className="input-block">
                    <label htmlFor="longitude">Longitude</label>
                    <input
                        type="number"
                        name="longitude"
                        id="longitude"
                        required value={longitude}
                        onChange={e => setLongitude(e.target.value)} />
                </div>
            </div>
            <button type="submit">Submit</button>
        </form>
    );
}

export default DevForm;