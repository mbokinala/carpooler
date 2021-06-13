import query from "../../../db";

export default async function handler(req, res) {
    let results = [];
    let target_location_query = (await query(`SELECT * FROM target_locations WHERE name LIKE "%${req.query.q}%"`));
    let target_location;
    if (target_location_query.results.length == 0) {
        return res.status(200).json([]);
    }
    target_location = target_location_query.results[0];

    const matching_carpools = (await query(`SELECT * FROM carpools WHERE target_location_id = "${target_location.target_location_id}"`)).results;

    for (const carpool of matching_carpools) {
        const owner = (await query(`SELECT * FROM users WHERE uid = "${carpool.owner_uid}"`)).results[0];
        const start_location = (await query(`SELECT * FROM starting_locations WHERE starting_location_id = "${carpool.starting_location_id}"`)).results[0];
        const timings = (await query(`SELECT * FROM timings WHERE carpool_id = "${carpool.carpool_id}"`)).results[0];

        results.push({
            owner,
            id: carpool.carpool_id,
            targetLocation: target_location,
            startingLocation: start_location,
            timings: timings
        });
    }

    res.status(200).json(results);
}