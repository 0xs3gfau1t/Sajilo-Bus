import { useState } from "react"
import { NavLink } from "react-router-dom"
import { IconContext } from "react-icons"
import { BsFillPersonFill, BsFillCaretDownFill } from "react-icons/bs"
import { FaBusAlt, FaMoneyCheckAlt } from "react-icons/fa"
import { MdAltRoute, MdPayments, MdQrCode2 } from "react-icons/md"
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

const SideNav = () => {
	return (
		<ul className="dash-list flex flex-col gap-8 px-1 py-24 bg-black1 w-1/5">
			<NavLink
				to="bus"
				className={({ isActive }) =>
					isActive ? "bg-sky-600 font-bold" : ""
				}
			>
				<li>
					<FaBusAlt />
					Manage Buses
				</li>
			</NavLink>
			<NavLink
				to="routes"
				className={({ isActive }) =>
					isActive ? "bg-sky-600 font-bold" : ""
				}
			>
				<li>
					<MdAltRoute />
					Manage Routes
				</li>
			</NavLink>
			<NavLink
				to="newcard"
				className={({ isActive }) =>
					isActive ? "bg-sky-600 font-bold" : ""
				}
			>
				<li>
					<MdQrCode2 />
					Issue card
				</li>
			</NavLink>
			<NavLink
				to="transactions"
				className={({ isActive }) =>
					isActive ? "bg-sky-600 font-bold" : ""
				}
			>
				<li>
					<FaMoneyCheckAlt />
					Transactions
				</li>
			</NavLink>
			<NavLink
				to="payout"
				className={({ isActive }) =>
					isActive ? "bg-sky-600 font-bold" : ""
				}
			>
				<li>
					<MdPayments />
					Payout{" "}
				</li>
			</NavLink>
		</ul>
	)
}

export { TopNav, SideNav }
