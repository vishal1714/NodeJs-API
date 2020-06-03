const express = require('express');
//const url = require('url');
const conn = require('../DB');
const bodyparser = require('body-parser');

const router = express.Router();
router.use(bodyparser.json());

// GET all City
router.get('/citys',(req,resp)=>{
    conn.query('SELECT * FROM city',(err,result)=>{
        if(err){
            console.log(err);
        }else{
            resp.json(result);
        }
    })
})

// GET City by ID
router.get('/city/:id',(req,resp)=>{
    conn.query('SELECT * FROM city WHERE id = ?',[req.params.id],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            resp.json(result[0]);
        }
    })
})

// GET City by CountryCode
router.get('/city',(req,resp)=>{

    //const queryObject = url.parse(req.url,true).query;
    //var CC = queryObject.CountryCode;
    //let CC = JSON.stringify(req.query.CountryCode);

    var CC = req.query.CountryCode;
    //onsole.log(CC);

    var sql = 'SELECT * FROM city WHERE CountryCode = ?';
    conn.query(sql,[CC],(err,result)=>{
        if(err)
            resp.send(JSON.stringify.err);
        else
            resp.json(result[0]);
    })
})

// Pots Simple No DB
router.post('/addcity',async (req,resp,next)=>{
    const addcity = {
    Name: req.body.Name,
    CountryCode: req.body.CountryCode,
    District: req.body.District,
    Population: req.body.Population
    }
    var apikey = req.query.APIKey;
    
    conn.query("INSERT INTO city SET ?",[addcity],(err,result)=>{
        console.log(err);
        if(err)
        resp.status(500).json({
            error : err
        })
        else
        resp.status(200).json({
            Status : "S",
            Data : addcity
        })
        /* Without Database
        resp.status(200).json({
        message: "Successful",
        Insterted : addcity
        })*/
    })
    
})

module.exports = router;