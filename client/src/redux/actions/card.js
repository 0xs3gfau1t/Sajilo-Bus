import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

import { cardInfo, newCard } from "../reducers/card"
import { setAlert } from "./misc"

export const getBalance = id => dispatch => {
	axios
		.get(`/api/card/balance?id=${id}`, { withCredentials: true })
		.then(res => {
			dispatch(cardInfo(res.data))
		})
		.catch(err => {
			dispatch(setAlert("Failed to get card details", "danger", true))
		})
}


export const gotoPage = createAsyncThunk(
	'card/gotoPage',
	async({
		page, reload = false
	}, { getState, dispatch }) =>{
		const state = getState()
		const take = 2

		if(state.card.pages[page] && !reload){
			const amount = Object.keys(state.bus.pages[page]).length
			return{
				success: true,
				page, 
				CanPrev: page != 0,
				canNext : amount == take,
			}
		}

		const response = await axios.get("/api/card/list",{
			params: {skip: page * take, take},
			withCredentials: true,
		})
		.then(res => res.data)
		.catch(err => {
			console.log(err)
			dispatch(
				setAlert(
					err.response?.data?.message || "Unknown Error",
					"danger",
					true
				)
			)
		})

		if(!response) return { success: false}

		const amount = Object.keys(response).length
		if(amount == 0)
			return{
				success: true,
				canNext: false,
				canPrev: true,
				page: state.bus.currentPage,
			}

			return{
				success: true,
				response,
				page,
				canNext: amount == take,
				canPrev: page != 0,
			}
	}
)

export const trip = (lon, lat, bus_number, id, tripStatus) => dispatch => {
	console.log(lon, lat, bus_number)
	axios
		.post(`api/card/${tripStatus == "begin" ? "beginTrip" : "endTrip"}`, {
			lon: lon,
			lat: lat,
			bus_number: bus_number,
			id: id,
		})
		.then(res => {
			console.log("res: ", res.data)
			dispatch(setAlert(res.data.message ?? "Success", "success"))
		})
		.catch(err => {
			dispatch(setAlert(err.response.data.message ?? "Error", "danger"))
		})
}

export const buyCard = (amount, token) => dispatch => {
	axios
		.post("/api/card/buy", {
			amount: amount,
			token: token,
		})
		.then(res => {
			console.log("res: ", res.data)
			dispatch(newCard(res.data))
			dispatch(
				setAlert(
					`Here is your new card, please save the screenshot of this image`,
					"success",
					true
				)
			)
		})
		.catch(err => {
			console.log("Error:", err)
			// dispatch(setAlert(err.response.data.message, "danger"))
		})
}


export const delCard = createAsyncThunk(
	'card/discard',
	async(id, { dispatch }) =>{
		const response = await axios
			.delete("/api/card/discard", {
				withCredentials: true,
				data: { id },
			})
			.then(res => {
				dispatch(setAlert(res.data.message, 'success', false))
				return res.data
				})
			.catch(err =>{
				console.error(err)
				dispatch(
					setAlert(
						err.response?.data?.message || "Unknown Error",
						"danger",
						true
					)
				)
			})
		if (!response) return { success: false}

		return { success: true, id }
	}

)

export const loadCard = (id, amount, token) => dispatch => {
	axios
		.post("/api/card/balance", {
			id: id,
			amount: amount,
			token: token,
		})
		.then(res => {
			console.log("res: ", res.data)
			dispatch(
				setAlert(`Rs. ${amount / 100} loaded to your card`, "success")
			)
		})
		.catch(err => {
			console.log(err.response.data)
		})
}
