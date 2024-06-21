import React from 'react';
import styles from './Header.module.css'
import {Link} from "react-router-dom";


function Header() {
  return (
    <div className={styles.header_without_logo}>
      <Link to={'/'} className={styles.header_without_logo_logo}>
        <p>your<br/> blog</p>
      </Link>
      <div>
        <Link to={'/login'}>
          <button className={styles.header_singin_button}>вход</button>
        </Link>

        <Link to={'/register'}>
          <button className={styles.header_singup_button}>регистрация</button>
        </Link>
      </div>
    </div>
  );
}

export default Header;