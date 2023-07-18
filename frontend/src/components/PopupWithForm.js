import React from 'react';
import Popup from './Popup';

function PopupWithForm(props) {
  return (
        <Popup 
        name={props.name}
        isOpen={props.isOpen}
        onClose={props.onClose}
        classContainer="container"
        >
        <h2 className="popup__title">{props.title}</h2>
        <form className={`popup__form popup__form_type_${props.name}`} name={props.name} onSubmit={props.onSubmit}>
          <fieldset className="popup__fieldset">
            {props.children}
          </fieldset>
          <button className="popup__button" type="submit" aria-label="Сохранить форму"
          >{props.button}</button>
        </form>
        </Popup>
  )
}

export default PopupWithForm;
