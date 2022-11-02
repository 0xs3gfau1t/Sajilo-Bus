import { useState } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { HeaderLogo, FormText, Alert } from "../components"
import { setAlert } from "../redux/actions/misc"

const initialState = {
	username: "",
	password: "",
}
const Login = ({ member }) => {
	const [values, setValues] = useState(initialState)
	const misc = useSelector(state => state.misc)

	const dispatch = useDispatch()

	const handleChange = e => {
		setValues({ ...values, [e.target.name]: e.target.value })
	}
	const onSubmit = e => {
		e.preventDefault()
		const { password, bus_number, username } = values
		if (!password && !(bus_number || username)) {
			dispatch(setAlert("One or more field is missing.", "danger"))
		} else {
			console.log("Dispatch login action here")
		}
	}
	return (
		<div>
			<form className="form my-[15vh] w-1/4" onSubmit={onSubmit}>
				<HeaderLogo />
				<h1>{member ? "Member" : "Admin"} Login</h1>
				{misc.showAlert && <Alert float={false} />}
				<FormText
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
