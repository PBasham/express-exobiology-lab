// set up server variables
const expr = require("express")
const app = require("liquid-express-views")(expr())
const port = 3000

// link 'database'
const scientist = require("./models/scientist.js")

app.use((req, res, next) => {
    console.log("I run on all routes!")
    next()
})

// allows me to use the information posted from a route to another.
app.use(expr.urlencoded({extended: false}))

// when I ask to look for a folder it will search the public folder.
app.use(expr.static("public"))

// default route
app.get("/",(req,res) => {
    res.send("this is the '/' route")
})
// route to create a new scientist
app.get("/new",(req,res) => {
    res.render("new")
})

// app.post("/create", (req, res) => {
//     res.send(req.body)
// })
// route where the new scientist are stored.
app.get("/index",(req,res) => {
    // res.send("index")
    res.render("index", {
        allScientist: scientist
    })
})
app.post("/index", (req, res) => {
    let postData =  req.body
    console.log(postData)

    scientist.push(postData)
    res.render("index", {
        allScientist: scientist
    })
})

app.get("/index/:id",(req,res) => {
    res.render("show",
    {
        scientist: scientist[req.params.id]
    })
})

app.listen(port,() => {
    console.log(`Listening on Port: ${port}`)
})