import mysql from "mysql"; 

const pool = mysql.createPool({
	host: process.env.DB_URL,
	user: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD
})

export default pool; 