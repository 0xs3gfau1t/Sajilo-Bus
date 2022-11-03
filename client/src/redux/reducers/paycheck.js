import { createSlice } from "@reduxjs/toolkit"
import { gotoPage, requestPaycheck } from "../actions/paycheck"

const initialState = {
	request: false,
	pages: {},
	currentPage: 0,
	canNext: true,
	canPrev: false,
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

		builder.addCase(gotoPage.fulfilled, (state, { payload }) => {
			if (payload.success) {
				if (payload.data) state.pages[payload.page] = payload.data
				state.canNext = payload.canNext
				state.canPrev = payload.canPrev
				state.currentPage = payload.page
			}
		})
	},
})

export default paycheckSlice.reducer
