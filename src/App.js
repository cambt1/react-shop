import "./App.css";
import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import data from "./data.js";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Detail from "./routes/Detail";
import Card from "./components/Card";
import axios from "axios";

function App() {
  let [shoes, setShoes] = useState(data);
  let [isMore, isMoreSet] = useState(false);
  // console.log(shoes[0]);
  let navigate = useNavigate();

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand
            onClick={() => {
              navigate("/");
            }}
          >
            ShoeShop
            {/* <Link to="/">ShoeShop</Link> */}
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("detail");
              }}
            >
              Detail
              {/* <Link to="/detail">Detail</Link> */}
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                // navigate("/detail");
                navigate(-1); //뒤로가기
              }}
            >
              뒤로가기
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="main-bg"></div>
              <div className="container">
                <div className="row">
                  <Card shoes={shoes} />
                </div>
                <button
                  onClick={() => {
                    axios
                      .get("https://codingapple1.github.io/shop/data2.json")
                      .then((결과) => {
                        // console.log(결과.data);
                        let copy = [...shoes, ...결과.data];
                        setShoes(copy);
                      });
                  }}
                >
                  {/* user가 버튼 누른 횟수로 url 변경 */}
                  더보기
                </button>
              </div>
            </>
          }
        />
        <Route path="/detail/:id" element={<Detail shoes={shoes} />} />
        <Route path="/element" element={<div>어바웃페이지임</div>} />
        <Route path="/about" element={<About />}>
          <Route path="member" element={<div>멤버임</div>} />
          <Route path="location" element={<div>위치정보임</div>} />
        </Route>
        {/* 404페이지 */}
        <Route path="*" element={<div>없는페이지</div>} />
      </Routes>
    </div>
  );
}

function More() {
  const [more, setMore] = useState([]);

  React.useEffect(function () {
    axios
      .get("https://codingapple1.github.io/shop/data2.json")
      .then((result) => {
        console.log(result);
        const more = result.data;
        setMore(more);
      })
      .catch((error) => {
        console.error("에러 발생 : ", error);
      });
  }, []);
  return (
    <div className="col-md-4">
      {more.map((moreItem, index) => {
        return (
          <>
            <img
              src={`https://codingapple1.github.io/shop/shoes${
                moreItem.id + 1
              }.jpg`}
              width="80%"
            />
            <h4>
              <Link to={`/detail/${moreItem.id}`}>{moreItem.title}</Link>
            </h4>
            <p>{moreItem.price}원</p>
            <p>{moreItem.content}</p>
          </>
        );
      })}
    </div>
  );
}

function About() {
  return (
    <div>
      <h4>회사정보임</h4>
      {/* nested routes의 element를 보여줄 위치 지정 Outlet(배출구) */}
      <Outlet></Outlet>
    </div>
  );
}

export default App;
