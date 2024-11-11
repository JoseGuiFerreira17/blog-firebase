import styles from "./Post.module.css";

import { useFetchDocument } from "../../hooks/useFetchDocument";
import { useParams } from "react-router-dom";

const Post = () => {
  const { id } = useParams();
  const { document: post, error, loading } = useFetchDocument("posts", id);

  console.log(error);

  return (
    <div className={styles.post_container}>
      {loading && <p>Carregando...</p>}
      {error && <p>{error}</p>}
      {post && (
        <>
          <h1>{post.title}</h1>
          <img src={post.image} alt={post.title} />
          <p>{post.body}</p>
          <h3>Este post é sobre:</h3>
          <div className={styles.tags}>
            {post.tags && post.tags.length > 0 ? (
              post.tags.map((tag) => (
                <p key={tag}>
                  <span>#</span>
                  {tag}
                </p>
              ))
            ) : (
              <p>Sem tags</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Post;
