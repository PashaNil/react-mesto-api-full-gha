import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';

import Login from './Login';
import Register from './Register';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { ProtectedRoute } from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth';

import imgAuthorizationAllowed from '../images/Authorization-access-allowed.svg'
import imgAuthorizationError from '../images/Authorization-error.svg'


function App() {

  const navigate = useNavigate();

  // Открытие попапов профиля, добавление карточек и аватара
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);

  // Открытие попапов со статусом регистрации и авторизации
  const [isInfoTooltipAllowedPopupOpen, setIsInfoTooltipAllowedPopupOpen] = React.useState(false);
  const [isInfoTooltipErrorPopupOpen, setIsInfoTooltipErrorPopupOpenn] = React.useState(false)

  // Отображение картинки при клике на карточку
  const [selectedCard, setSelectedCard] = React.useState(null)

  // Стейт обьекта данных пользователя, связан с контекстом
  const [currentUser, setCurrentUser] = React.useState({})

  // Стейт с массивом карточек с сервера
  const [cards, setCards] = React.useState([]);

  // Стейт состояния авторизации
  const [loggedIn, setLoggedIn] = React.useState(null);

  // Email пользователя полученный после проверки токена и регистрации
  const [userAuthEmail, setUserAuthEmail] = React.useState("")

  // Получение данных пользователя от сервера
  React.useEffect(() => {
    if (loggedIn) {
      api.getSelfData()
        .then((data) => {
          setCurrentUser(data)
        })
        .catch((err) => {
          console.log(`Ошибка запроса: ${err}`)
        });
    }
  }, [loggedIn])

  // Запрос карточек с сервера, сохраняет в стейт cards
  React.useEffect(() => {
    if (loggedIn) {
      api.getInitialCards()
        .then((dataCards) => {
          setCards(dataCards)
        })
        .catch((err) => {
          console.log(`Ошибка запроса: ${err}`)
        });
    }
  }, [loggedIn])

  // Проверка наличия токена
  React.useEffect(() => {
    if (localStorage.getItem("token")) {
      checkToken()
    } else {
      setLoggedIn(false)
    }
  }, [])

  function checkToken() {
    auth.getToken(localStorage.getItem("token"))
      .then((data) => {
        setUserAuthEmail(data.email)
        setLoggedIn(true)
      })
      .catch((err) => {
        console.log(`Ошибка запроса: ${err}`)
      })
  }

  //Обработчики события при клике на открытие попапов
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  // Функция api регистрации
  function handleRegister({ email, password }) {
    auth.register(email, password)
      .then(() => {
        setIsInfoTooltipAllowedPopupOpen(true);
        navigate("/sign-in")
      })
      .catch((err) => {
        setIsInfoTooltipErrorPopupOpenn(true);
        console.log(`Ошибка запроса: ${err}`)
      })
  }

  // Функция api входа
  function handleLogin({ email, password }) {
    auth.authorize(email, password)
      .then((data) => {
        localStorage.setItem("token", data.token)
        setUserAuthEmail(email)
        setLoggedIn(true)
      })
      .catch((err) => {
        setIsInfoTooltipErrorPopupOpenn(true);
        console.log(`Ошибка запроса: ${err}`)
      })
  }

  // Функция выхода из аккаунта
  function handleLogOut() {
    localStorage.removeItem("token")
    setLoggedIn(false);
    setUserAuthEmail("");
  }

  //Закрытие попапов
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setSelectedCard(null)
    setIsInfoTooltipAllowedPopupOpen(false);
    setIsInfoTooltipErrorPopupOpenn(false);
  }

  // Обработчик нажатия на лайк
  function handleCardLike(card) {
    // Проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(`Ошибка запроса: ${err}`)
      });
  }

  // Удаление карточки
  function handleCardDelete(card) {
    // Отправляем запрос API на удаление карточки
    api.deletCard(card._id)
      .then(() => {
        setCards((cardsArr) => cardsArr.filter((item) => {
          return item === card ? item = null : item
        }))
      })
      .catch((err) => {
        console.log(`Ошибка запроса: ${err}`)
      });
  }

  // Обновление данных профайла пользователя на сервере
  function handleUpdateUser(profileData) {
    api.updateProfile(profileData)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(`Ошибка запроса: ${err}`)
      });
  }

  // Обновление данных аватара пользователя на сервере
  function handleUpdateAvatar(avatarData) {
    api.updateAvatar(avatarData)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(`Ошибка запроса: ${err}`)
      });
  }

  function handleAddPlaceSubmit(cardData) {
    api.addNewCard(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка запроса: ${err}`)
      });
  }

  if (loggedIn === null) {
    return (
      <div className="page">
        <div className="page__container">
          <Header userEmail="Loading..." />
        </div>
      </div>
    )
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Routes>
            <Route path="/" element={
              loggedIn ?
                <>
                  <Header path="sign-in" titleButton="Выйти" userEmail={userAuthEmail} handleLogOut={handleLogOut} />
                  <ProtectedRoute
                    element={Main}
                    loggedIn={loggedIn}
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={handleCardClick}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                  />
                  <Footer />
                </>
                : <Navigate to="/sign-in" replace />
            } />

            <Route path="/sign-in" element={loggedIn ? <Navigate to="/" replace /> : <Login handleLogin={handleLogin} />} />
            <Route path="/sign-up" element={loggedIn ? <Navigate to="/" replace /> : <Register handleRegister={handleRegister} />} />
            <Route path="*" element={<Navigate to="/" replace />} />

          </Routes>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onUpdateCards={handleAddPlaceSubmit}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <ImagePopup
            onClose={closeAllPopups}
            card={selectedCard}
          />
          <InfoTooltip
            isOpen={isInfoTooltipAllowedPopupOpen}
            onClose={closeAllPopups}
            message={"Вы успешно зарегистрировались!"}
            image={imgAuthorizationAllowed}
          />

          <InfoTooltip
            isOpen={isInfoTooltipErrorPopupOpen}
            onClose={closeAllPopups}
            message={"Что-то пошло не так! Попробуйте ещё раз."}
            image={imgAuthorizationError}
          />
        </div>
      </div>

    </CurrentUserContext.Provider>
  )
}

export default App;
