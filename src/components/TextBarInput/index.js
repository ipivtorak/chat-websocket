import React from 'react';
import './styles.scss';

const TextBarInput = ({ value, onChange, placeholder, onKeyDown, isError }) => {
    return (
        <input
            value={value}
            onChange={onChange}
            className={`textbar-input ${isError ? 'input-error' : ''}`}
            type='text'
            onKeyDown={onKeyDown}
            maxLength={255}
            placeholder={placeholder}
        />
    )
};

export default TextBarInput;
