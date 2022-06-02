import "./App.css";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import data from "./data.js";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
// import Detail from "./routes/Detail";
import Card from "./components/Card";
import axios from "axios";
// import Cart from "./routes/Cart.js";
import { useQuery } from "react-query";

const Detail = lazy(() => import("./routes/Detail.js"));
const Cart = lazy(() => import("./routes/Cart.js"));

export let Context1 = React.createContext(); //state보관함 = ContextAPI

function App() {
  let obj = { name: "kim" };
  // object자료를 JSON으로""쳐줌
  localStorage.setItem("data", JSON.stringify(obj));
  let ls = localStorage.getItem("data");
  // JSON을 Object로
  let toObj = JSON.parse(ls);
  console.log(toObj.name);
  console.log(JSON.parse(ls).name);

  let [shoes, setShoes] = useState(data);
  let [isMore, isMoreSet] = useState(false);
  //버튼 누른 횟수
  let [nmbtnPrss, chnbtPrss] = useState(0);
  // console.log(shoes[0]);
  let navigate = useNavigate();
  let [재고] = useState([10, 11, 12]);

  useEffect(() => {
    //1.누가 Detail페이지 접속하면
    //2.그 페이지에 보이는 상품id 가져와서
    //3.localStorage에 watched 항목에 추가
    let watched = [];
    localStorage.setItem("watched", JSON.stringify(watched));
  }, []);

  let result = useQuery("작명", () => {
    //retrun 은 2개 꼭 필요
    return (
      axios.get("https://codingapple1.github.io/userdata.json").then((a) => {
        console.log("요청됨");
        return a.data;
      }),
      //틈만 나면 자동으로 refetch해줌
      { staleTime: 2000 }
    );
  });

  let resultData = result.data;
  let isLoading = result.isLoading;
  let hasError = result.error;
  // console.log(resultData);
  // console.log(isLoading);
  // console.log(hasError);

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
                navigate("cart");
              }}
            >
              Cart
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
          <Nav.Link className="ms-auto">
            {/* 반가워요 {result.isLoading ? "로딩중" : result.data.name} */}
            반가워요 {result.isLoading && "로딩중"}
            {result.error && "에러남"}
            {result.data && result.data.name}
          </Nav.Link>
        </Container>
      </Navbar>

      <Suspense fallback={<div>로딩중임</div>}>
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
                      chnbtPrss(nmbtnPrss + 1);
                      console.log(nmbtnPrss);
                      {
                        /* user가 버튼 누른 횟수로 url 변경 */
                      }
                      if (nmbtnPrss === 0 || nmbtnPrss === 1) {
                        axios
                          .get("https://codingapple1.github.io/shop/data2.json")
                          .then((결과) => {
                            // console.log(결과.data);
                            //array자료 합치기 [{},{},{}][{},{},{}] -> {},{},{},{},{},{}
                            let copy = [...shoes, ...결과.data];
                            setShoes(copy);
                          });
                      } else if (nmbtnPrss === 2) {
                        axios
                          .get("https://codingapple1.github.io/shop/data3.json")
                          .then((결과) => {
                            let copy = [...shoes, ...결과.data];
                            setShoes(copy);
                          });
                      } else if (nmbtnPrss > 2) {
                        alert("등록된 상품이 더 없습니다.");
                      }
                    }}
                  >
                    더보기
                  </button>
                </div>
              </>
            }
          />
          <Route
            path="/detail/:id"
            element={
              <Context1.Provider value={{ 재고, shoes }}>
                <Detail shoes={shoes} />
              </Context1.Provider>
            }
          />
          <Route path="/element" element={<div>어바웃페이지임</div>} />
          <Route path="/about" element={<About />}>
            <Route path="member" element={<div>멤버임</div>} />
            <Route path="location" element={<div>위치정보임</div>} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          {/* 404페이지 */}
          <Route path="*" element={<div>없는페이지</div>} />
        </Routes>
      </Suspense>
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
