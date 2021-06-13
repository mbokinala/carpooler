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
import Navbar from "../components/Navbar";
import axios from "axios";
import Head from "next/head";
import React, { useRef, useState } from "react";
import CarpoolCard from "../components/CarpoolCard";

function FindCarpool() {
    const [carpools, setCarpools] = useState([]);
    const searchRef = useRef(null);

    async function handleSubmit(event) {
        event.preventDefault();
        const results = await axios(`/api/carpool/search?q=${searchRef.current.value}`);
        setCarpools(results.data);
    }
    return (
        <ChakraProvider>
            <Head>
                <title>Find a Carpool</title>
            </Head>
        <Navbar /> 
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
