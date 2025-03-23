import React from "react";
import "./Footer.css";

function Footer() {
  const textos = [
    "Festival Vilar de Mouros 2025.",
    "Autores da Página: Davi Balieiro, Guilherme Riço, Ji Zhu."
  ];
  
  const [index, setIndex] = React.useState(0);

  return (
    <footer onClick={() => setIndex((prevIndex) => 1 - prevIndex)} className="footer">
      <div className="div">{textos[index]}</div>
    </footer>
  );
}

export default Footer;
