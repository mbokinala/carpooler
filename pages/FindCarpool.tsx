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
import axios from "axios";
import Head from "next/head";
import { tmpdir } from "os";
import React, { useEffect, useRef, useState } from "react";
import CarpoolCard from "../components/CarpoolCard";
import Navbar from "../components/Navbar";

function FindCarpool() {
    const { user, error, isLoading } = useUser();
    if (isLoading) return <div>Loading...</div>;

    const [carpools, setCarpools] = useState([]);
    const [userPreferredAddress, setUserPreferredAddress] = useState('');
    
    useEffect(() => {
        axios.get(encodeURI(`/api/user/preferredLocation?email=${user.email}`)).then((result) => {
            setUserPreferredAddress(result.data.preferredAddress);
        });
    }, []);
    

    const searchRef = useRef(null);

    async function handleSubmit(event) {
        event.preventDefault();
        const results = await axios(`/api/carpool/search?q=${searchRef.current.value}`);
        // setCarpools(results.data);
        let tempCarpools = [];
        for (const carpool of results.data) {
            let distance = "";
            if (userPreferredAddress == "") {
                continue;
            }
            const addressParts = carpool.startingLocation;
            const startingAddress = addressParts.street_address + ", " + addressParts.city + ", " + addressParts.state + " " + addressParts.zip;
            console.log("starting address is " + startingAddress);
            const distanceResult = (await axios.get(encodeURI(`/api/calculateDistance?address1=${userPreferredAddress}&address2=${startingAddress}`)));
            console.log(distanceResult);
            distance = distanceResult.data.data;
            let temp = carpool;
            temp.distance = distance;
            console.log('distance is ' + distance);
            tempCarpools.push(temp);
        }

        setCarpools(tempCarpools);
        console.log(tempCarpools)
    }
    return (
        <ChakraProvider>
            <Head>
                <title>Find a Carpool</title>
            </Head>
<<<<<<< HEAD
			<Navbar />

=======
            <Navbar />
>>>>>>> d3f1dc663dd81eef1f0a97affc1d8c6d847efaaa
            <Flex
                height="100vh"
                direction="column"
                alignItems="center"
                // justifyContent="center"
                background="gray.200">
                <Heading mt={10} mb={2}>Find a Carpool</Heading>
                <Stack direction="row" mb={5} justifyContent="center">
                    <form onSubmit={handleSubmit}>
                        <Input ref={searchRef} width="60vw" placeholder="search for a place" border="2px" borderColor="gray.400" mr={2}></Input>
                        <Button type="submit" colorScheme="orange">Search</Button>
                    </form>
                </Stack>
                <Stack width="65vw" direction="column" spacing={2}>
                    {carpools.map(carpool => (
                        <CarpoolCard key={carpool.id} carpool={carpool} />
                    ))}

                </Stack>
            </Flex>
        </ChakraProvider>
    );
}

export default withPageAuthRequired(FindCarpool);
