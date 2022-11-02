import { createSlice } from "@reduxjs/toolkit"

import { verifyAuth } from "../actions/auth"

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
	extraReducers: builder => {
		builder.addCase(verifyAuth.pending, state => {
			state.verifying = true
		})
		builder.addCase(verifyAuth.fulfilled, (state, { payload }) => {
			state.isAuthenticated = payload.isAuthenticated
			state.user = payload.user
			state.verifying = false
		})
	},
})

export const { loginSuccess, logoutSuccess } = authSlice.actions

export default authSlice.reducer
