const express = require('express');
const router = express.Router();
const { jwtMiddleware } = require('../middleware/jwt');
const companyController = require('../controller/companyController');

// Create a new company
router.post('/create' , jwtMiddleware, companyController.createCompany);

// Get all companies
router.get('/all', jwtMiddleware, companyController.getCompanies);

// Get a company by ID
router.get('/:companyId', jwtMiddleware, companyController.getCompany);

// Update a company by ID
router.put('/update/:companyId', jwtMiddleware, companyController.updateCompany);

// Delete a company by ID   
router.delete('/delete/:companyId', jwtMiddleware, companyController.deleteCompany);

module.exports = router;