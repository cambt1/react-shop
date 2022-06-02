import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Nav } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "./../store";

import { Context1 } from "./../App.js";

let YellowBtn = styled.button`
  background: ${(props) => props.bg};
  color: ${(props) => (props.bg == "blue" ? "white" : "black")};
  padding: 10px;
`;

let Box = styled.div`
  background: grey;
  padding: 20px;
`;

var a = 0;

const Detail = (props) => {
  for (var i = 0; i < 19; i++) {
    a = i;
  }

  let dispatch = useDispatch();

  let { 재고, shoes } = useContext(Context1); //보관함 해체 함수

  let [warning, warningSet] = useState(true);
  let [count, setCount] = useState(0);
  let [num, setNum] = useState("");
  let [탭, 탭변경] = useState(0);
  let [fade2, setFade2] = useState("");

  useEffect(() => {
    //mount,update시 실행될 코드
    // console.log("안녕");
    let a = setTimeout(() => {
      warningSet(false);
    }, 2000);
    return () => {
      //기존 타이머 제거, 기존 데이터 요청
      clearTimeout(a);
    };
  }, []);

  useEffect(() => {
    setFade2("end");
    return () => {
      setFade2("");
    };
  }, []);

  useEffect(() => {
    if (isNaN(num) == true) {
      alert("그러지마세요");
    }
  }, [num]);

  // for (var i = 0; i < 10000; i++) {
  //   console.log(1);
  // }

  let { id } = useParams();
  console.log(id);

  let 찾은상품 = props.shoes.find(function (x) {
    // 파라미터로 받은 id와 상품의 id가 같은 경우
    return x.id == id;
  });
  console.log(찾은상품.id);

  useEffect(() => {
    //1.누가 Detail페이지 접속하면
    //2.그 페이지에 보이는 상품id 가져와서
    //3.localStorage에 watched 항목에 추가
    let 꺼낸거 = localStorage.getItem("watched");
    꺼낸거 = JSON.parse(꺼낸거);
    꺼낸거.push(찾은상품.id);
    꺼낸거 = new Set(꺼낸거);
    // Set을 Array로 변환
    꺼낸거 = Array.from(꺼낸거);
    localStorage.setItem("watched", JSON.stringify(꺼낸거));
  }, []);

  return (
    <div className={"container start " + fade2}>
      {warning === true ? (
        <div className="alert alert-warning">2초이내 구매시 할인</div>
      ) : null}

      {count}
      <input
        onChange={(e) => {
          setNum(e.target.value);
        }}
      ></input>
      <Box>
        <YellowBtn
          bg="blue"
          onClick={() => {
            setCount(count + 1);
          }}
        >
          버튼
        </YellowBtn>
        <YellowBtn bg="orange">버튼</YellowBtn>
      </Box>

      <div className="row">
        <div className="col-md-6">
          <img
            src={`https://codingapple1.github.io/shop/shoes${
              parseInt(찾은상품.id) + 1
            }.jpg`}
            width="100%"
          />
        </div>
        <div className="col-md-6">
          {/* 현재 url의 파라미터-> 이렇게 하면 상품정렬시 이상한 화면 출력 */}
          {/* <h4 className="pt-5">{props.shoes[id].title}</h4> */}
          <h4 className="pt-5">{찾은상품.title}</h4>
          <p>{찾은상품.content}</p>
          <p>{찾은상품.price}원</p>
          <button
            className="btn btn-danger"
            onClick={() => {
              dispatch(addItem({ id: 1, name: "Red Knit", count: 1 }));
            }}
          >
            주문하기
          </button>
        </div>
      </div>

      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link
            eventKey="link0"
            onClick={() => {
              탭변경(0);
            }}
          >
            Active
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link1"
            onClick={() => {
              탭변경(1);
            }}
          >
            Option 2
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link2"
            onClick={() => {
              탭변경(2);
            }}
          >
            Option 3
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {/* {탭 == 0 ? <div>내용0</div> : null}
      {탭 == 1 ? <div>내용1</div> : null}
      {탭 == 2 ? <div>내용2</div> : null} */}
      {/* App->Detail->TabContent : 단계별 props전송 */}
      <TabContent shoes={props.shoes} 탭={탭} />
    </div>
  );
};

// function TabContent(props) {
//   // component 뱉을 것에 return 필요
//   if (props.탭 == 0) {
//     return <div>내용0</div>;
//   } else if (props.탭 == 1) {
//     return <div>내용1</div>;
//   } else if (props.탭 == 2) {
//     return <div>내용2</div>;
//   }
// }
// function TabContent({ 탭 }) {
//   if (탭 == 0) {
//     return <div>내용0</div>;
//   } else if (탭 == 1) {
//     return <div>내용1</div>;
//   } else if (탭 == 2) {
//     return <div>내용2</div>;
//   }
// }

// function TabContent({ 탭 }) {
//   return [<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][탭];
// }
function TabContent({ 탭, shoes }) {
  let [fade, setFade] = useState("");
  let { 재고 } = useContext(Context1);

  //탭 state가 변할 때 end 부착
  useEffect(() => {
    setTimeout(() => {
      setFade("end");
    }, 100);
    //useEffect실행 전에 실행시키고 싶을 때
    return () => {
      setFade("");
    };
  }, [탭]);
  return (
    <div className={`start ${fade}`}>
      {/* {[<div>{shoes[0].title}</div>, <div>내용1</div>, <div>내용2</div>][탭]} */}
      {[<div>{재고}</div>, <div>내용1</div>, <div>내용2</div>][탭]}
    </div>
  );
}

export default Detail;
