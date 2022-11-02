import axios from "axios"

import { cardInfo } from "../reducers/card"
import { setAlert } from "./misc"

export const getBalance = id => dispatch => {
	axios
		.get(`/api/card/info?id=${id}`, { withCredentials: true })
		.then(res => {
			// console.log("res: ", res.data)
			dispatch(cardInfo(res.data))
		})
		.catch(err => {
			dispatch(setAlert("Failed to get card details", "danger", true))
		})
}
