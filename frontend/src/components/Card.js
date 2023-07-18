import React from 'react';
import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

  // Получение контекста с данными пользователя
  const currentUser = useContext(CurrentUserContext);

  // Сравнивает id юзера и id владельца карточки, возвращает булевое
  const isOwn = card.owner === currentUser._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
const cardLikeButtonClassName = (
  `element__like-button ${isLiked && 'element__like-button_active'}`
);

  return (
    <article className="element">
      <img className="element__mask-group" src={card.link} alt={card.name} onClick={() => onCardClick(card)} />
      {isOwn && <button className="element__trash-button" type="button" onClick={()=> onCardDelete(card)} />}
      <div className="element__rectangle">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__container-like">
          <button className={cardLikeButtonClassName} type="button" onClick={()=> onCardLike(card)}></button>
          <p className="element__like-number">{card.likes.length}</p>
        </div>
      </div>
    </article>
  )
}

export default Card;
