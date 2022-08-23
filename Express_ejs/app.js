const express = require('express')
const app = express()
const port = 3000
const expressLayouts = require('express-ejs-layouts');
//start ejs
app.set("view engine", "ejs")
app.use(expressLayouts);

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
    layout : "main_layout"
})
})
app.get('/contact', (req, res) => {
  res.render("contact",{
    title: "contact Page",
    layout : "main_layout"
})
})
app.get('/product/:id', (req, res) => {
  res.send(req.params.id + req.query.category)
})

app.use("/",(req,res)=>{
    res.status(404)
    res.send("<h1>404</h1>")
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})