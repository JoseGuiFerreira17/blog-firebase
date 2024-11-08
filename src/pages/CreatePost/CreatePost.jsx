import styles from "./CreatePost.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.create_post}>
      <h2>Criar Post</h2>
      <p>Compartilhe suas ideias, pensamentos e inspire outras pessoas com seu novo post.</p>
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
            onChange={(e) => setImage(e.target.files[0])}
            required
            placeholder="Insira uma imagem"
          />
        </label>
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
        <button type="submit" className="btn">
          Criar Post
        </button>
        {/* {!loading && (<button type="submit" className="btn">
          Criar Post
        </button>)}
        {loading && (<button type="submit" className="btn" disabled>} */}
        {formError && <p>{formError}</p>}
      </form>
    </div>
  );
}

export default CreatePost;
