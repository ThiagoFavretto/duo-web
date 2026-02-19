import styled, { keyframes, css } from "styled-components";

const pulse = keyframes`
  0% {
    box-shadow: 0 0 1px 0 rgba(255, 255, 255, 0.7);
  }
  50% {
    box-shadow: 0 0 15px 5px rgba(255, 255, 255, 0.9);
  }
  100% {
    box-shadow: 0 0 1px 0 rgba(255, 255, 255, 0.7);
  }
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const ContainerCarta = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ContainerTopo = styled.div`
  display: flex;
  justify-content: center;
`;

export const ContainerTabuleiro = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
flex: 1;
`;

export const ContainerCentro = styled.div`
 flex: 1;
 height: 100%;
 display: flex;
 align-items: center;
 justify-content: center;
`;

export const ContainerEsquerda = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ContainerDireita = styled.div`
   height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ContainerJogador = styled.div`
display: flex;
flex-wrap: wrap;
max-height: 320px;
overflow: auto;
  justify-content: center;
  padding-top: 10px;
`;

export const Comecar = styled.div`
  width: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-radius: 8px;
  padding: 40px 10px;
  flex-direction: column;
  gap: 20px;
`;

export const Jogar = styled.button< { disabled?: boolean; } >`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 50px;
  
  background-color: #25D480;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
   pointer-events: ${({ disabled }) => disabled ? "none" : "auto"};
  opacity: ${({ disabled }) => disabled ? 0.5 : 1};
`;

///////////////////////////

export const Card = styled.div<{ size?: number, cor?: string, vez?: boolean; }>`
  width: ${({ size = 220 }) => size}px;
  height: ${({ size = 220 }) => size * 1.5}px;
  background-color:  ${({ cor }) => cor};
  border-radius: ${({ size = 220 }) => size * 0.07}px;
  box-shadow: 0 6px 12px rgba(0,0,0,0.3);
  position: relative;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  cursor: pointer;
  user-select: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-20px);
    box-shadow: 0 16px 25px rgba(0, 0, 0, 0.5);
  }

  animation: ${({ vez }) => vez ? css`${pulse} 1.5s infinite` : "none"};
`;

export const CornerNumber = styled.span<{ size?: number }>`
  position: absolute;
  font-size: ${({ size = 220 }) => size * 0.25}px;
  font-weight: bold;
  color: #FEF7E2;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

export const NumberTopLeft = styled(CornerNumber)`
  top: ${({ size = 220 }) => size * 0.08}px;
  left: ${({ size = 220 }) => size * 0.08}px;
`;

export const NumberBottomRight = styled(CornerNumber)`
  bottom: ${({ size = 220 }) => size * 0.08}px;
  right: ${({ size = 220 }) => size * 0.08}px;
`;

export const CenterOval = styled.div<{ size?: number }>`
  width: ${({ size = 220 }) => size * 0.6}px;
  height: ${({ size = 220 }) => size * 0.6 * 1.2}px; /* oval levemente vertical */
  border: 4px solid #FEF7E2;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CenterNumber = styled.span<{ size?: number }>`
  font-size: ${({ size = 220 }) => size * 0.4}px;
  font-weight: bold;
  color:  #FEF7E2;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Overlay = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const ContainerCor = styled.div`
  width: 220px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, auto);
  gap: 20px; 
  position: absolute;
  margin-top: 215px;
`;

export const Cor = styled.div<{ cor: string }>`
  background-color: ${({ cor }) => cor};
  width: 100%;
  height: 100px;
`;

export const ContainerBaralho = styled.div`
  width: 120px;
  height: 180px;
  position: relative;
  cursor: pointer;
  margin-bottom: 40px;
  user-select: none;
`;

export const CartaFundo = styled.div`
  width: 103%;
  height: 103%;
  border-radius: 8px;
  background: linear-gradient(135deg, #fff, #d72600, #fff, #d72600);
  position: absolute;
  top: 0;
  left: 0;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4);
  transition: transform 0.2s ease;
`;

export const CartaTopo = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #c40000, #ff1a1a);
  border-radius: 8px;
  box-shadow: 0 11px 24px rgba(0, 0, 0, 0.4);
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

export const Numero = styled.div`
    color: #ffcc00;
  font-size: 28px;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  transform: rotate(35deg);
  letter-spacing: 1px;
`;

export const Oval = styled.div`
  width: 90px;
  height: 140px;
  background: black;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotate(-25deg);
  box-shadow: inset 0 0 15px rgba(255, 255, 255, 0.2);
`;