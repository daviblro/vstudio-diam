import "./App.css";
import Header from "./Header";
import Artista from "./Artista";
import Artistas from "./Artistas";

function App() {
  return (
    <>
      <Header key="header"/>

      {Artistas.map((artista) => (
        <Artista
          nome={artista.nome}
          imagem={artista.imagem}
          estilo={artista.estilo}
          descricao={artista.descricao}
          data={artista.data}
          hora={artista.hora}
          urlvideo={artista.urlvideo}
          id={artista.id}
          key={artista.id}
          length={Artistas.length - 1}
        />
      ))}
    </>
  );
}

export default App;
