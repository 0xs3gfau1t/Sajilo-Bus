import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { HeaderLogo, FormText, Alert } from "../components"
import { setAlert } from "../redux/actions/misc"
import { login, verifyAuth } from "../redux/actions/auth"

const initialState = {
	username: "",
	password: "",
	bus_number: "",
}
const Login = ({ member }) => {
	const [values, setValues] = useState(initialState)
	const misc = useSelector(state => state.misc)
	const auth = useSelector(state => state.auth)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(verifyAuth({ admin: !member, alert: false }))
	}, [member])

	const handleChange = e => {
		setValues({ ...values, [e.target.name]: e.target.value })
	}
	const onSubmit = e => {
		e.preventDefault()
		const { password, bus_number, username } = values
		if (!password && !(bus_number || username)) {
			dispatch(setAlert("One or more field is missing.", "danger"))
		} else {
			dispatch(login(values, member))
		}
	}

	if (!auth.verifying && auth.isAuthenticated) {
		return (
			<Navigate
				to={member ? "/member/dashboard/" : "/admin/dashboard/"}
			/>
		)
	}

	return (
		<div>
			<form className="form my-[15vh] w-1/4" onSubmit={onSubmit}>
				<HeaderLogo />
				<h1>{member ? "Member" : "Admin"} Login</h1>
				{misc.showAlert && <Alert float={false} />}
				<FormText
					type={member ? "text" : "text"}
					name={member ? "bus_number" : "username"}
					value={member ? values.bus_number : values.username}
					labelText={member ? "Bus Number" : ""}
					handleChange={handleChange}
				/>

				<FormText
					name="password"
					labelText="Password"
					value={values.password}
					handleChange={handleChange}
				/>
				<button type="submit" className="bg-blue-900">
					Login
				</button>
			</form>
		</div>
	)
}

export default Login
