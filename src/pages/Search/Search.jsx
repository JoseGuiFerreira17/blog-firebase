import styles from "./Search.module.css";

import { Link } from "react-router-dom";

import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useQuery } from "../../hooks/useQuery";

import PostDetail from "../../components/PostDetail/PostDetail";

function Search() {
  const query = useQuery();
  const search = query.get("q");

  const { documents: posts, loading } = useFetchDocuments("posts", search);
  return (
    <div className={styles.search_container}>
      <h2>Search</h2>
      <div>
        {loading && <p>Carregando...</p>}
        {posts && posts.map((post) => <PostDetail post={post} key={post.id} />)}
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <h3>Nenhum post encontrado</h3>
            <Link to="/" className="btn btn-dark">
              {" "}
              Voltar
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
