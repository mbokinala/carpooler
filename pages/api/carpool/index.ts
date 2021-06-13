import query from "../../../db";
import { v4 as uuidv4 } from "uuid";
async function handler(req, res) {
  if (req.method === "POST") {
    const {
      owner_email,
      starting_street_address,
      starting_city,
      starting_state,
      starting_zip,
      target_name,
      target_street_address,
      target_city,
      target_state,
      target_zip,
    } = req.body;

    const timings: [{ day: string, times: { start: number, end: number } }] = req.body.timings;
    let startingID;
    let targetID;

    const owner_uid = (await query(`SELECT * FROM users WHERE email = "${owner_email}"`)).results[0].uid;


    const startingLocationCheck = await query(
      `SELECT * FROM starting_locations WHERE street_address = "${starting_street_address}"`
    );
    const targetLocationCheck = await query(
      `SELECT * FROM target_locations WHERE street_address = "${starting_street_address}"`
    );

    if (startingLocationCheck.results.length === 0) {
      startingID = uuidv4();
      await query(
        `INSERT INTO starting_locations (starting_location_id, street_address, city, state, zip) VALUES ("${startingID}", "${starting_street_address}","${starting_city}", "${starting_state}", "${starting_zip}")`
      );
    } else {
      startingID = startingLocationCheck.results[0].starting_location_id;
    }

    if (targetLocationCheck.results.length === 0) {
      targetID = uuidv4();
      console.log(target_street_address);
      await query(
        `INSERT INTO target_locations (target_location_id, name, street_address, city, state, zip) VALUES("${targetID}", "${target_name}", "${target_street_address}", "${target_city}", "${target_state}", "${target_zip}")`
      );
    } else {
      targetID = targetLocationCheck.results[0].target_location_id;
    }

    let carpoolId = uuidv4();

    await query(
      `INSERT INTO carpools (carpool_id, owner_uid, starting_location_id, target_location_id) VALUES (
		  "${carpoolId}",
		  "${owner_uid}",
		  "${startingID}",
		  "${targetID}"
		)`
    );

    for (const timing of timings) {
      console.log(timing.day); 
      await query(`INSERT INTO timings (timing_id, carpool_id, day, start_time, end_time) VALUES ("${uuidv4()}", "${carpoolId}", "${timing.day}", "${timing.times.start}", "${timing.times.end}")`)
    }

    return res.status(201).send({ status: "success" });
  }
}

export default handler;
