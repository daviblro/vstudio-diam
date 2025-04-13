import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import VoteForm from "./VoteForm";

function VotePage() {
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
      <h2>Votação</h2>
      <VoteForm question={question} options={options} toggle={() => navigate(-1)} />
    </div>
  );
}

export default VotePage;
