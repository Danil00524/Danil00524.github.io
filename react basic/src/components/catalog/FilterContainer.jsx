import React, { useEffect, useState } from 'react';
import { default as Select } from 'react-select'

import './FilterContainer.scss';

const FilterContainer = ({ contentType, filterOption }) => {
  const [styleSelect, setStyleSelect] = useState('');
  const [metres, setMetres] = useState('');
  const [bedroom, setBedroom] = useState('');
  const [floors, setFloors] = useState('');

  const filter = {};
  useEffect(() => {
    filter.style = styleSelect;
    filter.bedroom = bedroom;
    filter.metres = metres;
    filter.floors = floors;

    filterOption(filter)
  }, [styleSelect, metres, bedroom, floors]);

  const chooseStyleSelect = (e) => {
    setStyleSelect(e.value)
  };
  const chooseMetresSelect = (e) => {
    setMetres(e.value)
  };
  const chooseRoomsNumber = (e) => {
    setBedroom(e.target.value);
    let prevActive = document.querySelector('.filter-rooms .filter-btn.active');
    if (prevActive) prevActive.classList.remove('active');
    e.target.classList.add('active');
  };
  const chooseFloorNumber = (e) => {
    setFloors(e.target.value);
    let prevActive = document.querySelector('.filter-floors .filter-btn.active');
    if (prevActive) prevActive.classList.remove('active');
    e.target.classList.add('active');
  };

  const optionsStyle = [
    { value: 'Бревенчатые', label: 'Бревенчатые' },
    { value: 'Брусовые', label: 'Брусовые' },
  ];

  const optionsMetres = [
    { value: '100-300', label: '100 - 300 М2' },
    { value: '300-500', label: '300 - 500 М2' },
    { value: '500+', label: '500+ М2' }
  ];

  const bedroomSelect =
    <div className={`filter-rooms filter-control-container ${contentType == 'Беседки' ? 'disabled' : ''}`}>
      <label className="filter-label">Спален:</label>
      <button className='filter-btn' value={1} onClick={(e) => chooseRoomsNumber(e)} disabled={contentType == 'Беседки' ? true : false}>1</button>
      <button className='filter-btn' value={2} onClick={(e) => chooseRoomsNumber(e)} disabled={contentType == 'Беседки' ? true : false}>2</button>
      <button className='filter-btn' value={3} onClick={(e) => chooseRoomsNumber(e)} disabled={contentType == 'Беседки' ? true : false}>3</button>
      <button className='filter-btn' value={4} onClick={(e) => chooseRoomsNumber(e)} disabled={contentType == 'Беседки' ? true : false}>4</button>
      <button className='filter-btn' value={5} onClick={(e) => chooseRoomsNumber(e)} disabled={contentType == 'Беседки' ? true : false}>5</button>
    </div>;

  const floorsSelect =
    <div className={`filter-floors filter-control-container ${contentType == 'Беседки' ? 'disabled' : ''}`}>
      <label className="filter-label">Этажей:</label>
      <button className="filter-btn" value={1} onClick={(e) => chooseFloorNumber(e)} disabled={contentType == 'Беседки' ? true : false}>1</button>
      <button className="filter-btn" value={2} onClick={(e) => chooseFloorNumber(e)} disabled={contentType == 'Беседки' ? true : false}>2</button>
      <button className="filter-btn" value={3} onClick={(e) => chooseFloorNumber(e)} disabled={contentType == 'Беседки' ? true : false}>3</button>
    </div>;

  return (
    <div className="filter d-flex align-items-center text-color-white">
      <div className="filter-style filter-control-container d-flex align-items-center flex-grow-1">
        <label className="filter-label">Стиль:</label>
        <Select
          onChange={(e) => chooseStyleSelect(e)}
          className='react-select-container react-select-style flex-grow-1 z-index-2'
          classNamePrefix="react-select"
          options={optionsStyle}
          placeholder="Выбрать..."
        />
      </div>
      <div className="filter-metres filter-control-container d-flex align-items-center">
        <label className="filter-label">Площадь:</label>
        <Select
          onChange={(e) => chooseMetresSelect(e)}
          className='react-select-container react-select-style flex-grow-1 z-index-2'
          classNamePrefix="react-select"
          options={optionsMetres}
          placeholder="Выбрать..."
        />
      </div>
      {contentType !== 'Беседка' ? bedroomSelect : null}
      {contentType !== 'Беседка' ? floorsSelect : null}
    </div>
  )
};

export default FilterContainer;
