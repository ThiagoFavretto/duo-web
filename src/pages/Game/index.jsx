import {
  Container, ContainerJogador, ContainerCentro, ContainerEsquerda, ContainerTopo, ContainerDireita, ContainerTabuleiro, Card, NumberTopLeft, NumberBottomRight, CenterNumber, CenterOval,
  Comecar, Jogar, Overlay, ContainerCor, Cor, ContainerCarta, ContainerBaralho, CartaFundo, CartaTopo,
  Numero, Oval

} from "./styles";
import { useState, useEffect, useRef } from "react";
import { Adversario } from "./components/Adversario";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import { comecarService, jogarCarta, comprarCartaService } from "../../services/GameService";
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
  const [jogadorSessao, setJogadorSessao] = useState("");
  const [curingaJogado, setCuringaJogado] = useState(false);
  const [acumulador, setAcumulador] = useState(0);
  const [tipoOrdenacao, setTipoOrdenacao] = useState("cor")
  const [ganhador, setGanhador] = useState("")

  const vezJogadorRef = useRef();
  const jogadorSessaoRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    vezJogadorRef.current = vezJogador;
  }, [vezJogador]);

  useEffect(() => {
    jogadorSessaoRef.current = jogadorSessao;
  }, [jogadorSessao]);

  useEffect(() => {
    const codigoJogador = localStorage.getItem("codigoJogador");
    if (!codigoJogador) {
      navigate("/");
    }
    setNick(localStorage.getItem("nick"));
    setJogadorSessao(codigoJogador);

    const socket = io(import.meta.env.VITE_BASE, {
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
      setMinhasCartas(data.cartas);
    });

    socket.on("partidaIniciada", (data) => {
      setGanhador("")
      setComecar(true)
      setCartaMesa(data.cartaMesa);
      setVezJogador(data.jogadorAtual)
    });

    socket.on("coringaJogado", () => {
      setCuringaJogado(true)
    });

    socket.on("atualizarMesa", (data) => {
      diminuirContadorCarta(data.jogadores)
      setCartaMesa(data.cartaMesa)
      setVezJogador(data.jogadorAtual);
      setAcumulador(data.acumulador)
    });

    socket.on("ganhador", (data) => {
      setGanhador(data.ganhador)
    });

    socket.on("disconnect", () => {
      console.log("Desconectado");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

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

  function diminuirContadorCarta(jogadores) {
    const atualizar = (grupo) =>
      grupo.map(jogador => {
        const jogadorAtualizado = jogadores.find(j => j.id === jogador.id);

        if (jogadorAtualizado) {
          return {
            ...jogador,
            quantidadeCartas: jogadorAtualizado.cartasJogadorRestante
          };
        }

        return jogador;
      });

    setGrupo1(prev => atualizar(prev));
    setGrupo2(prev => atualizar(prev));
    setGrupo3(prev => atualizar(prev));
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

  function podeJogarCarta(carta) {
    if (vezJogador != jogadorSessao) return false;

    if (carta.valor === "coringa" || carta.valor === "+4") {
      return true;
    }

    if (carta.cor === cartaMesa.cor || carta.valor === cartaMesa.valor) {
      return true;
    }

    return false;
  }

  async function handleJogarCarta(carta, index) {
    const bkMinhasCartas = minhasCartas;
    try {
      if (!podeJogarCarta(carta)) {
        return;
      }

      setMinhasCartas(prev => prev.filter((_, i) => i !== index));

      await jogarCarta(codigoSala, carta);
    } catch (e) {
      console.log(e)
      setMinhasCartas(bkMinhasCartas)
    }
  }

  async function handleEscolherCor(cor) {
    try {
      if (vezJogador == jogadorSessao && curingaJogado) {
        await jogarCarta(codigoSala, { valor: cartaMesa.valor, cor });
        setCuringaJogado(false)
      }
    } catch (e) {
      console.log(e)
    }
  }

  function ordenarCartas() {
    setMinhasCartas(prev => {
      const copia = [...prev];

      if (tipoOrdenacao === "cor") {

        const ordemCores = ["#D72600", "#0956BF", "#379711", "#ECD407"];

        copia.sort((a, b) => {
          const corA = ordemCores.indexOf(a.cor);
          const corB = ordemCores.indexOf(b.cor);

          if (corA !== corB) return corA - corB;
          return a.valor - b.valor;
        });

        setTipoOrdenacao("valor");

      } else {

        copia.sort((a, b) => {
          if (a.valor < b.valor) return -1;
          if (a.valor > b.valor) return 1;
          return a.cor.localeCompare(b.cor);
        });

        setTipoOrdenacao("cor");
      }

      return copia;
    });
  }

  async function handleComprarCarta() {
    try {
      if (vezJogador == jogadorSessao && !curingaJogado) {
        await comprarCartaService(codigoSala);
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Container>
      <ContainerTopo><Adversario top={true} players={grupo2} vezJogador={vezJogador}></Adversario></ContainerTopo>
      <ContainerTabuleiro>
        <ContainerEsquerda><Adversario top={false} players={grupo1} vezJogador={vezJogador}></Adversario></ContainerEsquerda>
        <ContainerCentro>{
          comecar ? (
            ganhador ? (<Comecar>
              Acabo<br />
              Ganhdor: {ganhador}
              <Jogar disabled={loading} onClick={handleComecar}>{loading ? "Iniciando..." : "Novo jogo"}</Jogar>
              <div>{codigoSala}</div>
            </Comecar>) : (
              <ContainerCarta>
                <ContainerBaralho onClick={handleComprarCarta} >
                  <CartaFundo />
                  <CartaTopo>
                    <Oval>
                      <Numero>DUO</Numero>
                    </Oval>
                  </CartaTopo>
                </ContainerBaralho>
                {curingaJogado ? (
                  <>
                    <Card size={tamanhoCartasCentro} cor={cartaMesa.cor}>
                      <NumberTopLeft size={tamanhoCartasCentro}>{processarCarta(cartaMesa.valor)}</NumberTopLeft>
                      <NumberBottomRight size={tamanhoCartasCentro}>{processarCarta(cartaMesa.valor)}</NumberBottomRight>
                      <CenterOval size={tamanhoCartasCentro}>
                        <CenterNumber size={tamanhoCartasCentro}>{processarCarta(cartaMesa.valor)}</CenterNumber>
                      </CenterOval>
                    </Card>
                    <ContainerCor>
                      <Cor cor={"#D72600"} onClick={() => handleEscolherCor("#D72600")}></Cor>
                      <Cor cor={"#0956BF"} onClick={() => handleEscolherCor("#0956BF")}></Cor>
                      <Cor cor={"#379711"} onClick={() => handleEscolherCor("#379711")}></Cor>
                      <Cor cor={"#ECD407"} onClick={() => handleEscolherCor("#ECD407")}></Cor>
                    </ContainerCor>
                  </>

                ) : (
                  <Card size={tamanhoCartasCentro} cor={cartaMesa.cor} vez={vezJogador == jogadorSessao}>
                    <NumberTopLeft size={tamanhoCartasCentro}>{processarCarta(cartaMesa.valor)}</NumberTopLeft>
                    <NumberBottomRight size={tamanhoCartasCentro}>{processarCarta(cartaMesa.valor)}</NumberBottomRight>
                    <CenterOval size={tamanhoCartasCentro}>
                      <CenterNumber size={tamanhoCartasCentro}>{processarCarta(cartaMesa.valor)}</CenterNumber>
                    </CenterOval>
                  </Card>
                )}

                {acumulador > 0 ? (<div>Acumulado +{acumulador}</div>) : (<div></div>)}

              </ContainerCarta>
            )
          ) : (
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
        <button onClick={ordenarCartas} style={{ height: 20 }}>{nick} [{minhasCartas.length}]</button>
        {minhasCartas.map((carta, index) => (
          <Card key={index} size={tamanhoCartas} cor={carta.cor} onClick={() => handleJogarCarta(carta, index)}>
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
