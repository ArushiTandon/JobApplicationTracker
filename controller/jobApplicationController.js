const JobApplication = require('../model/jobApplication')
const sequelize = require('../util/db');
const { Op } = require("sequelize");
const { uploadToS3 } = require('../services/aws');

exports.createJobApplication = async (req, res) => {
  const userId = req.user.id;
  const { companyId } = req.params;
  const {
    companyName,
    jobTitle,
    applicationDate,
    status,
    notes,
    location,
  } = req.body;

  try {
    let resumeUrl = null;

    // If a file was uploaded, upload to S3 and get URL
    if (req.file) {
      resumeUrl = await uploadToS3(req.file);
    }

    const jobApplication = await sequelize.transaction(async (t) => {
      return await JobApplication.create(
        {
          userId,
          companyId,
          companyName,
          jobTitle,
          applicationDate,
          status,
          notes,
          location,
          resumeUrl,
        },
        { transaction: t }
      );
    });

    res.status(201).json({
      message: 'Job application created successfully',
      jobApplication,
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
              attributes: ['id', 'jobTitle', 'companyName'], });
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
      { jobTitle: { [Op.like]: `%${keyword}%` } },
      { notes: { [Op.like]: `%${keyword}%` } }
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



  // exports.updateJobApplication = async (req, res) => {
  
  //     const userId = req.user.id;
  //     const jobId = req.params.id;
  //     const { resume } = req.body;
  
  //     try {
  
  //         const jobApplication = await JobApplication.update( { resume }, { where: {userId, jobId } });
  
  //         res.status(200).json({ message: 'job application updated successfully', jobApplication});
  
  //     } catch (error) {
  //         console.error('ERROR UPDATING JOB APPLICATION:', error);
  //         res.status(400).json({ error: 'Error updating job application' });
  //     }
  // }