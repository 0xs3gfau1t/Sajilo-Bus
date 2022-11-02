import { useDispatch, useSelector } from "react-redux"
import { addBus, editBus } from "../redux/actions/bus"
import { setEditing } from "../redux/reducers/bus"
import { AiOutlineLoading3Quarters, AiFillSave } from "react-icons/ai"
import { MdCancelPresentation } from "react-icons/md"

const FormItem = ({ name, label, type, defaultValue, ...props }) => (
	<div className="mb-4">
		<label
			className="block text-gray-700 text-sm font-bold mb-2"
			htmlFor={name}
		>
			{label}
		</label>
		<input
			className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
			type={type}
			name={name}
			defaultValue={defaultValue}
			placeholder={label}
			{...props}
		/>
	</div>
)

const BusEdit = ({ bus_number }) => {
	const { saving, pages, currentPage, mybus } = useSelector(
		state => state.bus
	)
	const bus = bus_number == undefined ? mybus : pages[currentPage][bus_number]

	const dispatch = useDispatch()

	const onSubmit = e => {
		e.preventDefault()
		const data = {
			bus_number: e.target["0"].value,
			owner_name: e.target["1"].value,
			ph_number: e.target["2"].value,
			email: e.target["3"].value,
		}
		dispatch(editBus({ data, me: bus_number == undefined }))
	}

	return (
		<form
			className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 text-black"
			onSubmit={onSubmit}
		>
			<h1>Bus Edit</h1>
			<FormItem
				name="bus_number"
				label="Bus Number"
				type="text"
				defaultValue={bus_number ?? bus.bus_number}
				disabled={true}
			/>
			<FormItem
				name="owner_name"
				label="Name"
				type="text"
				defaultValue={bus.owner_name}
			/>
			<FormItem
				name="ph_number"
				label="Phone"
				type="text"
				defaultValue={bus.ph_number}
			/>
			<FormItem
				name="email"
				label="Email"
				type="text"
				defaultValue={bus.email}
			/>
			<span>
				<button
					type="submit"
					className={`${saving == "failed"
							? "bg-red-900 hover:bg-red-800"
							: "bg-blue-900 hover:bg-blue-800"
						} text-white mr-5`}
				>
					{saving === true ? (
						<AiOutlineLoading3Quarters className="text-white animate-spin" />
					) : (
						<AiFillSave className="text-white" />
					)}
				</button>
				<button
					className="bg-red-900"
					onClick={() => dispatch(setEditing(false))}
				>
					<MdCancelPresentation className="text-white" />
				</button>
			</span>
		</form>
	)
}

const BusAdd = () => {
	const { adding } = useSelector(state => state.bus)
	const dispatch = useDispatch()

	const onSubmit = e => {
		e.preventDefault()
		const data = {
			bus_number: e.target["0"].value,
			owner_name: e.target["1"].value,
			ph_number: e.target["2"].value,
			email: e.target["3"].value,
			password: e.target["4"].value,
		}
		dispatch(addBus(data))
	}

	return (
		<form
			className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 text-black"
			onSubmit={onSubmit}
		>
			<h1>Add Bus</h1>
			<FormItem
				name="bus_number"
				label="Bus Number"
				type="text"
				defaultValue=""
			/>
			<FormItem
				name="owner_name"
				label="Name"
				type="text"
				defaultValue=""
			/>
			<FormItem
				name="ph_number"
				label="Phone"
				type="text"
				defaultValue=""
			/>
			<FormItem name="email" label="Email" type="text" defaultValue="" />
			<FormItem
				name="password"
				label="Password"
				type="password"
				defaultValue=""
			/>
			<button
				className={`${adding == "failed"
						? "bg-red-900 hover:bg-red-800"
						: "bg-blue-900 hover:bg-blue-800"
					} text-white `}
				type="submit"
			>
				{adding == "adding" ? (
					<AiOutlineLoading3Quarters className="text-white animate-spin" />
				) : (
					<AiFillSave className="text-white" />
				)}
			</button>
		</form>
	)
}

export { BusAdd, BusEdit }
