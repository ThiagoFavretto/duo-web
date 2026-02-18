import { Container, ContainerModal, ModalNick, InputNick, ButtonOk, Entrar, Content } from "./styles";
import { useState } from "react";
import { criarService, entrarService } from "../../services/loginService";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [nick, setNick] = useState("");
  const [codigoSala, setCodigoSala] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingEntrar, setLoadingEntrar] = useState(false);
  const navigate = useNavigate();

  async function handleCriarSala() {
    try {
      setLoading(true);
      const data = await criarService(nick);

      localStorage.setItem("codigoJogador", data.codigoJogador);
      localStorage.setItem("nick", nick);

      navigate(`/sala/${data.codigoSala}`, {
        state: { criar: true }
      });
    } catch (e) {
      console.log(e)
      navigate(`/`);
    } finally {
      setLoading(false);
    }
  }

  async function handleEntrar() {
    try {
      setLoadingEntrar(true);
      const data = await entrarService(nick, codigoSala);

      localStorage.setItem("codigoJogador", data.codigoJogador);
      localStorage.setItem("nick", nick);

      navigate(`/sala/${data.codigoSala}`, {
        state: { criar: false }
      });
    } catch (e) {
      console.log(e)
      navigate(`/`);
    } finally {
      setLoadingEntrar(false);
    }
  }

  return (
    <Container>
      <Content disabled={nick.length == 0}>
        <ModalNick>
          <InputNick placeholder="Nick" maxLength={25} value={nick}
            onChange={(e) => setNick(e.target.value)} />
        </ModalNick>
        <ContainerModal disabled={nick.length == 0}>
          <Entrar>
            <InputNick placeholder="Codigo da sala" maxLength={30} value={codigoSala}
              onChange={(e) => setCodigoSala(e.target.value)} />
            <ButtonOk disabled={codigoSala.length == 0 || loadingEntrar}
              onClick={handleEntrar} >
              {loadingEntrar ? "Entrando..." : "Entrar"}</ButtonOk>
          </Entrar>
          <ButtonOk
            disabled={nick.length === 0 || loading}
            onClick={handleCriarSala}
          >
            {loading ? "Criando..." : "Criar sala"}
          </ButtonOk>
        </ContainerModal>
      </Content>
    </Container>
  );
}
