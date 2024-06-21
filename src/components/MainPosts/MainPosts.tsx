import styles from './MainPosts.module.css'
import { useGetPostsQuery } from "../../redux/posts/postsApi";


function MainPosts() {
  const { data, error, isLoading } = useGetPostsQuery("")
  return (
    <>
      <p>Посты</p>
      {
        isLoading ? <p>Loading...</p> : console.log(data)
      }
    </>
  );
}

export default MainPosts;