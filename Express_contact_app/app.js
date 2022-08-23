const express = require('express')
const app = express()
const port = 3000
const expressLayouts = require('express-ejs-layouts');
const morgan = require("morgan")
const {getDatabase, detail, saveContact, valNama, deleteContact, ubahContact} = require("./utils/contact")
const { body, validationResult, check } = require('express-validator');
const sessions = require("express-session")
const cookieParser = require("cookie-parser")
const flash = require("connect-flash")  
//start ejs
app.set("view engine", "ejs")

//tird-party midleware
app.use(expressLayouts);


//built in midleware
app.use(express.static("public"))
app.use(morgan("dev"))
app.use(express.urlencoded({extended: true}))

//configurasi flash
app.use(cookieParser("secret"))
app.use(sessions({
  cookie: {maxAge:6000},
  secret: "secret",
  resave: true,
  saveUninitialized: true
}))
app.use(flash()) 
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
    msg: res.req.flash("msg")
})
})

app.get('/contact/add', (req, res) => {
  res.render("add",{
    title: "Add contact",
    layout : "main_layout",
})
})

app.post("/contact",[
  body("nama").custom((value)=>{
    const dupliat = valNama(value)
    if(dupliat){
      throw new Error("nama sudah digunakan")
    }
    return true
  }),
  check("noHp", "format nomor anda salah").isMobilePhone("id-ID"),
  check("email", "format email anda salah").isEmail(),
  
],(req, res)=>{
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    res.render("add",{
      title: "Add contact",
      layout : "main_layout",
      errors: errors.array()
  })
  }else{
  saveContact(req.body)
  req.flash("msg", "Data acount berhasil di tambahkan")
  res.redirect("/contact")
  }
})


//ubah contact
app.get("/contact/change/:nama",(req, res)=>{
  const contact = valNama(req.params.nama)
  res.render("change", {
    title:"Change contact",
    layout:"main_layout",
    contact
  })
})

app.post("/contact/update",[
  body("nama").custom((value,{req})=>{
    const dupliat = valNama(value)
    if(value !== req.body.oldNama && dupliat){
      throw new Error("nama sudah digunakan")
    }
    return true
  }),
  check("noHp", "format nomor anda salah").isMobilePhone("id-ID"),
  check("email", "format email anda salah").isEmail(),
  
],(req, res)=>{
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    res.render("change",{
      title: "Change contact",
      layout : "main_layout",
      errors: errors.array(),
      contact : req.body
  })
  }else{
  ubahContact(req.body)
  req.flash("msg", "Contact berhasil di ubah")
  res.redirect("/contact")
  }
})
//delete contact
app.get("/contact/delete/:nama",(req, res)=>{
  const found = valNama(req.params.nama)
  if(!found){
    res.status(404)
    res.render("404", {
      title : "Page not found",
      layout : "main_layout"
    })
  }else{
    deleteContact(req.params.nama)
    req.flash("msg", "data berhasil diubah")
    res.redirect("/contact")
  }
})
//detail
app.get('/contact/:nama', (req, res) => {
  const found = valNama(req.params.nama)
    if(!found){
      res.status(404)
      res.render("404", {
        title : "Page not found",
        layout : "main_layout"
      })
    }else{
      const contact = detail(req.params.nama)
      res.render("detail",{
      title: "contact Page",
      layout : "main_layout",
      contact,
      })
    }
  
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