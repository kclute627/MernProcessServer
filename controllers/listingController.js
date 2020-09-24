const Listing = require("../models/Listings");

exports.addListing = async (req, res) => {
  try {
    const {
      address,
      name,
      company,
      email,
      logo,
      services,
      lat,
      lng,
      author,
    } = req.body;

    let listing = await Listing.findOne({ author });

    if (listing) {

        console.log('listing hit ')
        
      const newListing = {
        services,
        email__address: email,
        photo: logo,
        location: { coordinates: [lat, lng], address },
      };
      listing = await Listing.findOneAndUpdate(
        { author },
        { listing: [...listing.listing, newListing] },
        {useFindAndModify: false}
        
      );
    } else {
      listing = listing = new Listing({
        name,

        listing: [
          {
            services,
            email_address: email,
            photo: logo,
            location: { coordinates: [lat, lng], address },
          },
        ],

        author,
      });
    }

    await listing.save();

    return res.status(201).json({
      msg: "Listing Created Sucessfully",
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      msg: error.message,
    });
  }
};
  