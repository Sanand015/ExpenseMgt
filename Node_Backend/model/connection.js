const { Client } = require('pg');

const client = new Client({
	user: 'postgres',
    host: "localhost",
    database: 'expensedb',
	password: 'root',
	port: "5432",
	
});

const connect=client
	.connect()
	.then(() => {
		console.log('Connected to PostgreSQL database');
	})
	.catch((err) => {
		console.error('Error connecting to PostgreSQL database', err);
	});

module.exports=connect