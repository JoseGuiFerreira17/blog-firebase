import styles from "./EditPost.module.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";
import { useFetchDocument } from "../../hooks/useFetchDocument";

function EditPost() {
  const { id } = useParams();

  const { document: post } = useFetchDocument("posts", id);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setImage(post.image);
      setBody(post.body);

      const textTags = post.tags && Array.isArray(post.tags) ? post.tags.join(", ") : "";
      setTags(textTags);
    }
  }, [post]);

  const { updateDocument, response } = useUpdateDocument("posts");

  const { user } = useAuthValue();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    try {
      new URL(image);
    } catch {
      setFormError("URL da imagem inválida");
    }

    if (formError) {
      return;
    }

    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    if (!title || !image || !body || !tags) {
      setFormError("Preencha todos os campos");
      return;
    }

    const data = {
      title,
      image,
      body,
      tags: tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    };
    updateDocument(data, id);
    navigate("/dashboard");
  };

  return (
    <div className={styles.edit_post}>
      {post && (
        <>
          <h2>Editar Post</h2>
          <p>Altere os dados do post como desejar</p>
          <form onSubmit={handleSubmit}>
            <label>
              <span>Título:</span>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Seu título..."
              />
            </label>
            <label>
              <span>URL da Imagem:</span>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
                placeholder="Insira uma imagem"
              />
            </label>
            <p className={styles.preview}>Preview da imagem:</p>
            <img src={post.image} alt={post.title} className={styles.img_preview} />
            <label>
              <span>Corpo:</span>
              <textarea
                name="bodu"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
                placeholder="Insira o conteúdo do post..."
              />
            </label>
            <label>
              <span>Tags:</span>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Insira as tags separadas por vírgula"
              />
            </label>
            {!response.loading && (
              <button type="submit" className="btn">
                Editar Post
              </button>
            )}
            {response.loading && (
              <button type="submit" className="btn" disabled>
                Aguarde...
              </button>
            )}
            {response.error ||
              (formError && <p className="error">{response.error || formError}</p>)}
          </form>
        </>
      )}
    </div>
  );
}

export default EditPost;
