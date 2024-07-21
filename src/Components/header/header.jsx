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
                    <i className="fas fa-arrow-left"></i> {/* Иконка назад */}
                </Button>
            )}
            <span className='username'>
               Your login: @{user?.username}
            </span>
        </div>
    );


};
export default Header;