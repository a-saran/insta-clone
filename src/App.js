import React, { useState, useEffect } from "react";
import Posts from "./component/posts/Posts";
import { auth } from "./firebase";
import Profile from "./component/profile/profile";
import Authentication from "./component/sign-up/SignUp";
import Header from "./component/header/Header";

import "./App.scss";

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
    <div className="app">
      <Header user={user} />
      <div className="container app__body">
        <Posts user={user} />
        <Profile user={user} />
      </div>
    </div>
  );
}

export default App;
