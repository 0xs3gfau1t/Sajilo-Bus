<<<<<<< Updated upstream
import { Outlet } from "react-router-dom"

import { TopNav, MemberSide } from "../components"
=======
import { TopNav } from "../components"
>>>>>>> Stashed changes

const MemberDash = () => {
	return (
		<div>
			<TopNav title={"Member Dashboard"} />
<<<<<<< Updated upstream
			<div className="flex h-[88vh]">
				<MemberSide />
				<div className="w-3/4">
					<Outlet />
				</div>
			</div>
=======
>>>>>>> Stashed changes
		</div>
	)
}

export default MemberDash
