import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import { Button, Input } from "@material-ui/core";

import { getModalStyle, useStyles } from "./utils";
import { auth } from "../../firebase";

const SignUp = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      .catch(err => alert(err.message));
  };

  return (
    <div>
      <Button onClick={() => setIsModalOpen(true)}>Sign Up</Button>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
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
    </div>
  );
};

export default SignUp;
