const Company = require('../model/company');
const sequelize = require('../util/db');

exports.createCompany = async (req, res) => {
    const { name, industry, location, contactEmail, contactPhone, notes } = req.body;
    const userId = req.user.id;
  
    try {
      const company = await sequelize.transaction(async (t) => {
        return await Company.create(
          {
            name,
            industry,
            location,
            contactEmail,
            contactPhone,
            notes,
            userId,
          },
          { transaction: t }
        );
      });
  
      return res.status(201).json({
        message: 'Company created successfully',
        company,
      });
    } catch (error) {
      console.error('Error creating company:', error);
      return res.status(500).json({
        message: 'Internal server error',
      });
    }
};

exports.getCompanies = async (req, res) => {

    const userId = req.user.id;

    try {

        const companies = await Company.findAll({
            where: {userId},
            order: [['createdAt', 'DESC']]
        })

        return res.status(200).json({ message: 'Companies retrieved successfully', companies});
        
    } catch (error) {
      console.error('Error getting companies:', error);
      return res.status(500).json({ message: 'Internal server error',
      });
    }
}

exports.getCompany = async (req, res) => {

    const { companyId } = req.params;

    try {

        const company = await Company.findOne({ where: { companyId } })
        
        if(!company){
            return res.status(404).json({ message: 'Company not found'});
        }

        return res.status(200).json({ message: 'Company retrieved successfully', company: company });

    } catch (error) {
      console.error('Error getting company:', error);
      return res.status(500).json({ message: 'Internal server error',
      });
    }
}

exports.updateCompany = async (req, res) => {

    const { companyId } = req.params;
    const companyUpdate  = req.body;

    try {
        
        const company = await Company.findByPk({where: {id: companyId}});

        if(!company){
            return res.status(404).json({ message: 'Company not found' });
        }

        const updatedCompany = await company.update(companyUpdate);
        return res.status(200).json({ message: 'Company updated successfully', company: updatedCompany });

    } catch (error) {
        console.error('Error updating company:', error);
        return res.status(500).json({ message: 'Internal server error',
        });
        
    }
}

exports.deleteCompany = async (req, res) => {
    const { companyId } = req.params;

    try {
        
        const company = await sequelize.transaction(async(t) => {

            return await Company.destroy({ where: {id: companyId}, transaction: t});

        })
        res.status(200).json({ message: 'Company deleted successfully'});

    } catch (error) {
        console.error('Error deleting company:', error);
        return res.status(500).json({ message: 'Internal server error',
        });
        
    }
}
