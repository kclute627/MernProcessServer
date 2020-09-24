const mongoose = require("mongoose");

const ListingsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  listing: [
    {
      services: [Object],
      photo: [
        {
          type: Object,
        },
      ],

      email_address: {
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
    },
  ],
  author: {
    type: mongoose.Schema.ObjectId,
    
    required: "must have an author",
  },
});

//Define Indexes

ListingsSchema.index({
  location: "2dsphere",
});
ListingsSchema.index({
  name: "text",
  description: "text",
});

module.exports = Listing = mongoose.model("listing", ListingsSchema);
