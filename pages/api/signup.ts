import query from '../../db';

export default async function handler(req, res) {
    const {uid, email, name, phone} = req.body;

    await query(`INSERT INTO users (uid, email, display_name, phone_number) VALUES ("${uid}", "${email}", "${name}", "${phone}")`);
    return res.status(201).send("created");
}