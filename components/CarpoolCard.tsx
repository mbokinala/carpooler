import { useUser } from "@auth0/nextjs-auth0";
import { Box, Text, Heading, Flex, Spacer, calc, Link } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
const axios = require('axios').default;

interface CarpoolCardProps {
    carpool: {
        id: string,
        startingLocation: {
            street_address: string,
            city: string,
            state: string,
            zip: string
        },
        targetLocation: {
            city: string,
            name: string,
            state: string,
            street_address: string,
            id: string,
            zip: string
        },
        timings: {
            carpool_id: string,
            day: string,
            end_time: number,
            start_time: number,
            timing_id: number
        }
        distance: string,
        owner: {
            phone_number: string
        }
    },
}

function readableTime(secondsSinceMidnight: number): string {
    const minutes = Math.round(secondsSinceMidnight / 60);

    let extraMinutes = minutes % 60;
    let hours = Math.round((minutes - extraMinutes) / 60);

    let minutesString;
    if (extraMinutes < 10) minutesString = "0" + extraMinutes;

    let meridian = "AM";
    if (hours > 12) {
        hours -= 12;
        meridian = "PM";
    }

    return `${hours}:${minutesString} ${meridian}`;
}


export default function CarpoolCard(props: CarpoolCardProps) {

    return (
        <Box padding={2} border="2px" borderColor="gray.300" rounded={6} key={props.carpool.id} width="100%">
            <Flex direction="column">
                <Flex>
                    <Box >
                        <Heading size="md" fontWeight="bold">{props.carpool.targetLocation.name}</Heading>
                        <Text>{`${props.carpool.targetLocation.street_address}, ${props.carpool.targetLocation.city}, ${props.carpool.targetLocation.state} ${props.carpool.targetLocation.zip}`}</Text>
                        <Text>This person lives {props.carpool.distance} from your preferred location.</Text>
                    </Box>
                    <Spacer />
                    <Box>
                        <Text>{props.carpool.timings.day}</Text>
                        <Text>{readableTime(props.carpool.timings.start_time) + ' - ' + readableTime(props.carpool.timings.end_time)}</Text>
                    </Box>
                </Flex>
                <Link href={`tel:${props.carpool.owner.phone_number}`}>Contact</Link>
            </Flex>
        </Box>
    )
}