import { AiOutlineNumber, AiOutlineMail, AiFillPhone } from "react-icons/ai"
import { BsFilePersonFill } from "react-icons/bs"

const MyBus = () => {
	return (
		<div>
			<h1 className="mt-4">My Bus</h1>
			<ul className="dash-list flex flex-col gap-8 px-8 py-24">
				<li>
					<AiOutlineNumber />
					Bus Number &nbsp;: &nbsp; 123
				</li>
				<li>
					<BsFilePersonFill />
					Owner Name &nbsp;: &nbsp; Ram Shyam GhanaShyam
				</li>
				<li>
					<AiFillPhone />
					Phone Number &nbsp;: &nbsp; 911
				</li>
				<li>
					<AiOutlineMail />
					Email &nbsp;: &nbsp; buskomail@haha.com
				</li>
			</ul>
		</div>
	)
}

export default MyBus
