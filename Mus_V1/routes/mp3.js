var express = require("express");
var router = express.Router();
const MP3 = require("../Models/MP3");

// router.get("/play/:id", async (req, res) => {
//   try {
//     let id = req.params.id;
//     const mp3 = await MP3.findById(id);
//     if (!mp3) {
//       return res.status(404).json({ error: "MP3 not found" });
//     }

//     console.log(mp3.name, mp3.id);
//     // Gửi dữ liệu nhị phân về trình duyệt
//     res.set("Content-Type", "audio/mpeg");
//     // // Thiết lập tên file trong trình duyệt
//     // res.set('Content-Disposition', `inline; filename=${mp3.name}`);

//     res.send(mp3.data); // Gửi dữ liệu nhị phân của MP3
//     // res.render('viewmp3_list', { mp3Url: `/mp3/play/${id}` });
//   } catch (err) {
//     res.status(500).json({ error: "Error fetching MP3" });
//   }
// });
router.get("/play", async (req, res) => {
  try {
    // Lấy danh sách tất cả các bản nhạc từ CSDL
    const mp3List = await MP3.find();

    if (!mp3List || mp3List.length === 0) {
      return res.status(404).json({ error: "MP3 list not found" });
    }

    res.render("viewmp3_list", { mp3List: mp3List }); // Truyền danh sách các bản nhạc vào view 'viewmp3_list'
  } catch (err) {
    res.status(500).json({ error: "Error fetching MP3 list" });
  }
});

router.get("/play/:id", async (req, res) => {
  try {
    const mp3 = await MP3.findById(req.params.id);
    if (!mp3) {
      return res.status(404).json({ error: "MP3 not found" });
    }

    res.render("viewmp3_list", { mp3Data: mp3.data }); // Render view 'play' và truyền dữ liệu nhị phân của bản nhạc vào view để phát
  } catch (err) {
    res.status(500).json({ error: "Error fetching MP3" });
  }
});

router.get("/upload", (req, res) => {
   res.render("viewmp3_post"); // Render view 'upload' để người dùng có thể tải lên file MP3
});


// const multer = require("multer");
// const upload = multer({ dest: "uploads/" }); // Sử dụng thư mục 'uploads/' để lưu trữ file MP3
// const fs = require("fs");
// router.post("/upload", upload.single("mp3File"), async (req, res) => {
//   try {
//     let { name } = req.body; // Lấy thông tin tên từ request body
//     console.log('Name from request body:', name); // In ra giá trị của name từ request body

//     const mp3File = req.file; // Lấy thông tin file MP3 từ request

//     if (!mp3File) {
//       return res.status(400).json({ error: "Please upload an MP3 file" });
//     }

//     // Nếu không có tên được cung cấp trong body, sử dụng tên của tệp
//     if (!name) {
//       name = mp3File.originalname;
//     }
//     console.log('Name after checking the file original name:', name); // In ra giá trị của name sau khi kiểm tra tên gốc của tệp

//     const mp3Data = fs.readFileSync(mp3File.path);

//     const newMP3 = new MP3({
//       name: name,
//       data: mp3Data,
//     });

//     const savedMP3 = await newMP3.save();
//     console.log('Name after saving the MP3:', savedMP3.name); // In ra giá trị của name sau khi lưu MP3

//     // Gửi tên của bản nhạc đã được lưu như là một query parameter
//     res.redirect(`/mp3/play?name=${savedMP3.name}`);
//   } catch (err) {
//     console.log(err.message);
//     res.status(500).json({ error: "Error uploading MP3" });
//   }
// });

