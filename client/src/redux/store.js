import { configureStore } from "@reduxjs/toolkit"

import misc from "./reducers/misc"
import auth from "./reducers/auth"
import card from "./reducers/card"

const initialState = {}

export const store = configureStore({
	reducer: { misc: misc, auth: auth, card: card },
})
