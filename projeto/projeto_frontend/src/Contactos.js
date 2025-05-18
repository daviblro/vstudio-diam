import "./Contactos.css";
import { useState } from "react";
import phoneIcon from "./img/customer_support.png";
import emailIcon from "./img/email.png";

function Contactos() {
  const metodosContacto = [
    {
      id: 1,
      name: "Número de Telefone: 968527413",
      description:
        "Ligue para o nosso suporte ao cliente e obtenha assistência imediata.",
      metodosContacto: "266875632",
      image: phoneIcon,
    },
    {
      id: 2,
      name: "Email",
      description: "Envie-nos um email e responderemos o mais rápido possível.",
      metodosContacto: "monopoleo@suporte.com",
      image: emailIcon,
    },
  ];
  const perguntasFrequentes = [
    {
      pergunta: "Como posso consultar faturas na Monopoleo?",
      resposta:
        "Para consultar faturas, acede à tua conta e vai à secção 'Histórico de Compras'.",
    },
    {
      pergunta:
        "Quais as lojas Monopoleo onde posso comprar bilhetes para eventos?",
      resposta:
        "Podes comprar bilhetes em todas as lojas físicas da Monopoleo com balcão de atendimento.",
    },
    {
      pergunta:
        "A minha entrega Monopoleo não correu como previsto. O que fazer?",
      resposta:
        "Contacta o nosso suporte com o número da encomenda. Resolveremos rapidamente.",
    },
    {
      pergunta: "Existem condições para devolver um produto comprado online?",
      resposta:
        "Sim. Tens 14 dias para devolução desde que o produto esteja em bom estado.",
    },
  ];

  const [perguntaAberta, setPerguntaAberta] = useState(null);

  return (
    <div className="Contactos">
      <div className="title">CONTACTOS</div>
      <div className="main_contactos">
        <section className="text_contactos">
          <p>Perguntas mais frequentes:</p>

          {perguntasFrequentes.map((item, i) => (
            <div key={i} className="faq-item">
              <p
                className="faq-question"
                onClick={() =>
                  setPerguntaAberta(i === perguntaAberta ? null : i)
                }
              >
                {item.pergunta}
              </p>
              {perguntaAberta === i && (
                <p className="faq-answer">R.: {item.resposta}</p>
              )}
            </div>
          ))}
          <p className="bottom-text">
            Se ainda precisares de ajuda fala conosco através dos nossos canais
            de atendimento:
          </p>
        </section>

        <div className="contactosContent">
          <div className="grid">
            {metodosContacto.map((metodo) => (
              <div key={metodo.id} className="card">
                <img src={metodo.image} alt={metodo.name} />
                <p className="card-description">{metodo.description}</p>
                <p className="card-metodosContacto">{metodo.metodosContacto}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contactos;
