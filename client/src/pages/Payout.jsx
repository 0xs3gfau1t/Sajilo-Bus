import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { approve, gotoPage } from "../redux/actions/paycheck"
import { AiOutlineReload, AiFillCheckSquare } from "react-icons/ai"
import { MdCalculate } from "react-icons/md"
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi"
import { Alert } from "../components"

const Payout = () => {
	const { pages, currentPage, canNext, canPrev } = useSelector(
		state => state.paycheck
	)

	const { showAlert } = useSelector(state => state.misc)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(gotoPage({ page: 0 }))
	}, [])

	const onNext = () => {
		dispatch(gotoPage({ page: currentPage + 1 }))
	}

	const onPrev = () => {
		dispatch(gotoPage({ page: currentPage - 1 }))
	}

	const onReload = () => {
		dispatch(gotoPage({ page: currentPage, reload: true }))
	}

	return (
		<div>
			<h1>Payment Requests</h1>
			<div className="flex bg-[#111] rounded-lg mb-2 justify-evenly align-center">
				<span
					className={`${canPrev ? "hover:bg-blue-600 cursor-pointer" : ""
						} bg-blue-500 px-3 py-1 rounded-md`}
					onClick={onPrev}
				>
					Prev
					<BiSkipPrevious />
				</span>
				<span
					className={`${canNext ? "hover:bg-blue-600 cursor-pointer" : ""
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
					<tr>
						<th className="border-white border-2">ID</th>
						<th className="border-white border-2">Bus Number</th>
						<th className="border-white border-2">Request Date</th>
						<th className="border-white border-2">Actions</th>
					</tr>
				</thead>
				<tbody>
					{pages[currentPage]?.map(entry => {
						return (
							<tr key={entry.id} className="text-center">
								<td className="border-white border-2 py-3">
									{entry.id}
								</td>
								<td className="border-white border-2 py-3">
									{entry.busBus_number}
								</td>
								<td className="border-white border-2 py-3">
									{entry.requestDate}
								</td>
								<td className="border-white border-2 py-3">
									<div className="flex justify-around">
										<MdCalculate className="cursor-pointer hover:text-red-500" />
										<AiFillCheckSquare
											className="cursor-pointer hover:text-red-500"
											onClick={e => {
												dispatch(
													approve({ id: entry.id })
												)
											}}
										/>
									</div>
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>
			<div className="fixed w-1/4 right-1 bottom-1 z-[100]">
				{showAlert ? <Alert float={false} /> : null}
			</div>
		</div>
	)
}

export default Payout
