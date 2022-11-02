//Reusable alert component

import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { clearAlert } from "../redux/reducers/misc"

const Alert = ({ float = true }) => {
	const { alertMsg, alertType } = useSelector(state => state.misc)
	const dispatch = useDispatch()
	return (
		<div
			className={`${
				!float ? "my-2" : "fixed top-8 w-1/3"
			} left-1/3 z-[100] rounded border px-4 py-2 text-center opacity-95 drop-shadow-lg alert-${alertType}`}
			role="alert"
		>
			<span className="block sm:inline">{alertMsg}</span>
			<span
				className="absolute top-0 bottom-0 right-0 ml-4 cursor-pointer px-4 py-2"
				onClick={e => {
					dispatch(clearAlert())
				}}
			>
				X
			</span>
		</div>
	)
}

export default Alert
