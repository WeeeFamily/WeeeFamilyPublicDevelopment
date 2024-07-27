import React, { useState, useEffect } from 'react';
import './Profile.css';

const Profile = () => {
    const [user, setUser] = useState({
        name: '',
        username: '',
        bio: '',
        avatar: ''
    });

    useEffect(() => {
        // Запрос к серверу для получения данных пользователя
        fetch('http://localhost:3000/getUserData')
            .then(response => response.json())
            .then(data => setUser({
                name: data.name || '',
                username: data.username || '',
                bio: '', // Можно добавить описание или оставить пустым
                avatar: data.avatarUrl || ''
            }));
    }, []);

    // Ваш существующий код для редактирования профиля
    // ...

    return (
        <div className="profile-container">
            <h1>Profile</h1>
            <div className="profile-avatar">
                <img src={user.avatar} alt="Avatar" />
                {/* Ваш код для редактирования аватара */}
            </div>
            <div className="profile-info">
                <h2>{user.name}</h2>
                <p>@{user.username}</p>
                <p>{user.bio}</p>
                {/* Ваш код для редактирования информации */}
            </div>
        </div>
    );
};

export default Profile;
