import { Link } from "react-router-dom"

import HeaderLogo from "./HeaderLogo"

const LandingNav = () => {
	return (
		<header className="header py-12 bg-bg1 fixed left-28 top-0">
			<div className="logo">
				<HeaderLogo />
			</div>
			<nav className="nav-right">
				<ul className="nav-list">
					<li>
						<a href="/#home">Home</a>
					</li>
					<li>
						<a href="/#About_us">About Us</a>
					</li>
					<li>
						<Link to="/notices">Notices</Link>
					</li>
				</ul>
				<Link to="/mycard">
					<button className="button1 font-semibold">My Card</button>
				</Link>
			</nav>
		</header>
	)
}

export default LandingNav
