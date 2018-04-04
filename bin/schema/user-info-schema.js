const mongoose=require('mongoose');
const schema=mongoose.Schema({
        _creator:
            {
                type: mongoose.Schema.ObjectId,
                ref:'usercreds'
            },
        Name:String,
        Dob:Date,
        Department:String,
        Roll_Number:String,
        Phone:String,
        Year:String
    },
    {
        timestamps:true
    },
    {
        collection:'userinfos'
    });

exports.instance=function (mon) {
    return mon.model('userinfos',schema);
}
