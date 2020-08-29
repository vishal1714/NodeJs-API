const mysql = require('mysql');

/* DB Connection Variable Creation */
var conn = mysql.createConnection({
    database: 'API',
    user: 'user',
    password: 'k5dtAvw7f9xHSw7L',
    host: 'mysql',
    multipleStatements: true
})


/* DB Connection Raspi  192.168.0.13
var conn = mysql.createConnection({
    database: 'API',
    user: 'admin',
    password: 'Password',
    host: '192.168.0.13',
    port: 3306,
    multipleStatements: true
})*/

// DB Connevtion Check
conn.connect((err) => {
    if (err)
        console.log('DB is not Connected' + err);
    else
        console.log('DB Connected');
})

module.exports = conn;
