import React, { useState } from 'react';
import './ProductList.css';
import ProductItem from "../ProductItem/ProductItem";
import { useTelegram } from "../hooks/useTelegram";
import FilterBar from "../Filters/FilterBar";

const products = [
    { id: '1', title: 'Toyota Rav 4', price: 100, description: 'Ideal for city, travel and mountainous areas.', img: '/PhotoCars/toyota-rav4.jpg', brand: 'Toyota', class: 'SUV', partner: 'Partner 2' },
    { id: '2', title: 'Volkswagen Zhuk', price: 50, description: 'Ideal for filming and events.', img: '/PhotoCars/volkswagen-zhuk.jpg', brand: 'Volkswagen', class: 'Compact', partner: 'Partner 1' },
    { id: '3', title: 'Dodge Charger', price: 110, description: 'Ideal for the city and filming, driving outside the city.', img: '/PhotoCars/dodge-charger.jpg', brand: 'Dodge', class: 'Sedan', partner: 'Partner 1' },
];

const ProductList = () => {
    const [addedItems, setAddedItems] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState(products);
    const { tg } = useTelegram();

    const sortProducts = (order, type) => {

        const sorted = [...filteredProducts].sort((a, b) => {
            if (type === 'price') {
                return order === 'asc' ? a.price - b.price : b.price - a.price;
            } else if (type === 'brand') {
                return order === 'asc' ? a.brand.localeCompare(b.brand) : b.brand.localeCompare(a.brand);
            } else if (type === 'class') {
                return order === 'asc' ? a.class.localeCompare(b.class) : b.class.localeCompare(a.class);
            }
            return 0;
        });
        setFilteredProducts(sorted);
    }

    const handleFilterChange = (type, value) => {

        if (type === 'all') {
            setFilteredProducts(products);
        } else if (type === 'partner') {
            const filtered = products.filter(product => product.partner === value);
            setFilteredProducts(filtered);
        } else if (type === 'price') {
            const order = value; // значение value уже содержит порядок сортировки ('asc' или 'desc')
            console.log(`Sorting products by price in ${order} order`);
            sortProducts(order, 'price');
        } else if (type === 'class') {
            const filtered = products.filter(product => product.class === value);
            setFilteredProducts(filtered);
        } else if (type === 'brand') {
            const filtered = products.filter(product => product.brand === value);
            setFilteredProducts(filtered);
        }
    }

    return (
        <div className={'product-list'}>
            <FilterBar onFilterChange={handleFilterChange} />
            <div className={'list'}>
                {filteredProducts.map(item => (
                    <ProductItem
                        key={item.id}
                        product={item}
                        className={'item'}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductList;
