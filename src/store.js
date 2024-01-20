import { configureStore } from "@reduxjs/toolkit";
import GetCountryList from "./feature/GetCountryList";
import FormRegisterSlice from "./feature/FormRegisterSlice";


const store = configureStore({
  reducer: {
    country:GetCountryList,
    address:FormRegisterSlice
  },
})

export default store;