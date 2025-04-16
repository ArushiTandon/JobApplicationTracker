const sequelize = require('../util/db');
const User = require('../model/user');
const Job = require('../model/job');
const SavedJob = require('../model/savedJob');


//is admin 
const checkAdminRole = async (userId) => {
    try {
      const user = await User.findById(userId);
      if(user.isAdmin === 'true'){
        return true;
      }
  
    } catch (error) {
      console.log("User not found");
      return false;
    }
  };

exports.createJob = async (req, res) => {

if (!(await checkAdminRole(req.user.id)))
    return res.status(403).json({message: 'user does not have admin role'});

const { title, description, location, postedDate, salary, companyId, jobType } = req.body;

try {

    const job = await sequelize.transaction(async(t) => {

        return await Job.create({title, description, location, postedDate, salary, companyId, jobType}, {transaction: t});
    })

    res.status(201).json({ message: 'job created successfully', job });
    
} catch (error) {

    console.error('ERROR CREATING JOB:', error);
    res.status(400).json({ error: 'Error creating job' });
}
}

exports.getJobs = async (req, res) => {

    try {

        const jobs = await Job.findAll();

        res.status(200).json({ message: 'Jobs fetched successfully', jobs});
        
    } catch (error) {
        console.error('ERROR FETCHING JOBS:', error);
    res.status(400).json({ error: 'Error fetching jobs' });
    }
}

exports.viewJob = async (req, res) => {

    const jobId = req.params.id;

    try {

        const job = await Job.findByPk(jobId);

        res.status(200).json({ message: 'Job fetched successfully', job});
        
    } catch (error) {
        console.error('ERROR VIEWING JOB:', error);
        res.status(400).json({ error: 'Error viewing job' });
        
    }
}

exports.saveJob = async (req, res) => {

    const userId = req.user.id;
    const { jobId } = req.body;

    try {

        const saveJob = await sequelize.transaction(async(t) => {
            return await SavedJob.create({userId, jobId}, {transaction: t});
        })

        res.status(200).json({ message: 'Job saved successfully', saveJob});
        
    } catch (error) {

      console.error('ERROR SAVING JOB:', error);
      res.status(400).json({ error: 'Error saving job' });
        
    }
}

exports.getSavedJobs = async(req, res) => {

    const userId = req.user.id;
    
    try {

        const savedJobs = await SavedJob.findAll({
            where: {userId},
            include: [Job]
        });

        res.status(200).json({ message: 'Saved jobs fetched successfully', savedJobs});
        
    } catch (error) {
        console.error('ERROR FETCHING SAVED JOBS:', error);
        res.status(400).json({ error: 'Error fetching saved jobs'});
        
    }
}

exports.unsaveJob = async (req, res) => {

    const userId = req.user.id;
    const jobId = req.params.id;

    try {

        const savedJob = await sequelize.transaction(async(t) => {

            return await SavedJob.destroy( { where: {userId, jobId}}, {transaction: t});

        })

        res.status(200).json({ message: 'Saved job deleted successfully', savedJob});
        
    } catch (error) {
        console.error('ERROR DELETING SAVED JOB:', error);
        res.status(400).json({ error: 'Error deleting saved job'});
    }
}

exports.updateJob = async (req, res) => {

    if (!(await checkAdminRole(req.user.id)))
    return res.status(403).json({message: 'user does not have admin role'});

    const jobId = req.params.id;
    const updateJob = req.body;

    try {

        const job = await Job.findByPk(jobId);

        if(!job){
            return res.status(404).json({ message: 'Job not found' });
        }

        const updatedJob = await job.update(updateJob);

        res.status(200).json({ message: 'Job updated successfully', updatedJob});
        
    } catch (error) {
        console.error('ERROR UPDATING JOB:', error);
        res.status(400).json({ error: 'Error updating job' });
    }
}

exports.deleteJob = async (req, res) => {

    if (!(await checkAdminRole(req.user.id)))
    return res.status(403).json({message: 'user does not have admin role'});

    const jobId = req.params.id;

    try {

        const job = await Job.findByPk(jobId);

        if(!job){
            return res.status(404).json({ message: 'Job not found' });
        }

        const deletedJob = await job.destroy();

        res.status(200).json({ message: 'Job deleted successfully', deletedJob});
        
    } catch (error) {
        console.error('ERROR DELETING JOB:', error);
        res.status(400).json({ error: 'ERROR DELETING JOB' });
        
    }
}