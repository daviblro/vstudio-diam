import Header from "./Header";
import "./Lojas.css";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

function Lojas() {
  const [search, setSearch] = useState("");
  const lojas = [
    {
      id: 1,
      name: "Monopoleo Lisboa Liberdade",
      Morada: " Av. da Liberdade 115, 1250-001 Lisboa",
      url: "https://www.google.com/maps/place/Av.+da+Liberdade+115,+1250-001+Lisboa/@38.7187996,-9.1464256,17z/data=!3m1!4b1!4m5!3m4!1s0xd19338215130a1b:0xfda87e7655fdceb2!8m2!3d38.7187954!4d-9.1438453?entry=ttu&g_ep=EgoyMDI1MDUxMi4wIKXMDSoJLDEwMjExNDU1SAFQAw%3D%3D",
      horario:
        "Segunda a Sexta: 10h - 22h Sábado e Domingo: 10h - 20h Feriados: 10h - 14h",
    },
    {
      id: 2,
      name: "Monopoleo Colombo",
      Morada:
        "Av. Lusíada - Centro Comercial Colombo; Loja A-017 Piso 2 1500-392 Lisboa",
      url: "https://www.google.com/maps/place/Centro+Comercial+Colombo/@38.7535733,-9.1909717,17z/data=!3m2!4b1!5s0xd1932d4c22745cb:0x39cc3ffa015bc08f!4m6!3m5!1s0xd19332a00f06e5f:0xc67774b005d8ab1c!8m2!3d38.7535691!4d-9.1883914!16s%2Fm%2F05yxq2h?entry=ttu&g_ep=EgoyMDI1MDUxMi4wIKXMDSoJLDEwMjExNDU1SAFQAw%3D%3D",
      horario:
        "Segunda a Sexta: 10h - 22h Sábado e Domingo: 10h - 20h Feriados: 10h - 14h",
    },
    {
      id: 3,
      name: "Monopoleo Lisboa Chiado",
      Morada: "Rua Garrett 49, 1200-203 Lisboa",
      url: "https://www.google.com/maps/place/R.+Garrett+49,+1200-203+Lisboa/@38.7107483,-9.1432865,17z/data=!3m1!4b1!4m6!3m5!1s0xd19347f286bf3fd:0xd648a2036d0f7947!8m2!3d38.7107441!4d-9.1407062!16s%2Fg%2F11rg62j6bd?entry=ttu&g_ep=EgoyMDI1MDUxMi4wIKXMDSoJLDEwMjExNDU1SAFQAw%3D%3D",
      horario:
        "Segunda a Sexta: 10h - 22h Sábado e Domingo: 10h - 20h Feriados: 10h - 14h",
    },
    {
      id: 4,
      name: "Monopoleo Braga",
      Morada:
        " Quinta dos Congregados - Braga Parque, loja nº 1028 piso 2 4710-427 Braga",
      url: "https://www.google.com/maps/search/Quinta+dos+Congregados+-+Braga+Parque,+loja+nº+1028+piso+2+4710-427+Braga/@41.5575507,-8.4082848,17z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI1MDUxMi4wIKXMDSoJLDEwMjExNDU1SAFQAw%3D%3D",
      horario:
        "Segunda a Sexta: 10h - 22h Sábado e Domingo: 10h - 20h Feriados: 10h - 14h",
    },
    {
      id: 5,
      name: "Monopoleo Faro",
      Morada: "Tavagueira - AlgarveShopping, Loja A.007 Piso 0 8201-878 Guia",
      url: "https://www.google.com/maps/place/AlgarveShopping/@37.1276617,-8.2827575,17z/data=!3m1!4b1!4m6!3m5!1s0xd1ace2f02922a69:0x58de1b82ce21cfaa!8m2!3d37.1276575!4d-8.2801772!16s%2Fg%2F122f27zr?entry=ttu&g_ep=EgoyMDI1MDUxMi4wIKXMDSoASAFQAw%3D%3D",
      horario:
        "Segunda a Sexta: 10h - 22h Sábado e Domingo: 10h - 20h Feriados: 10h - 14h",
    },
    {
      id: 6,
      name: "Monopoleo Madeira Shopping",
      Morada:
        " Caminho de Santa Quitéria - Madeira Shop. Loja A0.008 Piso 1 9024-501 Funchal",
      url: "https://www.google.com/maps/place/MadeiraShopping/@32.6592227,-17.0704537,12z/data=!4m10!1m2!2m1!1sCaminho+de+Santa+Quitéria+-+Madeira+Shop.+Loja+A0.008+Piso+1+9024-501+Funchal!3m6!1s0xc605fa4b846fbaf:0xef2f19e153a40d9f!8m2!3d32.6592227!4d-16.9506249!15sCk5DYW1pbmhvIGRlIFNhbnRhIFF1aXTDqXJpYSAtIE1hZGVpcmEgU2hvcC4gTG9qYSBBMC4wMDggUGlzbyAxIDkwMjQtNTAxIEZ1bmNoYWxaTSJLY2FtaW5obyBkZSBzYW50YSBxdWl0w6lyaWEgbWFkZWlyYSBzaG9wIGxvamEgYTAgMDA4IHBpc28gMSA5MDI0IDUwMSBmdW5jaGFskgEPc2hvcHBpbmdfY2VudGVymgEkQ2hkRFNVaE5NRzluUzBWSlEwRm5TVU0yTURsSU16TjNSUkFCqgHWAQoNL2cvMTF2a3lfX241awoJL20vMDR2eGZnEAEqRyJDY2FtaW5obyBkZSBzYW50YSBxdWl0w6lyaWEgbWFkZWlyYSBzaG9wIGxvamEgYTAgMDA4IHBpc28gMSA5MDI0IDUwMSgMMh4QASIa3lZSAAGHamKKtb7-6J64wDT0xIYvzGLGbbAyTxACIktjYW1pbmhvIGRlIHNhbnRhIHF1aXTDqXJpYSBtYWRlaXJhIHNob3AgbG9qYSBhMCAwMDggcGlzbyAxIDkwMjQgNTAxIGZ1bmNoYWzgAQD6AQQIABA8!16s%2Fg%2F122njf7w?entry=ttu&g_ep=EgoyMDI1MDUxMi4wIKXMDSoJLDEwMjExNDU1SAFQAw%3D%3D",
      horario:
        "Segunda a Sexta: 10h - 22h Sábado e Domingo: 10h - 20h Feriados: 10h - 14h",
    },
  ];
  const lojasFiltradas = lojas.filter((loja) =>/*Todas as strings contêm "" */
    loja.name.toLowerCase().includes(search.toLowerCase()) ||
    loja.Morada.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Header />
      <div className="ajustarTopo">
        <div className="title">LOJAS</div>
        <div className="FilterLojasBG">
          <div className="mainLojas">
            <section className="FilterLojas">
              <p className="textLojas">As nossas lojas:</p>
              <div className="searchBar">
                <FaSearch className="searchIcon" />
                <input
                  type="text"
                  placeholder="Pesquisar lojas..."
                  className="searchInput"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </section>
          </div>
          <div className="lojasContentBG">
            <section className="lojasContent">
              {lojasFiltradas.map((item) => (
                <div key={item.id} className="lojaCard">
                  <p className="lojaTitle">{item.name}</p>
                  <a
                    className="lojaMorada"
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.Morada}
                  </a>
                  <p className="lojaHorario">{item.horario}</p>
                </div>
              ))}
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default Lojas;
