const Application = require('../models/Application.model');
const Job = require('../models/Job.model');
const Employeer = require('../models/Employeer.model');

const postJob = async (req, res) => {
    const { jobTitle, skillsRequired, experienceLevel, jobDescription, location, jobType} = req.body;
    if( !jobTitle || !Array.isArray(skillsRequired) || skillsRequired.length === 0 || !experienceLevel || !jobDescription || !location || !jobType){
        return res.status(400).json({
            error: "Incomplete information.",
        });
    }
    const user = req.user;
    try{

        const userFound = await Employeer.findOne({userId : user._id});

        if(!userFound){
            return res.status(404).json({ error: "Employeer not found."});
        }
        const jobCreaated = await Job.create({
            userID: user._id,
            companyName: userFound.companyName,
            jobTitle,
            skillsRequired,
            experienceLevel,
            jobDescription,
            location,
            jobType,
            applications : 0
        });

        res.status(201).json({ message: "Job posted.", job: jobCreaated});
    }catch(err){
        res.status(500).json({ error: "Internal server error: Failed to create job."});
    }
}

const updateJob = async (req, res) => {
    const { id } = req.params; // Job ID from URL
    const user = req.user;     // Logged in user from middleware

    try {
        // Check if job exists
        const job = await Job.findById(id);
        if (!job) {
            return res.status(404).json({ error: "Job not found." });
        }

        // Check if logged in user is the owner
        if (job.userID.toString() !== user._id.toString()) {
            return res.status(403).json({ error: "Unauthorized: You cannot edit this job." });
        }

        // Update allowed fields
        const { jobTitle, skillsRequired, experienceLevel, jobDescription, location, jobType } = req.body;
        if (skillsRequired && !Array.isArray(skillsRequired)) {
            return res.status(400).json({ error: "skillsRequired must be an array." });
        }

        job.jobTitle = jobTitle || job.jobTitle;
        job.skillsRequired = skillsRequired?.length ? skillsRequired : job.skillsRequired;
        job.experienceLevel = experienceLevel || job.experienceLevel;
        job.jobDescription = jobDescription || job.jobDescription;
        job.location = location || job.location;
        job.jobType = jobType || job.jobType;

        await job.save();

        res.status(200).json({ message: "Job updated successfully.", job });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error: Failed to update job." });
    }
};

// DELETE job
const deleteJob = async (req, res) => {
    const { id } = req.params; // Job ID from URL
    const user = req.user;     // Logged in user from middleware

    try {
        // Check if job exists
        const job = await Job.findById(id);
        if (!job) {
            return res.status(404).json({ error: "Job not found." });
        }

        // Check if logged in user is the owner
        if (job.userID.toString() !== user._id.toString()) {
            return res.status(403).json({ error: "Unauthorized: You cannot delete this job." });
        }

        await job.deleteOne();
        res.status(200).json({ message: "Job deleted successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error: Failed to delete job." });
    }
};

const applyToAJob = async (req, res) => {
    const { id } = req.params.id;
    const user = req.user;

    try{
        const jobExists = await Job.findById(id);
        if(!jobExists){
            return res.status(404).json({ error: "Job not found."});
        }
        const alreadyApplied = await Application.find({
            userID: user._id,
            jobID: id,
        });
        if(alreadyApplied){
            return res.status(409).json({ error: "Already applied to the job."});
        }

        const application = await Application.create({
            userID: user._id,
            jobID: id,
            status: "pending",
        });
        let applicationCount = jobExists.applications;
        applicationCount += 1;
        jobExists.applications = applicationCount;
        await jobExists.save();
        res.status(201).json({ message: "Application Sccuessful."});
    }catch(err){
        res.status(500).json({ error: "Internal server error: Application failed."});
    }
}

const getJobDetails = async (req, res) => {
    const { id } = req.params;
    try{
        const jobExists = await Job.findById(id);
        if(!jobExists){
            return res.status(404).json({ error: "Job not found."});
        }
        
        res.status(200).json({ message: "Job details found.", job: jobExists});
    }catch(err){
        res.status(500).json({ error: "Internal server error: couldn't proceed the task."});
    }
}

const getAllJobs = async (req, res) => {
    try{
        const jobsFound = await Job.find();
        res.status(200).json({ message: "Jobs found.", jobs: jobsFound});
    }catch(err){
        res.status(500).json({ error: "Internal server error: Failed to get all the jobs."});
    }
}

module.exports = {
    postJob,
    updateJob,
    deleteJob,
    applyToAJob,
    getJobDetails,
    getAllJobs,
}