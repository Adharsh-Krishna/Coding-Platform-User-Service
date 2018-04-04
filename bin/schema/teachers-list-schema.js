const mongoose=require('mongoose');

const schema=mongoose.Schema({
       teacher_id:mongoose.Schema.ObjectId,
        class: String
    },
    {
        timestamps:true
    },
    {
        collection:'teachers'
    });

exports.instance=function (mon) {
    return mon.model('teachers',schema);
};

