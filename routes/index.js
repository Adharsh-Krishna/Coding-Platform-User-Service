const express = require('express');
const router = express.Router();
/*const  multer  = require('multer')
let storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, '../public/images/')
    },
    filename: function(req, file, callback) {
        console.log(file)
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});*/

let controller=require('../controllers/user-service-controller.js');
/* GET home page. */
router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods"," GET, PUT, POST, DELETE, HEAD");
    next();
});

router.post('/get', function(req, res) {
controller.get_user(req,res);
});

router.post('/post',function (req,res) {
controller.create_user(req,res);
});

router.post('/update/',function (req,res) {
controller.update_user(req,res);
});

router.get('/getpoint/:prob/:user',function (req,res) {
controller.get_points(req,res);
});


router.post('/postpoints',function (req,res) {
controller.post_points(req,res);
});

// router.post('/points',function (req,res) {
// controller.post_subject_points(req,res);
// });

router.post('/points',function (req,res) {
controller.get_subject_points(req,res);
});

router.post('/upload', function (req,res) {
 /*   let upload = multer({
        storage: storage
    }).single('userFile')
    upload(req, res, function(err) {
        res.end('File is uploaded')
    })*/
});

module.exports = router;
