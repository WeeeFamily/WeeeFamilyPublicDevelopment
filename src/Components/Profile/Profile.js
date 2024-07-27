import React, { useState, useEffect } from 'react';
import './Profile.css';

const Profile = () => {
    const [user, setUser] = useState({
        name: '',
        username: '',
        avatar: '',
    });

    useEffect(() => {
        if (window.Telegram.WebApp) {
            const tg = window.Telegram.WebApp;
            const userData = tg.initDataUnsafe.user;
            if (userData) {
                setUser({
                    name: `${userData.first_name} ${userData.last_name || ''}`,
                    username: userData.username ? `@${userData.username}` : '',
                    avatar: userData.photo_url || 'https://via.placeholder.com/150',
                });
            }
        }
    }, []);

    return (
        <div className="profile-container">
            <h1>Profile</h1>
            <div className="profile-avatar">
                <img src={user.avatar} alt="Avatar" />
            </div>
            <div className="profile-info">
                <h2>{user.name}</h2>
                <p>{user.username}</p>
            </div>
        </div>
    );
};

export default Profile;
