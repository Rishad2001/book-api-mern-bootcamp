const mongoose = require("mongoose");
//author schema
const AutherSchema = mongoose.Schema({
    id: Number,
    name: String,
    books:[String],
});
//auther modal
const AutherModal = mongoose.model("authers",AutherSchema);

module.exports = AutherModal;