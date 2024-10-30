import Customer from '../models/Customer.js';
import { AppError } from '../utils/AppError.js';
import csv from 'csv-parse';
import { Readable } from 'stream';

// Get all customers with filtering and pagination
export const getCustomers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build filter object
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.segment) filter.segment = req.query.segment;
    if (req.query.lifecycleStage) filter.lifecycleStage = req.query.lifecycleStage;
    if (req.query.search) {
      filter.$text = { $search: req.query.search };
    }

    const customers = await Customer.find(filter)
      .populate('assignedTo', 'name email')
      .skip(skip)
      .limit(limit)
      .sort({ updatedAt: -1 });

    const total = await Customer.countDocuments(filter);

    res.json({
      customers,
      page,
      totalPages: Math.ceil(total / limit),
      total
    });
  } catch (error) {
    next(error);
  }
};

// Import customers from CSV
export const importCustomers = async (req, res, next) => {
  if (!req.file) {
    return next(new AppError('Please upload a CSV file', 400));
  }

  const customers = [];
  const parser = csv.parse({
    columns: true,
    skip_empty_lines: true
  });

  parser.on('readable', function() {
    let record;
    while ((record = parser.read())) {
      const customer = {
        companyName: record['Company Name'],
        industry: record['Industry'],
        website: record['Website'],
        contacts: [{
          name: record['Contact Name'],
          email: record['Contact Email'],
          phone: record['Contact Phone'],
          isPrimary: true
        }],
        annualRevenue: parseFloat(record['Annual Revenue']) || undefined,
        employeeCount: parseInt(record['Employee Count']) || undefined,
        segment: 'smb', // Default value
        status: 'active',
        lifecycleStage: 'lead',
        tags: []
      };
      customers.push(customer);
    }
  });

  parser.on('error', function(err) {
    next(new AppError('Error parsing CSV file: ' + err.message, 400));
  });

  parser.on('end', async function() {
    try {
      await Customer.insertMany(customers);
      res.status(201).json({
        message: `Successfully imported ${customers.length} customers`
      });
    } catch (error) {
      next(new AppError('Error saving customers: ' + error.message, 400));
    }
  });

  // Create a readable stream from the buffer and pipe it to the parser
  const stream = new Readable();
  stream.push(req.file.buffer);
  stream.push(null);
  stream.pipe(parser);
};