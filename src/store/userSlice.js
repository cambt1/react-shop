import { configureStore, createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  name: "user",
  //   initialState: "kim",
  initialState: { name: "kim", age: 20 },
  reducers: {
    changeName(state) {
      //   return "john " + state;
      state.name = "park";
    },
    increaseAge(state, action) {
      //   state.age = state.age + 1;
      //파라미터 갖다 쓸 때 : action.payload
      state.age += action.payload;
    },
  },
});

export default user;
