// const express=require('express');
// const app=express();
// const port= 7777;

// const bodyParser=require('body-parser'); 



// app.use(express.static(__dirname));

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/form/form.html");
// });

// app.use(bodyParser.urlencoded({extended: false}))
// app.get('/submit',function(req,res){
//   console.log("Data Saved");
// })


// const {Pool,Client}= require('pg');

// const connectionString='postgressql://postgres:Khushi9786$@localhost:5432/MyDatabase'


// const client= new Client({
//     connectionString:connectionString
// })
// app.post("/",(req,res)=>{
//     const { f_name,mail,phone}=req.body
//     client.connect()
//     client.query('INSERT INTO Form VALUES ($1, $2, $3)', [f_name, mail,phone], (err,res)=> {
//         console.log(err,res);
//         client.end() 
//         //alert("Data Saved");
        

//     })
   
//     res.sendFile(__dirname + "/form/form.html");
//   })
const express = require('express');
const app = express();
const port = 7000;

const bodyParser = require('body-parser');

app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/form.html");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.get('/submit', function (req, res) {
  console.log("Data Saved");
});

const { Pool, Client } = require('pg');

const connectionString = 'postgresql://postgres:a2saas177july@localhost:5432/postgres';

const client = new Client({
  connectionString: connectionString
});

client.connect();

app.post("/", (req, res) => {
  const { f_name, mail } = req.body;
  client.query('INSERT INTO student VALUES ($1, $2)', [f_name, mail], (err,res) => {
    if (err) {
      console.log(err);
    } else {
      console.log(res);
    }
    // res.sendFile(__dirname + "/form.html");
  });
  res.sendFile(__dirname + "/form.html");
});

app.get('/data', async (req, res) => {
  const fName = req.query.f_name;

  if (!fName) {
    return res.status(400).json({ error: 'Missing f_name query parameter' });
  }

  try {
    const result = await client.query('SELECT name, email, id FROM student WHERE name = $1', [fName]);
    const data = result.rows;
    res.json(data);
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).json({ error: 'Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});



//   app.listen(port, () => {
//     console.log(`Example app listening on port ${port}!`)
//   });