import React from 'react';
import Button from "../button/Button";

const Header = () => {
    const tg= window.Telegram.WebApp;
     const onClose = () => {
        tg.close()
    }



    return (
        <div className={'header'}>
            <Button onClick={onClose}>Закрыть</Button>
            <span className={'username'}></span>
            {tg.initDataUnsafe?.user?.username}

        </div>
    );
};

export default Header;