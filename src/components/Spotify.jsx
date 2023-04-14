import React from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Body from "./Body";
import Footer from "./Footer";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";

export default function Spotify() {
  const [{ token }, dispatch] = useStateProvider();
  const bodyRef = useRef();
  const [navBackground,setNavBackground] = useState(false);
  const [headerBackground,setHeaderbackground] = useState(false);
  
  const bodyScrolled = () => {
    bodyRef.current.scrollTop >= 40 
    ?setNavBackground(true) 
    : setNavBackground(false);
    bodyRef.current.scrollTop >= 268 
    ?setHeaderbackground(true) 
    : setHeaderbackground(false);
  }

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

        <div className="body" ref={bodyRef} onScroll={bodyScrolled}>
          <Navbar navBackground={navBackground} />
          <div className="body_contents">
            <Body headerBackground={headerBackground} />
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
    grid-template-columns: 15vw 85vw;
    height: 100%;
    width: 100%;
    background-image: linear-gradient(1deg, black, transparent);
    background-color: rgb(32, 87, 100);
  }
  .body {
    height: 100%;
    width: 100%;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.7rem;
      max-height: 2rem;
      &-thumb {
        background-color: rgba(255, 255, 255, 0.6);
      }
  }
`;






 