import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { setAlert } from "./misc"

export const gotoPage = createAsyncThunk(
	"bus/gotoPage",
	async ({ page, reload = false }, { getState, dispatch }) => {
		const state = getState()
		const take = 2

		// If data is already present don't fetch the list
		if (state.bus.pages[page] && !reload) {
			const amount = Object.keys(state.bus.pages[page]).length
			return {
				success: true,
				page,
				canPrev: page != 0,
				canNext: amount == take,
			}
		}

		const response = await axios
			.get("/api/bus/list", {
				params: { skip: page * take, take },
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

		if (!response) return { success: false }

		const amount = Object.keys(response).length
		if (amount == 0)
			return {
				success: true,
				canNext: false,
				canPrev: true,
				page: state.bus.currentPage,
			}

		return {
			success: true,
			response,
			page,
			canNext: amount == take,
			canPrev: page != 0,
		}
	}
)

export const editBus = createAsyncThunk(
	"bus/editBus",
	async ({ data, me }, { dispatch }) => {
		const response = await axios
			.patch("/api/bus", data, {
				withCredentials: true,
			})
			.then(res => {
				dispatch(setAlert(res.data.message, "success", false))
				return res.data
			})
			.catch(err => {
				console.error(err)
				dispatch(
					setAlert(
						err.response?.data?.message || "Unknown Error",
						"danger",
						true
					)
				)
			})

		if (!response) return { success: false }

		const { bus_number } = data
		if (!me) delete data["bus_number"]

		return { success: true, bus_number, data, me }
	}
)

export const delBus = createAsyncThunk(
	"bus/delBus",
	async (bus_number, { dispatch }) => {
		const response = await axios
			.delete("/api/bus", {
				withCredentials: true,
				data: { bus_number },
			})
			.then(res => {
				dispatch(setAlert(res.data.message, "success", false))
				return res.data
			})
			.catch(err => {
				console.error(err)
				dispatch(
					setAlert(
						err.response?.data?.message || "Unknown Error",
						"danger",
						true
					)
				)
			})

		if (!response) return { success: false }

		return { success: true, bus_number }
	}
)

export const addBus = createAsyncThunk(
	"bus/addBus",
	async (data, { dispatch }) => {
		const response = await axios
			.post("/api/bus", data, {
				withCredentials: true,
			})
			.then(res => {
				dispatch(setAlert(res.data.message, "success", false))
				return res.data
			})
			.catch(err => {
				console.error(err)
				dispatch(
					setAlert(
						err.response?.data?.message || "Unknown Error",
						"danger",
						true
					)
				)
			})

		if (!response) return { success: false }

		return { success: true }
	}
)

export const getBus = createAsyncThunk(
	"bus/getBus",
	async (data, { dispatch }) => {
		const response = await axios
			.get(`/api/bus?bus_number=${data}`, { withCredentials: true })
			.then(res => {
				dispatch(setAlert(res.data.message, "success", false))
				// console.log(res.data)
				return res.data
			})
			.catch(err => {
				console.error(err)
				dispatch(
					setAlert(
						err.response?.data?.message || "Unknown Error",
						"danger",
						true
					)
				)
			})
		if (!response) return { success: false }

		return { success: true, data: response }
	}
)
