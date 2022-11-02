import { configureStore } from "@reduxjs/toolkit"

import misc from "./reducers/misc"
import auth from "./reducers/auth"

const initialState = {}

export const store = configureStore({
	reducer: { misc: misc },
})
