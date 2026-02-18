import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const ContainerTopo = styled.div`
  display: flex;
  justify-content: center;
  background-color: red;
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

export const Card = styled.div<{ size?: number, cor?: string }>`
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