import React, { useState, useEffect } from 'react';
import './Profile.css';

const Profile = () => {
    const [user, setUser] = useState({
        name: '',
        username: '',
        avatar: 'https://via.placeholder.com/150', // Дефолтная фотография
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (window.Telegram.WebApp) {
            const tg = window.Telegram.WebApp;
            const userData = tg.initDataUnsafe.user;
            if (userData) {
                setUser(prevState => ({
                    ...prevState,
                    name: `${userData.first_name} ${userData.last_name || ''}`,
                    username: userData.username ? `@${userData.username}` : '',
                    avatar: userData.photo_url || prevState.avatar,
                }));
            }
        }
    }, []);

    const handleAvatarChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setUser(prevState => ({
                    ...prevState,
                    avatar: e.target.result
                }));
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    return (
        <div className="profile-container">
            <h1>Profile</h1>
            <div className="profile-avatar">
                <img src={user.avatar} alt="Avatar" />
                {isEditing && (
                    <input type="file" onChange={handleAvatarChange} />
                )}
            </div>
            <div className="profile-info">
                <h2>{user.name}</h2>
                <p>{user.username}</p>
                <button onClick={() => setIsEditing(!isEditing)}>
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
            </div>
        </div>
    );
};

export default Profile;
