import { createSlice } from "@reduxjs/toolkit"
import { MdQueryBuilder } from "react-icons/md"
import { gotoPage } from "../actions/card"

const initialState = { 
	id: "",
	balance: "",
	valid: false,
	pages: {},
	currentPage: 0,
	canNext: true,
	canPrev: false,
	 }

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
	extraReducers: builder =>{
		builder.addCase(gotoPage.fulfilled, (state, { payload }) =>{
			if(payload.success){
				if(payload.response)
					state.pages[payload.page] = payload.response
				
				state.canPrev = payload.canPrev
				state.canNext = payload.canNext
				state.currentPage = payload.page
			}
		})
	}
})

export const { cardInfo, cardInvalid, newCard } = cardSlice.actions

export default cardSlice.reducer
