const mysql = require('mysql');

// DB Connection Variable Creation 
var conn = mysql.createConnection({
    database: 'world',
    user:'vishal',
    password:'Vishal@9930',
    host:'localhost',
    multipleStatements : true
})

// DB Connevtion Check
conn.connect((err)=>{
    if(err)
    console.log('DB is not Connected');
    else
    console.log('DB Connected');
})

module.exports = conn;