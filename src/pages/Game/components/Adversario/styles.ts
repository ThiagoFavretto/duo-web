import styled, { keyframes, css } from "styled-components";

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(255, 255, 0, 0.7);
  }
  50% {
    box-shadow: 0 0 15px 5px rgba(255, 255, 0, 0.9);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 255, 0, 0.7);
  }
`;

export const Card = styled.div<{ size?: number }>`
  width: ${({ size = 220 }) => size}px;
  height: ${({ size = 220 }) => size * 1.5}px;

  background: linear-gradient(135deg, #c40000, #ff1a1a);
  border-radius: ${({ size = 220 }) => size * 0.07}px;

  box-shadow: 0 ${({ size = 220 }) => size * 0.05}px
    ${({ size = 220 }) => size * 0.11}px rgba(0, 0, 0, 0.4);

  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    width: 150%;
    height: 150%;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.15) 0%,
      transparent 60%
    );
    transform: rotate(25deg);
  }
`;

export const Oval = styled.div<{ size?: number }>`
  width: ${({ size = 220 }) => size * 0.72}px;
  height: ${({ size = 220 }) => size * 1}px;

  background: black;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotate(-25deg);

  box-shadow: inset 0 0 ${({ size = 220 }) => size * 0.07}px
    rgba(255, 255, 255, 0.2);
`;

export const UnoText = styled.span<{ size?: number }>`
  color: #ffcc00;
  font-size: ${({ size = 220 }) => size * 0.22}px;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  transform: rotate(35deg);
  letter-spacing: ${({ size = 220 }) => size * 0.01}px;
`;


export const TotalCards = styled.div`
 display: flex;
 align-items: center;
 justify-content: center;
 max-width: 130px;
 flex-wrap: wrap;
 height: 90px;
`;

export const Content = styled.div< { vez?: boolean; } >`
user-select: none;
 display: flex;
 align-items: center;
 justify-content: center;
 flex-direction: column;
 margin: 15px;

  border: ${({ vez = false }) => vez ? '3px solid yellow' : 'none'};
  border-radius: 8px; 

    animation: ${({ vez }) => vez ? css`${pulse} 1.5s infinite` : "none"};
`;

export const Container = styled.div< { row?: boolean; } >`
 display: flex;
 flex-direction: ${({ row }) => row ? 'row' : 'column'};
 justify-content: space-between;
 overflow: auto;
`;

export const Nome = styled.div`
   color: white;
   text-transform: uppercase;
   width: 130px;
   display: flex;
 text-align: center;
 align-items: center;
 justify-content: center;
 word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
`;
export const NumeroCartas = styled.div`
   color: white;
   border: 2px solid black;
   padding:5px;
   margin:5px;
   color: yellow;
   font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
`;
