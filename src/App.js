import { useEffect } from "react";
import React from "react";
import "./App.css";
import Login from "./components/login";
import { useStateProvider } from "./utils/StateProvider";
import { reducerCases } from "./utils/Constants";
import Spotify from "./components/Spotify";

function App() {
  const [{ token }, dispatch] = useStateProvider();
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = hash.substring(1).split("&")[0].split("=")[1];
      console.log(token);
      dispatch({ type: reducerCases.SET_TOKEN, token });
    }
  }, [token, dispatch]);
  return (
    <div>
      {token ? <Spotify /> : <Login />    }
    </div>
  );
}

export default App;
