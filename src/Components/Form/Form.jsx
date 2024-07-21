import React, {useCallback, useEffect} from 'react';
import './Form.css';
import {useTelegram} from "../hooks/useTelegram";
import {useNavigate} from "react-router-dom";
import Button from "../button/Button";
const Form = () => {

    const [city, setCity] = React.useState('');
    const [name, setName] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [date, setDate] = React.useState('');
    const [take, setTake] = React.useState('');

    const {tg} = useTelegram();
     const onSendData = useCallback(() => {
        const data = {
            city,
            name,
            phone,
            date,
            take
        }
        tg.sendData(JSON.stringify(data));
    }, [city, name, phone, date, take])



    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])
    //добавил

    useEffect(() => {
        tg.MainButton.setParams({
                text: 'Забронировать авто'
            }
        )
    }, []);

    useEffect(() => {
        if (!name||!phone||!date) {
            tg.MainButton.hide();
        }
        else {
            tg.MainButton.show();
        } }, [name,phone,date]);


    const onChangeCity = (e) => {
        setCity(e.target.value);
    }
    const onChangeName = (e) => {
        setName(e.target.value);
    }
    const onChangePhone = (e) => {
        setPhone(e.target.value);
    }
    const onChangeDate = (e) => {
        setDate(e.target.value);
    }
    const onChangeTake = (e) => {
        setTake(e.target.value);
    }



    return (
        <div className={"Form"}>
            <h3>Для бронирования Автомобиля, введите данные ниже:</h3>
            <select value={city} onChange={onChangeCity} className={'select'}>
                <option value={'value'}>Выберите город:</option>
                <option value={'Batumi'}>Батуми</option>
                <option value={'Tbilisi'}>Тбилиси</option>
            </select>
            <input
                className={'input'}
                type="text"
                placeholder={'Ваше Имя'}
                value={name}
                onChange={onChangeName}

            />
            <input
                className={'input'}
                type='text' placeholder={'Номер телефона'}
                value={phone}
                onChange={onChangePhone}/>

            <select value={take} onChange={onChangeTake} className={'select'}>
                <option value={'value'}>Как забрать авто?</option>
                <option value={'delivery'}>Доставка автомобиля</option>
                <option value={'Office'}> Забрать на офисе</option>
            </select>

            <input
                className={'input'}
                type='text'
                placeholder={'Дата начала аренды'}
                value={date}
                onChange={onChangeDate}/>


        </div>
    );
};

export default Form;