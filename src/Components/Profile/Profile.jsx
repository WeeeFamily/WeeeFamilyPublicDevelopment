import React, { useState, useEffect } from 'react';
import './Profile.css';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase'

const Profile = () => {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        username: '',
        avatar: '/User/newUserPhoto1.jpg', // Дефолтная фотография
        phoneNumber: '',
        bio: '',
    });
    const [isEditing, setIsEditing] = useState(false);

    // Получение уникального идентификатора пользователя из аутентификации
    const userId = 'uniqueUserId'; // Это должен быть реальный идентификатор пользователя

    useEffect(() => {
        // Функция для получения данных пользователя из Firestore
        const loadUserData = async () => {
            const docRef = doc(db, 'profiles', userId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setUser(docSnap.data());
            } else {
                console.log('No such document!');
            }
        };

        loadUserData();
    }, [userId]);

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

    const saveProfile = async () => {
        try {
            // Проверка данных перед сохранением
            const profileData = {
                firstName: user.firstName.trim(),
                lastName: user.lastName.trim(),
                username: user.username.trim(),
                avatar: user.avatar,
                phoneNumber: user.phoneNumber.trim(),
                bio: user.bio.trim(),
            };

            await setDoc(doc(db, 'profiles', userId), profileData);
            console.log('Profile saved:', profileData);
            setIsEditing(false);
        } catch (error) {
            console.error('Error saving profile:', error);
        }
    };

    return (
        <div className="profile-container">
            <h1>Profile</h1>
            <div className="profile-avatar">
                <img src={user.avatar} alt="Avatar" />
                {isEditing && (
                    <>
                        <label htmlFor="avatar-upload" className="custom-file-upload">
                            Choose File
                        </label>
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
                        <input
                            type="text"
                            name="phoneNumber"
                            value={user.phoneNumber}
                            onChange={handleChange}
                            placeholder="Phone Number"
                        />
                        <textarea
                            name="bio"
                            value={user.bio}
                            onChange={handleChange}
                            placeholder="Add a bio"
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
                        <p>{user.phoneNumber}</p>
                        <p>{user.bio}</p>
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