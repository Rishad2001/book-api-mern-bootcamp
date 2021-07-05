const mongoose = require("mongoose");
//author schema
const AutherSchema = mongoose.Schema({
    id: Number,
    name: String,
    books:[String],
});
//auther modal
const AutherModal = mongoose.model(AutherSchema);

module.exports = AutherModal;