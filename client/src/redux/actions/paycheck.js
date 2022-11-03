import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { setAlert } from "./misc"

export const requestPaycheck = createAsyncThunk(
	"tx/request",
	async ({ bus_number }, { dispatch }) => {
		console.log(bus_number)
		try {
			const response = await axios.post(
				"/api/paycheck/request",
				{ bus_number },
				{ withCredentials: true }
			)

			dispatch(setAlert(response.data?.message ?? "Success", "success"))
			return { success: true }
		} catch (err) {
			console.log(err)
			dispatch(
				setAlert(
					err.response?.data?.message ?? "Unknown error.",
					"danger"
				)
			)
			return { success: false }
		}
	}
)
