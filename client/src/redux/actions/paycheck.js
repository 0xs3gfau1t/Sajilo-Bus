import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { setAlert } from "./misc"

export const requestPaycheck = createAsyncThunk(
	"paycheck/request",
	async ({ bus_number }, { dispatch }) => {
		console.log(bus_number)
		try {
			const response = await axios.post(
				"/api/paycheck/request",
				{ bus_number },
				{ withCredentials: true }
			)

			dispatch(
				setAlert(response.data?.message ?? "Success", "success", true)
			)
			return { success: true }
		} catch (err) {
			console.log(err)
			dispatch(
				setAlert(
					err.response?.data?.message ?? "Unknown error.",
					"danger",
					true
				)
			)
			return { success: false }
		}
	}
)

export const gotoPage = createAsyncThunk(
	"paycheck/goto",
	async ({ page, reload = false }, { getState }) => {
		const { paycheck } = getState()
		const take = 2

		// If data is already present don't fetch the list
		const previousData = paycheck.pages[page]
		if (previousData && !reload) {
			const amount = Object.keys(previousData).length
			return {
				success: true,
				page,
				canPrev: page != 0,
				canNext: amount == take,
			}
		}

		const paycheckList = await axios
			.get("/api/paycheck/list", {
				params: { skip: page * take, take },
				withCredentials: true,
			})
			.then(res => res.data)
			.catch(err => {
				console.error(err)
			})

		if (!paycheckList) return { success: false }

		const amount = paycheckList.length

		if (amount == 0)
			return {
				success: true,
				canNext: false,
				canPrev: true,
				page: paycheck.currentPage,
			}

		return {
			success: true,
			data: paycheckList,
			page,
			canNext: amount == take,
			canPrev: page != 0,
		}
	}
)

export const approve = createAsyncThunk(
	"paycheck/approve",
	async ({ id }, { dispatch }) => {
		const response = await axios
			.post("/api/paycheck/approve", { id }, { withCredentials: true })
			.then(res => {
				dispatch(
					setAlert(res.data?.message ?? "Success", "success", true)
				)
				return res.data
			})
			.catch(err => {
				console.log(err)
				dispatch(
					setAlert(
						err?.response?.data?.message ?? "Failed",
						"danger",
						true
					)
				)
			})

		if (!response) return { success: false }
		return { success: true }
	}
)
