import React from 'react';
import './FilterBar.css';

const FilterBar = ({ onFilterChange }) => {
    return (
        <div className="filter-container">
            <div className="filter">
                <button onClick={() => onFilterChange('all')} className="filter-button">
                    <i className="fas fa-car"></i>
                    <span>Все автомобили</span>
                </button>
            </div>
            <div className="filter">
                <i className="fas fa-handshake"></i>
                <select onChange={(e) => onFilterChange('partner', e.target.value)}>
                    <option value="">Партнеры</option>
                    <option value="Partner 1">Partner 1</option>
                    <option value="Partner 2">Partner 2</option>
                </select>

            </div>
            <div className="filter">
                <i className="fas fa-dollar-sign"></i>
                <select onChange={(e) => onFilterChange('price', e.target.value)}>
                    <option value="">По цене</option>
                    <option value="asc">От низкой к высокой</option>
                    <option value="desc">От высокой к низкой</option>
                </select>

            </div>
            <div className="filter">
            <i className="fas fa-car-side"></i>
                <select onChange={(e) => onFilterChange('class', e.target.value)}>
                    <option value="">Класс автомобиля</option>
                    <option value="SUV">SUV</option>
                    <option value="Compact">Compact</option>
                    <option value="Sedan">Sedan</option>
                </select>

            </div>
            <div className="filter">
                <i className="fas fa-industry"></i>
                <select onChange={(e) => onFilterChange('brand', e.target.value)}>
                    <option value="">Марка авто</option>
                    <option value="Toyota">Toyota</option>
                    <option value="Volkswagen">Volkswagen</option>
                    <option value="Dodge">Dodge</option>
                </select>
            </div>
        </div>
    );
};

export default FilterBar;
