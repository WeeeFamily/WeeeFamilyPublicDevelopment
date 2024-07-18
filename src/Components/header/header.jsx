import React from 'react';
import Button from "../button/Button";
import {useTelegram} from "../hooks/useTelegram";
import './header.css';



const Header = () => {
    const {user,onClose} = useTelegram();


    return (
        <div className={'header'}>
            <Button onClick={onClose}>Закрыть</Button>
            <Button onClick={onClose}>Заказать машину</Button>
            <span className={'username'}>
                {user?.username}
            </span>

        </div>
    );


};
export default Header;