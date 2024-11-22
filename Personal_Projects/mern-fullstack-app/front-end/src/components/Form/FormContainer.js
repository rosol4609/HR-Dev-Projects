import React from 'react';
import './formStyles.css';

function FormContainer({ children, title , email}) {
  return (
    <div className="form-container">
      <h5>{email}</h5>
      <h2>{title}</h2>
      {children}
    </div>
  );
}

export default FormContainer;
