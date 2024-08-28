import React from 'react';
import styles from './Header.module.css'
import { Link } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";


function Header() {
  const isAuth = useTypedSelector((state) => (state.user.isAuthenticated))
  const userData = useTypedSelector((state) => (state.user.user))
  const {logoutState} = useActions()
  return (
    isAuth ?
      <div className={styles.header_after_auth}>
        <Link to={'/'} className={styles.header_before_auth_logo}>
          <p>your<br/> blog</p>
        </Link>
        <div className={styles.header_after_auth_main}>
          <Link to={'/post/add'} className={styles.header_auth_buttons}>
            <p>создать<br/>статью</p>
          </Link>
          <Link to={`/profile/:${userData?._id}`} className={styles.header_auth_buttons}>
            <p>профиль</p>
          </Link>
          <div className={styles.header_auth_buttons}>
            <p onClick={() => {
              logoutState();
              localStorage.removeItem('token')
            }}>настройки</p>
          </div>
        </div>
      </div>
      :
      <div className={styles.header_before_auth}>
        <Link to={'/'} className={styles.header_before_auth_logo}>
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