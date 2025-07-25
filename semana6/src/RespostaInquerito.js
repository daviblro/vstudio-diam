import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { useLocation } from "react-router-dom";

function RespostaInquerito() {
  const location = useLocation();
  const aLocation = location.state.dados;

  if (!aLocation) {
    return (
      <>
        <Header />
        <p>Não foram recebidas respostas.</p>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="container">
        <Header />
        <div className="content">
          <p style={{ textAlign: "center", fontSize: "32px", fontWeight: "bold" }}>
            Inquérito ao público do Festival de Vilar de Mouros
          </p>
          <hr
            style={{
              width: "60%",
              borderRadius: "50%",
              height: "5px",
              backgroundColor: "#000000",
              margin: "0 auto",
            }}
          ></hr>
          <div style={{ textAlign: "center", fontSize: "28px", height: "68.5vh" }}>
            <p>
              <strong>Artistas favoritos: </strong>{aLocation.pergunta1.join(", ")}
            </p>
            <p>
              <strong>Horário preferido: </strong>{aLocation.pergunta2.join(", ")}
            </p>
            <p>
              <strong>Críticas: </strong>{aLocation.pergunta3}
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default RespostaInquerito;
