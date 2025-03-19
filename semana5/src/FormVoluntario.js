import Footer from "./Footer";
import React from "react";
import Header from "./Header";
import "./Footer.css";

function validarComentario() {
  const palavra = [
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
  var InputText = document.getElementById("comentario");
  var text = InputText.value;
  for (let word of palavra) {
    if (text.includes(word)) {
      InputText.value = "";
      temInsulto();
      return;
    }
  }
  hideMessage();
}
function temInsulto() {
  document.getElementById("error").style.opacity = "1";
}

function hideMessage() {
  document.getElementById("error").style.opacity = "0";
}

function FormVoluntario() {
  const [nome, setNome] = React.useState("");
  const [contacto, setContacto] = React.useState("+351-");
  const [data, setData] = React.useState(new Date());
  const [comentario, setComentario] = React.useState("");

const [isCommentValid, setIsCommentValid] = React.useState(true);

const handleComentarioChange = (e) => {
    const text = e.target.value;
    setComentario(text);
    const palavra = [
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
    for (let word of palavra) {
        if (text.includes(word)) {
            setIsCommentValid(false);
            return;
        }
    }
    setIsCommentValid(true);
};

return (
    <>
        <Header />

        <form
            onSubmit={(e) => {
                e.preventDefault();//impedir de recarregar a página, senao usar abra outra janela dps.
                alert(`Obrigado ${nome} pela sua inscrição, em breve será contactado pela organização do festival.`);
            }}
            method="get"
            target="_blank"
            style={{ textAlign: "center", height: "70.5vh" }}//brute force ocupar espaço
        >
            <label htmlFor="name">Nome</label>
            <input
                type="text"
                required
                id="name"
                name="name"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
            />
            <br />
            <br />
            Contacto
            <input
                type="tel"
                id="phone"
                name="phone"
                value={contacto}
                onChange={(e) => setContacto(e.target.value)}
                pattern="\+351-9[0-9]{8}"
                required
                title="+351-111222333"
            />
            <br />
            <br />
            Data
            <input
                type="date"
                id="data"
                name="data"
                max="2025-08-23"
                min="2025-08-21"
                value={data.toISOString().split("T")[0]}
                onChange={(e) => setData(new Date(e.target.value))}
                required
            />
            <br />
            <br />
            Comentário
            <input
                type="text"
                id="comentario"
                value={comentario}
                onChange={handleComentarioChange}
            />
            <p id="error" style={{ opacity: isCommentValid ? 0 : 1 }}>
                O comentário tem insultos
            </p>
            <br />
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
