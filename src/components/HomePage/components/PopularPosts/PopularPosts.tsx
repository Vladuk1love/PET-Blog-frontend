import styles from './PopularPosts.module.css'
import {useGetPopularPostsQuery} from "../../../../redux/posts/postsApi";
import {Link} from "react-router-dom";
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Loading from "../../../Loading/Loading";


interface IPost {
  title: string,
  authorName: string,
  tags: string[],
  imageUrl: string,
  text: string
}

function PopularPosts() {
  const {data, error, isLoading} = useGetPopularPostsQuery('')
  if (error) {
    console.log(error)
  }
  return (
    <div className={styles.popular_posts_container}>
      <p>популярные статьи</p>
      <div className={styles.popular_posts}>
        {
          isLoading ?
              <Loading/>
            :
            (!data ? '' :
                <Carousel
                  className={styles.carousel_posts}
                  autoPlay={true}
                  centerMode={true}
                  centerSlidePercentage={100}
                  emulateTouch={true}
                  infiniteLoop
                  showStatus={false}
                  showArrows={false}
                  showIndicators={false}
                  showThumbs={false}
                >
                  {data.map((item, index) => {
                    return (
                      <Post
                        title={item.title}
                        authorName={item.user.fullName}
                        tags={item.tags}
                        imageUrl={item.imageUrl}
                        text={item.text}
                        key = {index}
                      />
                    )
                  })}
                </Carousel>
            )
        }
      </div>
    </div>
  );
}


function Post(props: IPost) {
  return (
    <div className={styles.post_container}>
      <div className={styles.post_left_side}>
        <p className={styles.post_left_side_title}>{props.title}</p>
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
          <p className={styles.post_right_side_text}>{props.text}</p>
          <Link to={'/register'}>
            <button className={styles.post_right_side_button}>Зарегистрируйся,чтобы прочитать полностью</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PopularPosts;
