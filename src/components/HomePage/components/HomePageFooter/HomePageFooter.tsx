import styles from './HomePageFooter.module.css'
import {Link} from "react-router-dom";
import React from "react";


function HomePageFooter() {
  return (
    <div className={styles.home_page_footer_container}>
      <p className={styles.home_page_footer_logo}>your<br/>blog</p>
      <div>
        <Link to={'/login'}>
          <button className={styles.footer_singin_button}>вход</button>
        </Link>

        <Link to={'/register'}>
          <button className={styles.footer_singup_button}>регистрация</button>
        </Link>
      </div>
      <div className={styles.footer_contacts}>
        <a href="https://t.me/Vladyk1LoVe" target={"_blank"} rel="noreferrer">
          <p>Yurtaev Vladislav</p>
          <p>tg: Vladyk1LoVe</p>
        </a>
      </div>
    </div>
  );
}

export default HomePageFooter;