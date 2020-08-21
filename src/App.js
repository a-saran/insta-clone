import React, { useState, useEffect } from "react";
import Posts from "./component/posts/Posts";
import { auth } from "./firebase";

import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unSubcribe = auth.onAuthStateChanged(authUser => {
      if (authUser) {
        console.log(authUser);
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => {
      unSubcribe();
    };
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
      <Posts />
    </div>
  );
}

export default App;
