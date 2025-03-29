import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Resultados() {
    const [respostas, setRespostas] = useState([]);
    const navigate = useNavigate();

    // Carregar respostas anteriores do sessionStorage
    useEffect(() => {
        const storedData = sessionStorage.getItem("respostasInquerito");
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setRespostas(Array.isArray(parsedData) ? parsedData : []); // Garante que seja um array
        }
    }, []);

    // Contagem de artistas preferidos
    const contagemArtistas = respostas
        .flatMap((r) => r.selectedArtists || [])
        .reduce((acc, artista) => {
            acc[artista] = (acc[artista] || 0) + 1;
            return acc;
        }, {});

    // Contagem de horários preferidos
    const contagemHorarios = respostas
        .flatMap((r) => r.selectedHorarios || [])
        .reduce((acc, horario) => {
            acc[horario] = (acc[horario] || 0) + 1;
            return acc;
        }, {});

    const limparResultados = () => {
        sessionStorage.removeItem("respostasInquerito");
        setRespostas([]);
    }

    return (
        <>
            <div className="container">
                <Header />
                <div className="content">
                    <h2>Resultados do Inquérito</h2>

                    <h3>Artistas mais escolhidos:</h3>
                    <ul>
                        {Object.entries(contagemArtistas).map(([artista, count]) => (
                            <li key={artista}>{artista}: {count} votos</li>
                        ))}
                    </ul>

                    <h3>Horários mais preferidos:</h3>
                    <ul>
                        {Object.entries(contagemHorarios).map(([horario, count]) => (
                            <li key={horario}>{horario}: {count} votos</li>
                        ))}
                    </ul>

                    <h3>Críticas Recebidas:</h3>
                    <ul>
                        {respostas.map((r, index) => (
                            <li key={index}>{r.criticas}</li>
                        ))}
                    </ul>
                        
                    <button className="botao" onClick={() => navigate(-1)}>
                        Voltar
                    </button>

                    <button className="botao" onClick={() => limparResultados()}>
                        Limpar Resultados
                    </button>
                </div>
                <Footer />
            </div>
        </>
    );
}

export default Resultados;
