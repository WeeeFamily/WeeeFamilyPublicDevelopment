import React, { useState } from 'react';
import './ProductList.css';
import ProductItem from "../ProductItem/ProductItem";
import { useTelegram } from "../hooks/useTelegram";
import FilterBar from "../Filters/FilterBar";

const products = [
    { id: '1', title: 'Toyota Rav 4', price: 100, description: 'Идеально подходит для города, путешествий и горной местности', img: '/PhotoCars/toyota-rav4.jpg', brand: 'Toyota', class: 'SUV', partner: 'Partner 2' },
    { id: '2', title: 'Volkswagen Жук', price: 50, description: 'Идеально подходит для съемок и мероприятий', img: '/PhotoCars/volkswagen-zhuk.jpg', brand: 'Volkswagen', class: 'Compact', partner: 'Partner 1' },
    { id: '3', title: 'Dodge Charger', price: 110, description: 'Идеально подходит для города и съемок, езды за городом', img: '/PhotoCars/dodge-charger.jpg', brand: 'Dodge', class: 'Sedan', partner: 'Partner 1' },
];


const ProductList = () => {
    const [addedItems, setAddedItems] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState(products);
    const { tg } = useTelegram();


     const sortProducts = (order, type) => {
        const sorted = [...filteredProducts].sort((a, b) => {
            if (type === 'price') {
                if (order === 'asc') {
                    return a.price - b.price;
                } else if (order === 'desc') {
                    return b.price - a.price;
                }
            } else if (type === 'brand') {
                if (order === 'asc') {
                    return a.brand.localeCompare(b.brand);
                } else if (order === 'desc') {
                    return b.brand.localeCompare(a.brand);
                }
            } else if (type === 'class') {
                if (order === 'asc') {
                    return a.class.localeCompare(b.class);
                } else if (order === 'desc') {
                    return b.class.localeCompare(a.class);
                }
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
            const [order] = value.split('_');
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

