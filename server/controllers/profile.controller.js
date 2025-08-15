require('dotenv').config();
const ImageKit = require("imagekit");
const Employee = require("../models/Employee.model");
const Employeer = require("../models/Employeer.model");

// ImageKit instance banado
const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_API_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_API_KEY,
    urlEndpoint: process.env.IMAGEKIT_URI_ENDPOINT
});

// Helper function to upload file buffer to ImageKit
const uploadToImageKit = async (fileBuffer, fileName) => {
    try {
        const result = await imagekit.upload({
            file: fileBuffer,
            fileName: fileName
        });
        return result;
    } catch (err) {
        console.error("ImageKit upload error:", err.message);
        throw err;
    }
};

const createProfile = async (req, res) => {
    const type = req.type;
    const user = req.user;

    if (type === "employee") {
        const { phoneNumber, location, about, skills, experienceLevel, jobType } = req.body;
        let profileImageUrl = null;

        if (req.file) {
            const uploaded = await uploadToImageKit(req.file.buffer, req.file.originalname);
            profileImageUrl = uploaded.url;
        }

        if (!profileImageUrl || !phoneNumber || !about || !location || !Array.isArray(skills) || skills.length === 0 || !experienceLevel || !jobType) {
            return res.status(400).json({ error: "Invalid or incomplete data provided." });
        }

        try {
            const EmployeeProfile = await Employee.create({
                userId: user._id,
                about,
                logo: profileImageUrl,
                phoneNumber,
                location,
                skills,
                experienceLevel,
                jobType
            });
            res.status(201).json({ message: "Employee profile created.", employeeProfile: EmployeeProfile });
        } catch (err) {
            res.status(500).json({ message: "Internal server error: Failed to create employee profile." });
        }
    } else if (type === "employeer") {
        const { companyName, website, location, Industry, companySize } = req.body;
        let logoUrl = null;

        if (req.file) {
            const uploaded = await uploadToImageKit(req.file.buffer, req.file.originalname);
            logoUrl = uploaded.url;
        }

        if (!companyName || !logoUrl || !website || !location || !Industry || !companySize) {
            return res.status(400).json({ error: "Invalid or incomplete data provided." });
        }

        try {
            const EmployeerProfile = await Employeer.create({
                userId: user._id,
                companyName,
                logo: logoUrl,
                location,
                website,
                Industry,
                companySize
            });
            res.status(201).json({ message: "Employeer profile created.", employeerProfile: EmployeerProfile });
        } catch (err) {
            res.status(500).json({ message: "Internal server error: Failed to create employee profile." });
        }
    }
};

const updateProfile = async (req, res) => {
    const type = req.type;
    const user = req.user;

    if (type === "employee") {
        const { phoneNumber, location, about, skills, experienceLevel, jobType } = req.body;
        let profileImageUrl = null;

        if (req.file) {
            const uploaded = await uploadToImageKit(req.file.buffer, req.file.originalname);
            profileImageUrl = uploaded.url;
        }

        try {
            const updatedProfile = await Employee.findOneAndUpdate(
                { userId: user._id },
                { $set: { ...(profileImageUrl && { profileImage: profileImageUrl }), phoneNumber, location, skills, experienceLevel, jobType, about } },
                { new: true, runValidators: true }
            );

            if (!updatedProfile) {
                return res.status(404).json({ error: "Employee profile not found." });
            }

            res.status(200).json({ message: "Employee profile updated.", employeeProfile: updatedProfile });
        } catch (err) {
            res.status(500).json({ message: "Internal server error: Failed to update employee profile." });
        }
    } else if (type === "employeer") {
        const { companyName, website, location, Industry, companySize } = req.body;
        let logoUrl = null;

        if (req.file) {
            const uploaded = await uploadToImageKit(req.file.buffer, req.file.originalname);
            logoUrl = uploaded.url;
        }

        try {
            const updatedProfile = await Employeer.findOneAndUpdate(
                { userId: user._id },
                { $set: { ...(logoUrl && { logo: logoUrl }), companyName, website, location, Industry, companySize } },
                { new: true, runValidators: true }
            );

            if (!updatedProfile) {
                return res.status(404).json({ error: "Employeer profile not found." });
            }

            res.status(200).json({ message: "Employeer profile updated.", employeerProfile: updatedProfile });
        } catch (err) {
            res.status(500).json({ error: "Internal server error: Failed to update employeer profile." });
        }
    }
};

const viewProfile = async (req, res) => {
    const id = req.params.id;
    try {
        let profileFound = await Employee.findById(id);
        if (!profileFound) {
            profileFound = await Employeer.findById(id);
            if (!profileFound) {
                return res.status(404).json({ message: "Profile not found." });
            }
        }
        res.status(200).json({ message: "Profile found successfully.", profile: profileFound });
    } catch (err) {
        res.status(500).json({ error: "Internal server error: Failed to get profile." });
    }
};

module.exports = {
    createProfile,
    updateProfile,
    viewProfile
};
