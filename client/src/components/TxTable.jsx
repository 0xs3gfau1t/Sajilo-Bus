import { useDispatch, useSelector } from "react-redux"
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi"
import { AiOutlineReload } from "react-icons/ai"
import { searchTx } from "../redux/actions/tx"

const TxTable = () => {
	const tx = useSelector(state => state.tx)
	const dispatch = useDispatch()

	const onNext = () => {
		dispatch(searchTx({ id: tx.id, page: tx.currentPage + 1 }))
	}

	const onPrev = () => {
		dispatch(searchTx({ id: tx.id, page: tx.currentPage - 1 }))
	}

	const onReload = () => {
		dispatch(searchTx({ id: tx.id, page: tx.currentPage, reload: true }))
	}

	return (
		<>
			<div className="flex bg-[#111] rounded-lg mb-2 justify-evenly align-center">
				<span
					className={`${tx.canPrev ? "hover:bg-blue-600 cursor-pointer" : ""
						} bg-blue-500 px-3 py-1 rounded-md`}
					onClick={onPrev}
				>
					Prev
					<BiSkipPrevious />
				</span>
				<span
					className={`${tx.canNext ? "hover:bg-blue-600 cursor-pointer" : ""
						} bg-blue-500 px-3 py-1 rounded-md`}
					onClick={onNext}
				>
					Next
					<BiSkipNext />
				</span>
				<span
					className="bg-blue-500 hover:bg-blue-600 cursor-pointer px-3 py-1 rounded-md"
					onClick={onReload}
				>
					Reload <AiOutlineReload />{" "}
				</span>
			</div>
			<table className="w-full">
				<thead>
					<tr className = "text-center">
						<th className="border-white border-2" rowSpan={2}>
							ID
						</th>
						<th className="border-white border-2" colSpan={3}>
							Source
						</th>
						<th className="border-white border-2" colSpan={3}>
							Destination
						</th>
						<th className="border-white border-2" colSpan={2}>
							Id
						</th>
						<th className="border-white border-2" rowSpan={2}>
							Paid
						</th>
					</tr>
					<tr>
						<th className="border-white border-2">Lat</th>
						<th className="border-white border-2">Lon</th>
						<th className="border-white border-2">Time</th>
						<th className="border-white border-2">Lat</th>
						<th className="border-white border-2">Lon</th>
						<th className="border-white border-2">Time</th>
						<th className="border-white border-2">Bus</th>
						<th className="border-white border-2">Card</th>
					</tr>
				</thead>
				<tbody>
					{tx[tx.mode]?.[tx.id]?.[tx.currentPage]?.map(
						transaction => (
							<tr className = "text-center" key={transaction.id}>
								<td className="border-white border-2 py-3">
									{transaction.id}
								</td>
								<td className="border-white border-2">
									{transaction.src_lon}
								</td>
								<td className="border-white border-2">
									{transaction.src_lat}
								</td>
								<td className="border-white border-2">
									{transaction.source_time}
								</td>
								<td className="border-white border-2">
									{transaction.dest_lon}
								</td>
								<td className="border-white border-2">
									{transaction.dest_lat}
								</td>
								<td className="border-white border-2">
									{transaction.dest_time}
								</td>
								<td className="border-white border-2">
									{transaction.Bus_number}
								</td>
								<td className="border-white border-2">
									{transaction.cardId}
								</td>
								<td className="border-white border-2">
									{transaction.paid_amount}
								</td>
							</tr>
						)
					)}
				</tbody>
			</table>
		</>
	)
}

export default TxTable
