let express = require("express");
let cors = require("cors");
var app = express();
const mysql = require("mysql");
var cookieParser = require('cookie-parser')

app.set('view engine', 'ejs');

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(cookieParser())

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234567890",
    database: "Car_Website" // Specify the database you are connecting to
});

connection.connect(err => {
    if (err) {
        console.error("Error connecting to database:", err);
    } else {
        console.log("Connected to database");
    }
});

app.get('/invoice/:id',(req,res)=>{
    connection.query(`Select * FROM CarInformation where ID=${req.params.id}`,(err,result)=>{
        console.log(result);
        res.render('pages/invoice',{data:result[0],invoice:Math.floor(Math.random()*100000)});
    })
})

app.get("/buy",(req,res)=>{
    connection.query("SELECT * FROM CarInformation", (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
            res.status(500).send("Internal Server Error");
        } else {
            console.log(result);
            res.render('pages/carbuy',{carsData:result})
        }
    });;
})

app.get("/",(req,res)=>{
    connection.query("SELECT * FROM CarInformation where Id < 7", (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
            res.status(500).send("Internal Server Error");
        } else {
            console.log(result);
            res.render('pages/home',{carsData:result})
        }
    });
})

app.get('/car/:id',(req,res)=>{
    connection.query(`SELECT * FROM CarInformation where ID=${req.params.id}`,(err,result)=>{
        if(err){

        }else{
            res.render('pages/car',{data:result[0]})
        }
    })  
})

app.get('/setInvoice/:id',(req,res)=>{
    let carId = req.params.id;
    console.log(carId);
    res.cookie('id',carId);
    console.log(req.cookies.id);
})


app.get('/team',(req,res)=>{
    res.render('pages/team');
})

app.get('/about',(req,res)=>{
    res.render('pages/about');
})

app.get('/get', (req, res) => {
    connection.query("SELECT * FROM CarInformation where Id < 7", (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
            res.status(500).send("Internal Server Error");
        } else {
            console.log(result);
            res.json(result);
        }
    });
});

app.get('/blog',(req,res)=>{
    res.render('pages/blog');
})

app.get('/blog1',(req,res)=>{
    res.render('pages/blog1');
})

app.get('/blog2',(req,res)=>{
    res.render('pages/blog2')
})
app.get('/blog3',(req,res)=>{
    res.render('pages/blog3')
})
app.get('/blog4',(req,res)=>{
    res.render('pages/blog4')
})

app.get('/carbuy',(req,res)=>{
    connection.query("SELECT * FROM CarInformation where Id < 10", (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
            res.status(500).send("Internal Server Error");
        } else {
            console.log(result);
            res.render('pages/carbuy',{carsData:result})
        }
    });
    // res.render('pages/carbuy')
})

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// app.post('/post', (req, res, next)=>{
//     let obj={
//         "name":"amit"
//     }
//     connectmysl.query("insert into dbfirst.dbtable set ?",obj,(err,rese)=>{
//         if(err){
//             console.log(err);
//             res.end()
//     }else
//     {
//         console.log(rese);   
//         res.end()
//     }})
// })