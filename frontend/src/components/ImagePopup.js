import React from 'react';
import Popup from './Popup';

function ImagePopup({ card, onClose }) {

  return (
    <Popup
      name="card-image"
      isOpen={card}
      onClose={onClose}
      classContainer="figure">
      <button className="popup__close-icon opacity-hover" type="button" aria-label="Закрытие окна" onClick={onClose} />
      <img className="popup__figure-img" src={`${card ? card.link : "#"}`} alt={`${card ? card.name : "#"}`} />
      <figcaption className="popup__figurecaption">{`${card ? card.name : ""}`}</figcaption>
    </Popup>

  )
}

export default ImagePopup;
