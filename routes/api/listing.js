const express = require('express');
const router = express.Router();
const auth = require("../../middleware/auth");

const listingController = require('../../controllers/listingController')



// @route       GET api/listing
//@dec          Add a new Listing 
//@acesss       Private


router.post('/',auth, listingController.addListing )


// @route       GET api/listing/:id
//@dec          Get All users Listing
//@acesss       Private


router.get('/:id', listingController.getUserListing )


module.exports = router 