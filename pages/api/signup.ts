const axios = require('axios').default;
import query from '../../db';

export default async function handler(req, res) {
    const { uid, email, name, phone } = req.body;

    await query(`INSERT INTO users (uid, email, display_name, phone_number) VALUES ("${uid}", "${email}", "${name}", "${phone}")`);
    res.status(201).send("created");
}