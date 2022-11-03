import { useState } from "react"
import QrReader from "react-web-qr-reader"
import { useDispatch, useSelector } from "react-redux"

import { setAlert } from "../redux/actions/misc"
import { HeaderLogo, Alert } from "../components"

import { trip } from "../redux/actions/card"

const ScanCard = () => {
	const [tripStatus, setTripStatus] = useState("")
	const [LastID, setLastID] = useState(null)
	const misc = useSelector(state => state.misc)

	const dispatch = useDispatch()

	const bus_number = import.meta.env.SAJILO_BUS_NUMBER

	const handleScan = async data => {
		if (!data || data.data == LastID) return
		if (!tripStatus) dispatch(setAlert("Select trip Begin/End", "danger"))

		setLastID(data.data)

		//if no permission to get location
		if (!navigator.geolocation) {
			console.error("Please use a browser that supports geolocation.")
			return
		}

		const getCords = async () => {
			const pos = await new Promise((resolve, reject) => {
				navigator.geolocation.getCurrentPosition(resolve, reject)
			})

			return {
				lon: pos.coords.longitude,
				lat: pos.coords.latitude,
			}
		}

		const { lat, lon } = await getCords()
		console.log("Called getCords", lat, lon)

		dispatch(trip(lon, lat, bus_number, data.data, tripStatus))
		setTripStatus(null)
	}
	const handleError = err => {
		console.log(err)
	}
	return (
		<div className="h-2/4 w-2/4 mx-auto my-10 p-8 bg-[#051a15] rounded-md">
			<HeaderLogo />
			<h1 className="font-head">Welcome to Sajilo Bus</h1>
			<h2 className="text-center text-3xl">Use your card to scan</h2>
			{misc.showAlert && <Alert float={false} />}
			<p className="text-lg pt-4 text-center text-[red]">
				QR Code on the card should be inside the red rectangular box
			</p>
			<div className="flex mt-8 gap-4">
				<div className="flex flex-col w-5/6">
					<img className="h-52 w-/5" src="/src/assets/card.png" />
					<div className="flex flex-row mt-2">
						<button
							className={
								tripStatus == "begin" ? "bg-blue-900" : ""
							}
							onClick={e => {
								setTripStatus("begin")
								setLastID(null)
							}}
						>
							Begin Trip
						</button>
						<button
							className={tripStatus == "end" ? "bg-blue-900" : ""}
							onClick={e => {
								setTripStatus("end")
								setLastID(null)
							}}
						>
							End Trip
						</button>
					</div>
				</div>
				<div className="w-2/5 border-4">
					<QrReader
						delay={500}
						onError={handleError}
						onScan={handleScan}
					/>
				</div>
			</div>
			<p className="text-lg text-[cyan] mt-2">
				You need to scan your card when you get on the bus and when you
				get off.
			</p>
		</div>
	)
}

export default ScanCard
