import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import KhaltiCheckout from "khalti-checkout-web"
import SVG from "react-inlinesvg"

import { HeaderLogo, FormText, Alert } from "../components"
import { getBalance, buyCard } from "../redux/actions/card"
import { setAlert } from "../redux/actions/misc"

const initialState = {
	id: "",
}

const MyCard = () => {
	const [values, setValues] = useState(initialState)
	const misc = useSelector(state => state.misc)
	const card = useSelector(state => state.card)
	const dispatch = useDispatch()

	const API_KEY = import.meta.env.SAJILO_KEY

	let config = {
		"publicKey": API_KEY,
		"productIdentity": values.id ? values.id : "",
		"productName": "Sajilo Bus",
		"productUrl": "https://localhost:8000/mycard",
		"eventHandler": {
			onSuccess(payload) {
				// hit merchant api for initiating verfication
				if (!values.isLoad)
					dispatch(buyCard(payload.amount, payload.token))
			},
			// onError handler is optional
			onError(error) {
				// handle errors
				setAlert(`Failed, please try again`, "danger")
			},
			onClose() {
				setAlert("Transaction cancelled", "danger")
			},
		},
	}

	const handleChange = e => {
		setValues({ ...values, [e.target.name]: e.target.value })
	}

	const onSubmit = e => {
		e.preventDefault()
		e.preventDefault()
		if (!values.id) {
			dispatch(setAlert("Enter valid card id", "danger"))
		} else dispatch(getBalance(values.id))
	}

	const newCard = e => {
		setValues({ ...values, isBuy: true })
		config.productIdentity = "new card"
		let checkout = new KhaltiCheckout(config)
		checkout.show({ amount: 100 * 100 })
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
					{card.balance && (
						<h2 className="text-center py-1 mt-3 w-max bg-green-700 rounded mx-auto">
							Available balance : Rs. {card.balance / 100}
						</h2>
					)}
				</form>
				<button className="bg-khalti mt-4" onClick={newCard}>
					Buy New Card (Rs.100)
				</button>
				{card.newCard && (
					<div className="mt-4">
						<span className="bg-yellow-700 p-1 rounded mb-4">
							Please refresh this page after you saved the image.
						</span>
						<SVG src={card.newCard} />
					</div>
				)}
			</div>
		</div>
	)
}

export default MyCard
