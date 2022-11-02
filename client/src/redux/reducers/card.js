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
		newCard: (state, { payload }) => {
			state.newCard = payload
		},
	},
})

export const { cardInfo, cardInvalid, newCard } = cardSlice.actions

export default cardSlice.reducer
