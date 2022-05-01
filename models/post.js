const mongoose = require("mongoose")
const passportLocalMongoose = require("passport-local-mongoose")

const postSchema = new mongoose.Schema({
    username: {type: String, required: true},
    content: String
})
module.exports = mongoose.model("Post", postSchema)

