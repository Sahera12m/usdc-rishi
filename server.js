const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan'); // Added morgan for logging

// Initialize Express app
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev')); // Logs requests to the console

// MongoDB connection
const mongoURI = 'mongodb://localhost:27017/ngo'; // Use your connection string here
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Define schemas and models for Projects, ContactUs, and SurveyInformation
const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const contactUsSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const surveyInformationSchema = new mongoose.Schema({
  section: String, // e.g., 'Current Projects', 'Potential Projects', 'Demographics', etc.
  query: String,
  answer: String,
});

const Project = mongoose.model('Project', projectSchema);
const ContactUs = mongoose.model('ContactUs', contactUsSchema);
const SurveyInformation = mongoose.model('SurveyInformation', surveyInformationSchema);

// API Endpoints for Survey Information
app.get('/api/surveyinformation', async (req, res) => {
  try {
    const surveyInfo = await SurveyInformation.find();
    res.json(surveyInfo);
  } catch (error) {
    console.error('Error fetching survey information:', error);
    res.status(500).json({ message: 'Failed to retrieve survey information' });
  }
});

app.post('/api/surveyinformation', async (req, res) => {
  const { section, query, answer } = req.body;
  const newSurveyQuestion = new SurveyInformation({ section, query, answer });

  try {
    await newSurveyQuestion.save();
    res.status(201).json(newSurveyQuestion);
  } catch (error) {
    console.error('Error adding survey question:', error);
    res.status(500).json({ message: 'Failed to add survey question' });
  }
});

app.delete('/api/surveyinformation/:id', async (req, res) => {
  try {
    await SurveyInformation.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting survey question:', error);
    res.status(500).json({ message: 'Failed to delete survey question' });
  }
});

app.put('/api/surveyinformation/:id', async (req, res) => {
  const { section, query, answer } = req.body;

  try {
    const updatedSurveyQuestion = await SurveyInformation.findByIdAndUpdate(
      req.params.id,
      { section, query, answer },
      { new: true } // Return the updated document
    );

    if (!updatedSurveyQuestion) {
      return res.status(404).json({ message: 'Survey question not found' });
    }

    res.json(updatedSurveyQuestion);
  } catch (error) {
    console.error('Error updating survey question:', error);
    res.status(500).json({ message: 'Failed to update survey question' });
  }
});

// API routes for Projects
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/projects', async (req, res) => {
  const { title, description } = req.body;
  const newProject = new Project({ title, description });

  try {
    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    console.error('Error adding project:', error);
    res.status(500).json({ error: 'Failed to add project' });
  }
});

app.delete('/api/projects/:id', async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

app.put('/api/projects/:id', async (req, res) => {
  const { title, description } = req.body;

  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(updatedProject);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// API route to handle contact submissions
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  const newContact = new ContactUs({ name, email, message });

  try {
    await newContact.save();
    res.status(201).json({ message: 'Contact data saved successfully!' });
  } catch (error) {
    console.error('Error saving contact data:', error);
    res.status(500).json({ error: 'Error saving contact data' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});