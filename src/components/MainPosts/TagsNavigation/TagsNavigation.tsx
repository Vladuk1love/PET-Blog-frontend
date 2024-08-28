import styles from './TagsNavigation.module.css';


// У наиболее популярных вытащить теги
const TAGS = ['наука', 'еда' ,'новости','новости','новости','новости','новости','новости','новости','новости','новости','новости','новости','новости', 'техника','новости', 'котята','наука','новости', 'котята','наука', 'еда' ,'наука', 'техника','новости', 'котята','наука', 'техника']

function TagsNavigation() {
  return (
      <div className={styles.tags_navigation_container}>
      {TAGS.map(
        (item) => (
          <p>{item}</p>
        )
      )}
    </div>
  );
}

export default TagsNavigation;