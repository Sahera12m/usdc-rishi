import { useState } from 'react';
import { FaEnvelope, FaPhone } from 'react-icons/fa';

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(null); // State for submission status (null, 'success', or 'error')
  const [exit, setExit] = useState(false); // State for exit animation
  const [timerWidth, setTimerWidth] = useState(100); // State for timer line width

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        console.log('Contact data saved successfully!');
        setStatus('success'); // Set status to success
      } else {
        console.error('Error saving contact data');
        setStatus('error'); // Set status to error
      }
      setName('');
      setEmail('');
      setMessage('');
      startTimer(); // Start the timer
    } catch (error) {
      console.error('Error:', error);
      setStatus('error'); // Set status to error
    }
  };

  const startTimer = () => {
    setTimerWidth(100); // Reset timer width to 100%
    const interval = setInterval(() => {
      setTimerWidth((prevWidth) => {
        if (prevWidth <= 0) {
          clearInterval(interval); // Stop the interval
          return 0;
        }
        return prevWidth - 2; // Decrease width over time
      });
    }, 100); // Decrease width every 100ms

    // Clear the message after 5 seconds
    const timer = setTimeout(() => {
      setExit(true); // Set exit state to true
      clearInterval(interval); // Clear the interval when done

      // Delay removing the message until after the slide-out animation
      setTimeout(() => {
        setStatus(null); // Reset status to null
        setExit(false);
      }, 500); // Duration of slide-out animation
    }, 5000);

    return () => clearTimeout(timer); // Clean up on unmount
  };

  return (
    <div className="p-4 md:p-8 animate-fade-in-up">
      <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
      <div className="flex flex-col md:flex-row md:space-x-8">
        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="mb-6 md:w-1/2">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="message">Message</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows="4"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-200"
          >
            Submit
          </button>
        </form>

        {/* Vertical Separator and Contact Info */}
        <div className="flex flex-col justify-center md:items-center md:relative md:w-1/2">
          <div className="hidden md:block absolute inset-y-0 left-0 flex items-center justify-center">
            <div className="h-full border-l border-gray-300"></div>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <span className="mx-4 text-gray-400 text-sm md:block">Or you can reach us at</span>
            <div className="flex space-x-4 mt-4">
              <a href="mailto:RISHI@ucsd.edu" className="bg-white shadow-md rounded-md p-4 flex items-center space-x-2 hover:bg-gray-100 transition duration-200">
                <FaEnvelope className="text-gray-700" />
                <span className="text-sm">RISHI@ucsd.edu</span>
              </a>
              <a href="tel:+91xxxxxxxxxx" className="bg-white shadow-md rounded-md p-4 flex items-center space-x-2 hover:bg-gray-100 transition duration-200">
                <FaPhone className="text-gray-700" />
                <span className="text-sm">+91xxxxxxxxxx</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Success or Error Animation */}
      {status && !exit && ( // Show message if there is a status and not exiting
        <div
          className={`fixed top-24 right-4 p-4 border rounded-md transition duration-300 ease-in-out ${status === 'success' ? 'bg-white border-green-500 text-green-700 slide-in-right' : 'bg-white border-gray-500 text-red-700 slide-in-right'}`}
        >
          <p>{status === 'success' ? 'submitted successfully!' : 'There was an error submitting your message.'}</p>
          <div className="h-1 rounded-sm mt-2" style={{ width: `${timerWidth}%`, backgroundColor: status === 'success' ? 'green' : 'red', transition: 'width 0.1s linear' }}></div>
        </div>
      )}
      {exit && ( // Slide out message if exiting
        <div
          className={`fixed top-16 right-0 p-4 border rounded-sm transition duration-300 ease-in-out ${status === 'success' ? 'bg-white border-green-500 text-green-700 slide-out-right' : 'bg-white border-gray-500 text-red-700 slide-out-right'}`}
        >
          <p>{status === 'success' ? 'submitted successfully!' : 'Error in submitting your message.'}</p>
        </div>
      )}
    </div>
  );
};

export default ContactUs;