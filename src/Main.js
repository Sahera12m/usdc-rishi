import React, { useState } from 'react';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';

const App = () => {
  const [currentSection, setCurrentSection] = useState('home');
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header setCurrentSection={setCurrentSection} currentSection={currentSection} setIsModalOpen={setIsModalOpen} />
      {/* Main content area with flex-grow to push the footer down */}
      <main className="flex-grow">
        <Body currentSection={currentSection} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} setCurrentSection={setCurrentSection}/>
      </main>
      <Footer />
    </div>
  );
};

export default App;