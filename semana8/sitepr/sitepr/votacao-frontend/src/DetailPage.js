import React, { useEffect, useState } from "react";
import axios from "axios";
import DetailData from "./DetailData";
import { useParams, useNavigate } from "react-router-dom";

function DetailPage() {
  const URL_OPTIONS = "http://localhost:8000/votacao/api/options/";
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(URL_OPTIONS + id).then((res) => {
      setQuestion(res.data);
    });
    axios.get(URL_OPTIONS + id).then((res) => {
      setOptions(res.data);
    });
  }, [id]);

  if (!question) return <p>Carregando...</p>;

  return (
    <div className="container">
      <h2>Detalhes da Votação</h2>
      <DetailData question={question} options={options} toggle={() => navigate(-1)} />
    </div>
  );
}

export default DetailPage;
