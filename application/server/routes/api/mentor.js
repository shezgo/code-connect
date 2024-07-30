const express = require("express");
const {mentor_request_email_post} = require("../../controllers/mentorController");
const router = express.Router();

router.post("/requestMentor/:email", 
    mentor_request_email_post,
    async function(req, res, next) {
        var {username,email,password} = req.body;
        try{
            console.log(req.body);
        if(resultObject && resultObject.affectedRows == 1 ) {
            return res.redirect("/login");
            } else{
            return res.redirect("/registration");
            }
        }catch(error){
            next(error);
        }
    });

module.exports = router;
