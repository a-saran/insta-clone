import React, { useState, useEffect } from "react";
import Post from "../post/Post";
import { db } from "../../firebase";
import "./styles.scss";

const Posts = ({ user }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot(snapshot => {
        setPosts(snapshot.docs.map(doc => ({ post: doc.data(), id: doc.id })));
      });
  }, []);

  return (
    <div className="posts_container">
      {posts ? (
        posts.map(({ post, id }) => (
          <Post post={post} postId={id} key={id} user={user} />
        ))
      ) : (
        <h1>No posts Available</h1>
      )}
    </div>
  );
};

export default Posts;
