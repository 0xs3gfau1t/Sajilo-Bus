import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Alert, Modal } from "../components"
import { setAlert } from "../redux/actions/misc"
import { gotoPage, delCard } from "../redux/actions/card"
import {
	AiFillDelete,
	AiOutlineLoading3Quarters,
	AiOutlineReload,
} from "react-icons/ai"
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi"
import { setDeleting } from "../redux/reducers/card"


const Cards = () => {
	const dispatch = useDispatch()
    const { pages, currentPage, canNext, canPrev, deleting } = useSelector(state => state.card)
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

    useEffect(() =>{
        dispatch(gotoPage({
            page: 0
        }))
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
            <h2 className="m-4 text-2xl py-2">Card Details</h2>
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
			<table className=" w-full ">
				<thead>
					<tr className="py-2 px-1">
						<th className="border-white border-2">ID</th>
						<th className="border-white border-2">Balance</th>
                        <th className="border-white border-2">Actions</th>
					</tr>
				</thead>
				<tbody>
					{pages[currentPage] &&
						Object.keys(pages[currentPage]).map(id => {
							return (
								<tr key={id} className = "text-center">
									<td className="border-white border-2 py-3">
										{id}
									</td>
									<td className="border-white border-2">
										{
											pages[currentPage][id]
												.balance
										}
									</td>
									<td className="border-white border-2">
										<div className="flex justify-around">
											<AiFillDelete
												className="cursor-pointer hover:text-red-500"
												onClick={e =>
													dispatch(
														setDeleting(id)
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
            {deleting ? (
                <Modal
                onOutside={() =>{
                    dispatch(setDeleting(false))
                }}>
                    <div className="text-white m-3 font-semibold">
                        Are you sure you wnat to delete this id?
                    </div>
                    <div className = 'flex justify-end gap-2 m-2'>
                    <button
							className="bg-red-900 hover:bg-red-800 flex items-center justify-between gap-1"
							onClick={() => dispatch(delCard(deleting))}
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
		</>
	)
}

export default Cards
