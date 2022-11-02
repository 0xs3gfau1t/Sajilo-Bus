import { Link } from "react-router-dom"

import { LandingNav } from "../components/"

const Landing = () => {
	return (
		<div>
			<div id="home" className=" text-neutral-100 h-screen">
				<LandingNav />
			</div>
		</div>
	)
}

export default Landing
