import React from 'react';
import './Form.css';
const Form = () => {
    return (
        <div className={"Form"}>
            <h3>Для бронирования Автомобиля, введите данные ниже:</h3>
            <select className={'select'}>
                <option value={'delivery'}>Батуми</option>
                <option value={'base'}>Тбилиси</option>
            </select>
            <input
                className={'input'}
                type="text"
                placeholder={'Ваше Имя'}/>
            <input
                className={'input'}
                type='text' placeholder={'Номер телефона'}/>
            <input
                className={'input'}
                type='text'
                placeholder={'Дата начала аренды'}/>

            <select className={'select'}>
                <option value={'delivery'}>Доставка автомобиля </option>
                <option value={'base'}> Забрать на офисе </option>
            </select>



        </div>
    );
};

export default Form;