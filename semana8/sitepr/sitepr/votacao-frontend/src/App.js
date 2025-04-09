import QuestionTable from "./QuestionTable";
import Header from "./Header";
import { Container, Row, Col } from "reactstrap";
import "./App.css";

function App() {
  return (
    <>
      <Header/> 
      <Content/>
    </>
  );
}

function Content() {
  return (
    <Container style={{width: "100%",display: "flex",justifyContent: "center", alignItems: "center",}}>
      <Row>
        <Col>
          <QuestionTable />
        </Col>
      </Row>
    </Container>
  );
}
export default App;
