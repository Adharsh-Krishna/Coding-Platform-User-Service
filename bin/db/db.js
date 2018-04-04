const Mongoose = require('mongoose');

Mongoose.connect('mongodb://localhost/Users');
let  mongoose= Mongoose.connection.then(function () {
    console.log("CONNECTED");
}).catch(function () {
    console.log("NOT CONNECTED");
});

let db={};
db.mongoose=mongoose;
db.Mongoose=Mongoose;

const  user_info=require('../schema/user-info-schema.js');
const   user_cred=require('../schema/user-schema.js');
const  user_points=require('../schema/user-points-schema.js');
const point=require('../schema/points-schema.js');
const teacher=require('../schema/teachers-list-schema.js');

db.point=point.instance(Mongoose);
db.user_info=user_info.instance(Mongoose);
db.user_cred=user_cred.instance(Mongoose);
db.user_points=user_points.instance(Mongoose);
db.teacher=teacher.instance(Mongoose);

module.exports=db;