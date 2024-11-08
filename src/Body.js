import { useState, useEffect, useMemo } from 'react';
import Map from './Map';
import Projects from './Projects';
import ContactUs from './ContactUs';
import image1 from './Assets/image-3.png';
import image2 from './Assets/image-2.png';
import image3 from './Assets/image-1.png';
import image4 from './Assets/image-4.png';
import image5 from './Assets/image-5.png';
import SurveyInformation from './SurveyInformation';
import AdminDashboard from './AdminDashboard';

const Body = ({ currentSection, isModalOpen, setIsModalOpen, setCurrentSection }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [aboutText, setAboutText] = useState(['', '', '']);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(false);

    const fullAboutText = useMemo(() => [
        `Project RISHI is a non-profit with the goal to promote sustainable development and growth of rural Indian communities.`,
        `In partnership with local community members and NGOs in India, we identify issues central to our target community and provide resources to implement solutions through extensive field research and on-campus initiatives.`,
        `UCSD Project RISHI was founded in 2009. Our partner village is currently Vemavaram, Andhra Pradesh. With over 60 members and 7 different committees, we strive to develop focused initiatives with the goal of sustainable growth in Vemavaram.`
    ], []);

    const images = [image1, image2, image3, image4, image5];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1)); 
        }, 5000);
        return () => clearInterval(interval);
    }, [images.length]);

    useEffect(() => {
        if (currentSection !== 'map') {
            let wordsPerParagraph = fullAboutText.map(paragraph => paragraph.split(' '));
            let paragraphIndex = 0;
            let wordIndex = 0;
            let tempText = ['', '', ''];

            const interval = setInterval(() => {
                tempText[paragraphIndex] = tempText[paragraphIndex] + wordsPerParagraph[paragraphIndex][wordIndex] + ' ';
                setAboutText([...tempText]);

                wordIndex++;
                if (wordIndex >= wordsPerParagraph[paragraphIndex].length) {
                    wordIndex = 0;
                    paragraphIndex++;
                }

                if (paragraphIndex >= fullAboutText.length) {
                    clearInterval(interval);
                }
            }, 200);

            return () => clearInterval(interval);
        }
    }, [fullAboutText, currentSection]);

    // Function to handle login
    const handleLogin = (e) => {
        e.preventDefault();
        if (username === 'rishi' && password === 'abc@123') {
            setIsModalOpen(false);
            setCurrentSection('admin'); // Set section to 'admin' to render AdminDashboard
        } else {
            setLoginError(true);
        }
    };

    return (
        <div className={`relative p-4 md:p-8 mx-4 md:mx-36 animate-fade-in-up ${isModalOpen ? 'backdrop-blur-md' : ''}`}>
            {
                currentSection === 'map' ? (
                    <Map />
                ) : currentSection === 'survey' ? (
                    <SurveyInformation />
                ) : currentSection === 'projects' ? (
                    <Projects />
                ) : currentSection === 'contact' ? (
                    <ContactUs />
                ) : currentSection === 'admin' ? (
                    <AdminDashboard />
                ) : (
                    <>
                        <section id="about" className="relative h-[400px] md:h-[600px] mb-8 animate-fade-in-up">
                            <div className="absolute inset-0">
                                {images.map((image, index) => (
                                    <div
                                        key={index}
                                        className={`absolute inset-0 bg-center bg-no-repeat bg-contain transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                                        style={{ backgroundImage: `url(${image})` }}
                                    ></div>
                                ))}
                            </div>
                            <div className="absolute inset-0 bg-black bg-opacity-75"></div>
                            <div className="relative z-5 flex flex-col justify-center h-full p-8 md:flex-row md:items-center">
                                <div className="md:w-1/2 text-white text-left animate-fade-in-up">
                                    <h2 className="text-3xl md:text-4xl font-bold mb-4">UCSD Project Rishi</h2>
                                </div>
                                <div className="md:w-1/2 text-white text-left animate-fade-in-up">
                                    {aboutText.map((paragraph, index) => (
                                        <p key={index} className="text-sm md:text-lg mb-4">{paragraph}</p>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* Admin Login Modal */}
                        {isModalOpen && (
                            <div className="fixed inset-0 bg-gray-900 bg-opacity-30 flex justify-center items-center z-50 backdrop-blur-sm">
                                <div className="bg-white rounded-lg p-6 w-96 animate-popup">
                                    <h3 className="text-lg font-bold mb-4">Admin Login</h3>
                                    <form onSubmit={handleLogin}>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Username
                                            <input 
                                                type="text" 
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                            />
                                        </label>
                                        <label className="block text-sm font-medium text-gray-700 mt-4">
                                            Password
                                            <input 
                                                type="password" 
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </label>
                                        {loginError && (
                                            <p className="text-red-500 text-sm mt-2">Invalid username or password</p>
                                        )}
                                        <div className="mt-6 flex justify-end">
                                            <button
                                                type="button"
                                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                                onClick={() => setIsModalOpen(false)}
                                            >
                                                Close
                                            </button>
                                            <button
                                                type="submit"
                                                className="ml-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                                            >
                                                Login
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                    </>
                )
            }
        </div>
    );
};

export default Body;