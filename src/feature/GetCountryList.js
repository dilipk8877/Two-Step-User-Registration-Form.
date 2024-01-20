import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    getCountryList:[],
    isLoading:false,
    error:""
}
const apiKey = process.env.REACT_APP_COUNTRY_API_KEY;

export const getCountry = createAsyncThunk("country/getCountry", async (_, thunkAPI) => {
    try {
        const res = await fetch(apiKey);
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