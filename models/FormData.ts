import mongoose from 'mongoose';

const SocialSchema = new mongoose.Schema({
  platform: String,
  handle: String,
  link: String,
}, { _id: false });

const MemberSchema = new mongoose.Schema({
  roll: String,
  position: {
    type: String,
    enum: ['Secretary', 'President', 'Vice President', 'Joint Secretary', 'Member', 'Sponsorship Secretary']
  }
}, { _id: false });

const EventSchema = new mongoose.Schema({
  title: String,
  description: String,
  photos: [String], // base64 strings
}, { _id: false });

const FormDataSchema = new mongoose.Schema({
  section1: {
    type: {
      type: String,
      enum: ['Club', 'Technical Society']
    },
    name: String,
    about: String,
    bannerImage: String, // base64 string
    logo: String,        // base64 string
    whyJoin: String,
    howToJoin: String,
    tagline: String,
    department: String
  },
  section2: {
    events: [EventSchema]
  },
  section3: {
    FICs: [String]
  },
  section4: {
    members: [MemberSchema]
  },
  section5: {
    socials: [SocialSchema]
  },
  section6: {
    notes: String
  }
});

export default mongoose.models.FormData || mongoose.model('FormData', FormDataSchema);
