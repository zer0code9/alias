const mongoose = require("mongoose");
const AliasUtils = require("../../helpers/utils");

const Schema = new mongoose.Schema({
    idA: String,
    idD: String,
    currency: {
        ticket: Number,
        star: Number,
    },
    xp: Number,
});

const Model = mongoose.model("user", Schema);

module.exports = {
    getUser: async (user) => {
        if (!user) return;

        let userData = await Model.findOne( { idD: user.id } );
        if (!userData) {
            userData = new Model({
                idA: AliasUtils.generateId("au"),
                idD: user.id,
                currency: {
                    ticket: 0,
                    star: 0
                },
                xp: 0,
            })
            userData.save();
        }
    }
}