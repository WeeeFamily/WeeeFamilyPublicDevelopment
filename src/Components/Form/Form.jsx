import React, {useCallback, useEffect} from 'react';
import './Form.css';
import {useTelegram} from "../hooks/useTelegram";
const Form = () => {

    const [city, setCity] = React.useState('');
    const [name, setName] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [date, setDate] = React.useState('');
    const [take, setTake] = React.useState('');

    const {tg} = useTelegram();
     const onSendData = useCallback(() => {
        const data = {
            name,
            phone,
            date
        }
        tg.sendData(JSON.stringify(data));
    }, [name, phone, date])


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
                <option value={'delivery'}>Батуми</option>
                <option value={'base'}>Тбилиси</option>
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
            <input
                className={'input'}
                type='text'
                placeholder={'Дата начала аренды'}
                value={date}
                onChange={onChangeDate}/>


            <select value={take} onChange={onChangeTake} className={'select'}>
                <option value={'delivery'}>Доставка автомобиля </option>
                <option value={'base'}> Забрать на офисе </option>
            </select>





        </div>
    );
};

export default Form;