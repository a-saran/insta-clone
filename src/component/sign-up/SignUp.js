import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import { Button, Input } from "@material-ui/core";

import { getModalStyle, useStyles } from "./utils";
import { auth } from "../../firebase";

import "./styles.scss";

const Authentication = ({ user }) => {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isLogInModalOpen, setIsLogInModalOpen] = useState(false);
  const [modalStyle] = useState(getModalStyle);
  const [formvalues, setFormValues] = useState({
    password: "",
    email: "",
    userName: ""
  });

  const classes = useStyles();

  const onChange = ({ target: { name, value } }) => {
    setFormValues({
      ...formvalues,
      [name]: value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    const { email, password, userName } = formvalues;

    if (userName.length < 4) {
      return alert("Username must be minimum 4 characters");
    }

    auth
      .createUserWithEmailAndPassword(email, password)
      .then(authUser => {
        return authUser.user.updateProfile({
          displayName: userName
        });
      })
      .then(() => {
        setFormValues({
          password: "",
          email: "",
          userName: ""
        });
        setIsSignUpModalOpen(false);
      })
      .catch(err => alert(err.message));
  };

  const onSignIn = e => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(formvalues.email, formvalues.password)
      .then(() => {
        setIsLogInModalOpen(false);
      })
      .catch(err => {
        alert(err);
      });
  };

  return (
    <div>
      {user ? (
        <Button onClick={() => auth.signOut()}>Sign out</Button>
      ) : (
        <div className="authentication-container">
          <Button onClick={() => setIsSignUpModalOpen(true)}>Sign Up</Button>
          <Button onClick={() => setIsLogInModalOpen(true)}>Log In</Button>
        </div>
      )}
      {/* Sign up Modal */}
      <Modal
        open={isSignUpModalOpen}
        onClose={() => setIsSignUpModalOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <center>
            <img
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt="logo"
              className="app__headerImage"
            />
            <form className="posts__signup" onSubmit={onSubmit}>
              <Input
                placeholder="user name"
                type="text"
                name="userName"
                value={formvalues.userName}
                onChange={onChange}
                minLength="4"
              />
              <Input
                placeholder="email"
                type="text"
                name="email"
                value={formvalues.email}
                onChange={onChange}
              />
              <Input
                placeholder="password"
                type="password"
                name="password"
                value={formvalues.name}
                onChange={onChange}
              />

              <div>
                <Button type="submit">Sign Up</Button>
              </div>
            </form>
          </center>
        </div>
      </Modal>

      {/* Sign in Modal */}
      <Modal open={isLogInModalOpen} onClose={() => setIsLogInModalOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <center>
            <img
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt="logo"
              className="app__headerImage"
            />
            <form className="posts__signup" onSubmit={onSignIn}>
              <Input
                placeholder="email"
                type="text"
                name="email"
                value={formvalues.email}
                onChange={onChange}
              />
              <Input
                placeholder="password"
                type="password"
                name="password"
                value={formvalues.name}
                onChange={onChange}
              />

              <div>
                <Button type="submit">Sign Up</Button>
              </div>
            </form>
          </center>
        </div>
      </Modal>
    </div>
  );
};

export default Authentication;
