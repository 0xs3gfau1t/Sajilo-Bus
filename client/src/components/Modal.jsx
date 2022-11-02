const Modal = ({ children, onOutside }) => {
	return (
		<div className="fixed inset-0 z-10 overflow-y-auto">
			<div
				className="fixed inset-0 w-full h-full bg-black opacity-40"
				onClick={onOutside}
			/>
			<div className="flex items-center min-h-screen ">
				<div className="relative w-full max-w-lg mx-auto rounded-md shadow-lg bg-bg1">
					{children}
				</div>
			</div>
		</div>
	)
}

export default Modal
