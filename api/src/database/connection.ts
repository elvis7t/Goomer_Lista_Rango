import mysql from 'mysql2'
const createConnection = async () => {
  const connection = mysql.createConnection({
    port: 3306,
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  });
  return connection;
};

export { createConnection };
