import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "react-slideshow-image/dist/styles.css";
import "./MainImages.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const images = [
  { id: 1, alt: "Imagem 4", src: require("./img/slideshow/try.jpeg") },
  { id: 2, alt: "Imagem 5", src: require("./img/slideshow/try2.jpeg") },
  { id: 3, alt: "Imagem 6", src: require("./img/slideshow/try3.jpeg") },
  { id: 4, alt: "Imagem 7", src: require("./img/slideshow/try4.jpeg") },
  { id: 5, alt: "Imagem 7", src: require("./img/slideshow/try5.jpeg") },
  { id: 6, alt: "Imagem 7", src: require("./img/slideshow/try6.jpeg") },
];

export default function MainImages() {

  const navigate = useNavigate();
  const startX = useRef(0);

  const handleStart = (e) => {
    startX.current = e.clientX;
  };

  const handleEnd = (e) => {
    const endX = e.clientX;

    if (Math.abs(endX - startX.current) < 5) {
      navigate("/Promocoes");
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
  };

  return (
    <div className="container">
      <Slider {...settings}>
        {images.map((item) => (
          <div key={item.id}>
            <div className="img-body">
              <img
                src={item.src}
                alt={item.alt}
                onMouseDown={handleStart}
                onMouseUp={handleEnd}
              />
              
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
