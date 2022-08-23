// function cetakNama(nama){
//     console .log(`hallo nama saya ${nama}`);
// }

// function cetakBanyakNama(nama, angka) {
//     for(let i = 1;i <= angka; i++ ){
//         console.log(`hallo ${nama} yang ke ${i}`)
//     }
// }
// module.exports = cetakNama;
// module.exports = cetakBanyakNama;


//NodeJS Module System

function cetakAngka(nama, umur){
    console.log(`nama:${nama} umur:${umur}`)
}

const nama = "antoni"

const objOrang = {
    nama : "siDia",
    umur : 19,
    cetakOrang:()=> {
        console.log(`hallo saya:${objOrang.nama} umur saya:${objOrang.umur} `)
    }
}

class Perusahaan {
    constructor(nama, gaji){
        this.nama = nama,
        this.gaji = gaji
    }
    cetakNama(){
        console.log(`nama:${this.nama} dengan gaji:${this.gaji}`)
    }
}

module.exports = {cetakAngka, nama , objOrang, Perusahaan}