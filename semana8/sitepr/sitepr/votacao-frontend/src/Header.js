import "./Header.css"; 

function Header() {
  return (
    <>
      <div className="Header">
        <img
          src="/iscte.png" // (1)
          width="600"
          alt="ISCTE"
          className="img-thumbnail"
          style={{ marginTop: "20px" }} // (2)
        />
        <h2>DIAM - LEI e LIGE</h2>
        <h3>Exemplo Integração de Django com React</h3>
      </div>
    </>
  );
}
export default Header;
