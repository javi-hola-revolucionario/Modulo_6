import { useState } from "react";

const TweetForm = ({ onAddTweet }) => {
  const [text, setText] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAddTweet(text);
    setText("");
  };

  return (
    <form className="tweet-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Escribe tu jugada o comentario del partido..."
      />
      <button type="submit">Publicar</button>
    </form>
  );
};

export default TweetForm;