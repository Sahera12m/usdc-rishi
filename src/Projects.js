import { useState, useEffect } from 'react';
import axios from 'axios';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedProject, setExpandedProject] = useState(null); // State to track expanded project

  useEffect(() => {
    axios.get('http://localhost:5000/api/projects')
      .then(response => {
        setProjects(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to load projects. Please try again later.');
        setLoading(false);
        console.error(error);
      });
  }, []);

  const toggleReadMore = (index) => {
    if (expandedProject === index) {
      setExpandedProject(null); // Collapse the expanded project
    } else {
      setExpandedProject(index); // Expand the selected project
    }
  };

  return (
    <div className="p-4 md:p-8 animate-fade-in-up">
      {loading && (
        <div className="flex justify-center items-center">
          <div className="spinner"></div> {/* Spinner for loading animation */}
        </div>
      )}
      {error && <p className="text-center text-red-600">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {!loading && !error && projects.length > 0 ? (
          projects.map((project, index) => (
            <div
              key={index}
              className="bg-white shadow-md p-4 md:p-6 rounded-lg hover:shadow-lg transition-shadow cursor-pointer transform hover:scale-105"
              style={{ height: expandedProject === index ? 'auto' : '180px' }} // Set fixed height for divs
            >
              <h3 className="text-lg md:text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-sm md:text-base">
                {expandedProject === index ? project.description : `${project.description.slice(0, 100)}...`}
              </p>
              <button
                onClick={() => toggleReadMore(index)}
                className="text-blue-500 mt-2"
              >
                {expandedProject === index ? 'Read Less' : 'Read More'}
              </button>
            </div>
          ))
        ) : (
          <p>Coming Soon!!</p>
        )}
      </div>
    </div>
  );
};

export default Projects;