import React, { useState, useEffect } from 'react';
import './ProductList.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ProductItem from "../ProductItem/ProductItem.jsx";
import { useTelegram } from "../hooks/useTelegram.jsx";
import FilterBar from "../Filters/FilterBar.js";
import { db } from '../../firebase.js';
import { collection, getDocs } from "firebase/firestore";
import NavBar from '../NavBar/NavBar';

const banners = [

    { id: '2', video: '/banners/adventure_Georgia_1.mp4', poster: '/banners/111.jpg', text: 'Special Offer 2' },

];

const ProductList = () => {
    const [products, setProducts] = useState([]); // Оригинальные данные продуктов
    const [filteredProducts, setFilteredProducts] = useState([]); // Отфильтрованные данные
    const { tg } = useTelegram();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "products"));
                const productsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setProducts(productsData);
                setFilteredProducts(productsData); // Установим изначально все продукты
            } catch (error) {
                console.error("Error fetching products: ", error);
            }
        };

        fetchProducts();
    }, []);

    const sortProducts = (order, type) => {
        const sorted = [...products].sort((a, b) => {
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
    };

    const handleFilterChange = (type, value) => {
        let filtered = [];
        if (type === 'all') {
            setFilteredProducts(products); // Отображаем все продукты
        } else if (type === 'partner') {
            filtered = products.filter(product => product.partner === value);
            setFilteredProducts(filtered);
        } else if (type === 'price') {
            sortProducts(value, 'price');
        } else if (type === 'class') {
            filtered = products.filter(product => product.class === value);
            setFilteredProducts(filtered);
        } else if (type === 'brand') {
            filtered = products.filter(product => product.brand === value);
            setFilteredProducts(filtered);
        }
    };

    const sliderSettings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
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
                <Slider {...sliderSettings}>
                    {banners.map(banner => (
                        <div key={banner.id} className="video-container">
                            <video src={banner.video}
                                   className="banner-video"
                                   autoPlay muted loop playsInline
                                   poster={banner.poster}
                            />
                            <div className="banner-text"></div>
                        </div>
                    ))}
                </Slider>
            </div>
            <FilterBar onFilterChange={handleFilterChange} />
            <div className={'list'}>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(item => (
                        <ProductItem
                            key={item.id}
                            product={item}
                            className={'item'}
                        />
                    ))
                ) : (
                    <p>No products available</p>
                )}
            </div>
        </div>
    );
};

export default ProductList;
