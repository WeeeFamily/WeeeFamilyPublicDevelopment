import React, { useState, useEffect } from 'react';
import './Profile.css';

const Profile = () => {
    const [user, setUser] = useState({
        name: '',
        username: '',
        avatar: '',
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        // Проверка наличия Telegram Web Apps API
        if (window.Telegram.WebApp) {
            const tg = window.Telegram.WebApp;

            // Получение данных пользователя
            const userData = tg.initDataUnsafe.user;
            if (userData) {
                setUser({
                    name: `${userData.first_name} ${userData.last_name || ''}`,
                    username: userData.username ? `@${userData.username}` : '',
                    avatar: userData.id ? `https://t.me/i/userpic/320/${userData.id}.jpg` : 'https://via.placeholder.com/150',
                });
            }
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

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

    const saveProfile = () => {
        console.log('Profile saved:', user);
        setIsEditing(false);
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
            {isEditing ? (
                <div className="profile-info">
                    <input
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="username"
                        value={user.username}
                        onChange={handleChange}
                    />
                    <button onClick={saveProfile}>Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            ) : (
                <div className="profile-info">
                    <h2>{user.name}</h2>
                    <p>{user.username}</p>
                    <button onClick={() => setIsEditing(true)}>Edit Profile</button>
                </div>
            )}
        </div>
    );
};

export default Profile;
