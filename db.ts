import mysql from "mysql";
const util = require('util');

const pool = mysql.createPool({
	host: process.env.DB_URL,
	user: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: 'carpooler'
})

const query = (queryString): Promise<{results: any, fields: any}> => {
	return new Promise((resolve, reject) => {
		pool.query(queryString, function(error, results, fields) {
			if (error) return reject(error);
			resolve({results, fields});
		})
	});
}
export default query;