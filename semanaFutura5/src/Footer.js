import React from "react";
import "./Footer.css";

function Footer() {//seria melhor em vez de mudar opacidade, eliminar e adicionar os elementos, assim grantiamos a centralização
  const [isVisible, setIsVisible] = React.useState(true);

  return (
    <>
      <footer onClick={() => setIsVisible(!isVisible)} className="footer">
        {/* <div className={`${!isVisible ? "opacity-1" : "opacity-0"} div  `}>Versão Original ....</div> */}
        <div className={`${isVisible ? "opacity-1" : "opacity-0"} div `}>
          Davi Balieiro
          <br />
          Guilherme Riço
          <br />
          Ji Zhu
          <br />
        </div>
      </footer>
    </>
  );
}
export default Footer;
