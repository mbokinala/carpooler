import React, { useRef } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Navbar from '../components/Navbar';
import { Box, ChakraProvider, Flex, Heading, Image, Text, Stack, Input, Button } from '@chakra-ui/react';
import Head from 'next/head';
import axios from 'axios';
function Profile() {
	const { user, error, isLoading } = useUser();
	const addressRef = useRef(null);

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>{error.message}</div>;

	async function handleSubmit(event) {
		event.preventDefault();
		alert(addressRef.current.value);
		axios.post("/api/user/preferredLocation", {
			userEmail: user.email,
			preferredAddress: addressRef.current.value
		});

		addressRef.current.value = "";
	}

	return (
		user && (
			<>
				<Head>
					<title>Profile</title>
					<script
						defer
						src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBLr5qel5Lbjw7IfPaIX2ORcn4Qn_7_3mA&libraries=places"
					/>
					{/* <script  type="text/javascript" src="http://maps.googleapis.com/maps/api/js?libraries=places‌​&sensor=false" /> */}
					<script defer src="/google-maps-api-profile.js" />
				</Head>
				<ChakraProvider>

					<Flex
						height="100vh"
						direction="column"
						alignItems="center"
						// justifyContent="center"
						background="gray.200">
						{/* <Navbar /> */}
						<Heading mt={10} mb={2}>{user.name}</Heading>


						<Image src={user.picture} mb={10} />

						<Stack direction="row" spacing={2} width="70vw" alignItems="center" justifyContent="center">
							<Text>Set Home Location: </Text>
							<form onSubmit={handleSubmit}>
								<Input ref={addressRef} id="address-field" border="2px" borderColor="gray.400" width="50vw" placeholder="start typing address"></Input>
								<Button type="submit" colorScheme="orange">Save</Button>
							</form>
						</Stack>

					</Flex>

				</ChakraProvider>
			</>
		)
	);
}

export default withPageAuthRequired(Profile);