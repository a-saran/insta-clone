import React, { useState } from "react";
import firebase from "firebase";
import "./styles.scss";
import { Button } from "@material-ui/core";
import { storage, db } from "../../firebase";

const Profile = ({ userName }) => {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState("");
  const [caption, setCaption] = useState("");

  const handleChange = ({ target }) => {
    if (target.files[0]) {
      setImage(target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
      "state_changed",
      snapshot => {
        // progress func..
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      err => {
        console.log(err.message);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: userName
            });

            setCaption("");
            setProgress(0);
            setImage(null);
          });
      }
    );
  };

  return (
    <div className="profile__container">
      <h1>New Post</h1>

      <progress value={progress} max="100" className="profile__progress" />

      <input
        type="text"
        placeholder="Enter a caption..."
        onChange={({ target: { value } }) => {
          setCaption(value);
        }}
        value={caption}
      />
      <input type="file" onChange={handleChange} />
      <Button color="primary" onClick={handleUpload}>
        Upload
      </Button>
    </div>
  );
};

export default Profile;
