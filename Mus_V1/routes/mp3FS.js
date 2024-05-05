const express = require('express');
const router = express.Router();
const Grid = require('gridfs-stream');
let gfs;
// Truy vấn tệp MP3 theo tên
router.get('/play/:filename', (req, res) => {
    console.log("dg chay o FS")
    gfs.files.find({ filename: req.params.filename }).toArray((err, files) => {
        if (!files || files.length === 0) {
            return res.status(404).json({ error: 'MP3 not found' });
        }

        const readStream = gfs.createReadStream({ filename: req.params.filename });

        res.set('Content-Type', 'audio/mpeg');
        readStream.pipe(res);
    });
});

module.exports = router;
