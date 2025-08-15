const { GoogleGenerativeAI } = require("@google/generative-ai");
const User = require("../models/User.model");
const Employee = require("../models/Employee.model");
const Employeer = require("../models/Employeer.model");
const Job = require("../models/Job.model");
require("dotenv").config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// User ka data aur profile laane ka helper function
async function getUserDataAndProfile(id) {
  const user = await User.findById(id);
  if (!user) {
    return { error: "User not found." };
  }

  if (user.accountType === "employee") {
    const profile = await Employee.findOne({ userId: user._id });
    if (!profile) {
      return { error: "User does not have any profile." };
    }
    return {
      skills: profile.skills,
      experience: profile.experienceLevel,
      location: profile.location,
      jobType: profile.jobType,
      about: profile.about || ""
    };
  }

  if (user.accountType === "employeer") {
    const profile = await Employeer.findOne({ userId: user._id });
    if (!profile) {
      return { error: "User does not have any profile." };
    }
    return {
      industry: profile.Industry,
      location: profile.location
    };
  }

  return { error: "Invalid user id." };
}

// Saare jobs laane ka helper
async function getAllJobs() {
  const jobs = await Job.find();
  if (!jobs || jobs.length === 0) {
    return { error: "No job found." };
  }
  return { jobs };
}

// Prompt generate karne ka helper
async function getPrompt(id) {
  const userData = await getUserDataAndProfile(id);
  if (userData.error) return { error: userData.error };

  const jobsData = await getAllJobs();
  if (jobsData.error) return { error: jobsData.error };

  const prompt = `
    You are an intelligent job matching assistant.
    User Profile:
    Location: ${userData.location || "N/A"}
    Preferred Job Type: ${userData.jobType || "N/A"} ( If the job type is BOTH then consider both onsite and remote jobs for the user.)
    Skills: ${(userData.skills || []).join(", ")}
    Experience: ${userData.experience || "N/A"}
    About User: ${userData.about || ""}
    Available Job Listings: ${JSON.stringify(jobsData.jobs)}

    Instructions:
    1. Match jobs based on location, skills, experience, and preferences.
    2. Rank from best to worst.
    3. Output JSON array with:
        - job_title
        - location
        - job type
        - match_reason
        - match_score (0-100)
    4. Make sure if the skills does not match perfectly it's fine but if the location and experience level doesnot matches or is close enough than skip the job don't recommend it.
    5. If the roles doesnot match or are closely related than ignore the job, like if the user is frontend developer and web ddeveloper than don't recommend him the job offer for Python developer or any other role that doesnot matches his skills at all.
    6. For more accurate results compare the user about info and job description too, so that the user gets what he really wants.
    7. If the match score is less than 40% don't recommend it.
    8. Don't recommend the jobs which are far away from the users location if the job type is on site, else any job can work.
    Only return the JSON array.
  `;

  return { prompt };
}

// Main controller
const getRecommendation = async (req, res) => {
  try {
    const id = req.user?._id;
    if (!id) {
      return res.status(400).json({ error: "User ID is missing." });
    }

    const { prompt, error } = await getPrompt(id);
    if (error) {
      return res.status(400).json({ error });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-001" });
    const result = await model.generateContent(prompt);
    let text = result.response.text();

// Backticks aur language tag hatao agar ho to
text = text.trim();
if (text.startsWith("```json")) {
  text = text.replace(/^```json\s*/, '');  // starting ```json hatao
}
if (text.endsWith("```")) {
  text = text.replace(/```$/, '');         // ending ``` hatao
}

let parsed;
try {
  parsed = JSON.parse(text);
} catch (parseError) {
  return res.status(500).json({
    error: "Invalid JSON returned from AI.",
    raw: text
  });
}
 

    res.json({ message: "Success", recommendations: parsed });
  } catch (err) {
    console.error("Error in getRecommendation:", err);
    res.status(500).json({ error: "Error generating recommendation" });
  }
};

module.exports = getRecommendation;
