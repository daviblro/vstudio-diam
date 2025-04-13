import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import DetailPage from "./DetailPage";
import VotePage from "./VoteModal";
import axios from "axios";

function QuestionTable() {
  const URL_QUESTIONS = "http://localhost:8000/votacao/api/questions/"; // (1)
  const [questionList, setQuestionList] = useState([]); // (2)
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
    <Table light>
      {/* (5) */}
      <thead>
        <tr>
          <th style={{ textAlign: "left" }}>Texto</th>
          <th style={{ textAlign: "right" }}>Controls</th>
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
              <td>{question.questao_texto}</td>
              <td style={{ textAlign: "center" }}>
                <div className="d-flex justify-content-center gap-2">
                  <DetailPage question={question} />
                  <VotePage question={question} />
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
}
export default QuestionTable;
