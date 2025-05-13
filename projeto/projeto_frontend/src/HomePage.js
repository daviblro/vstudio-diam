import "./HomePage.css";
import Header from "./Header";
import { useEffect, useState } from "react";
import axios from "axios";

function HomePage() {
    const [csrfToken, setCsrfToken] = useState("");
    const [user, setUser] = useState("");

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
            {/* <Footer/> */}
        </>
    );
}

export default HomePage;