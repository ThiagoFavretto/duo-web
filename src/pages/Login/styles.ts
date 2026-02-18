import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Content = styled.div< { disabled?: boolean; } >`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: ${({ disabled }) => disabled ? '#c7c7c7b6' : '#fff'};
  border-radius: 8px;
`;

export const ModalNick = styled.div`
  width: 350px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 8px ;
  background-color: #fff;
  border-radius: 8px;
`;

export const InputNick = styled.input` 
  height: 48px;
  border-radius: 8px;
  border: 2px solid #c7c5c5;
  flex: 1;
  padding: 5px;

   &:focus {
        outline: none;
        box-shadow: 0px 0px 2px blue;
    }
`;

export const ContainerModal = styled.div < { disabled?: boolean; } > `
  width: 350px;
  display: flex;
  align-items: flex-end;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  flex-direction: column;
  padding: 0px 8px 8px 8px;
  pointer-events: ${({ disabled }) => disabled ? "none" : "auto"};
  opacity: ${({ disabled }) => disabled ? 0.5 : 1};
`;

export const ButtonOk = styled.button < { disabled?: boolean; } >`
  width: 75px;
  height: 38px;
  background-color: #25D480;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: #fff;
    pointer-events: ${({ disabled }) => disabled ? "none" : "auto"};
  opacity: ${({ disabled }) => disabled ? 0.5 : 1};
`;

export const Entrar = styled.div`
width: 100%;
display: flex;
gap: 10px;
align-items: center;
justify-content: center;
margin: 30px 0;
`;