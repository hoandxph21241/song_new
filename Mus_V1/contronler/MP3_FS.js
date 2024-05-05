const fs = require('fs');

// Đọc tệp MP3 từ ứng dụng của bạn dưới dạng dữ liệu nhị phân
const mp3Data = fs.readFileSync('uploads/111.mp3');

// Lưu trữ tệp MP3 vào GridFS
const writeStream = gfs.createWriteStream({
    filename: '111.mp3'
});

writeStream.write(mp3Data);
writeStream.end();
