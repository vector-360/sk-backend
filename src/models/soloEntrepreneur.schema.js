const mongoose = require("mongoose");

const soloEntrepreneurSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
		trim: true,
	},
	lastName: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		trim: true,
	},
	country: {
		type: String,
		required: true,
		trim: true,
	},
	state: {
		type: String,
		required: true,
		trim: true,
	},
	phoneNumber: {
		type: String,
		required: true,
		trim: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
	},
	role: {
		type: String,
		enum: ["Founder", "Recruiter", "Solo Entrepreneur"],
		required: true,
	},
	termsAgreed: {
		type: Boolean,
		required: true,
	},
	resetPasswordToken: {
		type: String,
	},
	resetPasswordExpires: {
		type: Date,
	},
	isEmailVerified: {
		type: Boolean,
		default: false,
	},
	emailVerificationToken: {
		type: String,
	},
	profilePicture: {
		url: {
			type: String,
			default: null,
		},
		publicId: {
			type: String,
			default: null,
		},
		uploadedAt: {
			type: Date,
			default: null,
		},
	},
	professionalDetails: {
		position: {
			type: String,
			default: null,
		},
		expertise: {
			type: String,
			default: null,
		},
		skills: [
			{
				type: String,
				default: null,
			},
		],
		experience: {
			type: String,
			default: null,
		},
		schooling: {
			type: String,
			default: null,
		},
	},
	collaboration_And_Goals: {
		collaboration: {
			type: String,
			default: null,
		},
		yourOffer: {
			type: String,
			default: null,
		},
		currentProjects: [
			{
				type: String,
				default: null,
			},
		],
		platformGoal: {
			type: String,
			default: null,
		},
	},
	background: {
		education: [
			{
				type: String,
				default: null,
			},
		],
		experience: [
			{
				type: String,
				default: null,
			},
		],
		achievements: [
			{
				type: String,
				default: null,
			},
		],
		portfolio: {
			type: String,
			default: null,
		},
	},
	preference: {
		preferredIndustries: {
			type: String,
			default: null,
		},
		availability: {
			type: String,
			default: null,
		},
		preferredCommunicationStyle: {
			type: String,
			default: null,
		},
	},
	personality: {
		bio: {
      type: String,
      default: null
    },
    interest: {
      type: String,
      default: null
    },
    fact: {
      type: String,
      default: null
    }
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("SoloEntrepreneur", soloEntrepreneurSchema);
