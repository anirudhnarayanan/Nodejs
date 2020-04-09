var course = function(courseid,title,term,instructor){
    var coursemodel = {courseid:courseid,title:title,term:term,instructor:instructor};
    return coursemodel;
};

module.exports.course = course;
