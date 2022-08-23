const yargs = require("yargs")
const contact = require("./contact")

//tambah akun
    yargs.command({
        command : "add",
        desc: "menambahkan akun",
        builder: {
            nama: {
                demandOPtion: true,
                type: "srting",
                desc: "manambah nama"
            },
            email: {
                demandOPtion: false,
                type: "srting",
                desc: "manambah email"
            },
            noHp: {
                demandOPtion: true,
                type: "string",
                desc: "manambah NoHp"
            }
        },
        handler(argv){
            contact.inputData(argv.nama, argv.email, argv.noHp)
        }
    })
//hapus akun
    yargs.command({
        command: "rm",
        desc : "menghapus akun",
        builder:{
            nama: {
                type: "string",
                demandOPtion: true
            }
        },
        handler(argv){
            let akun = argv.nama
            contact.removeAcc(akun)
        }
    })
//tampilkan list
yargs.command({
    command: "list",
    desc : "menampilkan list akun",
    handler(){
        contact.seeList()
    }
})
//detail
yargs.command({
    command: "detail",
    desc : "menampilkan detail akun",
    builder:{
        nama: {
            type : "string",
            demandOPtion: true
        }
    },
    handler(argv){
        let akun = argv.nama
        contact.detail(akun)
    }
})
    .demandCommand()
yargs.parse()