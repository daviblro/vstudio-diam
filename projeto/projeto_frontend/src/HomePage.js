import "./HomePage.css";
import Header from "./Header";
import { useEffect, useState } from "react";
import axios from "axios";
import image from './img/images.jpg';

function HomePage() {
    const [csrfToken, setCsrfToken] = useState("");
    const [user, setUser] = useState("");
    const [products, setProducts] = useState([]);

    const dummyProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: "€99.99",
    image: "/img/images.jpg",
  },
  {
    id: 2,
    name: "Smartphone",
    price: "€499.99",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "Laptop",
    price: "€999.99",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    name: "Smart Watch",
    price: "€199.99",
    image: "https://via.placeholder.com/150",
  },
  
];
    useEffect(() => {
    // Simulating a fetch from an API
    setProducts(dummyProducts);
  }, []);
    useEffect(() => {
        // Busca o CSRF token do endpoint backend
        axios
            .get("http://localhost:8000/api/csrf/", { withCredentials: true })
            .then((response) => {
                setCsrfToken(response.data.csrfToken);
            })
            .catch((error) => {
                console.error("Erro ao buscar CSRF token:", error);
            });
    }, []);

    // Render the HomePage component with Header, Content, and Footer
    return (
        <>
            <Header />
            {/* <Content/> */}
                            {/* Product Listing */}
      <body class="homepage">
        <h2>Our Products</h2>
        <div className="grid">
          {products.map((product) => (
            <div
              key={product.id}
              className="card"
            >
              <img
                src={image}
                alt={product.name}
              />
              <p className="card-price">{product.price}</p>
              <h1 className="card-title">{product.name}</h1>
              <div className="add-button">
                <button>
                Add to Cart
              </button>
              </div>
            </div>
          ))}
        </div>
      </body>
            {/* <Footer/> */}
        </>
    );
}

export default HomePage;