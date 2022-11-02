import { NavLink } from "react-router-dom"
import { IconContext } from "react-icons"
import { BsFillPersonFill, BsFillCaretDownFill } from "react-icons/bs"
import { useSelector } from "react-redux"

import HeaderLogo from "./HeaderLogo"

const TopNav = ({ title }) => {
	const user = useSelector(state => state.auth.user)

	return (
		<div className="bg-[#123]">
			<IconContext.Provider value={{ color: "white", size: "1.4rem" }}>
				<header className="header rounded-lg h-[12vh]">
					<HeaderLogo />
					<h2 className="-ml-20 text-xl font-bold">{title}</h2>
					<nav className="nav-right">
						<ul className="nav-list">
							<li className="flex gap-2">
								<BsFillPersonFill />
								{user}
							</li>
							<li>
								<BsFillCaretDownFill />
							</li>
						</ul>
					</nav>
				</header>
			</IconContext.Provider>
		</div>
	)
}

export { TopNav }
