var express = require('express')

var app = express();

app.set('view engine','ejs');
app.set('views', 'views');
app.use("/assets",express.static('assets'));

var coursenav= require('./routes/courseDetails');
app.use('/coursedetails',coursenav);

var indexnav= require('./routes/index');
app.use('/',indexnav);



app.listen(8084,function(){
    console.log("app started");
    console.log("listening on port 5000");
});