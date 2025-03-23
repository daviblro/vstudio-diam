import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="Header">
      Semana 5 - Apresentação de Artistas
      <div style={{ display: "flex", width: "100%", justifyContent: "flex-start" }}>
        <Link to="/">
          <button className="btn">Home</button>
        </Link>
        <Link to="/FormVoluntario">
          <button className="btn">Formulário de Voluntários</button>
        </Link>
      </div>
    </div>
  );
}

export default Header;
