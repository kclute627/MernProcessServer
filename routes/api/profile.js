const express = require('express');
const router = express.Router()



// @route       GET api/profile
//@dec          Test Route 
//@acesss       Public
router.get('/', (req, res) => res.send('profile route'))



module.exports = router