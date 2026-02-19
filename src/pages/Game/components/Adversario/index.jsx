import { TotalCards, Card, Oval, UnoText, Container, Nome, Content, NumeroCartas } from "./styles";

export function Adversario({ top, players, vezJogador }) {
  const size = 30

  function montarComponente() {
    return (
      <>
        {players.map((player, indexP) => (
          <Content key={indexP} vez={player.id == vezJogador}>
            <Nome>{player.nick} <NumeroCartas>{player.quantidadeCartas || 7}</NumeroCartas></Nome>
            <TotalCards>
              {Array.from({ length: player.quantidadeCartas && player.quantidadeCartas <= 7 ? player.quantidadeCartas : 7 }).map((_, index) => (
                <Card key={index} size={size}>
                  <Oval size={size}>
                    <UnoText size={size}>DUO</UnoText>
                  </Oval>
                </Card>
              ))}
            </TotalCards>
          </Content>
        ))}
      </>
    )
  }

  return (
    <Container row={top}>
      {montarComponente()}
    </Container>
  );
}
