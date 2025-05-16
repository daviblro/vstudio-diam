import "./SobreNos.css";

function SobreNos() {
  return (
    <div className="SobreNos">
      <div className="ajustarTopo">
        <div className="title">SOBRE NÓS</div>
        <div className="SobreNosBG">
          <div className="mainSobreNos">
            <section className="textSectionSobreNos1">
              <p className="textSobreNos1">
                A Monopoleo é uma empresa jovem e dinâmica, fundada em 2025,
                dedicada ao comércio online em Portugal. Com apenas um ano de
                atividade, já conquistámos a confiança de muitos clientes que
                procuram uma experiência de compra moderna, segura e eficiente.
                Oferecemos uma ampla variedade de produtos, desde tecnologia e
                eletrodomésticos até artigos para o lar, cuidados pessoais e
                acessórios. O nosso objetivo é tornar as compras online simples,
                rápidas e acessíveis para todos.
              </p>
            </section>
            <div className="imageSectionSobreNos">
              <img
                src={require("./img/monopoleo.png")}
                alt="Sobre nós"
                className="imgSobreNos"
              />
            </div>
          </div>
          <section className="textSectionSobreNos2">
            <p className="textSobreNos2">
              Na Monopoleo, acreditamos na inovação e na qualidade como
              pilares do nosso crescimento. Apostamos numa plataforma
              intuitiva, num serviço de apoio ao cliente de excelência e em
              entregas eficazes, para garantir a melhor experiência possível.
              A nossa equipa é jovem, apaixonada e está comprometida com o
              futuro. Trabalhamos todos os dias para melhorar e evoluir,
              sempre com os nossos clientes no centro de tudo o que fazemos.
              Obrigado por confiares na Monopoleo. <br></br>Estamos só a começar — e
              queremos crescer contigo.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default SobreNos;
