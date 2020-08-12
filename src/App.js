import React, { useState, useEffect } from "react";
import Post from "./component/post/Post";
import { db } from "./firebase";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts").onSnapshot(snapshot => {
      console.log(snapshot);
      setPosts(snapshot.docs.map(doc => ({ post: doc.data, id: doc.id })));
    });
  }, []);

  return (
    <div className="App">
      <div className="app__header">
        <img
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="logo"
          className="app__headerImage"
        />
      </div>
      {posts.map(({ post, id }) => (
        <Post post={post} key={id} />
      ))}
    </div>
  );
}

export default App;
