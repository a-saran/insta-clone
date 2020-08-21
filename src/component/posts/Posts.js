import React, { useState, useEffect } from "react";
import Post from "../post/Post";
import { db } from "../../firebase";
import SignUp from "../sign-up/SignUp";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts").onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({ post: doc.data, id: doc.id })));
    });
  }, []);

  return (
    <div>
      <SignUp />
      {posts.map(({ post, id }) => (
        <Post post={post} key={id} />
      ))}
    </div>
  );
};

export default Posts;
