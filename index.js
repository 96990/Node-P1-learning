var fs = require("fs");
var http = require("http");
var url = require("url");
var Calc = require("./calc");
var express = require("express");
var bodyParser = require("body-parser");
var mysql = require("mysql");
const {Client} = require("pg");
    // console.log("index js file works");
    // console.log(__filename);
    // let i = 0;
    // var res = setInterval(() => {
    //     console.log(i)
    //     i++;
    // }, 1000);


/**create a server */

    // http.createServer(function(req,res){
    //     res.write("<h1>welcome to node from http</h1>");
    //     console.log("hi from the http");
    //     res.end();
    // }).listen(3000)

/**create, read, append, delete a flie */

    // fs.writeFile("index.html","<h1>hi how are you</h1>",function(err){

    // })
    // fs.appendFile("text.txt","here we go by tonight",function(err){

    // })
    // fs.readFile("text.txt","utf8",function(err,data){
    //     console.log(data);

    // })
    // fs.unlink("text.txt",function(err){

    // })

/**How to read from a file and display contents */

    // http.createServer(function(req,res){
    //     fs.readFile("index.html","utf8",function(err,data){
    //         if(err){
    //             console.error(err);
    //         }
    //         res.write(data);
    //         res.end();
    //     })
    // }).listen(3000)

/** url module */

/**
    http.createServer(function(req,res){
        var parsed = url.parse(req.url);
        // var urlname = req.url.slice(1);
        var urlname = parsed.pathname == "/" ? "app.html" : "."+parsed.pathname;
        fs.readFile(urlname,"utf8",function(err,data){
            if(err){
                res.writeHead(404,{'Content-type':"text/html"});
                return res.end("Error page not found");
            }
            res.write(data);
            res.end();
        })
        console.log(parsed);
    }).listen(3200);
 */

/**create custom module */

    // console.log(Calc.add(10,35));
    // console.log(Calc.prod(10,35));
    // console.log(Calc.pie);

/**express js */
/**
    const app = express();
    app.listen(3200);

    app.use(function(req,res,next){
       console.log("Hit on middle ware");
        next();
    })

    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())

    app.get("/",function(req,res){
        res.send("index page");
    })
    app.get("/about",function(req,res){
        res.send("about page");
    })
    app.get("/contact",function(req,res){
        console.log(req.url);
        console.log(req.method);
        console.log(req.body);
        res.send("contact page");
    })
    const profile = {
        "1": {name: "sanju",age: 29},
        "2": {name: "bimal",age: 36},
        "3": {name: "rudra",age: 25},
    }
    app.get("/student",function(req,res){
        res.send(req.query);
    })
    app.get("/profile/:id",function(req,res){
        res.send(req.params.id + " " + req.params.id1);
        let current_id = req.params.id;
        let current_profile = profile[current_id];
        res.send(current_profile);
    })
    app.post("/login",function(req,res){
        res.send(req.body);
    })

*/
/** mysql */

    // var con = mysql.createConnection({
    //     host: "localhost",
    //     user: "root",
    //     password: "RMEDUAbhi@008"
    // });
    // con.connect(function(err){
    //     if(err){
    //         throw err;
    //     }
    //     console.log('connected');
    // })

/**postgres sql */

        const client = new Client({
            host: 'localhost',
            user: 'postgres',
            port: 5433,
            password: 'RMEDUAbhi@008',
            database: 'postgres'
        })
        client.connect();
    // console.log(client);
    client.query("select * from students",(err,res)=>{
        if(!err){
            console.log(res.rows);
        }else{
            console.log(err.message);
        }
        client.end()
    })