import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { AiOutlineNumber, AiOutlineMail, AiFillPhone } from "react-icons/ai"
import { BsFilePersonFill } from "react-icons/bs"

import { getBus } from "../redux/actions/bus"
import { setEditing } from "../redux/reducers/bus"
import { BusEdit, Modal } from "../components"

const MyBus = () => {
	const bus_num = useSelector(state => state.auth.user)
	const bus = useSelector(state => state.bus)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getBus(bus_num))
	}, [bus_num])
	if (bus.loading) {
		return <h2 className="mt-4">Loading details</h2>
	}
	return (
		<div>
			<h1 className="mt-4">My Bus</h1>
			<ul className="dash-list flex flex-col gap-8 px-8 py-24">
				<li>
					<AiOutlineNumber />
					Bus Number &nbsp;: &nbsp; {bus.mybus.bus_number}
				</li>
				<li>
					<BsFilePersonFill />
					Owner Name &nbsp;: &nbsp; {bus.mybus.owner_name}
				</li>
				<li>
					<AiFillPhone />
					Phone Number &nbsp;: &nbsp; {bus.mybus.ph_number}
				</li>
				<li>
					<AiOutlineMail />
					Email &nbsp;: &nbsp; {bus.mybus.email}
				</li>
				<button
					className="button2"
					onClick={() => dispatch(setEditing(bus.mybus.bus_number))}
				>
					Edit
				</button>
			</ul>
			{bus.editing && (
				<Modal
					onOutside={() => {
						dispatch(setEditing(false))
					}}
				>
					<BusEdit />
				</Modal>
			)}
		</div>
	)
}

export default MyBus
