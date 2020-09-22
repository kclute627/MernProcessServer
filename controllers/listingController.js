const Listing = require("../models/Listings");




exports.addListing = async (req, res)=>{
    try {

        const {address, name, company, email, logo, services, lat, lng} = req.body

        let listing = new Listing({
            address,
            name,
            company,
            email,
            logo,
            services,
            lat,
            lng
        })

        await listing.save()

        res.json(listing) 
        
    } catch (error) {
        console.error(error.message);
    res.status(500).send("Server Error");
        
    }
}