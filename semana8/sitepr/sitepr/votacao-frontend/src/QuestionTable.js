import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Table } from "reactstrap";
import axios from "axios";

function QuestionTable() {
  const URL_QUESTIONS = "http://localhost:8000/votacao/api/questions/"; // (1)
  const [questionList, setQuestionList] = useState([]); // (2)
  const navigate = useNavigate();
  const getQuestions = () => {
    // (3)
    axios.get(URL_QUESTIONS).then((res) => {
      setQuestionList(res.data);
    });
  };

  useEffect(() => {
    //(4)
    getQuestions();
  }, []);

  return (
    <div className="container mt-4">
      <Table light="true">
        {/* (5) */}
        <thead>
          <tr>
            <th style={{ textAlign: "center", verticalAlign: "middle" }}>Texto</th>
            <th style={{ textAlign: "center", verticalAlign: "middle" }}>Controls</th>
          </tr>
        </thead>
        <tbody>
          {questionList.length === 0 ? (
            <tr>
              <td colSpan="2" style={{ textAlign: "center" }}>
                Nenhuma pergunta disponível.
              </td>
            </tr>
          ) : (
            questionList.map((question) => (//por cada elemento do map
              <tr key={question.pk}>
                <td style={{ verticalAlign: "middle" }}>{question.questao_texto}</td>
                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                  <div className="d-flex justify-content-center gap-2">
                    <Button color="warning" onClick={() => navigate(`/detalhe/${question.pk}`)}>
                      Detalhes
                    </Button>
                    <Button color="success" onClick={() => navigate(`/votar/${question.pk}`)}>
                      Votar
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      <div className="d-flex justify-content-start mb-3">
        <Button color="primary" onClick={() => navigate("/nova")}>
          Nova Questão
        </Button>
      </div>
    </div>
  );
}
export default QuestionTable;
