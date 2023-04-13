import React from "react";
import styled from "styled-components";
import "./styles/login.css";

const handleClick = () => {
  const clientId = "8690bb5ff6594acab344a13d50bbb820";
  const redirectUrl = "http://localhost:3000/";
  const apiUrl = "https://accounts.spotify.com/authorize";
  const scope = [
    "user-read-email",
    "user-read-private",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "user-read-playback-position",
    "user-top-read",
    "user-read-recently-played",
  ];
  window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope.join(
    " "
    )}&response_type=token&show_daialog=true`;
};

export default function Login() {
  return (
    <Container>
      <div className="container">
        <img
          src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png"
          alt="spotify"
        />
        <button onClick={handleClick}> Login Spotify</button>
      </div>
    </Container>
  );
}

const Container = styled.div``;
