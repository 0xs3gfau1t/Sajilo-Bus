import axios from "axios"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Alert } from "../components"
import { setAlert } from "../redux/actions/misc"

const Cards = () => {
	const dispatch = useDispatch()
	const { showAlert } = useSelector(state => state.misc)
	const [quantity, setQuantity] = useState(0)

	const onInr = () => setQuantity(old => old + 1)
	const onDcr = () => setQuantity(old => old - 1)
	const onChange = e => {
		const val = Number(e.target.value) || 0
		e.target.value = val
		setQuantity(val)
	}
	const onSubmit = async e => {
		e.preventDefault()
		const data = { quantity }
		const url = "/api/card/create"
		await axios
			.post(url, data, { withCredentials: true })
			.then(res => {
				dispatch(setAlert(res.data?.message ?? "Success", "success"))
				setQuantity(0)
			})
			.catch(err => {
				dispatch(
					setAlert(
						err.response?.data?.message ?? "Something went wrong",
						"danger"
					)
				)
			})
	}

	return (
		<>
			<form
				className="bg-black1 shadow-md rounded px-8 pt-6 pb-8 text-black"
				onSubmit={onSubmit}
			>
				<label className="block text-gray-700 text-sm font-bold mb-2">
					Amount
				</label>
				<div className = "flex  ">
					<div className="flex items-center mb-2">
						<span
							className="bg-red-600 hover:bg-red-700 cursor-pointer px-5 py-3 rounded-l-md"
							onClick={onDcr}
						>
							-
						</span>
						<input
							className="shadow appearance-none border-2 border-red-600 py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							type="text"
							value={quantity}
							onChange={onChange}
						/>
						<span
							className="bg-red-600 hover:bg-red-700 cursor-pointer px-5 py-3 rounded-r-md"
							onClick={onInr}
						>
							+
						</span>
					</div>
					<button className="button2 mx-1 text-white">
						Create
					</button>
				</div>
				
			</form>
			<div className="fixed w-1/4 right-1 bottom-1 z-[100]">
				{showAlert ? <Alert float={false} /> : null}
			</div>
		</>
	)
}

export default Cards
