import React from 'react';
import {useTelegram} from "../hooks/useTelegram";
import './header.css';



const Header = () => {
    const {user,onClose} = useTelegram();


    return (
        <div className={'header'}>
            {/*<Button className={'close_button'} onClick={onClose}>Закрыть</Button>*/}
            <span className={'username'}>
                {user?.username}
            </span>

        </div>
    );


};
export default Header;