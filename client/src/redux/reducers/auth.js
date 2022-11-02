import { createSlice } from "@reduxjs/toolkit"

const initialState = { verifying: true, isAuthenticated: false, user: "" }

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		loginSuccess: (state, { payload }) => {
			state.user = payload
			state.isAuthenticated = true
		},
		logoutSuccess: (state, { payload }) => {
			state.isAuthenticated = false
		},
	},
})

export const { loginSuccess, logoutSuccess } = authSlice.actions

export default authSlice.reducer
