const mongoose = require('mongoose');
const uuidv1 = require('uuid/v1');
const domainSchema = new mongoose.Schema({
    id: {
        type: String,
        default: function() {
            return uuidv1();
        }
    },
    name: String,
    remark: String,
    deleted: {
        type: Boolean,
        default: false
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    updateDate: {
        type: Date,
        default: Date.now
    }
}, {
    collection: 'domain'
});
module.exports = domainSchema;