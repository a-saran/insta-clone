import React from "react";
import Authentication from "../sign-up/SignUp";

const Header = ({ user }) => {
  return (
    <div className="app__header">
      <div className="container space-between">
        <img
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="logo"
          className="app__headerImage"
        />
        <Authentication user={user} />
      </div>
    </div>
  );
};

export default Header;
