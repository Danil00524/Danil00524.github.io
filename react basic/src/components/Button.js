import React from "react";

import './scss/Button.scss';

const Button = ({className, type, text, onClick, icon}) => {
  return (
      <button
          onClick={(onClick || null)}
          className={`btn ${(className || '')} ${(icon ? 'icon' : '')}`}
          type={(type || 'button')}
      >
        {(icon || '')} <span className="btn-text">{(text || 'Кнопка :)')}</span>
      </button>
  );
};

export default Button;
