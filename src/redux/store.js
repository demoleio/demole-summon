import { configureStore } from '@reduxjs/toolkit';
import chainNameReducer from "./chainName"

export default configureStore({
  reducer: {
    chainName: chainNameReducer
  },
});