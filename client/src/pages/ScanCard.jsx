import { useState } from "react"
import QrReader from "react-web-qr-reader"
import { HeaderLogo } from "../components"

const ScanCard = () => {
	const handleScan = async data => {
		console.log("Data", data.data)
	}
	const handleError = err => {
		console.log(err)
	}
	return (
		<div className="h-2/4 w-2/4 mx-auto my-10 p-8 bg-[#051a15] rounded-md">
			<HeaderLogo />
			<h1 className="font-head">Welcome to Sajilo Bus</h1>
			<h2 className="text-center text-3xl">Use your card to scan</h2>
			<p className="text-lg pt-4 text-center text-[red]">
				QR Code on the card should be inside the red rectangular box
			</p>
			<div className="flex mt-8 gap-4">
				<div className="flex flex-col w-5/6">
					<img className="h-52 w-4/5" src="/src/assets/card.png" />
					<div className="flex flex-row"></div>
				</div>
				<div className="w-2/5 border-4">
					<QrReader
						delay={10000}
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
