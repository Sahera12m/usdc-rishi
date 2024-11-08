import { useState } from 'react';

const Map = () => {
  const [loading, setLoading] = useState(true); // Track the map loading state

  const handleIframeLoad = () => {
    setLoading(false); // When the iframe loads, hide the loading animation
  };

  return (
    <div className="animate-fade-in-up">
      <div className="flex flex-col md:flex-row relative space-x-3">
        <div className="w-full md:w-1/2 relative"> {/* Map takes 1/2 width */}
          {loading && (
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="spinner"></div> {/* Loading animation */}
            </div>
          )}
          <iframe
            src="https://www.google.com/maps/d/u/0/embed?mid=16rVYIZc5NtRmAh4GB4YXJHRKHkACkls&ehbc=2E312F&noprof=1"
            title="vemavaram map"
            className="w-full h-96 md:h-96"
            width="640"
            height="480"
            onLoad={handleIframeLoad}
          ></iframe>
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center mt-4 md:ml-4 md:mt-0 space-y-4"> {/* Information takes 1/2 width */}
          <div className="flex flex-col md:flex-row justify-between w-full space-x-3 px-4">
            <div className="text-center md:text-left w-full md:w-1/2 space-y-4">
              <h2 className="text-lg font-bold mb-2">Villages</h2>
              <div className="space-y-2">
                {['Patha Mallayapalem', 'Kotha Mallayapalem', 'Murikipudi', 'Tatapudi', 'Rajupalem', 'Martur', 'Ballikurava', 'Konidena', 'Kopperapalem', 'Somavarappadu', 'Ramachandrapuram', 'Boppudi', 'Kotha Rajapet', 'Uppumaguluru'].map((village, index) => (
                  <div key={index} className="p-4 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:bg-gray-500 hover:text-white">
                    {village}
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center md:text-left mt-8 md:mt-0 w-full md:w-1/2 space-y-4"> {/* Added margin-top for spacing */}
              <h2 className="text-lg font-bold mb-2">Schools</h2>
              <div className="space-y-2">
                {['Zilla Parishad High School', 'Nakkabokkalapadu School', 'Kothapalem Primary School', 'Gurukula Patasala'].map((school, index) => (
                  <div key={index} className="p-4 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:bg-gray-500 hover:text-white">
                    {school}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;