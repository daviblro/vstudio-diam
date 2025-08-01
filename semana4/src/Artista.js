import React from "react";

function Artista(props) {

  function handleClick(nome) {
    const video = document.getElementById(nome);
    if (video.style.display === "block") {
      video.style.display = "none";
    }
    else {
      video.style.display = "block";
    }
  }

  return (
    <>
      <div className="ApresentacaoArtista">
        <p className="NomeArtista">
          Nome: {props.nome}
        </p>
        <p className="AtuacaoArtista">
          Atuação: {props.data} às {props.hora}
        </p>
        <img className="ImagemArtista"
          src={props.imagem}
          alt={props.nome}
          onClick={() => handleClick(props.nome)}
        ></img>
        <iframe title={props.nome} id={props.nome} className="VideoArtista"
          src={props.urlvideo} // Passando a URL do vídeo
          allowFullScreen
        ></iframe>
        <p className="EstiloArtista">
          Estilo Musical: {props.estilo}
        </p>
        <section className="DescricaoArtista">
          Descrição: {props.descricao}
        </section>
      </div>
      {props.id < props.length && (
        <hr
          style={{
            width: "60%",
            borderRadius: "50%",
            height: "5px",
            backgroundColor: "#000000",
          }}
        ></hr>
      )}
    </>
  );
}

export default Artista;
