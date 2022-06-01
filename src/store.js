import { configureStore, createSlice } from "@reduxjs/toolkit";
import user from "./store/userSlice.js";
//state, useState와 비슷

//만든 함수 export해야함
export let { changeName, increaseAge } = user.actions;

let stock = createSlice({
  name: "stock",
  initialState: [10, 11, 12],
});

let cartItems = createSlice({
  name: "cartItems",
  initialState: [
    { id: 0, name: "White and Black", count: 2 },
    { id: 2, name: "Grey Yordan", count: 1 },
  ],
  reducers: {
    increaseCount(state, action) {
      //   return [
      //     { id: 0, name: "White and Black", count: state[0].count + 1 },
      //     { id: 2, name: "Grey Yordan", count: state[1].count + 1 },
      //   ];
      //조건식과 일치하는 인덱스를 남겨줌
      let index = state.findIndex((a) => {
        return a.id == action.payload;
      });
      state[index].count++;
    },
    addItem(state, action) {
      //   state.push({ id: 1, name: "Red Knit", count: 1 });
      state.push(action.payload);
    },
  },
});

export let { increaseCount, addItem } = cartItems.actions;

export default configureStore({
  reducer: {
    //모든 컴포넌트가 갖다쓰기위해 등록
    user: user.reducer,
    stock: stock.reducer,
    cartItems: cartItems.reducer,
  },
});