const multer = require('multer');
const path = require('path');
const fs = require("fs");
const crypto = require('crypto');
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err);
      let originalName = file.originalname ? file.originalname : '';
      let extension = path.extname(originalName);
      let baseName = path.basename(originalName, extension);
      let utf8Name = Buffer.from(baseName, 'latin1').toString('utf8');
      cb(null, utf8Name + '-' + raw.toString('hex') + extension);
    });
  }
});
const upload = multer({ storage: storage });
router.post("/upload", upload.single("mp3File"), async (req, res) => {
  try {
    let { name } = req.body; 
    console.log('Name from request body:', name); 
    const mp3File = req.file; 
    if (!mp3File) {
      return res.status(400).json({ error: "Please upload an MP3 file" });
    }
    if (!name) {
      name = mp3File.originalname;
    }
    console.log('Name after checking the file original name:', name); 
    const mp3Data = fs.readFileSync(mp3File.path);
    const newMP3 = new MP3({
      name: name,
      data: mp3Data,
    });
    const savedMP3 = await newMP3.save();
    console.log('Name after saving the MP3:', savedMP3.name);
    res.redirect(`/mp3/play?name=${savedMP3.name}`);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Error uploading MP3" });
  }
});

// const multer = require("multer");
// const upload = multer({ dest: "uploads/" }); // Sử dụng thư mục 'uploads/' để lưu trữ file MP3
// const fs = require("fs");
// router.post("/upload", upload.single("mp3File"), async (req, res) => {
//   try {
//     const { name } = req.body; // Lấy thông tin tên từ request body
//     const mp3File = req.file; // Lấy thông tin file MP3 từ request

//     if (!mp3File) {
//       return res.status(400).json({ error: "Please upload an MP3 file" });
//     }
//     console.log("truoc luu");
//     console.log(name);
//     console.log(req.file);

//     // Đọc file MP3 từ đường dẫn tạm thời sau khi được multer lưu trữ
//     const mp3Data = fs.readFileSync(mp3File.path);

//     // Tạo một instance mới của MP3 model với dữ liệu nhị phân
//     const newMP3 = new MP3({
//       name: name,
//       data: mp3Data, // Chuyển đổi file MP3 thành dữ liệu nhị phân (buffer)
//     });
//     console.log("sau luu");
//     console.log(newMP3.name);

//     // Lưu bản ghi mới vào cơ sở dữ liệu
//     const savedMP3 = await newMP3.save();
//     console.log("Name: " + newMP3.name);
//     res.redirect("/mp3/play");
//     res.status(201).json(savedMP3.name); // Trả về thông tin của bản nhạc đã được thêm vào cơ sở dữ liệu
//   } catch (err) {
//     console.log(err.message);
//     res.status(500).json({ error: "Error uploading MP3" });
//   }
// });




// router.get("/upload", (req, res) => {
//   res.render("viewFS.ejs");
// });
// const multer = require("multer");
// const fs = require("fs");
// const admin = require("firebase-admin");

// router.post("/upload", upload.single("mp3File"), async (req, res) => {
//   try {
//     const { name } = req.body; // Lấy thông tin tên từ request body
//     const mp3File = req.file; // Lấy thông tin file MP3 từ request

//     if (!mp3File) {
//       return res.status(400).json({ error: "Please upload an MP3 file" });
//     }

//     console.log("Before upload");
//     console.log(name);
//     console.log(req.file);

//     // Đọc file MP3 từ đường dẫn tạm thời sau khi được multer lưu trữ
//     const mp3Data = fs.readFileSync(mp3File.path);

//     // Tạo một instance mới của MP3FS model với dữ liệu nhị phân
//     const newMP3FS = new MP3FS({
//       name: name,
//       data: mp3Data.toString("base64"), // Chuyển đổi file MP3 thành dữ liệu nhị phân (base64 string)
//     });

//     console.log("After upload");
//     console.log(newMP3FS.name);

//     // Lưu file MP3 lên Firebase Storage
//     const bucket = admin.storage().bucket();
//     const fileName = `mp3s/${Date.now()}_${mp3File.originalname}`;
//     await bucket.file(fileName).save(mp3Data);

//     // Thêm thông tin MP3 vào Firestore
//     await admin.firestore().collection("mp3s").add(newMP3FS);

//     console.log("Name: " + newMP3FS.name);
//  //   res.redirect("/mp3/play");
//   } catch (err) {
//     console.log(err.message);
//     res.status(500).json({ error: "Error uploading MP3" });
//   }
// });

module.exports = router;
