import React from "react";
import './style.css';

function Header() {
    const hideImage = (event) => {
        event.target.style.opacity = "0";
    };

    const showImage = (event) => {
        event.target.style.opacity = "100";
    };

    return (
        <figure>
            <a
                href="https://www.festivalvilardemouros.pt/festival/"
                target="_blank"
                rel="noreferrer"
            >
                <img
                    id="image"
                    onMouseEnter={hideImage}
                    onMouseOut={showImage}
                    src={require("./images/esticada.jpg")}
                    alt="Erro ao carregar imagem!"
                    className="image-class"
                />
            </a>
        </figure>
    );
}
export default Header;
