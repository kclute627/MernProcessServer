const express = require('express');
const router = express.Router()



// @route       GET api/posts
//@dec          Test Route 
//@acesss       Public
router.get('/', (req, res) => res.send('posts route'))



module.exports = router