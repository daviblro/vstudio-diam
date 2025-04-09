import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DetailData from "./DetailData";
import { Link } from "react-router-dom";

//
function DetailPage({ question }) {
  // (1)
  const URL_OPTIONS = "http://localhost:8000/votacao/api/options/"; // (2)
  const [showModal, setShowModal] = useState(false); // (3)
  const [optionList, setOptionList] = useState([]); // (4)
  const getOptions = () => {
    // (5)
    axios.get(URL_OPTIONS + question.pk).then((request) => {
      setOptionList(request.data);
    });
  };

  const navigate = useNavigate();

  const toggleModal = () => {
    // (6)
    if (!showModal) getOptions();
    setShowModal((showModal) => !showModal);
  };
  return (
    <>
      <button
        onClick={() => navigate("/Exemplo", { state: { question } })}
        className="btn-warning"
      >
        Detalhe
      </button>
    </>
  );
}
export default DetailPage;
