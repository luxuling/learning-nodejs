const http = require("http")
const fs = require("fs")

const renderPage = (url, res)=>{
    fs.readFile(url, (err, page)=>{
        if(err){
            res.writeHead(404)
            res.write("not found")
        }else{
        res.write(page)
        res.end()
        }
    }
)}
http.createServer((req, res)=>{
    res.writeHead(200,{
        'Content-type': 'text/html'
    })
    const url = req.url
    // if(url == "/about"){
    //     renderPage("about.html", res)
    // }

    switch (url) {
        case "/about":
            renderPage("about.html", res)
            break
        case "/contact":
            renderPage("contact.html", res)
        default:
            renderPage("home.html", res)
            break;
    }

}).listen(3000,()=>{
    console.log("server running....")
})
