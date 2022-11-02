import { Link } from "react-router-dom"

import { LandingNav } from "../components"

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
							Lorem ipsum dolor sit amet consectetur, adipisicing
							elit. Ut dignissimos maxime dolores veniam
							molestias. Dolores cupiditate beatae ducimus
							molestiae quibusdam, eveniet assumenda! Atque
							perferendis enim ducimus sunt eaque esse maiores.
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
			<div className="flex mx-auto my-6 items-center gap-32 w-max left-32">
				<div className="flex flex-col items-start p-0 gap-6">
					<h1
						id="About_us"
						className="font-head pt-8 text-4xl font-bold"
					>
						About Us
					</h1>
					<p className="font-normal text-lg font-head">
						Sajilo Bus is initiated keeping sensible development in
						mind and it's possible expandability. We connect Bus
						service, Bus and User with a simple portable card.
					</p>
					<p className="font-normal text-lg font-head">
						Lorem ipsum, dolor sit amet consectetur adipisicing
						elit. Eaque, exercitationem? Molestiae quam reiciendis
						voluptatibus rerum quod corrupti tempora reprehenderit
						debitis ipsa natus eos nobis odio, inventore, pariatur
						quae, optio labore.
					</p>
				</div>
			</div>
			<div className="flex mx-auto my-6 items-center gap-32 w-max left-32">
				<div className="flex flex-col items-start p-0 gap-6">
					<h1
						id="Learn_more"
						className="font-head pt-8 text-4xl font-bold"
					>
						How Sajilo Bus works??
					</h1>
					<p className="font-normal text-lg font-head">
						Lorem ipsum dolor sit, amet consectetur adipisicing
						elit. Quam a, inventore itaque cumque molestiae ducimus
						autem maiores sequi aspernatur, quos soluta nostrum
						doloribus reprehenderit quaerat eius quo suscipit animi
						vitae..
					</p>
					<p className="font-normal text-lg font-head">
						Lorem ipsum, dolor sit amet consectetur adipisicing
						elit. Eaque, exercitationem? Molestiae quam reiciendis
						voluptatibus rerum quod corrupti tempora reprehenderit
						debitis ipsa natus eos nobis odio, inventore, pariatur
						quae, optio labore.
					</p>
				</div>
			</div>
		</div>
	)
}

export default Landing
