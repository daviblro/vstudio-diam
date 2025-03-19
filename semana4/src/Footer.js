import React from "react";
import "./Footer.css";

function Footer() {
  const [isVisible, setIsVisible] = React.useState(true);

  return (
    <>
      <footer onClick={() => setIsVisible(!isVisible)} className="footer">
        <div className={`${isVisible ? "opacity-1" : "opacity-0"} div`}>
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
