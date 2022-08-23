const readline = require("readline")
const fs = require("fs")

const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})

//cek folder
if(!fs.existsSync("./data")){
    fs.mkdirSync("data")
}

//cek file
if(!fs.existsSync("./data/database.json")){
    fs.writeFileSync("./data/database.json", "[]", "utf-8")
}

//generator pertanyaan

const buatPertanyaan = (pertanyaan)=>{
    return new Promise((resolve)=>{
        rl.question(pertanyaan, (answer)=>{
            resolve(answer)
        })
    })
}

const inputData = (nama, email, noHp)=>{
        const akunObj ={nama, email, noHp}
        let json = fs.readFileSync("./data/database.json", "utf-8")
        let arr = JSON.parse(json)
        arr.push(akunObj)
        let akunJson = JSON.stringify(arr)
        fs.writeFileSync("./data/database.json", akunJson)
        console.log("terima kasih sudah mengisi")
        rl.close()
}

module.exports = {buatPertanyaan, inputData}