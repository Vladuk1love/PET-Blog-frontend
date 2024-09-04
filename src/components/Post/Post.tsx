import { useParams } from "react-router-dom";
import { useGetPostQuery } from "../../redux/posts/postsApi";
import eye from './../../public/visible_15715241.png'
import Loading from "../Loading/Loading";
import styles from "./Post.module.css";

function Post() {
  const { id } = useParams();

  const { data, isLoading, error } = useGetPostQuery(id ?? "");
  if (error) {
    console.log(error);
  }

  return isLoading || !data ? (
    <Loading />
  ) : (
    <div className={styles.post_container}>
      <div className={styles.post_upside_container}>
        <div className={styles.post_info_container}>
          <h1>{data.title}</h1>
          <div className={styles.post_left_side_tags}>
          {data.tags.map(( item)=>{
            return(
            <p className={styles.post_left_side_tag}>
              {item}
            </p>)
          })}
          </div>
          
          <p>{data.user.fullName}</p>
          <p style={{display:'flex', alignItems:'center', gap:'5px'}}><img src={eye} alt="Views" width={'25px'} height={'25px'}/> {data.viewsCount}</p>
        </div>
        <div className={styles.post_image_container}>
          <img src={data.imageUrl} alt={`Пост by ${data.user.fullName}`} width={'700px'} height={'280px'}/>
        </div>
      </div>
      <div className={styles.post_text_container}>
        <p>{data.text}</p>
      </div>
    </div>
  );
}

export default Post;
