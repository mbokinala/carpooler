import query from "../../db";

export default async function handler(req, res) {
    let response = await query("DESCRIBE users");
    console.log(response);
    return res.status(200).send(response);
}