import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import axios from "axios";
import DetailData from "./DetailData";

function DetailModal({ question }) {
  const URL_OPTIONS = "http://localhost:8000/votacao/api/options/";
  const [showModal, setShowModal] = useState(false);
  const [optionList, setOptionList] = useState([]);

  const getOptions = () => {
    axios.get(URL_OPTIONS + question.pk).then((res) => {
      setOptionList(res.data);
    });
  };

  const toggleModal = () => {
    if (!showModal) getOptions();
    setShowModal((prev) => !prev);
  };

  return (
    <>
      <Button onClick={toggleModal} className="btn-warning">
        Detalhe
      </Button>

      <Modal isOpen={showModal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          Detalhes da questão {question.pk}
        </ModalHeader>
        <ModalBody>
          <DetailData
            options={optionList}
            question={question}
            toggle={toggleModal}
          />
        </ModalBody>
      </Modal>
    </>
  );
}

export default DetailModal;
