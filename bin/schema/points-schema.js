const mongoose=require('mongoose');
const schema=mongoose.Schema({
        user_id:String/*,unique:true*/,
        problem_id:String/*,unique:true*/,
        is_solved:String,
        is_attended:String,
        point_scored:Number,
    },
    {
        timestamps:true
    },
    {
         unique:true
    },
    {
        collection:'points'
    });

exports.instance=function (mon) {
    return mon.model('points',schema);
}
