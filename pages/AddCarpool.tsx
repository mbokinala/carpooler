import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import {} from "@auth0/nextjs-auth0";
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
import React, { useRef } from "react";
import axios from "axios";
import { toSeconds, toReadableTime } from "seconds-since-midnight";

function AddCarpool() {
  const location = useRef();
  const address = useRef();
  const city = useRef();
  const state = useRef();
  const postalCode = useRef();
  function handleSubmit(e) {
    e.preventDefault();
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

      <Flex
        height="100vh"
        direction="column"
        alignItems="center"
        justifyContent="center"
        background="gray.200"
      >
        <Heading mb="10px">Add a Carpool</Heading>
        <Flex
          alignItems="center"
          justifyContent="center"
          background="gray.300"
          rounded={6}
          direction="column"
          width="80vw"
          padding="20px"
        >
          <Input
            ref={location}
            id="location-name"
            placeholder="Search a Location..."
            mb="5px"
            border="2px"
            borderColor="gray.400"
          ></Input>
          <Input
            ref={address}
            id="address2"
            placeholder="Street Address"
            mb="5px"
            border="2px"
            borderColor="gray.400"
          ></Input>
          <Input
            ref={city}
            id="locality"
            placeholder="City"
            mb="5px"
            border="2px"
            borderColor="gray.400"
          ></Input>
          <Input
            ref={state}
            id="state"
            placeholder="State"
            mb="5px"
            border="2px"
            borderColor="gray.400"
          ></Input>
          <Input
            ref={postalCode}
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
              <Select>
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
                  console.log(event.target.value);
                }}
              ></Input>
              <Text>End:</Text>
              <Input
                type="time"
                onChange={(event) => {
                  console.log(event.target.value);
                }}
              ></Input>
              <Button>X</Button>
            </Stack>
          </Flex>
          <Button variant="solid" width="40%" mt="10px" onSubmit={handleSubmit}>
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
