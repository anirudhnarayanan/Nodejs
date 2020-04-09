var express = require('express')
var session = require('express-session')
var router = express.Router();

var bodyParser = require('body-parser')

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var numusages =0;

router.use(session({secret:'randomsecret'}));

router.use('/', function (req, res, next) {
  console.log('Request Type:', req.method)
  if(req.method=="POST"){
	  numusages+=1;
  }
  next()
});

router.get("/",function(req,res){
    console.log("NUMBER OF REQUESTS DONE UP UNTIL NOW: " + numusages);
    /*if(req.session.theCourse){
        console.log("Course Model ready");
        res.redirect("/courseDetails/thisCourse");
    }*/
    console.log("Course Model NOT ready");
    var courseModel = require('../models/course');
    var params = req.query
    var arguments = Object.values(params);
    console.log(arguments);
    var send = 0;
    if ("courseID" in params && "title" in params && "term" in params && "instructor" in params) {
        send =1;
    }
    //courseModel = courseModel.course("1212","Convolutional Neural Networks","Fall 2022","Anirudh Narayanan");
    courseModel = courseModel.course.apply(this,arguments);


    var data = {"age":"24","dob":"12/1/1995"};
    res.render("index",{course:"Artificial Intelligence",data:courseModel,"send":send,num:numusages});
});

router.get("/thisCourse",function(req,res){
    console.log("NUMBER OF REQUESTS DONE UP UNTIL NOW: " + numusages);
    var send=0;
    var data = {};
    if(req.session.theCourse){
        send=1;
        data = req.session.theCourse;
        console.log("Course Redirect Model ready");
        console.log(req.session.theCourse);
        
    }
    res.render("details",{course:"Artificial Intelligence",data:data,"send":send});
});





router.post("/",urlencodedParser, function(req,res){
    console.log("NUMBER OF REQUESTS DONE UP UNTIL NOW: " + numusages);
    console.log(req.body); 
    var courseModel = require('../models/course');
    var params = req.body
    var arguments = Object.values(params);
    console.log(arguments);
    var send = 0;
    if ("courseid" in params && "title" in params && "term" in params && "Instructor" in params && params["courseid"]!="" && params["title"]!="" && params["term"]!="" && params["Instructor"]!="") {
        send =1;
        console.log("found all data");
        //req.session.theCourse = params;
        
    }
    courseModel = courseModel.course.apply(this,arguments);

    if(send==1){
        console.log("send is 1");
        req.session.theCourse = courseModel;
    }
    //courseModel = courseModel.course("1212","Convolutional Neural Networks","Fall 2022","Anirudh Narayanan");


    var data = {"age":"24","dob":"12/1/1995"};
    //res.render("details",{course:"Artificial Intelligence",data:courseModel,"send":send});
    res.redirect("/courseDetails/thisCourse");
});

module.exports = router;
