import React from 'react';
import './formStyles.css';

function Input({ type, placeholder, value, onChange }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="input-field"
    />
  );
}

export default Input;
