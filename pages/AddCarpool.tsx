import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import {
	Button,
	ChakraProvider,
	Checkbox,
	Flex,
	Heading,
	Input,
	Select,
	Stack,
	Text,
} from "@chakra-ui/react";
import Head from "next/head";
import React, { useRef, useState } from "react";
import axios from "axios";
import { toSeconds, toReadableTime } from "seconds-since-midnight";
import Navbar from "../components/Navbar"; 

function AddCarpool() {
	const starting_address = useRef(null);
	const starting_city = useRef(null);
	const starting_state = useRef(null);
	const starting_postalCode = useRef(null);
	const target_location = useRef(null);
	const target_address = useRef(null);
	const target_city = useRef(null);
	const target_state = useRef(null);
	const target_postalCode = useRef(null);
	const [day, setDay] = useState("");
	const [startingTime, setStartingTime] = useState("");
	const [endingTime, setEndingTime] = useState("");
	const user = useUser();

	function secondsSinceMidNight(time: string) {
		const hours = parseInt(time.split(":")[0]);
		const minutes = parseInt(time.split(":")[1].split(" ")[0]);
		return hours * 3600 + minutes * 60;
	}

	async function handleSubmit(e) {
		e.preventDefault();
		console.log(day);
		await fetch("/api/carpool", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				owner_email: user.user.email,
				starting_street_address: starting_address.current.value,
				starting_city: starting_city.current.value,
				starting_state: starting_state.current.value,
				starting_zip: starting_postalCode.current.value,
				target_name: target_location.current.value.split(",")[0],
				target_street_address: target_address.current.value,
				target_city: target_city.current.value,
				target_state: target_state.current.value,
				target_zip: target_postalCode.current.value,
				timings: [
					{
						day,
						times: {
							start: secondsSinceMidNight(startingTime),
							end: secondsSinceMidNight(endingTime),
						},
					},
				],
			}),
		});
	}
	let days = [
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
		"Sunday",
	];
	return (
		<ChakraProvider>
			<Head>
				<title>Add Carpool</title>
				<script
					defer
					src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBLr5qel5Lbjw7IfPaIX2ORcn4Qn_7_3mA&libraries=places"
				/>
				{/* <script  type="text/javascript" src="http://maps.googleapis.com/maps/api/js?libraries=places‌​&sensor=false" /> */}
				<script defer src="/google-maps-api.js" />
			</Head>
			<Navbar />
			<Flex
				paddingTop={10}
				paddingBottom={10}
				direction="column"
				alignItems="center"
				justifyContent="center"
				background="gray.200"
			>
				<Heading as="h2" mb="10px">
					Add a Carpool
				</Heading>
				<Flex
					alignItems="center"
					justifyContent="center"
					background="gray.300"
					rounded={6}
					direction="column"
					width="80vw"
					padding="20px"
				>
					<Heading size="md">Starting Address</Heading>
					<Input
						//     ref={starting_location}
						id="starting_location-name"
						placeholder="Search a Location..."
						mb="5px"
						border="2px"
						borderColor="gray.400"
					></Input>
					<Input
						ref={starting_address}
						id="starting_address2"
						placeholder="Street Address"
						mb="5px"
						border="2px"
						borderColor="gray.400"
					></Input>
					<Input
						ref={starting_city}
						id="starting_locality"
						placeholder="City"
						mb="5px"
						border="2px"
						borderColor="gray.400"
					></Input>
					<Input
						ref={starting_state}
						id="starting_state"
						placeholder="State"
						mb="5px"
						border="2px"
						borderColor="gray.400"
					></Input>
					<Input
						ref={starting_postalCode}
						id="starting_postcode"
						placeholder="Postal Code"
						mb="5px"
						border="2px"
						borderColor="gray.400"
					></Input>
					<Heading size="md">Destination Address</Heading>
					<Input
						ref={target_location}
						id="location-name"
						placeholder="Search a Location..."
						mb="5px"
						border="2px"
						borderColor="gray.400"
					></Input>
					<Input
						ref={target_address}
						id="address2"
						placeholder="Street Address"
						mb="5px"
						border="2px"
						borderColor="gray.400"
					></Input>
					<Input
						ref={target_city}
						id="locality"
						placeholder="City"
						mb="5px"
						border="2px"
						borderColor="gray.400"
					></Input>
					<Input
						ref={target_state}
						id="state"
						placeholder="State"
						mb="5px"
						border="2px"
						borderColor="gray.400"
					></Input>
					<Input
						ref={target_postalCode}
						id="postcode"
						placeholder="Postal Code"
						mb="5px"
						border="2px"
						borderColor="gray.400"
					></Input>
					<br />
					<Flex direction="column">
						<Stack
							direction="row"
							spacing={5}
							border="2px"
							borderColor="gray.400"
							alignItems="center"
							justifyContent="center"
							rounded={6}
							padding="10px"
						>
							<Select onChange={(e) => {
								setDay(e.target.value)
							}}
							>
								{days.map((day) => (
									<option key={day} value={day}>
										{day}
									</option>
								))}
							</Select>
							<Text>Start:</Text>
							<Input
								type="time"
								onChange={(event) => {
									setStartingTime(event.target.value);
								}}
							></Input>
							<Text>End:</Text>
							<Input
								type="time"
								onChange={(event) => {
									setEndingTime(event.target.value);
								}}
							></Input>
							<Button>X</Button>
						</Stack>
					</Flex>
					<Button variant="solid" width="40%" mt="10px" onClick={handleSubmit}>
						Add Carpool
					</Button>
				</Flex>
			</Flex>
			{/* <input style={{width: "100%"}} id="ship-address"></input><br></br>
			<input id="address2"></input>
			<input id="postcode"></input>
			<input id="locality"></input>
			<input id="state"></input>
			<input id="country"></input> */}
		</ChakraProvider>
	);
}

export default withPageAuthRequired(AddCarpool);
