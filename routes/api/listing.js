const express = require('express');
const router = express.Router();
const listingController = require('../../controllers/listingController')



// @route       GET api/listing
//@dec          Add a new Listing 
//@acesss       Public
router.post('/', listingController.addListing )



module.exports = router 