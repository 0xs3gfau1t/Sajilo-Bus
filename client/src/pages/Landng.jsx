import { Link } from "react-router-dom"

import { LandingNav } from "../components/"

const Landing = () => {
	return (
		<div>
			<div id="home" className=" text-neutral-100 h-screen">
				<LandingNav />
				<div className="flex mx-auto py-28 items-center gap-32 w-max">
					<div className="flex flex-col items-start p-0 gap-8">
						<div className="flex flex-col items-start p-0 gap-6">
							<h1 className="font-head pt-8 text-4xl font-bold">
								Sajilo Bus
							</h1>
							<h2 className="text-xl font-bold">
								Travel safely, pay smartly
							</h2>
						</div>
						<p className="font-normal text-lg font-head">
							Hasslefree payment...., adipisicing elit. Ut
							dignissimos maxime dolores veniam molestias. Dolores
							cupiditate beatae ducimus molestiae quibusdam,
							eveniet assumenda! Atque perferendis enim ducimus
							sunt eaque esse maiores.
						</p>
						<div className="flex gap-4">
							<Link to="/login">
								<button className="button1 nav-item">
									Member Login
								</button>
							</Link>
							<a href="#Learn_more">
								<button className="button2 nav-item">
									Learn More
								</button>
							</a>
						</div>
					</div>
					<div className="w-[190vw] landing-right">
						<img src="/src/assets/bus.png" alt="Sajilo bus" />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Landing
