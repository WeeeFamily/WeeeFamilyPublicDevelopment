import React, {useState} from 'react';
import './FilterBar.css';

const FilterBar = ({ onFilterChange }) => {
     const [activeFilter, setActiveFilter] = useState('all');


     const handleFilterClick = (filterName) => {
        setActiveFilter(filterName);
        onFilterChange(filterName);
         };

    return (
        <div className="filter-container">
            <div className={`filter ${activeFilter === 'all' ? 'active' : ''}`}>
                <button onClick={() => handleFilterClick('all')} className="filter-button">
                    <i className="fas fa-car"></i>
                    <span>All cars</span>
                </button>
            </div>
            <div className={`filter ${activeFilter === 'partner' ? 'active' : ''}`}>
                <i className="fas fa-handshake"></i>
                <select onChange={(e) => onFilterChange('partner', e.target.value)}>
                    <option value="">Partners</option>
                    <option value="Partner 1">Jet Car</option>
                    <option value="Partner 2">Weee Cars</option>
                </select>

            </div>
            <div className={`filter ${activeFilter === 'price' ? 'active' : ''}`}>
                <i className="fas fa-dollar-sign"></i>
                <select onChange={(e) => onFilterChange('price', e.target.value)}>
                    <option value="">For price:</option>
                    <option value="asc">Low-Hight</option>
                    <option value="desc">Hight-Low</option>
                </select>

            </div>
            <div className={`filter ${activeFilter === 'class' ? 'active' : ''}`}>
                <i className="fas fa-car-side"></i>
                <select onChange={(e) => onFilterChange('class', e.target.value)}>
                    <option value="">Class car</option>
                    <option value="SUV">SUV</option>
                    <option value="Compact">Compact</option>
                    <option value="Sedan">Sedan</option>
                </select>

            </div>
            <div className={`filter ${activeFilter === 'brand' ? 'active' : ''}`}>
                <i className="fas fa-industry"></i>
                <select onChange={(e) => onFilterChange('brand', e.target.value)}>
                    <option value="">Model car</option>
                    <option value="Toyota">Toyota</option>
                    <option value="Volkswagen">Volkswagen</option>
                    <option value="Dodge">Dodge</option>
                </select>
            </div>
        </div>
    );
};

export default FilterBar;