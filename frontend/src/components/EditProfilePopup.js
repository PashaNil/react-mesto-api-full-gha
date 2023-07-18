import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

  // Имя и подпись, привязаны к инпутам
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  const currentUser = React.useContext(CurrentUserContext);

  // При открытие попапа и обновлении контекста, будет обновлятся стейты имени и подписи
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  // Обработчик внешнего form, который вызывает обновление данных через api
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      button="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input className="popup__input popup__input_type_name" type="text" id="name" name="name" placeholder="Имя"
        minLength="2" maxLength="40" value={name ? name : ""} required onChange={(e) => setName(e.target.value)} />
      <span className="popup__input-error name-error"></span>
      <input className="popup__input popup__input_type_job" type="text" id="job" name="about"
        placeholder="Род занятий" minLength="2" maxLength="200" required value={description ? description : ""} onChange={(e) => setDescription(e.target.value)} />
      <span className="popup__input-error job-error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
