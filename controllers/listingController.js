const Listing = require("../models/Listings");




exports.addListing = async (req, res)=>{





    
    try {

        const {address, name, company, email, logo, services, lat, lng, author} = req.body

        

        let listing = new Listing({
            name,
            companyName: company,
            email,
            services,
            photo: logo,
            location: {
                coordinates: [lat, lng],
                address, 
            },            
            author
        })

        await listing.save()

        res.json(listing) 
        
    } catch (error) {
        console.error(error.message);
    res.status(500).send("Server Error");
        
    }
}