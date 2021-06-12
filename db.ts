import mysql from "mysql";
const util = require('util');

const pool = mysql.createPool({
	host: process.env.DB_URL,
	user: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: 'carpooler'
})

const query = util.promisify(pool.query).bind(pool); // convert callback to promise
export default query;