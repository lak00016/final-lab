import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express()

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"0bEl1Sk?TwO02!",
    database:"test",
})

// If there is a auth problem (I had this error)
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'D3@th$tar!54";

app.use(express.json())
app.use(cors())

app.get("/", (req,res)=>{
    res.json("hello this is the backend")
})

app.get("/books", (req, res) => {
    const q = "SELECT * FROM books"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.post("/books", (req,res)=>{
    const q = "INSERT INTO books (`title`,`desc`,`cover`) VALUES (?)";
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover,
    ];

    db.query(q, [values], (err,data)=>{
        if (err) return res.json(err);
        return res.json("Book has been created successfully.");
    })
})

app.listen(8800, ()=>{
    console.log("Connected to backend!")
})