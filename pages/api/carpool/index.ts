import query from "../../../db";
import { v4 as uuidv4 } from "uuid";
async function handler(req, res) {
  if (req.method === "POST") {
    const {
      owner_uid,
      starting_street_address,
      starting_city,
      starting_state,
      starting_zip,
      target_street_address,
      target_city,
      target_state,
      target_zip,
    } = req.body;

    let startingID;
    let targetID;

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
        `INSERT INTO target_locations (target_location_id, name, street_address, city, state, zip) VALUES("${targetID}","${target_street_address}", "${target_city}", "${target_state}", "${target_zip}")`
      );
    } else {
      targetID = targetLocationCheck.results[0].target_location_id;
    }

    await query(
      `INSERT INTO carpools (carpool_id, owner_uid, starting_location_id, target_location_id) VALUES (
		  "${uuidv4()}",
		  "${owner_uid}",
		  "${startingID}",
		  "${targetID}"
		)`
    );
    return res.status(201).send({ status: "success" });
    //     if (
    //       startingLocationCheck.results.length === 0 &&
    //       targetLocationCheck.fields.length === 0
    //     ) {

    //       return res.status(201).send({ status: "success" });
    //     } else if (
    //       startingLocationCheck.results.length === 0 &&
    //       targetLocationCheck.fields.length > 0
    //     ) {
    //       await query(
    //         `INSERT INTO starting_locations (starting_location_id, street_address, city, state, zip) VALUES ("${startingID}", "${starting_street_address}","${starting_city}", "${starting_state}", "${starting_zip}")`
    //       );
    //       await query(
    //         `INSERT INTO carpools (carpool_id, owner_uid, starting_location_id, target_location_id) VALUES (
    // 	 "${uuidv4()}",
    // 	 "${owner_uid}",
    // 	 "${startingID}",
    // 	 "${targetLocationCheck.results[0].target_location_id}"
    // 	)`
    //       );
    //       return res.status(201);
    //     } else if (
    //       startingLocationCheck.results.length > 0 &&
    //       targetLocationCheck.fields.length === 0
    //     ) {
    //       await query(
    //         `INSERT INTO target_locations (target_location_id, street_address, city, state, zip) VALUES("${targetID}","${target_street_address}", "${target_city}", "${target_state}", "${target_zip}")`
    //       );
    //       await query(
    //         `INSERT INTO carpools (carpool_id, owner_uid, starting_location_id, target_location_id) VALUES (
    // 	 "${uuidv4()}",
    // 	 "${owner_uid}",
    // 	 "${startingLocationCheck.results[0].starting_location_id}",
    // 	 "${targetID}"
    // 	)`
    //       );
    //     } else {
    //       await query(
    //         `INSERT INTO carpools (carpool_id, owner_uid, starting_location_id, target_location_id) VALUES (
    // 	"${uuidv4()}",
    // 	"${owner_uid}",
    // 	"${startingLocationCheck.results[0].starting_location_id}",
    // 	"${targetLocationCheck.results[0].target_location_id}"
    // 	)`
    //       );
    //     }
  }
}

export default handler;
