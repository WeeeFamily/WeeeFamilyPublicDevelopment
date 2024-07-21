import React from 'react';
import {useTelegram} from "../hooks/useTelegram";
import './header.css';
import Button from "../button/Button";
import {useLocation, useNavigate} from "react-router-dom";


const Header = () => {
    const {user,onClose} = useTelegram();
const navigate = useNavigate();
const location = useLocation();

    const onAddHandLer = ()=> {
        // onAdd(product);
        navigate('/');
    }

    return (

        <div className='header'>
            {location.pathname !== '/' && (
                <Button className='return_button' onClick={onAddHandLer}>
                    Return
                </Button>
            )}
            <span className='username'>
                @{user?.username}
            </span>
        </div>
    );


};
export default Header;