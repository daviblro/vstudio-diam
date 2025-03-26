import React, { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

function Inquerito() {
  const [pergunta1, setPergunta1] = useState([]);
  const [pergunta2, setPergunta2] = useState([]);
  const [pergunta3, setPergunta3] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const dados = {
      pergunta1: selectedArtists.join(", "), // Converte o array de artistas para string
      pergunta2: selectedHorarios.join(", "), // Converte o array de horários
      pergunta3
    }; // Cria um objeto com as respostas
    navigate("/RespostaInquerito", { state: { dados } }); // Redireciona para a página de respostas
  }

  const [selectedArtists, setSelectedArtists] = useState([]);
  const [selectedHorarios, setSelectedHorarios] = useState([]);

  // Lista de opções ajustada (removendo espaços extras)
  const artistas = ["SZA", "SKZ", "X&P", "BC"];
  const horarios = ["20:00", "22:00", "23:00", "00:00"];

  
  /* 
  Se o artista já estiver na lista, ele remove o artista. (prev.filter((item) => item !== value)):
    Cria um novo array com todos os artistas que são diferentes do artista selecionado.
  Se o artista não estiver na lista, ele adiciona o artista à lista. ([...prev, value]):
    Cria um novo array com todos os artistas anteriores e adiciona o artista selecionado.
*/
  const handleSelectedArtistsChange = (e) => {
    const value = e.target.value;
    setSelectedArtists((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const handleHorarioChange = (e) => {
    const value = e.target.value;
    setSelectedHorarios((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit}>
        <label
          htmlFor="pergunta1"
          style={{ width: "100%", textAlign: "center" }}
        >
          Quais foram os artistas que gostou no festival?
        </label>
        <br />
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px", // Espaçamento maior entre checkboxes        
          }}
        >
          {artistas.map((option, index) => (
            <label
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px", // Espaço entre a checkbox e o texto
                width: "100%", // Adiciona largura total
              }}
            >
              <input
                type="checkbox"
                value={option}
                checked={selectedArtists.includes(option)}
                onChange={handleSelectedArtistsChange}
                style={{
                  position: "relative",
                  width: "20px",
                  height: "20px",
                }}
              />
              <div >{option}</div>
            </label>
          ))}
        </section>

        <label htmlFor="pergunta2">
          Qual o seu horário preferido para os concertos?
        </label>
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px", // Espaçamento maior entre checkboxes        
          }}
        >
          {horarios.map((horario, index) => (
            <label
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px", // Espaço entre a checkbox e o texto
                width: "100%", // Adiciona largura total
              }}
            >
              <input
                type="checkbox"
                value={horario}
                checked={selectedHorarios.includes(horario)}
                onChange={handleHorarioChange}
                style={{
                  width: "20px",
                  height: "20px",
                  verticalAlign: "middle",
                }}
              />
              <div>{horario}</div>
            </label>
          ))}
        </section>

        <label htmlFor="pergunta3">Críticas:</label>
        <input
          type="text"
          required
          id="pergunta3"
          name="pergunta3"
          value={pergunta3}
          onChange={(e) => setPergunta3(e.target.value)}
        />

        <input type="submit" className="botao" value="Submeter" />
      </form>
      <Footer />
    </>
  );
}

export default Inquerito;
