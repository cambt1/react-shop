import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

let YellowBtn = styled.button`
  background: ${(props) => props.bg};
  color: ${(props) => (props.bg == "blue" ? "white" : "black")};
  padding: 10px;
`;

let Box = styled.div`
  background: grey;
  padding: 20px;
`;

const Detail = (props) => {
  let [warning, warningSet] = useState(true);
  let [count, setCount] = useState(0);
  let [num, setNum] = useState("");

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

  return (
    <div className="container">
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
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>
    </div>
  );
};

export default Detail;
