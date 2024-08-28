import React, {useEffect, useState} from 'react';
import styles from './HomePage.module.css'
import MainAdvantages from "./components/MainAdvantages/MainAdvantages";
import PopularPosts from "./components/PopularPosts/PopularPosts";
import HomePageFooter from "./components/HomePageFooter/HomePageFooter";
import { Navigate } from "react-router-dom";


const SLOGANS = [
  ['твой блог о том,', 'что важно многим'],
  ['исследуй', 'расширяй горизонты'],
  ['вдохновляй', 'и вдохновляйся'],
]

function HomePage() {
  const [currSlogan, setCurrSlogan] = useState({
    id: 0,
    text: ['твой блог о том,', 'что важно многим']
  })

  useEffect(() => {
    setTimeout(() => {
      if (currSlogan.id !== 2) {
        setCurrSlogan({
          id: currSlogan.id + 1,
          text: SLOGANS[currSlogan.id + 1]
        })
      } else {
        setCurrSlogan({
          id: 0,
          text: SLOGANS[0]
        })
      }
    }, 7000)
  }, [currSlogan])

  if (localStorage.getItem('token')){
    return <Navigate to={'/posts'}/>
  }

  return (
    <div className={styles.home_page_container}>
      <div className={styles.home_page_header}>
        <p>your<br/>blog</p>
        <p className={styles.home_page_header_slogans}>
          {currSlogan.text[0]}<br/>{currSlogan.text[1]}
        </p>
      </div>
      <MainAdvantages/>
      <PopularPosts/>
      <HomePageFooter/>
    </div>
  );
}

export default HomePage;