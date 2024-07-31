import { db } from './firebase.js';
import { collection, doc, setDoc, writeBatch } from "firebase/firestore";

const products = [
    { id: '1', title: 'Toyota Rav 4', price: 100, description: 'Ideal for city, travel and mountainous areas.', img: '/PhotoCars/toyota-rav4.jpg', brand: 'Toyota', class: 'SUV', partner: 'Partner 2' },
    { id: '2', title: 'Volkswagen Zhuk', price: 50, description: 'Ideal for filming и events.', img: '/PhotoCars/volkswagen-zhuk.jpg', brand: 'Volkswagen', class: 'Compact', partner: 'Partner 1' },
    { id: '3', title: 'Dodge Charger', price: 110, description: 'Ideal for the city and filming, driving outside the city.', img: '/PhotoCars/dodge-charger.jpg', brand: 'Dodge', class: 'Sedan', partner: 'Partner 1' },
];

const uploadData = async () => {
    try {
        const batch = writeBatch(db);
        products.forEach((product) => {
            const docRef = doc(collection(db, 'products'), product.id);
            batch.set(docRef, product);
        });
        await batch.commit();
        console.log('Data uploaded successfully');
    } catch (error) {
        console.error('Error uploading data: ', error);
    }
};

uploadData();