import React from 'react';
import { useContext } from 'react';
import avatarPens from '../images/Avatar-pens.svg';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete}) {
  // Получение контекста с данными пользователя из контекста
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container">
          <div className="profile__avatar-container">
            <img className="profile__avatar" src={currentUser.avatar} alt="Аватар профиля" />
            <button className="profile__avatar-edit" type="button" onClick={onEditAvatar}>
              <img className="profile__avatar-pen" src={avatarPens}
                alt="ручка редактирования" />
            </button>
          </div>
          <div className="profile__info">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button className="profile__edit-button opacity-hover" type="button"
              aria-label="Редактирование информации" onClick={onEditProfile}></button>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button className="profile__add-button opacity-hover"
          type="button" aria-label="Добавить карточку" onClick={onAddPlace}></button>
      </section>
      <section className="elements">
        {cards.map((cardItem) => (
          <Card
          key={cardItem._id}
          card={cardItem}
          onCardClick={onCardClick}
          onCardLike={onCardLike}
          onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  )
}

export default Main;
