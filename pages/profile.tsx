import React from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Navbar from '../components/Navbar';
import { Box, ChakraProvider, Flex, Heading, Image, Center} from '@chakra-ui/react';
function Profile() {
	const { user, error, isLoading } = useUser();

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>{error.message}</div>;

	return (
		user && (
			<ChakraProvider>

				<Flex
					height="100vh"
					direction="column"
					alignItems="center"
					// justifyContent="center"
					background="gray.200">
					{/* <Navbar /> */}
					<Heading mt={10} mb={2}>{user.name}</Heading>

					<Center>
					<Box boxSize="sm" justifyContent="center">
						<Image src={user.picture}/>
					</Box>
					</Center>

					{/* <div>
						<img src={user.picture} alt={user.name} />
						<h2>{user.name}</h2>
						<p>{user.email}</p>
					</div> */}

				</Flex>

			</ChakraProvider>
		)
	);
}

export default withPageAuthRequired(Profile);