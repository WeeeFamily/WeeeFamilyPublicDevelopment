import React, { useCallback, useEffect } from 'react';
import './Form.css';
import { useTelegram } from "../hooks/useTelegram";
import { useLocation } from "react-router-dom";
import axios from 'axios'; // Добавлен импорт Axios
import Button from "../button/Button";

const Form = () => {
    const [city, setCity] = React.useState('');
    const [name, setName] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [date, setDate] = React.useState(new Date().toISOString().split('T')[0]);
    const [take, setTake] = React.useState('');

    const { tg } = useTelegram();
    const location = useLocation();
    const car = location.state?.car || '';
    const chatId = '-1002135710194'; // Добавьте ваш chat_id
    const botToken = '7356584757:AAFMITZXblh8k-FsOJdUK4yr62sUmAxG4gw';

    const onSendData = useCallback(() => {
        const data = {
            city,
            name,
            phone,
            date,
            take,
            car
        };

        const message = `Name: ${name}\nCity: ${city}\nPhone: ${phone}\nDate: ${date}\nDelivery Method: ${take}\nCar: ${car}`;

        axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            chat_id: chatId,
            text: message,
        })
        .then(response => {
            console.log('Message sent successfully:', response);
        })
        .catch(error => {
            console.error('Error sending message:', error);
        });

        tg.sendData(JSON.stringify(data));
    }, [city, name, phone, date, take]);

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData);
        return () => {
            tg.offEvent('mainButtonClicked', onSendData);
        };
    }, [onSendData, tg]);

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Забронировать авто'
        });
    }, [tg]);

    useEffect(() => {
        if (!name || !phone || !date) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [name, phone, date, tg.MainButton]);

    const onChangeCity = (e) => {
        setCity(e.target.value);
    };
    const onChangeName = (e) => {
        setName(e.target.value);
    };
    const onChangePhone = (e) => {
        setPhone(e.target.value);
    };
    const onChangeDate = (e) => {
        setDate(e.target.value);
    };
    const onChangeTake = (e) => {
        setTake(e.target.value);
    };

    return (
        <div className={"Form"}>
            <h2 className="h2">Fill out the form to Rent Car 👇</h2>

            <div className="input-group">
                <input
                    className={'input'}
                    type='text'
                    placeholder={'Выбранная машина'}
                    value={car}
                    readOnly
                />
                <i className="fas fa-car-side"></i>
            </div>

            <div className="input-group">
                <select value={city} onChange={onChangeCity} className={'select'}>
                    <option value={'value'}>Choose City</option>
                    <option value={'Batumi'}>Batumi</option>
                    <option value={'Tbilisi'}>Tbilisi</option>
                </select>
                <i className="fas fa-city"></i>
            </div>
            <div className="input-group">
                <input
                    className={'input'}
                    type="text"
                    placeholder={'Your Name'}
                    value={name}
                    onChange={onChangeName}
                    required
                />
                <i className="fas fa-user"></i>
            </div>
            <div className="input-group">
                <input
                    className={'input'}
                    type='text'
                    placeholder={'Phone Number'}
                    value={phone}
                    onChange={onChangePhone}
                    required
                />
                <i className="fas fa-phone"></i>
            </div>
            <div className="input-group">
                <select value={take} onChange={onChangeTake} className={'select'}>
                    <option value={'value'}>How to pick up the car?</option>
                    <option value={'delivery'}>Delivery of the car to the client</option>
                    <option value={'Office'}>Pick up at the office</option>
                </select>
                <i className="fas fa-car"></i>
            </div>
            <div className="input-group">
                <input
                    className={'input'}
                    type='date'
                    placeholder={'Дата начала аренды'}
                    value={date}
                    onChange={onChangeDate}
                    required
                />
                <i className="fas fa-calendar-alt"></i>
            </div>

        </div>
    );
};

export default Form;
