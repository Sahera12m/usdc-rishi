import { useState, useEffect } from 'react';
import axios from 'axios';
import { MdDelete } from 'react-icons/md'; // Example icon for delete

const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ title: '', description: '' });
  const [showProjectModal, setShowProjectModal] = useState(false);
  
  const [surveyInfo, setSurveyInfo] = useState([]);
  const [newSurveyQuestion, setNewSurveyQuestion] = useState({ section: '', query: '', answer: '' });
  const [showSurveyModal, setShowSurveyModal] = useState(false);
  
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [expandedProject, setExpandedProject] = useState(null); // State to track expanded project

  // Fetch projects data
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/projects');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  // Fetch survey information data
  useEffect(() => {
    const fetchSurveyInfo = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/surveyinformation');
        setSurveyInfo(response.data);
      } catch (error) {
        console.error('Error fetching survey information:', error);
      }
    };

    fetchSurveyInfo();
  }, []);

  // Add a new project
  const addProject = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/projects', newProject);
      setProjects([...projects, response.data]);
      setNewProject({ title: '', description: '' });
      setShowProjectModal(false);
      setConfirmationMessage('Project added successfully!');
      setTimeout(() => setConfirmationMessage(''), 4000);
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  // Delete a project
  const deleteProject = async (projectId) => {
    const confirmed = window.confirm('Are you sure you want to delete this project?');
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:5000/api/projects/${projectId}`);
        setProjects(projects.filter((project) => project._id !== projectId));
        setConfirmationMessage('Project deleted successfully!');
        setTimeout(() => setConfirmationMessage(''), 4000);
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  // Toggle project expansion
  const toggleExpand = (projectId) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
  };

  // Add a new survey question
  const addSurveyQuestion = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/surveyinformation', newSurveyQuestion);
      setSurveyInfo([...surveyInfo, response.data]);
      setNewSurveyQuestion({ section: '', query: '', answer: '' });
      setShowSurveyModal(false);
      setConfirmationMessage('Survey question added successfully!');
      setTimeout(() => setConfirmationMessage(''), 4000);
    } catch (error) {
      console.error('Error adding survey question:', error);
    }
  };

  // Delete a survey question
  const deleteSurveyQuestion = async (questionId) => {
    const confirmed = window.confirm('Are you sure you want to delete this question?');
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:5000/api/surveyinformation/${questionId}`);
        setSurveyInfo(surveyInfo.filter((question) => question._id !== questionId));
        setConfirmationMessage('Survey question deleted successfully!');
        setTimeout(() => setConfirmationMessage(''), 4000);
      } catch (error) {
        console.error('Error deleting survey question:', error);
      }
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      {confirmationMessage && (
        <div className={`fixed top-4 right-4 p-2 rounded shadow-lg z-50 animate-fade-in 
                        ${confirmationMessage.includes('deleted') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {confirmationMessage}
        </div>
      )}

      {/* Projects Section */}
      <h3 className="text-xl mb-2">Existing Projects</h3>
      {projects.length === 0 ? (
        <p>No projects available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {projects.map((project) => (
            <div key={project._id} className="relative border p-4 rounded shadow-lg bg-white transition-transform transform hover:scale-105 hover:bg-gray-100">
              <button
                onClick={() => deleteProject(project._id)}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-md"
              >
                <MdDelete size={16} />
              </button>
              <h4 className="text-lg font-bold">{project.title}</h4>
              <p className={`mt-2 ${expandedProject === project._id ? '' : 'line-clamp-3'}`}>
                {project.description}
              </p>
              <button onClick={() => toggleExpand(project._id)} className="mt-2 text-blue-500">
                {expandedProject === project._id ? 'Read less' : 'Read more'}
              </button>
            </div>
          ))}
          
          {/* Add New Project Button */}
          <div 
            className="relative border p-4 rounded shadow-lg bg-blue-500 flex items-center justify-center cursor-pointer transition-transform transform hover:scale-105 hover:bg-blue-700"
            onClick={() => setShowProjectModal(true)}
          >
            <span className="text-4xl text-white">+</span>
          </div>
        </div>
      )}

      {/* Survey Information Section */}
      <h3 className="text-xl mb-2">Survey Information</h3>
      {surveyInfo.length === 0 ? (
        <p>No survey information available.</p>
      ) : (
        surveyInfo.map((info) => (
          <div key={info._id} className="relative border p-4 rounded shadow-lg bg-white mb-4 hover:scale-105 transition-transform">
            <button
              onClick={() => deleteSurveyQuestion(info._id)}
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-md"
            >
              <MdDelete size={16} />
            </button>
            <h4 className="text-lg font-bold">{info.section}</h4>
            <p className="mt-2">Query: {info.query}</p>
            <p className="mt-2">Answer: {info.answer}</p>
          </div>
          
        ))
        
      )}
      {/* Add New Survey Question Button */}
      <div 
            className="relative border p-4 rounded shadow-lg bg-blue-500 flex items-center justify-center cursor-pointer transition-transform transform hover:scale-105 hover:bg-blue-700"
            onClick={() => setShowSurveyModal(true)}
          >
            <span className="text-4xl text-white">+</span>
          </div>

      {/* Modal for adding new project */}
      {showProjectModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-xl mb-4">Add New Project</h3>
            <input
              type="text"
              placeholder="Title"
              value={newProject.title}
              onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
              className="border p-2 mb-2 block w-full"
            />
            <textarea
              placeholder="Description"
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              className="border p-2 mb-2 block w-full"
            />
            <div className="flex justify-between">
              <button onClick={addProject} className="bg-green-500 text-white p-2 rounded">
                Add Project
              </button>
              <button onClick={() => setShowProjectModal(false)} className="bg-red-500 text-white p-2 rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for adding new survey question */}
      {showSurveyModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-xl mb-4">Add New Survey Question</h3>
            <input
              type="text"
              placeholder="Section"
              value={newSurveyQuestion.section}
              onChange={(e) => setNewSurveyQuestion({ ...newSurveyQuestion, section: e.target.value })}
              className="border p-2 mb-2 block w-full"
            />
            <input
              type="text"
              placeholder="Query"
              value={newSurveyQuestion.query}
              onChange={(e) => setNewSurveyQuestion({ ...newSurveyQuestion, query: e.target.value })}
              className="border p-2 mb-2 block w-full"
            />
            <textarea
              placeholder="Answer"
              value={newSurveyQuestion.answer}
              onChange={(e) => setNewSurveyQuestion({ ...newSurveyQuestion, answer: e.target.value })}
              className="border p-2 mb-2 block w-full"
            />
            <div className="flex justify-between">
              <button onClick={addSurveyQuestion} className="bg-green-500 text-white p-2 rounded">
                Add Question
              </button>
              <button onClick={() => setShowSurveyModal(false)} className="bg-red-500 text-white p-2 rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;