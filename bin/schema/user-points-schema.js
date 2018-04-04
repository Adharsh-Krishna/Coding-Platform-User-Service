const mongoose=require('mongoose');
const schema=mongoose.Schema({

        algorithms:Number,
        problemsolving:Number,
        datastructures:Number,
        _creator:
            {
                type:mongoose.Schema.ObjectId,
                ref:'usercreds'
            }
    },
    {
        timestamps:true
    },
    {
        collection:'userpoints'
    });

exports.instance=function (mon) {
    return mon.model('userpoints',schema);
}