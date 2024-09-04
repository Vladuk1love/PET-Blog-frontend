import React from 'react';
import styles from './PostMini.module.css'
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { Link } from "react-router-dom";

interface IPost {
  _id: string,
  title: string,
  authorName: string,
  tags: string[],
  imageUrl: string,
  text: string,
  scale: number
}

export function PostMini(props: IPost) {
  const isAuth = useTypedSelector((state) => (state.user.isAuthenticated))
  
  return (
    <div className={styles.post_container} style={props.scale === 1? {}: {scale:`${props.scale}`,marginBottom:"-50px"}}>
      <div className={styles.post_left_side}>
        <p className={styles.post_left_side_title}>{props.title.slice(0,40)}<span></span></p>
        <p className={styles.post_left_side_author_name}>{props.authorName}</p>
        <div className={styles.post_left_side_tags}>
          {props.tags.map((item, index) => {
            return (
              <p className={styles.post_left_side_tag} key={index}>{item}</p>
            )
          })}
        </div>
      </div>
      <div className={styles.post_right_side}>
        <img src={props.imageUrl} alt={`Пост ${props.authorName}`} className={styles.post_right_side_img}/>
        <div className={styles.post_right_footer}>
          <p className={styles.post_right_side_text}>{props.text.slice(0,150)}...</p>
          {isAuth ?
            <Link to={`/post/${props._id}`}>
              <button className={styles.post_right_side_button}>Читать полностью</button>
            </Link>
             :
            <Link to={'/register'}>
              <button className={styles.post_right_side_button}>Зарегистрируйся,чтобы прочитать полностью</button>
            </Link>
          }
        </div>
      </div>
    </div>
  )
}
export default PostMini;