import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
    // Начальные данные пользователя (можно загрузить из API)
    const [user, setUser] = useState({
        name: 'John Doe',
        email: 'johndoe@example.com',
        bio: 'Web Developer',
        avatar: 'https://via.placeholder.com/150'
    });
    const [isEditing, setIsEditing] = useState(false);

    // Функция для изменения данных пользователя
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Функция для загрузки нового аватара
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

    // Функция для сохранения данных профиля
    const saveProfile = () => {
        // Здесь можно отправить обновленные данные на сервер
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
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                    />
                    <textarea
                        name="bio"
                        value={user.bio}
                        onChange={handleChange}
                    />
                    <button onClick={saveProfile}>Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            ) : (
                <div className="profile-info">
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>
                    <p>{user.bio}</p>
                    <button onClick={() => setIsEditing(true)}>Edit Profile</button>
                </div>
            )}
        </div>
    );
};

export default Profile;
