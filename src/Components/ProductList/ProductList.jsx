import React, { useState } from 'react';
import './ProductList.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ProductItem from "../ProductItem/ProductItem";
import { useTelegram } from "../hooks/useTelegram";
import FilterBar from "../Filters/FilterBar";

const products = [
    { id: '1', title: 'Toyota Rav 4', price: 100, description: 'Ideal for city, travel and mountainous areas.', img: '/PhotoCars/toyota-rav4.jpg', brand: 'Toyota', class: 'SUV', partner: 'Partner 2' },
    { id: '2', title: 'Volkswagen Zhuk', price: 50, description: 'Ideal for filming and events.', img: '/PhotoCars/volkswagen-zhuk.jpg', brand: 'Volkswagen', class: 'Compact', partner: 'Partner 1' },
    { id: '3', title: 'Dodge Charger', price: 110, description: 'Ideal for the city and filming, driving outside the city.', img: '/PhotoCars/dodge-charger.jpg', brand: 'Dodge', class: 'Sedan', partner: 'Partner 1' },
];

const banners = [

    { id: '2', video: '/banners/video-banner-2.mp4', text: 'Special Offer 2' },

];

const ProductList = () => {
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
            sortProducts(value, 'price'); // значение value уже содержит порядок сортировки ('asc' или 'desc')
        } else if (type === 'class') {
            const filtered = products.filter(product => product.class === value);
            setFilteredProducts(filtered);
        } else if (type === 'brand') {
            const filtered = products.filter(product => product.brand === value);
            setFilteredProducts(filtered);
        }
    }

    const sliderSettings = {
    dots: false,
    infinite: false, // Отключаем бесконечное прокручивание
    speed: 500,
    slidesToShow: 1, // Количество слайдов, отображаемых за раз
    slidesToScroll: 1, // Количество слайдов, прокручиваемых за раз// Показываем стрелки для навигации
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: false,
                dots: false
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                initialSlide: 0
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
};

    return (
        <div className={'product-list'}>
            <div className="banner-slider">
                <Slider {...sliderSettings}> {banners.map(banner => (
                        <div key={banner.id} className="video-container">
                            <video src={banner.video} className="banner-video" autoPlay muted loop />
                            <div className="banner-text"></div>
                        </div>
                    ))}
                </Slider>
            </div>
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
