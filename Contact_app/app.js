const contacs = require("./contacs")

const main = async ()=>{
    const nama = await contacs.buatPertanyaan("masukan nama anda:")
    const email = await contacs.buatPertanyaan("masukan email anda:")
    const noHp = await contacs.buatPertanyaan("masukan noHp anda:")

    contacs.inputData(nama, email, noHp)
}

main()
