import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    width: 100%;
    height: 100%;
  }
  
  body {
  font-family: sans-serif;
  margin: 0;
  min-height: 100vh;

  background-color: #0b5e2b;

  background-image:
    radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.6) 100%),

    repeating-radial-gradient(
      circle at 20% 30%,
      rgba(255,255,255,0.03) 0px,
      rgba(255,255,255,0.03) 2px,
      transparent 3px,
      transparent 6px
    ),

    repeating-radial-gradient(
      circle at 70% 60%,
      rgba(0,0,0,0.04) 0px,
      rgba(0,0,0,0.04) 2px,
      transparent 3px,
      transparent 6px
    );

  background-blend-mode: overlay;
}
`;
