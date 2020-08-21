import React from "react";
import "./styles.scss";

import Avatar from "@material-ui/core/Avatar";

const Post = ({
  post: {
    username = "a",
    caption = "lorem",
    imageUrl = "https://www.timeoutdubai.com/public/styles/full_img/public/images/2020/07/13/IMG-Dubai-UAE.jpg?itok=ZxMZvtVv"
  }
}) => {
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
    </div>
  );
};

export default Post;
