import React from 'react';
import Button from "../button/Button";
import {useTelegram} from "../../hooks/useTelegram";

const Header = () => {
    const{user, onClose} =useTelegram();

    return (
        <div className={'header'}>
            <Button onClick={onClose}>Закрыть</Button>
            <span className={'username'}></span>
            {user?.username}
        </div>
    );


};
export default Header;