import styles from './PopularPosts.module.css'
import { useGetPopularPostsQuery } from "../../../../redux/posts/postsApi";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Loading from "../../../Loading/Loading";
import PostMini from "../../../PostMini/PostMini";

function PopularPosts() {
  const {data, error, isLoading} = useGetPopularPostsQuery('')
  if (error) {
    console.log('PopularPostsError:', error)
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
                  stopOnHover={true}
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
                      <PostMini
                        title={item.title}
                        authorName={item.user.fullName}
                        tags={item.tags}
                        imageUrl={item.imageUrl}
                        text={item.text}
                        key = {index}
                        scale={1}
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


export default PopularPosts;
