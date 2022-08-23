const fs = require("fs")
//writeFie (synchronous)
fs.writeFileSync('coba.txt', "hallo ini pake synchronous")
//writefile (asynchronous)
fs.writeFile("cobaAsy.txt", "hallo ini pake asynchronous", function(e){
    console.log(e)
})

//readfile (synchronous)
const data = fs.readFileSync("coba.txt", "utf-8")
console.log(data)

//readfile (asynchronous)
fs.readFile("./cobaAsy.txt", "utf-8", function(e, data){
    if(e){
        console.log(e) 
    }else{
        console.log(data)
    }
})


