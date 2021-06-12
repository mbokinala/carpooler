const axios = require('axios').default;

export default async function handler(req, res) {
    const { email, password, name, phone } = req.body;
    
    // add user to auth
    await axios.post('carpooler.us.auth0.com/dbconnections/signup', {
        "client_id": process.env.AUTH0_CLIENT_ID,
        "email": email,
        "password": password,
        "connection": "Username-Password-Authentication" 
    });
}