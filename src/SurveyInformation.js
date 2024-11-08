import { useState, useEffect } from "react";
import axios from "axios";

const SurveyInformation = () => {
  const [surveyInfo, setInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/surveyinformation")
      .then((response) => {
        setInfo(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to load survey information. Please try again later.");
        setLoading(false);
        console.error(error);
      });
  }, []);

  if (loading) {
    return <p className="text-center text-gray-600">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  // Grouping data by section
  const groupedInfo = surveyInfo.reduce((acc, info) => {
    (acc[info.section] = acc[info.section] || []).push(info);
    return acc;
  }, {});

  return (
    <div className="p-4 md:p-8 animate-fade-in-up">
      <div className="flex flex-col gap-4"> {/* Stacked layout for all screen sizes */}
        {Object.keys(groupedInfo).length > 0 ? (
          Object.keys(groupedInfo).map((section, index) => (
            <div 
              key={index} 
              className="bg-white shadow-md p-4 md:p-6 rounded-lg hover:shadow-lg transition-shadow overflow-hidden" // Add overflow-hidden
            >
              <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
                {section}
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-500">
                {groupedInfo[section].map((info, idx) => (
                  <li key={idx} className="text-sm md:text-base break-words"> {/* Add break-words to handle long lines */}
                    <strong>Query:</strong> {info.query} <br />
                    <strong>Answer:</strong> {info.answer}
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No survey information available.</p>
        )}
      </div>
    </div>
  );
};

export default SurveyInformation;