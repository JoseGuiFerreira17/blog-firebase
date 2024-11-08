import styles from "./Home.module.css";

import { useFetchDocuments } from "../../hooks/useFetchDocuments";

import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import PostDetail from "../../components/PostDetail/PostDetail";

function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { documents: posts, loading } = useFetchDocuments("posts");
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className={styles.home}>
      <h1>Veja nossos posts mais recentes</h1>
      <form onSubmit={handleSubmit} className={styles.search_form}>
        <input
          type="text"
          placeholder="Ou busque por tags..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-dark">Pesquisar</button>
      </form>
      <div>
        {loading && <p>Carregando...</p>}
        {posts && posts.map((post) => <PostDetail post={post} key={post.id} />)}
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <h2>Nenhum post encontrado</h2>
            <Link to="/create-post" className="btn">
              Crie um post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
