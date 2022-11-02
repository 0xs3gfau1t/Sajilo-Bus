import { useState } from "react"
import { IconContext } from "react-icons"
import { BsFillPersonFill, BsFillCaretDownFill } from "react-icons/bs"
import { useSelector, useDispatch } from "react-redux"

import HeaderLogo from "./HeaderLogo"
import { logout } from "../redux/actions/auth"

const TopNav = ({ title }) => {
	const [showDrop, setDrop] = useState(false)
	const user = useSelector(state => state.auth.user)
	const dispatch = useDispatch()

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
							<li
								onClick={e => setDrop(!showDrop)}
								className={`${
									showDrop ? "rotate-180" : ""
								} transition-transform`}
							>
								<BsFillCaretDownFill />
							</li>
						</ul>
					</nav>
					<ul
						className={`${
							showDrop ? "absolute" : "hidden"
						} bg-white text-black rounded py-1 px-4 mt-16 right-24`}
					>
						<li
							className="cursor-pointer"
							onClick={e => {
								dispatch(logout())
							}}
						>
							Logout
						</li>
					</ul>
				</header>
			</IconContext.Provider>
		</div>
	)
}

export { TopNav }
