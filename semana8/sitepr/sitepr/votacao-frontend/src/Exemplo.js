import React, { useEffect, useState } from "react";
import DetailData from "./DetailData";
const [optionList, setOptionList] = useState([]); // (4)
import axios from "axios";

function Exemplo({ question }) {
  
    const getOptions = () => {
    const URL_OPTIONS = "http://localhost:8000/votacao/api/options/"; // (2)
    axios.get(URL_OPTIONS + question.pk).then((request) => {
      setOptionList(request.data);
    });
  };

  useEffect(() => {
    getOptions();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">About Page</h1>
      <p>This is the About page content.</p>

      <DetailData options={optionList} question={question} />
    </div>
  );
}

export default Exemplo;
