import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  name: {
     type: String, 
     required: true 
  },

  description: { 
    type: String 
  },

  date: { 
    type: Date, 
    required: true 
  },

  owner: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },

  attendees: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User' 
  }],

  image: { 
    type: String 
  }, // Cloudinary URL for the event image
}, { timestamps: true });

export default mongoose.model('Event', eventSchema);
