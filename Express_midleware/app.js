const express = require('express')
const app = express()
const port = 3000
const expressLayouts = require('express-ejs-layouts');
const morgan = require("morgan")
const {getDatabase, detail} = require("./utils/contact")
//start ejs
app.set("view engine", "ejs")

//tird-party midleware
app.use(expressLayouts);


//built in midleware
app.use(express.static("public"))
app.use(morgan("dev"))

//aplication level midleware
app.use((req, res, next)=>{
  console.log(new Date)
  next()
})

app.get('/', (req, res) => {
  const user =[
    {
      nama: "user1",
      email: "user1@gmail.com"
    },
    {
      nama: "user2",
      email: "user2@gmail.com"
    },
    {
      nama: "user3",
      email: "user3@gmail.com"
    }
  ]
  res.render("index", {
    nama: "Antoni Saputra",
    user,
    title: "Home Page",
    layout : "main_layout"
  })
})
app.get('/about', (req, res) => {
  res.render("about",{
    title: "About Page",
    layout : "main_layout",
})
})
app.get('/contact', (req, res) => {
  const contacts = getDatabase()
  res.render("contact",{
    title: "contact Page",
    layout : "main_layout",
    contacts,
})
})

app.get('/contact/:nama', (req, res) => {
  const contact = detail(req.params.nama)
  console.log(contact)
  res.render("detail",{
    title: "contact Page",
    layout : "main_layout",
    contact,
})
})
app.get('/product/:id', (req, res) => {
  res.send(req.params.id + req.query.category)
})

app.use("/",(req,res)=>{
    res.status(404)
    res.render("404",{
      title: "404",
      layout: "main_layout"
    })
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})