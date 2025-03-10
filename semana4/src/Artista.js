import React from "react";
//----------------------------------Alínea 1--------------------------------
/*
@props: nome, imagem, estilo, descricao, urlvideo, data e hora.
@return: retorna a apresentação do artista.
*/

//Falta abrir o vídeo no youtube on click na imagem

function Artista(props) {
  const [showVideo, setShowVideo] = React.useState(false);
  
  const openyt = () => {
    setShowVideo(!showVideo);
  };
  
  return (
    <>
      <div className="Artista">
        <p className="TopicoApresentacao">Nome: {props.nome}</p>
        <p className="TopicoApresentacao">
          Atuação: {props.data} às {props.hora}
        </p>
        <img
          src={props.imagem}
          alt={props.nome}
          className="TopicoApresentacao"
          onClick={() => openyt(props.urlvideo)}
          style={{ width: "50%", height: "50%" }}
        ></img>
        {showVideo && (
          <div id="AparecerVideo">
            <iframe
              width="560"
              height="315"
              src={props.urlvideo} // Passando a URL do vídeo
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
        <p className="TopicoApresentacao">Estilo Musical: {props.estilo}</p>
        <section className="TopicoApresentacao Descricao">
          {props.descricao}
        </section>
      </div>
      <hr
        style={{
          width: "60%",
          border: "none",
          height: "3px",
          backgroundColor: "grey",
        }}
      ></hr>
    </>
  );
}

export default Artista;
