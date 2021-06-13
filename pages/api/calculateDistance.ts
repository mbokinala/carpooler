const axios = require('axios').default;

export default async function handler(req, res) {
    const { address1, address2 } = req.query;
    const url = encodeURI(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${address1}&destinations=${address2}&key=AIzaSyBLr5qel5Lbjw7IfPaIX2ORcn4Qn_7_3mA`);
    const results = await axios.get(url);
    console.log(results.data.rows[0].elements[0].distance.text )
    return res.status(200).json({ data: results.data.rows[0].elements[0].distance.text });

}