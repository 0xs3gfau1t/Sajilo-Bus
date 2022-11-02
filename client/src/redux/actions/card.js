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
