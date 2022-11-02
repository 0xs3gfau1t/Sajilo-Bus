import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { HeaderLogo, FormText, Alert } from "../components"

const initialState = {
	id: "",
}

const MyCard = () => {
	const [values, setValues] = useState(initialState)
	const misc = useSelector(state => state.misc)

	const dispatch = useDispatch()
	const handleChange = e => {
		setValues({ ...values, [e.target.name]: e.target.value })
	}

	const onSubmit = e => {
		e.preventDefault()
	}

	return (
		<div>
			<div className={`form w-2/5 my-12`}>
				<form onSubmit={onSubmit}>
					<HeaderLogo />
					<h1>My Card</h1>
					{misc.showAlert && <Alert float={false} />}
					<FormText
						type="text"
						name="id"
						labelText="Card Identity Number"
						value={values.id}
						handleChange={handleChange}
					/>
					<div className="flex gap-7 w-fit mx-auto">
						<button type="submit" className="bg-blue-900">
							Check Info
						</button>
					</div>
					<h2 className="text-center py-1 mt-3 w-max bg-green-700 rounded mx-auto">
						Available balance : Rs. xxx
					</h2>
				</form>
			</div>
		</div>
	)
}

export default MyCard
