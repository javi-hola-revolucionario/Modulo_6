import { useState, useEffect } from "react";
import TweetList from "../components/tweetlist";
import TweetForm from "../components/tweetform";

const Home = ({ user, logout }) => {
  const [tweets, setTweets] = useState([]);
  useEffect(() => {
    const storedTweets = JSON.parse(localStorage.getItem("tweets")) || [];
    setTweets(storedTweets);
  }, []);

  useEffect(() => {
    localStorage.setItem("tweets", JSON.stringify(tweets));
  }, [tweets]);

  const addTweet = (text) => {
    const newTweet = {
      id: Date.now(),
      text,
      likes: 0,
    };

    setTweets([newTweet, ...tweets]);
  };

  const likeTweet = (id) => {

    setTweets(
      tweets.map((tweet) =>
        tweet.id === id ? { ...tweet, likes: tweet.likes + 1 } : tweet
      )
    );
  };

  return (
    <div>
      {user && (
        <div style={{ marginBottom: 12 }}>
          <strong>Hola, {user.username}</strong>
          <button onClick={logout} style={{ marginLeft: 8 }}>Cerrar sesión</button>
        </div>
      )}
      <TweetForm onAddTweet={addTweet} />
      <TweetList tweets={tweets} onLike={likeTweet} />
    </div>
  );
};

export default Home;