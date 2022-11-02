import { configureStore } from "@reduxjs/toolkit"

const initialState = {}

export const store = configureStore({
	reducer: { misc: misc, bus: bus, auth: auth, tx, card },
})
