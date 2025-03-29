import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import artistas from "./Artistas";

function Inquerito() {
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [selectedHorarios, setSelectedHorarios] = useState([]);
  const [criticas, setCriticas] = useState("");
  const navigate = useNavigate();

  const horarios = ["18:00", "19:00", "21:00", "22:00", "23:00"];

  // Carregar respostas anteriores do sessionStorage
  useEffect(() => {
    const storedData = sessionStorage.getItem("respostasInquerito");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setSelectedArtists(parsedData.selectedArtists || []);
      setSelectedHorarios(parsedData.selectedHorarios || []);
      setCriticas(parsedData.criticas || "");
    }
  }, []);

  // Atualizar sessionStorage quando as respostas mudarem
  // useEffect(() => {
  //   const respostas = { pergunta1: selectedArtists, pergunta2: selectedHorarios, pergunta3: criticas };
  //   sessionStorage.setItem("respostasInquerito", JSON.stringify(respostas));
  // }, [selectedArtists, selectedHorarios, criticas]);

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

    // Recupera os dados anteriores do sessionStorage
    const storedData = JSON.parse(sessionStorage.getItem("respostasInquerito")) || [];

    // Garante que os dados sejam armazenados como array
    const previousData = Array.isArray(storedData) ? storedData : [];

    // Adiciona a nova resposta
    const updatedData = [...previousData, { selectedArtists, selectedHorarios, criticas }];

    // Salva no sessionStorage
    sessionStorage.setItem("respostasInquerito", JSON.stringify(updatedData));

    navigate("/RespostaInquerito", {
      state: { dados: { pergunta1: selectedArtists, pergunta2: selectedHorarios, pergunta3: criticas } },
    });
  }

  return (
    <>
      <div className="container">
        <Header />
        <div className="content">
          <form onSubmit={handleSubmit}>

            <label htmlFor="selectedArtistas">Quais foram os artistas que gostou no festival?</label>
            <div className="checkbox-container">
              {artistas.map((artista, index) => (
                <label
                  key={index}
                  className="checkbox-label"
                >
                  <input
                    type="checkbox"
                    value={artista.nome}
                    checked={selectedArtists.includes(artista.nome)}
                    onChange={handleSelectedArtistsChange}
                  />
                  {artista.nome}
                </label>
              ))}
            </div>

            <label htmlFor="selectedHorarios">Qual o seu horário preferido para os concertos?</label>
            <div className="checkbox-container">
              {horarios.map((horario, index) => (
                <label
                  key={index}
                  className="checkbox-label"
                >
                  <input
                    type="checkbox"
                    value={horario}
                    checked={selectedHorarios.includes(horario)}
                    onChange={handleHorarioChange}
                  />
                  {horario}
                </label>
              ))}
            </div>

            <label htmlFor="criticas">Críticas:</label>
            <textarea
              type="text"
              required
              id="criticas"
              name="criticas"
              value={criticas}
              onChange={(e) => setCriticas(e.target.value)}
            />

            <input type="submit" className="botao" value="Submeter" />
          </form>

          <div style={{ textAlign: "center" , height: "10vh"}}>
            <button className="botao" onClick={() => navigate("/Resultados")}>
              Ver Resultados
            </button>
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
}

export default Inquerito;
