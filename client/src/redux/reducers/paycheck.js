import { createSlice } from "@reduxjs/toolkit"
import { requestPaycheck } from "../actions/paycheck"

const initialState = {
	request: false,
}

const paycheckSlice = createSlice({
	name: "paycheck",
	initialState,
	extraReducers: builder => {
		builder.addCase(requestPaycheck.pending, state => {
			state.request = "requesting"
		})
		builder.addCase(requestPaycheck.fulfilled, (state, { payload }) => {
			if (payload.success) state.request = "success"
			else state.request = "failed"
		})
	},
})

export default paycheckSlice.reducer
