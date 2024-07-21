import React from 'react';
import Button from "../button/Button";
import './ProductItem.css';
import { useNavigate } from 'react-router-dom';


const ProductItem = ({product, className,onAdd}) => {
    const navigate = useNavigate();
    const onAddHandLer = ()=> {
        // onAdd(product);
        navigate('/form', { state: { car: product.title } });
    };

    return (
        <div className={`product ${className}`}>
            <div className="img">
                <img src={product.img} alt={product.title}/>
            </div>
            <div className={'title'}>{product.title}</div>
            <div className={'description'}>{product.description}</div>
            <div className={'price'}>
                <span>Стоимость: <b>{product.price}</b> </span>
            </div>
            <div className={'add_rent_car'}>
                <Button className={'add-btn'} onClick={onAddHandLer}> Rent Car </Button>
            </div>


        </div>
    );
};

export default ProductItem;