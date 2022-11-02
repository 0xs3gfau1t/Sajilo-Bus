import { createSlice } from "@reduxjs/toolkit"
import { addBus, delBus, editBus, gotoPage, getBus } from "../actions/bus"

const initialState = {
	pages: {},
	currentPage: 0,
	canNext: true,
	canPrev: false,
	editing: false,
	saving: false,
	adding: false,
	deleting: false,
	mybus: {},
}

const busSlice = createSlice({
	name: "bus",
	initialState,
	reducers: {
		setEditing: (state, { payload }) => {
			state.editing = payload
		},
		setAdding: (state, { payload }) => {
			state.adding = payload
		},
		setDeleting: (state, { payload }) => {
			state.deleting = payload
		},
	},
	extraReducers: builder => {
		// GOTO PAGE
		builder.addCase(gotoPage.fulfilled, (state, { payload }) => {
			if (payload.success) {
				if (payload.response)
					state.pages[payload.page] = payload.response

				state.canPrev = payload.canPrev
				state.canNext = payload.canNext
				state.currentPage = payload.page
			}
		})

		// EDIT BUS
		builder.addCase(editBus.pending, (state, { payload }) => {
			state.saving = true
		})
		builder.addCase(editBus.fulfilled, (state, { payload }) => {
			if (payload.success) {
				if (payload.me) state.mybus = payload.data
				else
					state.pages[state.currentPage][payload.bus_number] =
						payload.data
				state.editing = false
				state.saving = false
			} else {
				state.saving = "failed"
			}
		})

		// DELETE BUS
		builder.addCase(delBus.pending, (state, { payload }) => {
			state.deleting = "deleting"
		})
		builder.addCase(delBus.fulfilled, (state, { payload }) => {
			if (payload.success) {
				state.pages[state.currentPage][payload.bus_number] = {}
				state.deleting = false
			} else {
				state.deleting = "failed"
			}
		})

		// ADD BUS
		builder.addCase(addBus.pending, (state, action) => {
			state.adding = "adding"
		})
		builder.addCase(addBus.fulfilled, (state, { payload }) => {
			if (payload.success) state.adding = false
			else state.adding = "failed"
		})
		builder.addCase(getBus.pending, (state, { payload }) => {
			state.loading = true
		})
		builder.addCase(getBus.fulfilled, (state, { payload }) => {
			state.mybus = payload.data
			state.loading = false
		})
	},
})

export const { setEditing, setAdding, setDeleting } = busSlice.actions

export default busSlice.reducer
