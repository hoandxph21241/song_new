var db = require('./firebase');

const mp3FSSchema = new db.mongoose.Schema({
    name: String,
    data: String, // Firebase không hỗ trợ trực tiếp lưu trữ dữ liệu nhị phân, bạn có thể chuyển đổi dữ liệu thành base64 string.
  });
  
  let MP3FS = db.mongoose.model('MP3FS', mp3FSSchema);