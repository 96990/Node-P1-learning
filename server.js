var express = require("express");
var app = express();
var {Client} = require("pg");
var cors = require("cors");
var bodyParser = require("body-parser");
var jwt = require('jsonwebtoken');

app.use(cors());

/**json parser */
    var jsonParser = bodyParser.json();
/**urlendcoded parser */
    var urlencodedParser = bodyParser.urlencoded({extended:false});

/** database connection */
const con = new Client({
    host: 'localhost',
    user: 'postgres',
    port: 5433,
    password: 'RMEDUAbhi@008',
    database: 'postgres'
})
con.connect((err) =>{
    if(err){throw err};
    console.log("connected to database");
});

/** middleware */  
function verifyToken(req,res,next){
    let authHeaders = req.headers.authorization;
    console.log(authHeaders);
    if(authHeaders == undefined){
        res.status(401).send({error: "no token provided"});
    }
    let token = authHeaders.split(" ")[1];
    jwt.verify(token,"secret",function(err,decoded){
        if(err){
            res.status(500).send({error: "Authentication"})
        }else{
            next();
        }
    })
}
/** login */

    app.post("/login",jsonParser,function(req,res){
        if(req.body.username == undefined || req.body.password == undefined){
            res.status(500).send({error:"Authentication failed!!!"});
        }
        let username = req.body.username;
        let password = req.body.password;
        console.log(username,password);
        const qr = `SELECT id,display_name FROM users WHERE username='${username}' AND password='${password}'`;
        con.query(qr,(err,result)=>{
            console.log(result.rows[0]);
            if(err || result.length == 0){
                res.status(500).send({ error: "login failed!"});
            }else{
                let resp={
                    id: result.rows[0].id,
                    display_name: result.rows[0].display_name
                };
                let token = jwt.sign(resp,"secret",{expiresIn:864000})
                res.status(200).send({auth: true,token: token});
            }
        })
    })

/**get students */

    app.get("/students",verifyToken,function(req,res){
        con.query("select * from students",(err,result,fields)=>{
            if(err) throw(err);
            console.log(result.rows); 
            res.send(result.rows);
        })       
    })

/**get student one student */

    app.get("/student/:id",function(req,res){
            let id = req.params.id;
            con.query("select * from students where ad_no ="+id,(err,result,fields)=>{
                if(err) throw(err);
                res.send(result.rows);
            })
    })

/**add student */

    app.post("/students",jsonParser,function(req,res){
        let firstName = req.body.first_name;
        let lastName = req.body.last_name;
        let className = req.body.class; 

        let qr = `insert into students values(DEFAULT,'${firstName}','${lastName}','${className}')`;
        con.query(qr,(err,result,fields)=>{
            if(err) {
                res.send({erro: "operation failed"});
            }else{
                res.send({success: "operation success"});
            }
        })
    });

/**update student */

    app.patch("/student",jsonParser,function(req,res){
        let firstName = req.body.first_name;
        let lastName = req.body.last_name;
        let className = req.body.class; 
        let id = req.body.id;
        let qr = `update students set first_name = '${firstName}',last_name = '${lastName}',class = '${className}' where ad_no = '${id}'`;
        con.query(qr,(err,result,fields)=>{
            if(err) {
                res.send({erro: "updation failed"});
            }else{
                res.send({success: "update success"});
            }
        })
    })
/**delete students */

    app.delete("/student/:id",function(req,res){
        let id = req.params.id;
        let qr = `delete from students where ad_no = ${id}`;
        con.query(qr,(err,result,fields)=>{
            if(err) {
                res.send({erro: "Deletion failed"});
            }else{
                res.send({success: "Deleted successfully"});
            }
        })
    })

app.get("/",function(req,res){
    res.send("<h1>Welcome page</h1>");
})
app.listen(3200,function(){
    console.log("server started");
})