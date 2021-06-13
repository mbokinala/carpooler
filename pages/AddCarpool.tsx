import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Button, ChakraProvider, Checkbox, Flex, Heading, Input, Select, Stack, Text } from '@chakra-ui/react';
import Head from 'next/head';
import React from 'react';
import { toSeconds, toReadableTime } from 'seconds-since-midnight';

function AddCarpool() {
	return (
		<ChakraProvider>
			<Head>
				<title>Add Carpool</title>
				<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBLr5qel5Lbjw7IfPaIX2ORcn4Qn_7_3mA&libraries=places" />
				{/* <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?libraries=places‌​&sensor=false" /> */}
				<script defer src="/google-maps-api.js" />
			</Head>

			<Flex height="100vh" direction="column" alignItems="center" justifyContent="center" background="gray.200">
				<Heading mb="10px">Add a Carpool</Heading>
				<Flex background="gray.300" rounded={6} direction="column" width="80vh" padding="20px">
					<Input id="location-name" placeholder="enter a location name" mb="5px" border="2px" borderColor="gray.400"></Input>
					<Input id="address2" placeholder="street address" mb="5px" border="2px" borderColor="gray.400"></Input>
					<Input id="locality" placeholder="city" mb="5px" border="2px" borderColor="gray.400"></Input>
					<Input id="state" placeholder="state" mb="5px" border="2px" borderColor="gray.400"></Input>
					<Input id="postcode" placeholder="postcode" mb="5px" border="2px" borderColor="gray.400"></Input>
					{/* <Input id="country" placeholder="country"></Input> */}
					<br/>
					<Flex>
						<Stack direction="row" spacing={5} border="2px" borderColor="gray.400" alignItems="center" justifyContent="center" rounded={6} padding="10px">
							<Text fontWeight="bold">Monday</Text>
							<Text>Start:</Text>
							<Input type="time" onChange={(event) => {console.log(event.target.value)}}></Input>
							
							<Text>End:</Text>
							<Input type="time" onChange={(event) => {console.log(event.target.value)}}></Input>

							<Button>X</Button>
						</Stack>
					</Flex>
				</Flex>
			</Flex>
			{/* <input style={{width: "100%"}} id="ship-address"></input><br></br>
			<input id="address2"></input>
			<input id="postcode"></input>
			<input id="locality"></input>
			<input id="state"></input>
			<input id="country"></input> */}
		</ChakraProvider>
	)
}

export default withPageAuthRequired(AddCarpool);
