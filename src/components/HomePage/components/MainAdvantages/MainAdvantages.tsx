import React from 'react';
import styles from './MainAdvantages.module.css'
interface IPlusses {
  title: string,
  heading: string,
  paragraph: string
}
function PlussesBlock(props:IPlusses){
  return(
    <div className={styles.plusses_block}>
      <p>{props.title}</p>
      <p>{props.heading}</p>
      <p>{props.paragraph}</p>
    </div>
  )
}

const TAGS = ['наука', 'еда' ,'новости', 'техника','новости', 'котята','наука','новости', 'котята','наука', 'еда' ,'наука', 'техника','новости', 'котята','наука', 'техника','новости', 'котята','наука', 'техника','новости', 'котята',]

function MainAdvantages() {
  return (
    <div className={styles.main_advantages_container}>
      <div className={styles.advantages_pluses}>
        <PlussesBlock title={'100+'} heading={'тематик'} paragraph={'В результате показатель отыграл снижение по итогам 2022 года'}/>
        <PlussesBlock title={'1000+'} heading={'авторов'} paragraph={'Число HNWI в Северной Америке повысилось на 7,1% и достигло 7,875 млн'}/>
        <PlussesBlock title={'100%'} heading={'уникально'} paragraph={'Все звёзды наши'}/>
      </div>
      <div className={styles.advantages_tags}>
        {TAGS.map((item: string, index: number)=>{
          if(index % 4 === 0 ){
            return(<p key={index} style={{border:'1px solid #2457F0'}}>{item}</p>)
          }
          if(index % 5 === 0 ){
            return(<p key={index} style={{background:'#2457F0',  color: 'white'}}>{item}</p>)
          }else {
            return(<p key={index}>{item}</p>)
          }
        })}
      </div>
    </div>
  );
}

export default MainAdvantages;