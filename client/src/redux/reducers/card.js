import { createSlice } from "@reduxjs/toolkit"

const initialState = { id: "", balance: "", valid: false }

const cardSlice = createSlice({
	name: "card",
	initialState,
	reducers: {
		cardInfo: (state, { payload }) => {
			return { ...state, ...payload, valid: true }
		},
		cardInvalid: state => {
			state.valid = false
		},
	},
})

export const { cardInfo, cardInvalid } = cardSlice.actions

export default cardSlice.reducer
