import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

  // Создаем реф на инпут
  const inputRef = React.useRef();

  // Очищение поля рефа при открытие попапа
  React.useEffect(() => {
    inputRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(e){
    e.preventDefault();
    onUpdateAvatar({
      avatar: inputRef.current.value
    });
  }

  return (
    <PopupWithForm
      name="avatar-edit"
      title="Обновить аватар"
      button="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input className="popup__input popup__input_type_avatar" type="url" id="avatar" name="avatar"
        placeholder="Ссылка на изображение" required ref={inputRef}/>
      <span className="popup__input-error avatar-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
