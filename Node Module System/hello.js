
// const cetak = require("./modul")
// const cetakBanyakNama = require("./modul")
// cetak("antoni")
// cetakBanyakNama("antoni", 5)

//NodeJS Module System

const modul = require("./modul")

modul.cetakAngka(modul.nama,19)
modul.objOrang.cetakOrang()
const gojeck = new modul.Perusahaan()
gojeck.nama = "gojeck"
gojeck.gaji = "10juta"
gojeck.cetakNama()