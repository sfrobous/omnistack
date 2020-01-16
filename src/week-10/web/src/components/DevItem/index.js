import React from 'react';
import './styles.css';

function DevItem(props) {
    const dev = props.dev;
    return (
        <li key={dev._id} className="dev-item">
            <header>
                <img src={dev.avatarUrl} alt="Jorge Soprani" />
            </header>
            <div className="user-info">
                <strong>{dev.name}</strong>
                <span>{dev.techs.join(', ')}</span>
            </div>
            <p>{dev.bio}</p>
            <a href={`https://github.com/${dev.githubUsername}`}>Access Github profile</a>
        </li>
    );
}

export default DevItem;