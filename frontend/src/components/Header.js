import React from 'react';
import { Link } from 'react-router-dom';
import logoHeader from "../images/logo-header.svg";

function Header(props){
    return(
        <header className="header">
        <img className="header__logo" src={logoHeader} alt="Место Россия"/>
        <div className="header__navbar">
          {props?.userEmail && <p className="header__email" >{props.userEmail}</p>}
          {props.path && <Link to={props.path} className="header__link" onClick={props?.handleLogOut} >{props.titleButton}</Link>}
        </div>
      </header>
    )
}

export default Header;