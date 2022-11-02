const FormText = ({ name, value, handleChange }) => {
	return (
		<div className="mb-4">
			<label
				htmlFor={name}
				className="float-left mb-1 capitalize tracking-wide"
			>
				{name}
			</label>
			<input
				value={value}
				name={name}
				onChange={handleChange}
				className="form-input w-full py-1 px-2 rounded-md bg-[#1a2025]"
			/>
		</div>
	)
}

export { FormText }
