import "./App.css";
import { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import data from "./data.js";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  let [shoes] = useState(data);
  // console.log(shoes[0]);

  return (
    <div className="App">
      <Routes>
        <Route path="/detail" element={<div>상세페이지임</div>} />
      </Routes>

      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div className="main-bg"></div>
      <div className="container">
        <div className="row">
          <Card shoes={shoes} />
          {/* {shoes.map((shoe, key) => {
            return (
              <div className="col-md-4">
                <img
                  src={`https://codingapple1.github.io/shop/shoes${
                    key + 1
                  }.jpg`}
                  width="80%"
                />

                <h4>{shoe.title}</h4>
                <p>{shoe.price}원</p>
                <p>{shoe.content}</p>
              </div>
            );
          })} */}
        </div>
      </div>
    </div>
  );
}

const Card = (props) => {
  return props.shoes.map((shoe, key) => {
    return (
      <div className="col-md-4">
        <img
          src={`https://codingapple1.github.io/shop/shoes${key + 1}.jpg`}
          width="80%"
        />

        <h4>{shoe.title}</h4>
        <p>{shoe.price}원</p>
        <p>{shoe.content}</p>
      </div>
    );
  });
};

export default App;
