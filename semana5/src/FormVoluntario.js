import Footer from "./Footer";
import React from "react";
import Header from "./Header";
import "./Footer.css";
import "./Form.css"

function FormVoluntario() {
  const [nome, setNome] = React.useState("");
  const [contacto, setContacto] = React.useState("+351-");
  const [data, setData] = React.useState("2025-08-21");
  const [comentario, setComentario] = React.useState("");

  const [isCommentValid, setIsCommentValid] = React.useState(true);

  const palavrasProibidas = [
    "Abécula",
    "Abentesma",
    "Achavascado",
    "Alimária",
    "Andrajoso",
    "Barregã",
    "Biltre",
    "Cacóstomo",
    "Cuarra",
    "Estólido",
    "Estroso",
    "Estultilóquio",
    "Nefelibata",
    "Néscio",
    "Pechenga",
    "Sevandija",
    "Somítico",
    "Tatibitate",
    "Xexé ou Cheché",
    "Xexelento",
  ];

  const handleComentarioChange = (e) => {
    const text = e.target.value;
    setComentario(text);
    setIsCommentValid(!palavrasProibidas.some((word) => text.includes(word)));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Obrigado ${nome} pela sua inscrição! Em breve será contactado pela organização do festival.`);
  };
  

  return (
    <>
      <Header />

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nome</label>
        <input
          type="text"
          required
          id="name"
          name="name"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <label htmlFor="phone">Contacto</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={contacto}
          onChange={(e) => setContacto(e.target.value)}
          pattern="\+351-9[0-9]{8}"
          required
          title="+351-999888777"
        />
        <label htmlFor="data">Data</label>
        <input
          type="date"
          id="data"
          name="data"
          min="2025-08-21"
          max="2025-08-23"
          value={data}
          onChange={(e) => setData(e.target.value)}
          required
        />
        <label htmlFor="name">Comentário</label>
        <input
          type="text"
          id="comentario"
          value={comentario}
          onChange={handleComentarioChange}
        />
        <p style={{ fontSize: "30px", opacity: isCommentValid ? 0 : 1 }}>
          O comentário tem insultos!!!
        </p>
        <input
          type="submit"
          className="botao"
          value="Submeter"
          disabled={!isCommentValid}
        />
      </form>
      <Footer />
    </>
  );
}

export default FormVoluntario;