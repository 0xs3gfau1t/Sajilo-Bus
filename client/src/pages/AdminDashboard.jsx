import { TopNav, SideNav } from "../components/DashNavs"

const AdminDash = () => {
	return (
		<div>
			<TopNav title={"Admin Dashboard"} />
			<div className="flex h-[88vh]">
				<SideNav />
			</div>
		</div>
	)
}
export default AdminDash
