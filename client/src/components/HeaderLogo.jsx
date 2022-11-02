import { Link } from "react-router-dom"

const HeaderLogo = () => {
	return (
		<Link to="/">
			<img
				src="/src/assets/logo.png"
				alt="sajilo bus"
				className="logo h-fit w-fit"
			/>
		</Link>
	)
}

export default HeaderLogo
