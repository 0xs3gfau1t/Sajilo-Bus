import { useState } from "react"
import { Link } from "react-router-dom"

import { HeaderLogo, FormText } from "../components"

const initialState = {
	username: "",
	password: "",
}
const Login = () => {
	const [values, setValues] = useState(initialState)

	const handleChange = e => {
		setValues({ ...values, [e.target.name]: e.target.value })
	}
	const onSubmit = e => {
		e.preventDefault()
		const { password, bus_number, username } = values
		if (!password && !(bus_number || username)) {
			console.log("One or more field is missing.")
		}
	}
	return (
		<div>
			<form className="form my-[15vh] w-1/4" onSubmit={onSubmit}>
				<Link to="/">
					<HeaderLogo />
				</Link>
				<h1>Login</h1>
				<FormText
					name={"username"}
					value={values.username}
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
