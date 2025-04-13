import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";

function NewQuestionPage() {
    const [questaoTexto, setQuestaoTexto] = useState("");
    const [options, setOptions] = useState(["", ""]);
    const navigate = useNavigate();

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const addOption = () => {
        setOptions([...options, ""]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await axios.post("http://localhost:8000/votacao/api/questions/", {
            questao_texto: questaoTexto,
            pub_data: new Date().toISOString(),
        });

        const questionId = res.data.pk;

        await Promise.all(
            options.map((opcao_texto) =>
                axios.post("http://localhost:8000/votacao/api/options/", {
                    questao_id: questionId,
                    opcao_texto,
                    votos: 0,
                })
            )
        );

        navigate("/");
    };

    return (
        <div className="container mt-4">
            <h2>Criar Nova Questão</h2>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>Texto da Questão</Label>
                    <Input
                        type="text"
                        value={questaoTexto}
                        onChange={(e) => setQuestaoTexto(e.target.value)}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Opções</Label>
                    {options.map((option, idx) => (
                        <Input
                            key={idx}
                            type="text"
                            value={option}
                            onChange={(e) => handleOptionChange(idx, e.target.value)}
                            className="mb-2"
                            required
                        />
                    ))}
                    <Button type="button" onClick={addOption} color="info">
                        Adicionar Opção
                    </Button>
                </FormGroup>
                <Button type="submit" color="primary">
                    Criar Questão
                </Button>
            </Form>
        </div>
    );
}

export default NewQuestionPage;
