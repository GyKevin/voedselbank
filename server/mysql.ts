import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: '34.90.109.250',
    user: 'root',
    password: '',
    database: 'voedselbank'
});

connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to the MySQL server');
    }
})

export function getMysqlConnection(): mysql.Connection {
    return connection;
}
