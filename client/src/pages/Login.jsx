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
	return (
		<div>
			<form className="form my-[15vh] w-1/4">
				<Link to="/">
					<HeaderLogo />
				</Link>
				<h1>Login</h1>
				<FormText name={"username"} value={values.username} />

				<FormText
					name="password"
					labelText="Password"
					value={values.password}
				/>
				<button type="submit" className="bg-blue-900">
					Login
				</button>
			</form>
		</div>
	)
}

export default Login
