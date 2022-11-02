import { useEffect, useState } from "react"
import {
	AiFillEdit,
	AiFillDelete,
	AiOutlineLoading3Quarters,
	AiOutlineReload,
} from "react-icons/ai"
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi"
import { BsFillPlusSquareFill } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"
import { Alert } from "../components"
import { BusEdit, BusAdd } from "../components/BusForms"
import Modal from "../components/Modal"
import { delBus, gotoPage } from "../redux/actions/bus"
import { setAdding, setDeleting, setEditing } from "../redux/reducers/bus"

const ManageBus = () => {
	const { pages, currentPage, canNext, canPrev, editing, adding, deleting } =
		useSelector(state => state.bus)
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
			<div
				className="flex gap-4 my-4 mx-auto w-2/4 text-2xl bg-green-700 py-2 px-4 rounded justify-center cursor-pointer"
				onClick={() => dispatch(setAdding("open"))}
			>
				<BsFillPlusSquareFill className="ml-4 text-[1.8rem]" />
				<h2 className="">Register a new bus</h2>
			</div>
			<h2 className="m-4 text-2xl py-2">Bus Details</h2>
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
						<th className="border-white border-2">Bus Number</th>
						<th className="border-white border-2">Owner Name</th>
						<th className="border-white border-2">Phone Number</th>
						<th className="border-white border-2">Email</th>
						<th className="border-white border-2">Actions</th>
					</tr>
				</thead>
				<tbody>
					{pages[currentPage] &&
						Object.keys(pages[currentPage]).map(bus_number => {
							return (
								<tr key={bus_number} className = "text-center">
									<td className="border-white border-2 py-3">
										{bus_number}
									</td>
									<td className="border-white border-2">
										{
											pages[currentPage][bus_number]
												.owner_name
										}
									</td>
									<td className="border-white border-2">
										{
											pages[currentPage][bus_number]
												.ph_number
										}
									</td>
									<td className="border-white border-2">
										{pages[currentPage][bus_number].email}
									</td>
									<td className="border-white border-2">
										<div className="flex justify-around">
											<AiFillDelete
												className="cursor-pointer hover:text-red-500"
												onClick={e =>
													dispatch(
														setDeleting(bus_number)
													)
												}
											/>
											<AiFillEdit
												className="cursor-pointer hover:text-blue-500"
												onClick={e =>
													dispatch(
														setEditing(bus_number)
													)
												}
											/>
										</div>
									</td>
								</tr>
							)
						})}
				</tbody>
			</table>
			{editing && (
				<Modal
					onOutside={() => {
						dispatch(setEditing(false))
					}}
				>
					<BusEdit bus_number={editing} />
				</Modal>
			)}
			{adding ? (
				<Modal
					onOutside={() => {
						dispatch(setAdding(false))
					}}
				>
					<BusAdd />
				</Modal>
			) : (
				""
			)}
			{deleting ? (
				<Modal
					onOutside={() => {
						dispatch(setDeleting(false))
					}}
				>
					<div className="text-black m-3 font-semibold">
						Are you sure you want to delete this record?
					</div>
					<div className="flex justify-end gap-2 m-2">
						<button
							className="bg-red-900 hover:bg-red-800 flex items-center justify-between gap-1"
							onClick={() => dispatch(delBus(deleting))}
						>
							{deleting == "failed" ? "Retry" : "Confirm"}
							{deleting == "deleting" ? (
								<AiOutlineLoading3Quarters className="text-white animate-spin" />
							) : (
								<AiFillDelete />
							)}
						</button>
						<button
							className="bg-green-900 hover:bg-green-800"
							onClick={() => dispatch(setDeleting(false))}
						>
							Cancel
						</button>
					</div>
				</Modal>
			) : null}
			<div className="fixed w-1/4 right-1 bottom-1 z-[100]">
				{showAlert ? <Alert float={false} /> : null}
			</div>
		</div>
	)
}

export default ManageBus
