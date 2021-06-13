import query from "../../../db";
import { v4 as uuidv4 } from "uuid";

export default async function handler(req, res) {
    if (req.method.toLowerCase() == 'post') {
        const { userEmail, preferredAddress } = req.body;

        const user_uid = (await query(`SELECT * FROM users WHERE email = "${userEmail}"`)).results[0].uid;

        const recordQuery = (await query(`SELECT * FROM preferred_locations WHERE user_uid="${user_uid}"`));
        if (recordQuery.results.length == 0) {
            await query(`INSERT INTO preferred_locations (preferred_location_id, user_uid, full_address)
        VALUES ("${uuidv4()}", "${user_uid}", "${preferredAddress}")`);
        } else {
            await query(`UPDATE preferred_locations 
        SET full_address="${preferredAddress}"
        WHERE user_uid="${user_uid}"`);
        }

        return res.status(201).send("success");
    } else if (req.method.toLowerCase() == 'get') {
        const { email } = req.query;

        console.log(email);

        const user_uid = (await query(`SELECT * FROM users WHERE email = "${email}"`)).results[0].uid;

        const preferredAddress = (await query(`SELECT * FROM preferred_locations WHERE user_uid="${user_uid}"`)).results[0].full_address;
        return res.status(200).json({preferredAddress});
    }
}