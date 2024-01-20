import { createSlice } from "@reduxjs/toolkit"



const initialState = {
    savePersonalDetails:{},
    isLoading:false,
    saveAddressDetails:{}
}

const formRegisterSlice = createSlice({
    name:"formRegister",
    initialState,
    reducers:{
        setSavePersonalDetails:(state,action)=>{
            state.savePersonalDetails= action.payload
        },
        setSaveAddressDetails:(state,action)=>{
            state.saveAddressDetails= action.payload
        },
    },
    // extraReducers:{}
})

export const {setSaveAddressDetails,setSavePersonalDetails} = formRegisterSlice.actions

export default formRegisterSlice.reducer