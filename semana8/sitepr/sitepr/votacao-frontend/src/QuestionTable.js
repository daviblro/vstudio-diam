import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import DetailPage from "./DetailPage";
import VotePage from "./VotePage";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function QuestionTable() {
  const URL_QUESTIONS = "http://localhost:8000/votacao/api/questions/"; // (1)
  const [questionList, setQuestionList] = useState([]); // (2)
  const getQuestions = () => {
    // (3)
    axios.get(URL_QUESTIONS).then((request) => {
      setQuestionList(request.data);
    });
  };

  useEffect(() => {
    //(4)
    getQuestions();
  }, []);

  const navigate = useNavigate();

  return(  
    <Table light="true">
      {" "}
      {/* (5) */}
      <thead>
        <tr>
          <th style={{ textAlign: "left" }}>Texto</th>
          <th style={{ textAlign: "right" }}>Controls</th>
        </tr>
      </thead>
      <tbody>
        {questionList.map( ( question ) => (  //por cada elemento do map
            <tr key={question.pk}>
              <td>{question.questao_texto}</td>
              <td style={{ textAlign: "center" }}>  
                <DetailPage question={question} />
                <VotePage question={question} />
              </td>
            </tr>
          )
        )}
      </tbody>
    </Table>
  );
}
export default QuestionTable;
