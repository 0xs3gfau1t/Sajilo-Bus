//global imports
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

//local imports
import "./App.css"
import { Landing } from "./pages"

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Landing />} />
			</Routes>
		</Router>
	)
}

export default App
