import React, { useState, useEffect } from 'react';
import './Profile.css';

const Profile = () => {
    const [user, setUser] = useState({
        name: '',
        username: '',
        avatar: '/User/newUserPhoto1.jpg', // Исправленный путь к дефолтной фотографии
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (window.Telegram.WebApp) {
            const tg = window.Telegram.WebApp;
            const userData = tg.initDataUnsafe.user;
            if (userData) {
                setUser(prevState => ({
                    ...prevState,
                    firstName: userData.first_name || '',
                    lastName: userData.last_name || '',
                    username: userData.username ? `@${userData.username}` : '',
                    avatar: userData.photo_url || prevState.avatar,
                }));
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
                    <>
                        {/* Кастомная кнопка для выбора файла */}
                        <label htmlFor="avatar-upload" className="custom-file-upload">
                            Choose File
                        </label>
                        {/* Скрытый инпут для выбора файла */}
                        <input id="avatar-upload" type="file" accept="image/*" onChange={handleAvatarChange} />
                    </>
                )}
            </div>
            <div className="profile-info">
                {isEditing ? (
                    <>
                        <input
                            type="text"
                            name="firstName"
                            value={user.firstName}
                            onChange={handleChange}
                            placeholder="First Name"
                        />
                        <input
                            type="text"
                            name="lastName"
                            value={user.lastName}
                            onChange={handleChange}
                            placeholder="Last Name"
                        />
                        <textarea
                            name="description"
                            value={user.description}
                            onChange={handleChange}
                            placeholder="Add a description"
                        />
                        <button onClick={saveProfile}>
                            Save Changes
                        </button>
                        <button onClick={() => setIsEditing(false)}>
                            Cancel
                        </button>
                    </>
                ) : (
                    <>
                        <h2>{user.firstName} {user.lastName}</h2>
                        <p>{user.username}</p>
                        <p>{user.description}</p>
                        <button onClick={() => setIsEditing(true)}>
                            Edit Profile
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Profile;