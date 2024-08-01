// src/components/AddCar/AddCar.js
import React, { useState } from 'react';
// import { db, storage } from '../../firebase.js'; // Убедитесь, что storage импортирован
// import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const AddCar = () => {
    const [car, setCar] = useState({
        id: '',
        title: '',
        price: '',
        description: '',
        img: '',
        brand: '',
        class: '',
        partner: ''
    });

    const handleChange = (e) => {
        setCar({ ...car, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, "products"), car);
            console.log("Car added successfully!");
        } catch (error) {
            console.error("Error adding car: ", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="id" placeholder="ID" value={car.id} onChange={handleChange} required />
            <input type="text" name="title" placeholder="Title" value={car.title} onChange={handleChange} required />
            <input type="number" name="price" placeholder="Price" value={car.price} onChange={handleChange} required />
            <textarea name="description" placeholder="Description" value={car.description} onChange={handleChange} required></textarea>
            <input type="text" name="img" placeholder="Image URL" value={car.img} onChange={handleChange} required />
            <input type="text" name="brand" placeholder="Brand" value={car.brand} onChange={handleChange} required />
            <input type="text" name="class" placeholder="Class" value={car.class} onChange={handleChange} required />
            <input type="text" name="partner" placeholder="Partner" value={car.partner} onChange={handleChange} required />
            <button type="submit">Добавить объект</button>
        </form>
    );
};

export default AddCar;
