import React from 'react';

function Popup({ name, isOpen, onClose, classContainer, children }) {

    // Закрытие попапа по клавише Esc
    React.useEffect(() => {
        if (!isOpen) return;
        document.addEventListener("keydown", handleEscClose)
        function handleEscClose(evt) {
            if (evt.key === "Escape") {
                onClose()
            }
        }
        return () => document.removeEventListener("keydown", handleEscClose);
    }, [isOpen, onClose])


    // Обработчик закрытия попапов по оверлею
    function closePopupOverlay(evt) {
        if (evt.target.classList.contains("popup_opened")) {
            onClose();
        }
    }

    return (
        <div
            className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}
            onClick={closePopupOverlay}>
            <div className={`popup__${classContainer}`}>
                <button
                    className="popup__close-icon opacity-hover"
                    type="button"
                    aria-label="Закрытие окна"
                    onClick={onClose}
                />
                {children}
            </div>
        </div>
    )
}

export default Popup;