const mongoose = require("mongoose");

const ListingsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
   
  },
  googleid: { type: String },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  services: [String],

  photo: {
    type: String,
  },

  date: {
    type: Date,
    default: Date.now,
  },
  location: {
    type: {
      type: String,
      default: "Point",
    },
    coordinates: [
      {
        type: Number,
        required: "You must supply coordinates",
      },
    ],
    address: {
      type: String,
      required: "You Must Supply An Address",
    },
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
    required: "must have an author",
  },

});

//Define Indexes 

storeSchema.index({
    location: '2dsphere'
  })
  storeSchema.index({
    name: 'text',
    description: 'text',
    
  })

module.exports = User = mongoose.model("listings", ListingSchema);
