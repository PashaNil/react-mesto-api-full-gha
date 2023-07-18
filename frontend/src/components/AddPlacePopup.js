import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onUpdateCards }) {

  // Стейты с динамическим value инпутов
  const [inputTitle, setInputTitle] = React.useState("");
  const [inputUrl, setInputUrl] = React.useState("");

  // Очищает поля, после открытия попапа
  React.useEffect(()=>{
    setInputTitle("")
    setInputUrl("")
  }, [isOpen])

  // Обработчик формы, вызывает функцию api для добавления новой карточки.
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateCards({
      name: inputTitle,
      link: inputUrl
    })
  }

  return (
    <PopupWithForm
      name="add-cards"
      title="Новое место"
      button="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input className="popup__input popup__input_type_card-title" type="text" id="title" name="name"
        placeholder="Название места" minLength="2" maxLength="30" required value={inputTitle} onChange={(e) => setInputTitle(e.target.value)} />
      <span className="popup__input-error title-error"></span>
      <input className="popup__input popup__input_type_card-link" type="url" id="link" name="link"
        placeholder="Ссылка на картинку" required value={inputUrl} onChange={(e) => setInputUrl(e.target.value)} />
      <span className="popup__input-error link-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
