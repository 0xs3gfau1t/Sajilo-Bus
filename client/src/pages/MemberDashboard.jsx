import { Outlet } from "react-router-dom"

import { TopNav, MemberSide } from "../components"

const MemberDash = () => {
	return (
		<div>
			<TopNav title={"Member Dashboard"} />
			<div className="flex h-[88vh]">
				<MemberSide />
				<div className="w-3/4">
					<Outlet />
				</div>
			</div>
		</div>
	)
}

export default MemberDash
