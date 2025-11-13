const mongoose = require('mongoose');

const founderSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  country: {
    type: String,
    required: true,
    trim: true
  },
  state: {
    type: String,
    required: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: function() {
      return this.provider !== 'google';
    },
    minlength: 6
  },
  role: {
    type: String,
    enum: ['Founder', 'Recruiter', 'Solo Entrepreneur'],
    required: true
  },
  profilePhoto: {
    type: String,
    trim: true
  },
  currentPosition: {
    type: String,
    trim: true
  },
  areaOfExpertise: {
    type: String,
    trim: true
  },
  skillsAndTech: {
    type: [String],
    default: []
  },
  yearsOfExperience: {
    type: Number,
    min: 0
  },
  schooling: {
    type: String,
    trim: true
  },
  whatYouLookingFor: {
    type: String,
    trim: true
  },
  whatYouCanOffer: {
    type: String,
    trim: true
  },
  currentProject: {
    type: String,
    trim: true
  },
  goalOnPlatform: {
    type: String,
    trim: true
  },
  educationCertifications: {
    type: String,
    trim: true
  },
  workInternshipExperience: {
    type: String,
    trim: true
  },
  achievementsAwards: {
    type: String,
    trim: true
  },
  portfolioWebsite: {
    type: String,
    trim: true
  },
  preferredIndustries: {
    type: String,
    trim: true
  },
  availability: {
    type: String,
    trim: true
  },
  preferredCommunicationStyle: {
    type: String,
    trim: true
  },
  shortBio: {
    type: String,
    trim: true
  },
  interest: {
    type: String,
    trim: true
  },
  funFact: {
    type: String,
    trim: true
  },
  termsAgreed: {
    type: Boolean,
    required: true
  },
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: Date
  },
  isEmailVerified: {
    type: Boolean,
    default: function() {
      return this.provider === 'google';
    }
  },
  emailVerificationToken: {
    type: String
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true
  },
  provider: {
    type: String,
    enum: ['local', 'google'],
    default: 'local'
  },
  avatar: {
    type: String
  },
  profilePicture: {
    url: {
      type: String,
      default: null
    },
    publicId: {
      type: String,
      default: null
    },
    uploadedAt: {
      type: Date,
      default: null
    }
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Founder', founderSchema);
