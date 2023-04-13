import React from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Body from "./Body";
import Footer from "./Footer";
import { useEffect } from "react";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";

export default function Spotify() {
  const [{ token }, dispatch] = useStateProvider();
  useEffect(() => {
    const getUserInfo = async () =>{
      const {data} = await axios.get("https://api.spotify.com/v1/me", 
      { headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
      const userInfo = {
        userId : data.id,
        userName : data.display_name,
      };
      dispatch({type:reducerCases.SET_USER,userInfo})
     
    };
    getUserInfo();
  }, [dispatch, token]);
  return (
    <Container>
      <div className="spotify_body">
        <Sidebar />

        <div className="body">
          <Navbar />
          <div className="body_contents">
            <Body />
          </div>
        </div>
      </div>
      <div className="spotify_footer">
        <Footer />
      </div>
    </Container>
  );
}
const Container = styled.div`
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-rows: 85vh 15vh;

  .spotify_body {
    display: grid;
    grid-template-columns: 20vw 85vw;
    height: 100%;
    width: 100%;
    background-image: linear-gradient(1deg, black, transparent);
    background-color: rgb(32, 87, 100);
  }
  .body {
    height: 100%;
    width: 100%;
    overflow: auto;
  }
`;






 