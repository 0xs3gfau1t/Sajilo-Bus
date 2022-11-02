import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Provider } from "react-redux"

import { store } from "./redux/store"

import { Landing, Login } from "./pages"

import "./App.css"

function App() {
	return (
		<Provider store={store}>
			<Router>
				<Routes>
					<Route path="/" element={<Landing />} />
					<Route path="/admin" element={<Login member={false} />} />
					<Route path="/login" element={<Login member={true} />} />
				</Routes>
			</Router>
		</Provider>
	)
}

export default App
