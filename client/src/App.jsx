import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Provider } from "react-redux"
import Notices from "./pages/Notices"

import { store } from "./redux/store"

import {
	Landing,
	Login,
	MyCard,
	AdminDash,
	ManageBus,
	AllTransactions,
	MemberDash,
	ScanCard,
	MyBus,
} from "./pages"
import PrivateRoute from "./components/PrivateRoute"

import "./App.css"

function App() {
	return (
		<Provider store={store}>
			<Router>
				<Routes>
					<Route path="/" element={<Landing />} />
					<Route path="/notices" element={<Notices />} />
					<Route path="/admin" element={<Login member={false} />} />
					<Route path="/member" element={<Login member={true} />} />
					<Route path="/mycard" element={<MyCard />} />
					<Route path="/scan" element={<ScanCard />} />
					<Route
						path="/admin/dashboard"
						element={
							<PrivateRoute admin={true}>
								<AdminDash />
							</PrivateRoute>
						}
					>
						<Route path="bus" element={<ManageBus />} />
						<Route
							path="transactions"
							element={<AllTransactions admin={true} />}
						/>
					</Route>
					<Route
						path="/member/dashboard"
						element={
							<PrivateRoute admin={false}>
								<MemberDash />
							</PrivateRoute>
						}
					>
						<Route path="bus" element={<MyBus />} />
					</Route>
				</Routes>
			</Router>
		</Provider>
	)
}

export default App
