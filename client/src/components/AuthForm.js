import styled from "styled-components";
import colorscheme from "../constants/colorscheme";
import fonts from "../constants/fonts";

export const AuthForm = styled.form`
  background: ${colorscheme.transparentWhite};
  padding: 3em;
  height: 320px;
  border-radius: 20px;
  border-left: 1px solid ${colorscheme.primary};
  border-top: 1px solid ${colorscheme.primary};
  backdrop-filter: blur(10px);
  box-shadow: 20px 20px 40px -6px rgba(0, 0, 0, 0.2);
  text-align: center;
  position: relative;
  transition: all 0.2s ease-in-out;
`;

export const AuthTitle = styled.p`
  font-size: 2em;
  font-weight: bold;
  color: ${colorscheme.secondary};
  opacity: 0.7;
  -webkit-text-stroke: 0.7px white;
  margin: 0;
`;

export const AuthLabel = styled.label`
  color: blue;
`;

export const AuthInput = styled.input`
  background: transparent;
  width: 200px;
  padding: 1em;
  border: none;
  margin: 1em;
  border: 1px solid white;
  border-radius: 5000px;
  backdrop-filter: blur(5px);
  box-shadow: 4px 4px 60px rgba (0, 0, 0, 0.2);
  color: ${colorscheme.contrastText};
  font-family: ${fonts.body};
  font-weight: 500;
  transition: all 0.2s ease-in-out;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);

  &:focus {
    outline: none;
    border-left: 1px solid ${colorscheme.secondary};
    border-top: 1px solid ${colorscheme.secondary};
    box-shadow: 4px 4px 60px rgba (0, 0, 0, 0.2);
  }

  &:hover {
    background: ${colorscheme.transparentWhite};
    border: 1px solid ${colorscheme.secondary};
    box-shadow: 4px 4px 60px rgba (0, 0, 0, 0.2);
  }

  &[type="submit"],
  &[type="button"] {
    font-size: 1.2em;
    color: ${colorscheme.contrastText};
    font-family: ${fonts.heading};
  }
`;

export const AuthContainer = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
`;

export const AuthBackground = styled.div`
  background: linear-gradient(
    45deg,
    ${colorscheme.secondary},
    ${colorscheme.primary}
  );
  height: 100vh;
  font-family: ${fonts.heading};
`;
export const ResetPasswordLink = styled.a`
  color: black;
  font-size: 1.2rem;
  text-decoration: none;
  margin-top: 1rem;
  padding-bottom: 1em;
  &:hover {
    text-decoration: underline;
  }
  display: block;
`;
