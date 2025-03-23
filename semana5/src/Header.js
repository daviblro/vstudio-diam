import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <div className="Header">
        Exercício da semana 4
        <div style={{ display: "flex", gap: "10px" }}>
          <Link to="/">
            <button className="btn">Home</button>
          </Link>
          <Link to="/FormVoluntario">
            <button className="btn">Formulário de Voluntários</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Header;
