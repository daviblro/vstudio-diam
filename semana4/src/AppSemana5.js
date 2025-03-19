import "./App.css";
import Header from "./Header";
import Artista from "./Artista";
import Artistas from "./Artistas";
import Footer from "./Footer";


function App() {
  return (
    <>
      <Header/>
      <p style={{ textAlign: "center", fontSize: "30px", fontWeight: "bold" }}>
        Alínea 1
      </p>

      <Artista
        nome="ArtistaNome"
        imagem="/images/6.jpg"
        estilo="Pop"
        descricao="Descrição: Algo sobre o Festival."
        data="2021-07-30"
        hora="21:00"
        urlvideo="https://www.youtube.com/embed/zbs06__3378"
      />
      <h3 style={{ textAlign: "center", fontSize: "30px", fontWeight: "bold" }}>
        Alínea 3
      </h3>

      {Artistas.map((artista) => (
        <Artista
          nome={artista.nome}
          imagem={artista.imagem}
          estilo={artista.estilo}
          descricao={artista.descricao}
          data={artista.data}
          hora={artista.hora}
          urlvideo={artista.urlvideo}
        />
      ))}
    <Footer />
    </>
  );
}

export default App;
