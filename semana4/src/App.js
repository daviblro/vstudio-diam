import "./App.css";
import Header from "./Header";
import Artista from "./Artista";
import Artistas from "./Artistas";

function App() {
  return (
    <>
      <Header />

      {Artistas.map((artista, index) => (
        <Artista
          nome={artista.nome}
          imagem={artista.imagem}
          estilo={artista.estilo}
          descricao={artista.descricao}
          data={artista.data}
          hora={artista.hora}
          urlvideo={artista.urlvideo}
          id={index}
          length={Artistas.length - 1}
        />
      ))}
    </>
  );
}

export default App;
