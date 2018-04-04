let db=require('../bin/db/db.js');
let bCrypt=require('bcrypt-nodejs');
let fs=require('fs');

exports.create_teacher=async function (req,res) {
    
};

exports.create_user=async function (req,res) {
        let input_user_cred=req.body.user_cred;
        input_user_cred.password=createHash(input_user_cred.password);
        let new_user_cred=db.user_cred(input_user_cred);

        let input_user_info=req.body.user_info;
        input_user_info._creator=new_user_cred._id;
        let new_user_info=db.user_info(input_user_info);

        let input_user_points=req.body.user_points;
        input_user_points._creator=new_user_cred._id;
        let new_user_points=db.user_points(input_user_points);


        await new_user_points.save().then(function (data) {
            if(data===undefined)
            {
                throw new Error("some service issue");
            }
        }).catch(function (err) {
            console.log(err.message);
            res.status(500);
            res.end("could not add user_points");
        });
        await new_user_info.save().then(function (data) {
            if(data===undefined)
            {
                throw new Error("some service issue");
            }
        }).catch(function (err) {
            console.log(err.message);
            res.status(500);
            res.end("could not add user_info");
        });
        await new_user_cred.save().then(function (data) {
            if(data===undefined)
            {
                throw new Error("some service issue");
            }

        }).catch(function (err) {
            console.log(err.message);
            res.status(500);
            res.end("could not add user_cred");
        })
        res.status(200);
        res.end("success");
        /*await db.user_info.findOne({Name:input_user_info.Name.toString()}).populate('_creator', ['_id'])
        .exec(function (err,data) {
            if (err)
                console.log(err.message);
            res.status(200);
            res.send(JSON.stringify(data));
        });*/
}



exports.update_user=async function (req,res) {
    let update_data=req.body.data;
    req.body.data.password=createHash(req.body.data.password);
    let instance=selector(req.body.type,req.body.id);
    await instance.ins.update(instance.query,{$set:update_data}).then(function (data) {
        if(data===undefined)
        {
            throw new Error("some service issue");
        }
        res.status(200);
        res.end(JSON.stringify(data));
    }).catch(function (err) {
        console.log(err.message);
        res.status(500);
        res.end("could not add user");
    })
}

exports.get_user=async function (req,res) {

    let instance=selector(req.body.type,req.body.id);
    if(instance.query._id==="all" || instance.query._creator==="all"){
        instance.query={}
    }
    await instance.ins.find(instance.query).then(function (data) {
        if(data===undefined)
        {
            throw new Error("some service issue");
        }
        res.status(200);
        res.end(JSON.stringify(data));
    }).catch(function (err) {
        console.log(err.message);
        res.status(500);
        res.end("could not add user");
    })
};

exports.post_points=async function (req,res) {
    let instance=db.point;

    await instance.remove({user_id:req.body.user_id,problem_id:req.body.problem_id}).then(function (data) {
        if(data){
            console.log("deleted...");
        }
    }).catch(function (err) {
        console.log("some error in deletion");
    })
    let ins=db.point(req.body);
    await ins.save().then(function (data) {
        if(data){
            console.log("points inserted or updated...");
            res.status(200);
            res.send("done");
        }
    }).catch(function (err) {
        console.log("points not inserted not updated");
        res.status(500);
        res.send("error"+err.message);

    });
}

exports.post_subject_points=async function (req,res) {
    let instance=db.user_points
    let data={}
    if(req.body.subject==="algorithms"){
        data.algorithms=req.body.value
    }
    else if(req.body.subject==="problemsolving"){
        data.problemsolving=req.body.value
    }
    else if(req.body.subject==="datastructures"){
        data.datastructures=req.body.value
    }
    await instance.findOneAndUpdate({_creator:req.body.user_id},data).then(function (result) {
        if(result){
            console.log("updated subject points...");
            res.status(200);
            res.send("updated");

        }
    }).catch(function (err) {
        console.log(err.message);
        res.status(500);
        res.send("error"+err.message);
    })
}

exports.get_subject_points=async function (req,res) {
    let instance=db.user_points
    let ins=db.user_info
    ins.find(/*Roll_Number:req.body.roll*/).then(function (data) {
        if(data){
            console.log(data);
            instance.find({_creator:data._creator}).then(function (result) {
                if(result){
                    console.log("fetched subject points...");
                    res.status(200);
                    res.send(JSON.stringify(result));
                }
            }).catch(function (err) {
                console.log(err.message);
                res.status(500);
                res.send("error"+err.message);
            })
        }
    }).catch(function (err) {
        console.log(err.message);
    });
    // let x={}

}

exports.get_points=async function (req,res) {
    let instance=db.point;
    console.log(req.params.user);
    console.log(req.params.prob);
    await instance.findOne({user_id:req.params.user,problem_id:req.params.prob}).then(function (data) {
        if(data){
            console.log("points fetched..."+data);
            res.status(200);
            res.end(JSON.stringify(data));
        }
    }).catch(function (err) {
        console.log("points not fetched");
        res.status(500);
        res.send("error"+err.message);
    });
};



const selector=function (input,id) {
    if(input==="info")
        return {ins:db.user_info,query:{_creator:id}}
    else if(input==="cred")
        return {ins:db.user_cred,query:{_id:id}}
    else if(input==="points")
        return {ins:db.user_points,query:{_creator:id}}
    else
        throw new Error("unknown model");
}

const createHash = function(password){
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}