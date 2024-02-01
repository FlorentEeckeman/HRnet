import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

interface Employee {
  firstName: string;
  lastName: string;
  birthDatePicker: Date;
  startDatePicker: Date;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  department: string;
}

interface UserState {
  employees: string[][];
}

const initialState: UserState = {
  employees: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addEmployee: (state, action: PayloadAction<Employee>) => {
      const res = [];
      res.push(action.payload.firstName);
      res.push(action.payload.lastName);
      res.push(action.payload.birthDatePicker.toLocaleString().slice(0, 10));
      res.push(action.payload.startDatePicker.toLocaleString().slice(0, 10));
      res.push(action.payload.street);
      res.push(action.payload.city);
      res.push(action.payload.state);
      res.push(action.payload.zipCode);
      res.push(action.payload.department);

      state.employees.push(res);
    },
    removeUserInfos: (state, action: PayloadAction<number>) => {
      console.log(state.employees.length);

      state.employees.splice(action.payload, 1);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => {
      return initialState;
    });
  },
});

// Action creators are generated for each case reducer function
export const { addEmployee, removeUserInfos } = userSlice.actions;

const userSliceReducer = userSlice.reducer;
export default userSliceReducer;
