const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/Local_1')
// mongoose.connect('mongodb+srv://apxhz03:apxhz03@dataapp.crlk1vy.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{
    console.log("Đã Kết Nối ");
})
.catch((err) => {
    console.log("loi ket noi csdl");
    console.log(err);
});

module.exports = {mongoose}
