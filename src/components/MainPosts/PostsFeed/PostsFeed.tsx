import styles from './PostsFeed.module.css';
import { IPosts } from "../../../redux/schemaTypes";
import PostMini from "../../PostMini/PostMini";

interface IPostsFeedProps {
  posts: IPosts[],
}

function PostsFeed(props: IPostsFeedProps) {
  return (
    <div className={styles.posts_feed_container}>
      {props.posts.map((item, index) => (
        <PostMini
          key={index}
          _id={item._id}
          title={item.title}
          authorName={item.user.fullName}
          tags={item.tags}
          imageUrl={item.imageUrl}
          text={item.text}
          scale={1}
        />
      ))}
    </div>
  );
}

export default PostsFeed;