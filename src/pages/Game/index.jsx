import {
  Container, ContainerJogador, ContainerCentro, ContainerEsquerda, ContainerTopo, ContainerDireita, ContainerTabuleiro, Card, NumberTopLeft, NumberBottomRight, CenterNumber, CenterOval,
  Comecar, Jogar, Overlay
} from "./styles";
import { useState, useEffect } from "react";
import { Adversario } from "./components/Adversario";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import { comecarService } from "../../services/GameService";
import { AiOutlineStop } from "react-icons/ai";
import { GiRecycle } from "react-icons/gi";
import { MdWindow } from "react-icons/md";

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <Overlay isOpen={isOpen} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose}>&times;</button>
        <div>{children}</div>
      </div>
    </Overlay>
  );
};

export function Game() {
  const { codigoSala } = useParams();
  const location = useLocation();

  const criar = location.state?.criar;

  const [comecar, setComecar] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [tamanhoCartas, setTamanhoCartas] = useState(100)
  const [tamanhoCartasCentro, setTamanhoCartasCentro] = useState(180)
  const [grupo1, setGrupo1] = useState([]);
  const [grupo2, setGrupo2] = useState([]);
  const [grupo3, setGrupo3] = useState([]);
  const [loading, setLoading] = useState(false);
  const [minhasCartas, setMinhasCartas] = useState([]);
  const [temHost, setTemHost] = useState(true);
  const [cartaMesa, setCartaMesa] = useState({});
  const [nick, setNick] = useState("");
  const [vezJogador, setVezJogador] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const codigoJogador = localStorage.getItem("codigoJogador");
    setNick(localStorage.getItem("nick"));
    if (!codigoJogador) {
      navigate("/");
    }

    const socket = io("http://localhost:3333", {
      query: {
        codigoJogador,
        codigoSala
      }
    });

    socket.on("connect", () => {
      console.log("Conectado:", socket.id);
    });

    socket.on("novoJogador", (data) => {
      novoJogador(data, codigoJogador);
    });

    socket.on("suasCartas", (data) => {
      console.log(data)
      setMinhasCartas(data.cartas);
    });

    socket.on("partidaIniciada", (data) => {
      setComecar(true)
      console.log(data)
      setCartaMesa(data.cartaMesa);
      setVezJogador(data.jogadorAtual)
    });

    socket.on("disconnect", () => {
      console.log("Desconectado");
    });

    return () => {
      socket.disconnect();
    };
  }, [codigoSala, navigate]);

  function novoJogador(data, codigoJogador) {
    const host = data.some(jogador => jogador.host === true)
    if (!host) {
      setTemHost(host)
      return
    }
    let jogadores = [...data];

    const indiceJogador = jogadores.findIndex(
      j => j.id === codigoJogador
    );

    if (indiceJogador !== -1) {
      jogadores = [
        ...jogadores.slice(indiceJogador + 1),
        ...jogadores.slice(0, indiceJogador)
      ];
    }

    jogadores = jogadores.filter(j => j.id !== codigoJogador);

    const total = jogadores.length;
    const base = Math.floor(total / 3);
    const resto = total % 3;

    const tamanho1 = base + (resto > 0 ? 1 : 0);
    const tamanho2 = base + (resto > 1 ? 1 : 0);

    const arr1 = jogadores.slice(0, tamanho1).reverse();
    const arr2 = jogadores.slice(tamanho1, tamanho1 + tamanho2);
    const arr3 = jogadores.slice(tamanho1 + tamanho2);

    setGrupo1(arr1);
    setGrupo2(arr2);
    setGrupo3(arr3);
  }

  async function handleComecar() {
    try {
      setLoading(true);
      await comecarService(codigoSala);

    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false);
    }
  }

  async function sair() {
    localStorage.removeItem("codigoJogador");
    navigate(`/`);
  }

  function processarCarta(val) {
    if (val == 'inverter') {
      return <GiRecycle />
    } else if (val == 'pular') {
      return <AiOutlineStop />
    } else if (val == 'coringa') {
      return <MdWindow />
    }

    return val
  }

  return (
    <Container>
      <ContainerTopo><Adversario top={true} players={grupo2} vezJogador={vezJogador}></Adversario></ContainerTopo>
      <ContainerTabuleiro>
        <ContainerEsquerda><Adversario top={false} players={grupo1} vezJogador={vezJogador}></Adversario></ContainerEsquerda>
        <ContainerCentro>{
          comecar ? (
            <Container>
              <div>asd</div>
              <Card size={tamanhoCartasCentro} cor={cartaMesa.cor}>
                <NumberTopLeft size={tamanhoCartasCentro}>{processarCarta(cartaMesa.valor)}</NumberTopLeft>
                <NumberBottomRight size={tamanhoCartasCentro}>{processarCarta(cartaMesa.valor)}</NumberBottomRight>
                <CenterOval size={tamanhoCartasCentro}>
                  <CenterNumber size={tamanhoCartasCentro}>{processarCarta(cartaMesa.valor)}</CenterNumber>
                </CenterOval>
              </Card>
            </Container>) : (
            <Comecar>
              {criar ? (<>
                <div>{codigoSala}</div>
                Espere mais jogadores OU
                <Jogar disabled={loading} onClick={handleComecar}>{loading ? "Iniciando..." : "Começar agora"}</Jogar>
              </>) : (
                <div>{temHost ? (<>Aguarde o host iniciar</>) : (<button onClick={sair}>Host saiu</button>)} </div>
              )}

            </Comecar>
          )
        }</ContainerCentro>
        <ContainerDireita><Adversario top={false} players={grupo3} vezJogador={vezJogador}></Adversario>
          <button onClick={() => setModalOpen(true)}>Conf</button>
          <Modal
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
          >
            <input type="number" value={tamanhoCartas}
              onChange={(e) => {
                let valor = Number(e.target.value);
                if (valor > 250) valor = 250;
                if (valor < 40) valor = 40;
                setTamanhoCartas(valor);
              }}
              max={130} min={40} />
            <input type="number" value={tamanhoCartasCentro}
              onChange={(e) => {
                let valor = Number(e.target.value);
                if (valor > 180) valor = 180;
                if (valor < 40) valor = 40;
                setTamanhoCartasCentro(valor);
              }}
              max={180} min={40} />
          </Modal>
        </ContainerDireita>
      </ContainerTabuleiro>
      <ContainerJogador>
        <div style={{ color: '#fff' }}>{nick}</div>
        {minhasCartas.map((carta, index) => (
          <Card key={index} size={tamanhoCartas} cor={carta.cor}>
            <NumberTopLeft size={tamanhoCartas}>{processarCarta(carta.valor)}</NumberTopLeft>
            <NumberBottomRight size={tamanhoCartas}>{processarCarta(carta.valor)}</NumberBottomRight>
            <CenterOval size={tamanhoCartas}>
              <CenterNumber size={tamanhoCartas}>{processarCarta(carta.valor)}</CenterNumber>
            </CenterOval>
          </Card>
        ))}
      </ContainerJogador>
    </Container>
  );
}
