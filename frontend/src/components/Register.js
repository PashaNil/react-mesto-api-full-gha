import React from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';

function Register({handleRegister}) {
    const [formValue, setFormValue] = React.useState({
        email: "",
        password: ""
    })

    function handleChange(e){
        const {name, value} = e.target;
        setFormValue({
            ...formValue,
            [name]: value
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        handleRegister(formValue)
    }

    return (
        <>
            <Header
                titleButton="Войти"
                path="/sign-in"
            />
            <div className="authorization">
                    <h2 className="authorization__title">Регистрация</h2>
                    <form className="authorization__form" onSubmit={handleSubmit}>
                    <fieldset className="authorization__fieldset">
                        <input className="authorization__input" type="email" id="email" name="email"
                            placeholder="Email" required onChange={handleChange} />
                        <span className="authorization__input-error email-error"></span>
                        <input className="authorization__input" type="password" id="password" name="password"
                            placeholder="Пароль" required onChange={handleChange} />
                        <span className="authorization__input-error password-error"></span>
                        </fieldset>
                        <button className="authorization__button" type="submit" aria-label="Сохранить форму">Зарегистрироваться</button>
                        <p className="authorization__question">Уже зарегистрированы? {<Link className="authorization__link" to="/sign-in">Войти</Link>}</p>

                    </form>
            </div>
        </>
    )
}

export default Register;