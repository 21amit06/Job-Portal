import { Request, Response } from "express";
import multer from "multer";
import { extractResumeText } from "../utility/resume-parser";
import { analyzeResume } from "../utility/ai-resume";
import {db} from "../utility/database";
const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 5 * 1024 * 1024
  },

  fileFilter: (req, file, callback) => {

    if (file.mimetype === "application/pdf") {
      callback(null, true);
    } else {
      callback(new Error("Only PDF files are allowed"));
    }

  }
});


export const uploadResume = [

  upload.single("resume"),

  async (req: Request, res: Response) => {

    try {

      if (!req.file) {
        return res.status(400).json({
          message: "Resume PDF is required"
        });
      }

      // 1. Extract resume text
      const resumeText = await extractResumeText(
        req.file.buffer
      );

      console.log("Resume text extracted");


      // 2. Analyze resume using AI
      const analysis = await analyzeResume(resumeText);

      console.log("AI analysis:", analysis);


      // 3. Get active jobs from database
      const jobs = await db.any(`
        SELECT
          j.job_id,
          j.title,
          j.description,
          j.requirements,
          j.location,
          j.job_type,
          j.salary_min,
          j.salary_max,
          j.experience_required,
          j.skills,
          j.vacancies,
          j.created_at,

          c.company_name

        FROM job_portal.jobs j

        LEFT JOIN job_portal.companies c
          ON j.company_id = c.company_id

        WHERE j.status = 'ACTIVE'

        ORDER BY j.created_at DESC
      `);


      console.log("Total active jobs:", jobs.length);


      // 4. Calculate matching score
      const resumeSkills = analysis.skills.map(
        (skill: string) => skill.toLowerCase()
      );

      const resumeRoles = analysis.roles.map(
        (role: string) => role.toLowerCase()
      );


      const recommendedJobs = jobs.map((job: any) => {

        const jobSkills = (job.skills || "")
          .toLowerCase();

        const jobTitle = (job.title || "")
          .toLowerCase();

        const jobDescription = (job.description || "")
          .toLowerCase();

        let matchedSkills: string[] = [];

        resumeSkills.forEach((skill: string) => {

          if (
            jobSkills.includes(skill) ||
            jobDescription.includes(skill)
          ) {
            matchedSkills.push(skill);
          }

        });


        let score = 0;


        // Skills matching
        if (resumeSkills.length > 0) {

          score +=
            (matchedSkills.length / resumeSkills.length) * 70;

        }


        // Job role matching
        resumeRoles.forEach((role: string) => {

          if (jobTitle.includes(role)) {
            score += 30;
          }

        });


        score = Math.min(
          Math.round(score),
          100
        );


        return {

          ...job,

          match_percentage: score,

          matched_skills: matchedSkills

        };

      });


      // 5. Sort highest match first
      recommendedJobs.sort(
        (a: any, b: any) =>
          b.match_percentage - a.match_percentage
      );


      // 6. Return top 10 jobs
      const topJobs = recommendedJobs.slice(0, 10);


      return res.status(200).json({

        message: "Jobs recommended successfully",

        resume_analysis: analysis,

        jobs: topJobs

      });

   } catch (error: any) {

  console.error("================================");
  console.error("AI JOB RECOMMENDATION ERROR");
  console.error("================================");

  console.error("Message:", error?.message);
  console.error("Stack:", error?.stack);
  console.error("Full error:", error);

  return res.status(500).json({
    message: "Failed to recommend jobs",
    error: error?.message || "Unknown error"
  });
}

  }

];