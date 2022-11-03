import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const searchTx = createAsyncThunk(
	"tx/search",
	async ({ id, page, reload = false }, { getState, dispatch }) => {
		const { tx } = getState()
		const take = 2

		// If data is already present don't fetch the list
		const previousData = tx?.[tx.mode]?.[id]?.[page]
		if (previousData && !reload) {
			const amount = Object.keys(previousData).length
			return {
				success: true,
				id,
				page,
				canPrev: page != 0,
				canNext: amount == take,
			}
		}

		const url = `/api/${tx.mode}/tx`
		const params = {
			[tx.mode == "bus" ? "bus_number" : "id"]: id,
			skip: page * take,
			take,
		}

		const { transaction } = await axios
			.get(url, { params, withCredentials: true })
			.then(res => res.data)
			.catch(err => {
				console.error(err)
			})

		if (!transaction) return { success: false }

		const amount = Object.keys(transaction).length

		if (amount == 0)
			return {
				success: true,
				canNext: false,
				canPrev: true,
				page: tx.currentPage,
				id,
			}

		return {
			success: true,
			transaction,
			page,
			id,
			canNext: amount == take,
			canPrev: page != 0,
		}
	}
)

export const payout = createAsyncThunk(
	"tx/payout",
	async ({ id, page, reload = false }, { getState, dispatch }) => {
		const { tx } = getState()
		const take = 2

		// If data is already present don't fetch the list
		const previousData = tx?.[payout]?.[page]
		if (previousData && !reload) {
			const amount = Object.keys(previousData).length
			return {
				success: true,
				id,
				page,
				canPrev: page != 0,
				canNext: amount == take,
			}
		}

		const url = `/api/paycheck/list`
		const params = {
			skip: page * take,
			take,
		}

		const { requests } = await axios
			.get(url, { params, withCredentials: true })
			.then(res => res.data)
			.catch(err => {
				console.error(err)
			})

		if (!requests) return { success: false }

		const amount = Object.keys(requests).length

		if (amount == 0)
			return {
				success: true,
				canNext: false,
				canPrev: true,
				page: tx.currentPage,
				id,
			}

		return {
			success: true,
			transaction,
			page,
			id,
			canNext: amount == take,
			canPrev: page != 0,
		}
	}
)
