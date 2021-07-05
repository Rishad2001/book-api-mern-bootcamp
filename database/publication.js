const mongoose = require("mongoose");
//publication schema
const PublicationSchema = mongoose.Schema({
    id: Number,
    name: String,
    books:[String],
});
//auther modal
const PublicationModal = mongoose.model(PublicationSchema);

module.exports = PublicationModal;