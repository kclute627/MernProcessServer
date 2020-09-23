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

       return res.status(201).json({
            msg: 'Listing Created Sucessfully'
        })
        
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            msg: error.message
        })
        
    }
}