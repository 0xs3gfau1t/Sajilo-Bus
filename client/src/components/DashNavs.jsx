import { NavLink } from "react-router-dom"

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
				</header>
			</IconContext.Provider>
		</div>
	)
}
