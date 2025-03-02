import React from "react";
import 'react-slideshow-image/dist/styles.css'
import './slideShow.css'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const images = [
    {
        id: 1,
        title: "Imagem 1",
        alt: "Imagem 1",
        src: require('./images/slideshow/1.jpg'),
    },
    {
        id: 2,
        title: "Imagem 2",
        alt: "Imagem 2",
        src: require('./images/slideshow/2.jpg'),
    },
    {
        id: 3,
        title: "Imagem 3",
        alt: "Imagem 3",
        src: require('./images/slideshow/3.jpg'),
    },
    {
        id: 4,
        title: "Imagem 4",
        alt: "Imagem 4",
        src: require('./images/slideshow/4.jpg'),
    },
    {
        id: 5,
        title: "Imagem 5",
        alt: "Imagem 5",
        src: require('./images/slideshow/5.jpg'),
    },
    {
        id: 6,
        title: "Imagem 6",
        alt: "Imagem 6",
        src: require('./images/slideshow/6.jpg'),
    },
];

export default function MainImages() {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div className="container">
            <Slider {...settings}>
                {images.map((item) => (
                    <div key={item.id}>
                        <div className="img-body">
                            <img src={item.src} alt={item.alt} />
                        </div>
                        <div>
                            <h2>{item.title}</h2>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    )
}
