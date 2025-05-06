const JobApplication = require('../model/jobApplication')
const { Op } = require("sequelize");
const { uploadFileToS3 } = require('../services/aws');

exports.createJobApplication = async (req, res) => {
  const userId = req.user.id;
  const {
    companyName,
    jobTitle,
    applicationDate,
    status,
    location,
  } = req.body;

  try {
    let resumeUrl = null;

    if (req.file) {
      resumeUrl = await uploadFileToS3(req.file);
    }

    const jobApplication = await JobApplication.create({
      userId,
      companyName,
      jobTitle,
      applicationDate,
      status,
      location,
      resumeUrl,
    });

    res.status(201).json({
      message: 'Job application created successfully',
      jobApplication,
      resumeUrl
    });
  } catch (error) {
    console.error('ERROR CREATING JOB APPLICATION:', error);
    res.status(400).json({ error: 'Error creating job application' });
  }
};

exports.getJobApplications = async (req, res) => {

    const userId = req.user.id;

    try {
        
            const jobApplications = await JobApplication.findAll({ where: { userId },
              attributes: ['id', 'jobTitle', 'companyName', 'status', 'applicationDate', 'location', 'resumeUrl'] });
            return res.status(200).json({
              message: 'Job applications fetched successfully',
              jobApplications,
            });
        
    } catch (error) {
        console.error('ERROR GETTING JOB APPLICATIONS:', error);
        res.status(400).json({ error: 'Error getting job applications' });
    }
}


exports.searchApplications = async (req, res) => {
  const userId = req.user.id;
  const { keyword, status, startDate, endDate } = req.query;

  const whereClause = {
    userId
  };

  if (status) {
    whereClause.status = status;
  }

  if (startDate && endDate) {
    whereClause.applicationDate = {
      [Op.between]: [new Date(startDate), new Date(endDate)]
    };
  }

  if (keyword) {
    whereClause[Op.or] = [
      { companyName: { [Op.like]: `%${keyword}%` } },
      { jobTitle: { [Op.like]: `%${keyword}%` } }
    ];
  }

  try {
    const applications = await JobApplication.findAll({ where: whereClause });
    res.status(200).json({ applications });
  } catch (err) {
    console.error("Search/filter error:", err);
    res.status(500).json({ error: "Failed to search applications" });
  }
};


exports.deleteJobApplication = async (req, res) => {
  const userId = req.user.id;
  const applicationId = req.params.id;

  console.log("Deleting job application with id:", applicationId);

  try {
    const deleted = await JobApplication.destroy({
      where: { id: applicationId, userId } 
    });

    if (!deleted) {
      return res.status(404).json({ message: "Job application not found" });
    }

    res.status(200).json({ message: "Job application deleted successfully" });

  } catch (error) {
    console.error("ERROR DELETING JOB APPLICATION:", error);
    res.status(500).json({ error: "Error deleting job application" });
  }
};
