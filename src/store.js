import { configureStore } from "@reduxjs/toolkit";
import GetCountryList from "./feature/GetCountryList";


const store = configureStore({
  reducer: {
    country:GetCountryList
  },
})

export default store;