import React from "react";
import "./App.css";
import Post from "./component/post/Post";

function App() {
  return (
    <div className="App">
      <div className="app__header">
        <img
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="logo"
          className="app__headerImage"
        />
      </div>
      <Post post={{}} />
    </div>
  );
}

export default App;
