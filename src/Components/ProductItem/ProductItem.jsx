import React from 'react';
import Button from "../button/Button";
import './ProductItem.css';


const ProductItem = ({product, className,onAdd}) => {
    const onAddHandLer = ()=> {
        onAdd(product);
    }

    return (
        <div className={'product' + className}>
            <div className={'img'}/>
            <div className={'title'}>{product.title}/</div>
            <div className={'description'}>{product.title}/</div>>
            <div className={'price'}>
             <span>Стоимость: <b>{product.price}</b> </span>
            </div>
            <Button className={'add-btn'} onClick = {onAddHandLer}>
                Добавить в корзину
            </Button>

        </div>
    );
};

export default ProductItem;