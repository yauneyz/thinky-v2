import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import fonts from "../constants/fonts";
import colorscheme from "../constants/colorscheme";

const LandingBackground = styled.div`
  background-color: ${colorscheme.primary};
  height: 100%;
`;

const LandingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-top: 1em;
`;

const LandingTextContainer = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LandingVideoContainer = styled.div`
  width: 80%;
  max-width: 64rem;
  max-height: 500px;
  overflow: hidden;
  padding: 1em;
`;

const LandingVideo = styled.video`
  width: 100%;
  height: auto;
`;

const Logo = styled.img`
  height: 5em;
  display: inline;
  margin-right: auto;
  margin-top: 0;
`;

const LandingTitle = styled.h1`
  font-size: 3em;
  font-weight: bold;
  font-family: ${fonts.heading};
  margin-top: 5px;
  margin-bottom: 0;
  display: inline;
  padding: 0;
`;

const LandingTagline = styled.h2`
  font-size: 1.5em;
  font-weight: bold;
  font-family: ${fonts.body};
  margin-top: 10px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 1em;
`;

const LandingButton = styled.button`
  background-color: ${colorscheme.secondary};
  color: white;
  font-size: 1em;
  font-weight: bold;
  font-family: ${fonts.body};
  cursor: pointer;
  border-radius: 10px;
  width: 200px;
  height: 50px;
  display: inline-block;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
  -webkit-text-stroke: 0.6px white;
  transition: all 0.2s ease-in-out;
  box-shadow: 4px 4px 60px rgba (0, 0, 0, 0.2);
`;

const BlogLink = styled(Link)`
  color: ${colorscheme.contastText};
  text-decoration: none;
  font-size: 1em;
  font-weight: bold;
  font-family: ${fonts.body};
  transition: all 0.2s ease-in-out;
  &:hover {
    color: ${colorscheme.secondary};
  }
`;

function Landing() {
  return (
    <LandingBackground>
      {" "}
      <LandingContainer>
        <LandingTextContainer>
          <Logo src={process.env.PUBLIC_URL + "/light_logo.png"} />
          <LandingTitle>Thinky: The Idea Editor</LandingTitle>
          <LandingTagline>
            Explore ideaspace with the only text editor designed for lateral
            thinking
          </LandingTagline>
          <BlogLink to="/blog">
            Click here to read the full explanation
          </BlogLink>
          <ButtonsContainer>
            <Link to="/register">
              <LandingButton>Join the Free Beta</LandingButton>
            </Link>
            <Link to="/login">
              <LandingButton>Login</LandingButton>
            </Link>
          </ButtonsContainer>
        </LandingTextContainer>
        <LandingVideoContainer>
          <LandingVideo autoPlay loop muted>
            <source
              src={process.env.PUBLIC_URL + "/landing.mp4"}
              type="video/mp4"
            />
          </LandingVideo>
        </LandingVideoContainer>
      </LandingContainer>
    </LandingBackground>
  );
}
export default Landing;
