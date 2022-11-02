import { configureStore } from "@reduxjs/toolkit"

import misc from "./reducers/misc"

const initialState = {}

export const store = configureStore({
	reducer: { misc: misc },
})
