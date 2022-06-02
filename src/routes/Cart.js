import React, { useState, memo, useMemo } from "react";
import { Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { increaseAge, changeName, increaseCount, addItem } from "./../store";

let Child = memo(function () {
  console.log("재렌더링됨");
  return <div>자식임</div>;
});

function 함수() {
  return console.log("반복문 10억번 돌린결과");
}

function Cart() {
  let result = 함수(0);
  useMemo(() => {
    return 함수();
  }, [state]);

  let state = useSelector((state) => {
    //중괄호와 return은 동시 생략 가능
    // return state.user;
    // return state.stock;
    return state;
  });
  let dispatch = useDispatch();
  console.log(state.user);
  console.log(state.stock);
  console.log(state.cartItems);
  let cartItems = state.cartItems;

  let [count, setCount] = useState(0);

  return (
    <div>
      <Child count={count}></Child>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        +
      </button>
      {state.user.name}의 장바구니
      <button
        onClick={() => {
          dispatch(increaseAge(10));
        }}
      >
        버튼
      </button>
      {state.user.age}
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {/* html에서 함수 쓸 때는 {} */}
          {cartItems.map((cartItem, i) => {
            return (
              <tr key={i}>
                <td>{cartItem.id}</td>
                <td>{cartItem.name}</td>
                <td>{cartItem.count}</td>
                <td>
                  {/* <button
                    onClick={() => {
                      dispatch(changeName());
                    }}
                  > */}
                  <button
                    onClick={() => {
                      dispatch(increaseCount(cartItem.id));
                    }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => {
                      dispatch(addItem({ id: 1, name: "Red Knit", count: 1 }));
                    }}
                  >
                    주문하기
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default Cart;
