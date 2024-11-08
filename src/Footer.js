import { FaFacebookF, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-transparent text-black p-2 text-center">
      <div className="flex justify-center space-x-4 mt-2 mb-2">
        <a href="https://www.facebook.com/rishi.ucsd.1" target="_blank" rel="noreferrer">
          <FaFacebookF className="hover:scale-110 transition-transform" />
        </a>
        <a href="https://www.instagram.com/ucsdprojectrishi?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noreferrer">
          <FaInstagram className="hover:scale-110 transition-transform" />
        </a>
      </div>
      <p>&copy; 2024 NGO. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;