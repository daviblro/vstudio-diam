import "./App.css";
import Header from "./Header";
import Artista from "./Artista";
import Artistas from "./Artistas";

function App() {
  const artistaAlinea1 = [//Nao tem urlvideo.
    {
      nome: "Artista",
      imagem: "/images/6.jpg",
      estilo: "Pop",
      descricao:"Descrição: Algo sobre o Festival.",
      data: "2021-07-30",
      hora: "21:00",
      urlvideo: "https://www.youtube.com/embed/zbs06__3378",
    },

  ];

  return (
    <>
      <Header />
      <p style={{ textAlign: "center", fontSize: "30px", fontWeight: "bold" }}>Alínea 1</p>
      {artistaAlinea1.map((artista) => (
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
      <h3 style={{ textAlign: "center", fontSize: "30px", fontWeight: "bold" }}>Alínea 3</h3>

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

    </>
  );
}

export default App;
