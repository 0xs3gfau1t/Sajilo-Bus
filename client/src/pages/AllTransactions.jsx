import { useDispatch, useSelector } from "react-redux"
import { setMode } from "../redux/reducers/tx"
import { AiOutlineSearch } from "react-icons/ai"
import { searchTx } from "../redux/actions/tx"
import TxTable from "../components/TxTable"
import { useEffect } from "react"

const AllTransactions = ({ admin }) => {
	const dispatch = useDispatch()
	const state = useSelector(state => state.tx)
	const user = useSelector(state => state.auth.user)

	const onSubmit = e => {
		e.preventDefault()
		dispatch(searchTx({ id: e.target["0"].value, page: state.currentPage }))
	}

	useEffect(() => {
		if (!admin) {
			dispatch(searchTx({ id: user, page: state.currentPage }))
		}
	}, [admin])

	return (
		<>
			{admin && (
				<form
					className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 text-black"
					onSubmit={onSubmit}
				>
					<div className="border-b border-gray-200 mb-4">
						<ul className="flex">
							<li className="mr-2 cursor-pointer">
								<div
									className={`${state.mode == "bus"
											? "text-black-500"
											: "text-gray-500 hover:text-gray-600"
										} hover:border-blue-500 p-4 text-sm text-center border-transparent border-b-2`}
									onClick={() => {
										dispatch(setMode("bus"))
									}}
								>
									Bus
								</div>
							</li>
							<li className="mr-2 cursor-pointer">
								<div
									className={`${state.mode == "card"
											? "text-black-500"
											: "text-gray-500 hover:text-gray-600"
										} hover:border-blue-500 p-4 text-sm text-center border-transparent border-b-2`}
									onClick={() => {
										dispatch(setMode("card"))
									}}
								>
									Card
								</div>
							</li>
						</ul>
					</div>
					<div className="flex">
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							type="text"
							name={
								state.mode == "bus" ? "Bus Number" : "Card Id"
							}
							placeholder={
								state.mode == "bus" ? "Bus Number" : "Card Id"
							}
						/>
						<button type="submit">
							<AiOutlineSearch />
						</button>
					</div>
				</form>
			)}
			<TxTable />
		</>
	)
}

export default AllTransactions
