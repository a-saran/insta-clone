import React, { useState, useEffect, Fragment } from "react";
import "./styles.scss";
import { db } from "../../firebase";
import firebase from "firebase";
import Avatar from "@material-ui/core/Avatar";

const Post = ({ post: { username, caption, imageUrl }, postId, user }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    let unSubscribe;
    if (postId) {
      unSubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timeStamp", "desc")
        .onSnapshot(shapshot => {
          setComments(shapshot.docs.map(doc => doc.data()));
        });
    }

    return () => {
      unSubscribe();
    };
  }, [postId]);

  const postComment = e => {
    e.preventDefault();

    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      userName: user.displayName,
      timeStamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    setComment("");
  };

  return (
    <div className="post">
      <div className="post__header">
        <Avatar className="post__avatar" alt="as" src="" />
        <h3>{username}</h3>
      </div>

      <img src={imageUrl} alt={username} className="post__image" />

      <h4 className="post__text">
        <strong>{username}</strong>
        {caption}
      </h4>

      {comments.length > 0 && (
        <div className="post__comments">
          {comments.map(comment => (
            <p>
              <b>{comment.userName}</b> {comment.text}
            </p>
          ))}
        </div>
      )}

      {user && (
        <form className="post__commentBox" onSubmit={postComment}>
          <input
            type="text"
            className="post__input"
            placeholder="Add a comment..."
            value={comment}
            onChange={({ target: { value } }) => setComment(value)}
          />
          <button disabled={!comment} className="post__button" type="submit">
            Post
          </button>
        </form>
      )}
    </div>
  );
};

export default Post;
