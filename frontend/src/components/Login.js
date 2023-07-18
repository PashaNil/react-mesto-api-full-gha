import React from 'react';
import Header from './Header';

function Login({ handleLogin }) {

    const [formValue, setFormValue] = React.useState({
        email: "",
        password: ""
    })

    function handleChange(e) {
        const { name, value } = e.target;
        setFormValue({
            ...formValue,
            [name]: value
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        handleLogin(formValue)
    }

    return (
        <>
            <Header
                titleButton="Регистрация"
                path="/sign-up"
            />
            <div className="authorization">
                <h2 className="authorization__title">Вход</h2>
                <form className="authorization__form" onSubmit={handleSubmit}>
                    <fieldset className="authorization__fieldset">
                        <input className="authorization__input" type="email" id="email" name="email"
                            placeholder="Email" required onChange={handleChange} />
                        <span className="authorization__input-error email-error"></span>
                        <input className="authorization__input" type="password" id="password" name="password"
                            placeholder="Пароль" required onChange={handleChange} />
                        <span className="authorization__input-error password-error"></span>
                    </fieldset>
                    <button className="authorization__button" aria-label="Сохранить форму">Войти</button>

                </form>
            </div>
        </>
    )
}

export default Login;