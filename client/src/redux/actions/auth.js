import { createAsyncThunk } from "@reduxjs/toolkit"
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

export const verifyAuth = createAsyncThunk(
	"auth/verfiy",
	async ({ admin, alert = true }, { dispatch }) => {
		const response = await axios
			.get("/api/c/verifyidentity", {
				params: { admin },
				withCredentials: true,
			})
			.then(res => {
				dispatch(setAlert(res.data.message ?? "Logged in", "success"))
				return res.data
			})
			.catch(err => {
				if (alert)
					dispatch(
						setAlert(
							err.response?.data?.message ?? "Not logged in",
							"danger"
						)
					)
				return false
			})

		if (response) return { isAuthenticated: true, user: response.user }

		return { isAuthenticated: false, user: "" }
	}
)

export const logout = () => dispatch => {
	axios
		.get("/api/c/logout", { withCredentials: true })
		.then(res => {
			dispatch(logoutSuccess())
		})
		.catch(err => {
			dispatch(setAlert("Failed to logout", "danger"))
		})
}
