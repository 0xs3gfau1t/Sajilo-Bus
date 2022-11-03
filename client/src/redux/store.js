import { configureStore } from "@reduxjs/toolkit"

import misc from "./reducers/misc"
import bus from "./reducers/bus"
import auth from "./reducers/auth"
import card from "./reducers/card"
import tx from "./reducers/tx"
import paycheck from "./reducers/paycheck"

export const store = configureStore({
	reducer: {
		misc: misc,
		auth: auth,
		card: card,
		bus: bus,
		tx: tx,
		paycheck: paycheck,
	},
})
