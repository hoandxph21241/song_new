
var db = require('./db');
const mp3Schema = new db.mongoose.Schema({
    name: String,
    data: {
        type: Buffer, // Kiểu dữ liệu Buffer cho dữ liệu nhị phân
    }
});

let MP3 = db.mongoose.model('MP3', mp3Schema);



const Grid = require('gridfs-stream');

// Tạo một kết nối GridFS
let gfs;
db.mongoose.connection.on('open', () => {
    gfs = Grid(db.mongoose.connection.db, db.mongoose.mongo);
    // gfs.collection('uploads');
   gfs.collection('uploads/111.mp3');
    console.log("Đã Kết Nối V2");
});

module.exports = MP3,gfs;
