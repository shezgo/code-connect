const express = require('express');
const router = express.Router();
const authCookieTok = require('./auth'); 
const { getUserForums, addForum } = require('../../controllers/forumController'); 


router.get('/', authCookieTok, getUserForums); 
router.post('/', authCookieTok, addForum); 
router.post('/', authCookieTok, addForumThread);
router.post('/', authCookieTok, addPost);

module.exports = router;
