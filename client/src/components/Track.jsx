import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { useState } from "react"
import axios from "axios"
import { Icon } from "leaflet"
import marker from "../../marker.svg"

const icon = new Icon({
	iconUrl: marker,
	iconSize: [29, 17],
	iconAnchor: [15, 0],
	popupAnchor: [15, -5],
})

const init = {
	cords: [28.258706333333333, 83.9807915],
	fetched: false,
}

const Track = () => {
	const [values, setValues] = useState(init)
	const [map, setMap] = useState(null)

	const resetCord = async () => {
		setValues(init)
		map.panTo(init.cords, 5)
	}

	const fetchCord = async () => {
		await axios
			.get("http://192.168.45.6:5000")
			.then(d => {
				console.log(d.data)
				setValues({ cords: [d.data.lat, d.data.lng], fetched: true })
				map.flyTo([d.data.lat, d.data.lng], 18)
			})
			.catch(console.error)
	}

	return (
		<div className="h-full flex flex-col justify-center">
			<div className="">
				<button onClick={fetchCord}>FETCH</button>
				<button onClick={resetCord}>RESET</button>
			</div>
			<MapContainer
				center={values.cords}
				zoom={5}
				scrollWheelZoom={true}
				ref={setMap}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{values.fetched && (
					<Marker position={values.cords} icon={icon}>
						<Popup>
							<div>
								<span className="font-bold">Bus Number </span>
								<span>123</span>
							</div>
							<div>
								<span className="font-bold">Latitude </span>
								<span>{values.cords[0]}</span>
								<span className="font-bold"> Longitude</span>
								<span>{values.cords[1]}</span>
							</div>
						</Popup>
					</Marker>
				)}
			</MapContainer>
		</div>
	)
}

export default Track
