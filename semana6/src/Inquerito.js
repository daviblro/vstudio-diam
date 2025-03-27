import React, { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import artistas from "./Artistas"; // Assuming this is an array of objects

function Inquerito() {
  const [pergunta1, setPergunta1] = useState([]);
  const [pergunta2, setPergunta2] = useState([]);
  const [pergunta3, setPergunta3] = useState("");
  const navigate = useNavigate();

  const [selectedArtists, setSelectedArtists] = useState([]);
  const [selectedHorarios, setSelectedHorarios] = useState([]);

  const horarios = ["20:00", "22:00", "23:00", "00:00"];

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

  function handleSubmit(e) {
    e.preventDefault();
    const dados = {
      pergunta1: selectedArtists.join(", "),
      pergunta2: selectedHorarios.join(", "),
      pergunta3,
    };
    navigate("/RespostaInquerito", { state: { dados } });
  }

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
            gap: "10px",
          }}
        >
          {artistas.map((artista, index) => (
            <label
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                width: "100%",
              }}
            >
              <input
                type="checkbox"
                value={artista.nome} // Assuming the artist name is stored in a "name" property
                checked={selectedArtists.includes(artista.nome)}
                onChange={handleSelectedArtistsChange}
                style={{
                  position: "relative",
                  width: "20px",
                  height: "20px",
                }}
              />
              <div>{artista.nome}</div> {/* Display the artist name */}
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
            gap: "10px",
          }}
        >
          {horarios.map((horario, index) => (
            <label
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                width: "100%",
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
