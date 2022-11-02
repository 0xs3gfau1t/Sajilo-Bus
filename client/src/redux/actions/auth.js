import axios from "axios"

import { loginSuccess, logoutSuccess } from "../reducers/auth"
import { setAlert } from "./misc"

export const login = (user_data, member) => dispatch => {
	let data = JSON.parse(JSON.stringify(user_data))
	let url = ""
	if (member) {
		delete data["username"]
		url = "/api/bus/login"
	} else {
		delete data["bus_number"]
		url = "/api/admin/login"
	}
	axios
		.post(url, data)
		.then(res => {
			dispatch(loginSuccess(res.data.user))
			dispatch(setAlert("Login Successful", "success"))
		})
		.catch(err => {
			dispatch(setAlert(err.response.data.message, "danger", false))
		})
}
