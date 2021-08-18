import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'chainName',
  initialState: {
    value: "bsc",
  },
  reducers: {
    setChainName: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setChainName } = slice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectChainName = state => state.chainName.value;

export default slice.reducer;