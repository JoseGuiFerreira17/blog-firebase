import styles from "./Dashboard.module.css";

import { Link } from "react-router-dom";

import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useDeleteDocument } from "../../hooks/useDeleteDocument";

function Dashboard() {
  const { user } = useAuthValue();
  const uid = user.uid;
  const { documents: posts, error, loading } = useFetchDocuments("posts", null, uid);
  const { deleteDocument } = useDeleteDocument("posts");

  // const deleteDocument = async (id) => {
  //   if (window.confirm("Deseja realmente excluir este post?")) {
  //     // De
  //   }
  // };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className={styles.dashboard}>
      <h2>Dashboard</h2>
      <p>Gerencie seus post</p>
      {posts && posts.length === 0 ? (
        <div className={styles.moposts}>
          <p>Não foram encontrados posts</p>
          <Link to="/create-post" className="btn">
            Criar post
          </Link>
        </div>
      ) : (
        <>
          <div className={styles.post_header}>
            <span>Título</span>
            <span>Ações</span>
          </div>
          {posts &&
            posts.map((post) => (
              <div key={post.id} className={styles.post_row}>
                <p>{post.title}</p>
                <div>
                  <Link to={`/post/${post.id}`} className="btn btn-outline">
                    Ver
                  </Link>
                  <Link to={`/edit-post/${post.id}`} className="btn btn-outline">
                    Editar
                  </Link>
                  <button
                    onClick={() => deleteDocument(post.id)}
                    className="btn btn-outline btn-danger"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
}

export default Dashboard;
