import { createSlice } from "@reduxjs/toolkit"
import { searchTx, payout } from "../actions/tx"

// bus: {[bus_number]: {[page_number]: [transaction_list]}}
// card: {[card_id]: {[page_number]: [transaction_list]}}
const initialState = {
	bus: {},
	card: {},
	mode: "bus",
	id: "",
	currentPage: 0,
	canNext: true,
	canPrev: false,
	payout: {},
}

const txSlice = createSlice({
	name: "tx",
	initialState,
	reducers: {
		setMode: (state, { payload }) => {
			state.mode = payload
		},
	},
	extraReducers: builder => {
		builder.addCase(searchTx.fulfilled, (state, { payload }) => {
			if (payload.success) {
				if (payload.transaction)
					state[state.mode][payload.id] = {
						...state[state.mode][payload.id],
						[payload.page]: payload.transaction,
					}

				state.canNext = payload.canNext
				state.canPrev = payload.canPrev
				state.currentPage = payload.page
				state.id = payload.id
			}
		})
		builder.addCase(searchTx.fulfilled, (state, { payload }) => {
			if (payload.success) {
				if (payload.transaction)
					state[state.mode][payload.id] = {
						...state[state.mode][payload.id],
						[payload.page]: payload.transaction,
					}

				state.canNext = payload.canNext
				state.canPrev = payload.canPrev
				state.currentPage = payload.page
				state.id = payload.id
			}
		})
	},
})

export const { setMode } = txSlice.actions

export default txSlice.reducer
