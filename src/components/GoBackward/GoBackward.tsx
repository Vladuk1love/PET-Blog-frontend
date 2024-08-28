import React from 'react';
import { inspect } from "util";
import styles from './GoBackward.module.css'
import arrow from './Arrow.png'

interface IGoBackProps {
  to: string
}


function GoBackward(props: IGoBackProps) {
  return (
    <div className={styles.go_back_container}>
      <img src={arrow} alt=""/>
      Назад
    </div>
  );
}

export default GoBackward;