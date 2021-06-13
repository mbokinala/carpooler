import query from "../../../db";

export default async function handler(req, res) {
    let results = [];
    const target_location = (await query(`SELECT * FROM target_locations WHERE name LIKE "%${req.query.q}%"`)).results[0];

    const matching_carpools = (await query(`SELECT * FROM carpools WHERE target_location_id = "${target_location.target_location_id}"`)).results;

    for (const carpool of matching_carpools) {
        const start_location = (await query(`SELECT * FROM starting_locations WHERE starting_location_id = "${carpool.starting_location_id}"`)).results[0];
        const timings = (await query(`SELECT * FROM timings WHERE carpool_id = "${carpool.carpool_id}"`)).results[0];

        results.push({
            id: carpool.carpool_id,
            targetLocation: target_location,
            startingLocation: start_location,
            timings: timings
        });
    }

    res.status(200).json(results);
}