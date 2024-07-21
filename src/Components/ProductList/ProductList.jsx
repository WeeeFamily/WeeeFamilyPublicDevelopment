import React, {useState} from 'react';
import './ProductList.css';
import ProductItem  from "../ProductItem/ProductItem";
import {useTelegram} from "../hooks/useTelegram";



const products = [
    {id: '1', title: 'Tayota Rav 4', price: 100, description: 'Идеально подходит для города, путешествий и горной местности', img:'/PhotoCars/toyota-rav4.jpg'},
    {id: '2', title: 'Volkswagen ЖУК', price: 50, description: 'Идеально подходит для съемок и мероприятий',img:'/PhotoCars/volkswagen-zhuk.jpg'},
    {id: '3', title: 'Dodje Chardger', price: 110, description: 'Идеально подъодит для города и съемок, езды за городом',img:'/PhotoCars/dodge-charger.jpg'},
]

// const getTotalPrice = (item = []) => {
//     return item.reduce((acc, item) => {
//         return acc+=item.price
//         },0)
// }
const ProductList = () => {
    const [addedItems, setAddedItems] = useState([]);
    const {tg} = useTelegram();
    // const onAdd = (product) => {
    //
    //     const alredyAdded = addedItems.find(item => item.id === product.id);
    //     let newItems= [];
    //
    //     if(alredyAdded) {
    //         newItems = addedItems.filter(item => item.id !== product.id);
    //     }
    //     else {
    //         newItems = [...addedItems, product];
    //     }
    //
    //     setAddedItems(newItems)
    //
    //     if (newItems.length === 0) {
    //         tg.MainButton.hide();
    //     }
    //     else {
    //         tg.MainButton.show();
    //
    //         tg.MainButton.setParams({
    //             text:`Rent for ${getTotalPrice(newItems)}$`
    //         })
    //     }
    // }


    // return (
    //     <div className={'list'}>
    //         {products.map(item => (
    //        <ProductItem
    //         product={item}
    //         onAdd={onAdd}
    //         className={'item'}
    //             />
    //          ))}
    //
    //     </div>
    // );
};


export default ProductList;