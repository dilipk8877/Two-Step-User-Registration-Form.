import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    getCountryList:[],
    isLoading:false,
    error:""
}
export const getCountry = createAsyncThunk("country/getCountry", async (_, thunkAPI) => {
    try {
        const res = await fetch(`https://restcountries.com/v3.1/all`);
        const data = await res.json();
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

const getCountrySlice = createSlice({
    name:"Country",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(getCountry.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCountry.fulfilled, (state, action) => {
                state.isLoading = false;
                state.getCountryList = action.payload;
            })
            .addCase(getCountry.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
})

export default getCountrySlice.reducer