import { Link } from "react-router-dom"

import { HeaderLogo, LandingNav } from "../components/"

const Notices = () => {
	return (
		<div id="home" className=" text-neutral-100 h-screen">
			<LandingNav />
			<div className="flex mx-auto py-28 items-center gap-32 w-max">
				<div className="flex flex-col items-start p-0 gap-6">
					<h1
						id="Notices"
						className="font-head pt-8 text-4xl font-bold"
					>
						Notices
					</h1>
					<div className="divide-y divide-slate-700">
						<p className="font-normal text-lg font-head py-4">
							Lorem ipsum, dolor sit amet consectetur adipisicing
							elit. Dolorum ipsa, tempora eligendi, repellat quasi
							veritatis
						</p>
						<p className="font-normal text-lg font-head py-4">
							Lorem ipsum, dolor sit amet consectetur adipisicing
							elit. Dolorum ipsa, tempora eligendi, repellat quasi
							veritatis
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Notices
