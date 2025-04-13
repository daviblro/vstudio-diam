import React, { useEffect, useState } from "react";
import DetailData from "./DetailData";
import axios from "axios";

function Exemplo({ question }) {
  const [optionList, setOptionList] = useState([]); // (4)

  useEffect(() => {
    const URL_OPTIONS = "http://localhost:8000/votacao/api/options/";
    axios.get(URL_OPTIONS + question.pk).then((request) => {
      setOptionList(request.data);
    });
  }, [question.pk]);


  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">About Page</h1>
      <p>This is the About page content.</p>

      <DetailData options={optionList} question={question} />
    </div>
  );
}

export default Exemplo;
