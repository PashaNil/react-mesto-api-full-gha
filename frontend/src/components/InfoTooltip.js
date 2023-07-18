import React from 'react';
import Popup from './Popup';

function InfoTooltip({ isOpen, onClose, message, image }) {
  return (
    <Popup
      name='authorization'
      isOpen={isOpen}
      onClose={onClose}
      classContainer="container_type_authorization"
    >
      <img className="popup__authorization-img" src={image} alt="Результат авторизации" />
      <p className="popup__title">{message}</p>
    </Popup>
  )
}

export default InfoTooltip;