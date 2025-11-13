const SoloEntrepreneur = require("../models/soloEntrepreneur.schema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { sendVerificationEmail } = require("../utils/sendEmail");
const { deleteImage, extractPublicId } = require("../config/cloudinary");

const getSoloEntrepreneurProfile = async (req, res) => {
	try {
		res.status(200).json({
			success: true,
			data: {
				user: {
					id: req.user._id,
					firstName: req.user.firstName,
					lastName: req.user.lastName,
					email: req.user.email,
					country: req.user.country,
					state: req.user.state,
					phoneNumber: req.user.phoneNumber,
					role: req.user.role,
					profilePicture: req.user.profilePicture,
				},
			},
		});
	} catch (error) {
		console.error("Error fetching solo entrepreneur profile:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error.",
		});
	}
};

// Upload Profile Picture
const uploadProfilePicture = async (req, res) => {
	try {
		if (!req.file) {
			return res.status(400).json({ message: "No image file provided" });
		}

		const userId = req.user.id;
		const user = await SoloEntrepreneur.findById(userId);

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		// Delete old profile picture if exists
		if (user.profilePicture?.publicId) {
			try {
				await deleteImage(user.profilePicture.publicId);
			} catch (error) {
				console.error("Error deleting old profile picture:", error);
				// Continue with upload even if deletion fails
			}
		}

		// Update user with new profile picture
		user.profilePicture = {
			url: req.file.path,
			publicId: req.file.filename,
			uploadedAt: new Date(),
		};

		// Also update the avatar field for backward compatibility
		user.avatar = req.file.path;

		await user.save();

		return res.status(200).json({
			message: "Profile picture uploaded successfully",
			profilePicture: {
				url: user.profilePicture.url,
				uploadedAt: user.profilePicture.uploadedAt,
			},
		});
	} catch (error) {
		console.error("Error uploading profile picture:", error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

// Delete Profile Picture
const deleteProfilePicture = async (req, res) => {
	try {
		const userId = req.user.id;
		const user = await SoloEntrepreneur.findById(userId);

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		if (!user.profilePicture?.publicId) {
			return res.status(400).json({ message: "No profile picture to delete" });
		}

		// Delete image from Cloudinary
		try {
			await deleteImage(user.profilePicture.publicId);
		} catch (error) {
			console.error("Error deleting image from Cloudinary:", error);
			// Continue with removing from database even if Cloudinary deletion fails
		}

		// Remove profile picture from user
		user.profilePicture = undefined;
		user.avatar = undefined;
		await user.save();

		return res.status(200).json({
			message: "Profile picture deleted successfully",
		});
	} catch (error) {
		console.error("Error deleting profile picture:", error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

const addProfessionalDetails = async (req, res) => {
	try {
		const { position, expertise, skills, experience, schooling } = req.body;

		// validation
		if (!position || !expertise || !skills || !experience || !schooling) {
			return res.status(400).json({
				success: false,
				message: "Please fill in all required professional details.",
			});
		}

		// Update the user professional details
		const updatedUser = await SoloEntrepreneur.findByIdAndUpdate(
			req.user._id,
			{
				$set: {
					professionalDetails: {
						position,
						expertise,
						skills,
						experience,
						schooling,
					},
					updatedAt: Date.now(),
				},
			},
			{ new: true, runValidators: true } // to return updated document
		);

		if (!updatedUser) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}

		res.status(200).json({
			success: true,
			message: "Professional details updated successfully",
			data: { professionalDetails: updatedUser.professionalDetails },
		});
	} catch (error) {
		console.error("Error updating professional details:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};

const addCollaborationGoals = async (req, res) => {
	try {
		const { collaboration, yourOffer, currentProjects, platformGoal } = req.body;

		// validation
		if (!collaboration || !yourOffer || !currentProjects || !platformGoal) {
			return res.status(400).json({
				success: false,
				message: "Please fill in all required collaboration goals.",
			});
		}

		// Update the user's collaboration goals
		const updatedUser = await SoloEntrepreneur.findByIdAndUpdate(
			req.user._id,
			{
				$set: {
					collaboration_And_Goals: {
						collaboration,
						yourOffer,
						currentProjects,
						platformGoal,
					},
					updatedAt: Date.now(),
				},
			},
			{ new: true, runValidators: true } // to return updated document
		);

		if (!updatedUser) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}

		res.status(200).json({
			success: true,
			message: "Collaboration goals updated successfully",
			data: { collaboration_And_Goals: updatedUser.collaboration_And_Goals },
		});
	} catch (error) {
		console.error("Error updating collaboration goals:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};

const addPreference = async (req, res) => {
	try {
		const { preferredIndustries, availability, preferredCommunicationStyle } = req.body;

		// validation
		if (!preferredIndustries || !availability || !preferredCommunicationStyle) {
			return res.status(400).json({
				success: false,
				message: "Please fill in all required  preference.",
			});
		}

		// Update the users preference
		const updatedUser = await SoloEntrepreneur.findByIdAndUpdate(
			req.user._id,
			{
				$set: {
					preference: {
						preferredIndustries,
						availability,
						preferredCommunicationStyle,
					},
					updatedAt: Date.now(),
				},
			},
			{ new: true, runValidators: true } // to return updated document
		);

		if (!updatedUser) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}

		res.status(200).json({
			success: true,
			message: "preference updated successfully",
			data: { preference: updatedUser.preference },
		});
	} catch (error) {
		console.error("Error updating preference:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};

const addBackground = async (req, res) => {
	try {
		const { education, experience, achievements, portfolio } = req.body;

		// validation
		if (!education || !experience || !achievements || !portfolio) {
			return res.status(400).json({
				success: false,
				message: "Please fill in all required  background.",
			});
		}

		// Update the users background
		const updatedUser = await SoloEntrepreneur.findByIdAndUpdate(
			req.user._id,
			{
				$set: {
					background: {
						education,
						experience,
						achievements,
						portfolio,
					},
					updatedAt: Date.now(),
				},
			},
			{ new: true, runValidators: true } // to return updated document
		);

		if (!updatedUser) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}

		res.status(200).json({
			success: true,
			message: "Background updated successfully",
			data: { background: updatedUser.background },
		});
	} catch (error) {
		console.error("Error updating Background:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};

const addPersonality = async (req, res) => {
	try {
		const { bio, interest, facts } = req.body;

		// validation
		if (!bio || !interest ) {
			return res.status(400).json({
				success: false,
				message: "Please fill in all required  personality.",
			});
		}

		// Update the users personality
		const updatedUser = await SoloEntrepreneur.findByIdAndUpdate(
			req.user._id,
			{
				$set: {
					personality: {
						bio,
						interest,
						facts,
					},
					updatedAt: Date.now(),
				},
			},
			{ new: true, runValidators: true } // to return updated document
		);

		if (!updatedUser) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}

		res.status(200).json({
			success: true,
			message: "personality updated successfully",
			data: { personality: updatedUser.personality },
		});
	} catch (error) {
		console.error("Error updating personality:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};

module.exports = {
	getSoloEntrepreneurProfile,
	uploadProfilePicture,
	deleteProfilePicture,
	deleteImage,
	extractPublicId,
	addProfessionalDetails,
	addCollaborationGoals,
	addBackground,
	addPreference,
	addPersonality,
};
