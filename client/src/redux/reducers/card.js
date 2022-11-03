import { createSlice } from "@reduxjs/toolkit"
import { MdQueryBuilder } from "react-icons/md"
import { gotoPage, delCard } from "../actions/card"

const initialState = { 
	id: "",
	balance: "",
	valid: false,
	pages: {},
	currentPage: 0,
	canNext: true,
	canPrev: false,
	deleting: false,
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
		setDeleting: (state, { payload }) =>{
			state.deleting = payload;
		}
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
		builder.addCase(delCard.pending, (state, { payload }) =>{
			state.deleting = 'deleting'
		})
		builder.addCase(delCard.fulfilled, (state, { payload }) =>{
			if(payload.success){
				state.pages[state.currentPage][payload.id] = {}
				state.deleting = false
			}else{
				state.deleting = "failed"
			}
		})
	}
})

export const { cardInfo, cardInvalid, newCard, setDeleting } = cardSlice.actions

export default cardSlice.reducer
