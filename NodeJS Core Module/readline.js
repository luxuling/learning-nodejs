const readline = require("readline")
const fs = require("fs")

const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})

// rl.question("siapa nama mu:", (nama)=>{
//     rl.question("berapa umurmu:", (umur)=>{
//         console.log(`nama:${nama}, umur:${umur}`)
//         rl.close()
//     })
// })


//membuat array
let json = fs.readFileSync("data.json","utf-8")
let arr = JSON.parse(json)

//mengambil data dengan promt
rl.question("masukan nama anda:", (nama)=>{
    rl.question("masukan nomor anda:", (nomor)=>{
        const akunObj ={
            nama : nama,
            nomor :nomor
        }
        arr.push(akunObj)
        let akunJson = JSON.stringify(arr)
        fs.writeFileSync("data.json", akunJson)

        rl.close()
    })
})

