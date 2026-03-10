const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true 
    },

    location: { 
      type: String, 
      required: true 
    },

    ticketPrice: { 
      type: Number, 
      default: 0 
    },

    description: { 
      type: String, 
      required: true 
    },

    image: { 
      type: String, 
      default: "" 
    },

    latitude: {
      type: Number,
      required: true
    },

    longitude: {
      type: Number,
      required: true
    }

  },
  { timestamps: true }
);

module.exports = mongoose.model("Place", placeSchema);