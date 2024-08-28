import { useGetPostsCountQuery, useGetPostsQuery } from "../../redux/posts/postsApi";
import Loading from "../Loading/Loading";
import TagsNavigation from "./TagsNavigation/TagsNavigation";
import PostsFeed from "./PostsFeed/PostsFeed";
import PaginationBar from "./PaginationBar/PaginationBar";
import styles from './MainPosts.module.css'
import { useState } from "react";


function MainPosts() {
  const [page, setPage] = useState(1)
  const {data: posts, error: postsError, isLoading: postsLoading} = useGetPostsQuery(page)
  const {data: postCount} = useGetPostsCountQuery('')
  if(postsError){
    console.log(postsError)
  }
  return (
    postsLoading ? <Loading/> :
      <div className={styles.main_posts_container}>
        <TagsNavigation/>
        {posts ?
          <PostsFeed posts={posts} /> :
          <p style={{paddingTop:"20px"}}>Посты не найдены :(</p>
        }
        <hr/>
        <div style = {{width:'70%'}}>
          {posts && postCount && <PaginationBar page = {page} setPage = {setPage} postsCount = {postCount} scale ={1} postLimit={10}/>}
        </div>
      </div>
  );
}
export default MainPosts;