import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import { Landing, Login } from "./pages"

import "./App.css"

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/login" element={<Login />} />
			</Routes>
		</Router>
	)
}

export default App
