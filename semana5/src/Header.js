import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <div className="Header">
        Exercício da semana 4
        <div style={{ display: "flex", gap: "10px" }}>
          <Link
            to="/"
            style={{ opacity: 1 }}
            onMouseEnter={(e) => (e.target.style.opacity = 0.7)}
            onMouseLeave={(e) => (e.target.style.opacity = 1)}
          >
            Home
          </Link>
          <Link
            to="/FormVoluntario"
            style={{ opacity: 1 }}
            onMouseEnter={(e) => (e.target.style.opacity = 0.7)}
            onMouseLeave={(e) => (e.target.style.opacity = 1)}
          >
            Formulário de Voluntários
          </Link>
        </div>
      </div>
    </>
  );
}

export default Header;
