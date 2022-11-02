import React, { useEffect } from "react"
import { Navigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { verifyAuth } from "../redux/actions/auth"

const PrivateRoute = ({ children, admin }) => {
	const { isAuthenticated, verifying } = useSelector(state => state.auth)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(verifyAuth({ admin }))
	}, [admin])

	if (!verifying && !isAuthenticated) {
		return <Navigate to={admin ? "/admin" : "/login"} />
	}

	return children
}

export default PrivateRoute
