import Container from "../Container";
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="dark:bg-gray-900 bg-gray-50 dark:text-gray-200 text-gray-900 border-t dark:border-gray-800 pt-6 pb-3 ">
      <Container>
        <div className=" flex flex-col md:flex-row items-center justify-between px-6">
          {/* Brand Section */}
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
              TaskMan
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Organize. Prioritize. Achieve.
            </p>
          </div>

          
          {/* Social Media Icons */}
          <div className="flex space-x-4">
            <a href="#" className="text-gray-500 hover:text-blue-500 transition duration-300">
              <FaFacebook size={22} />
            </a>
            <a href="#" className="text-gray-500 hover:text-sky-400 transition duration-300">
              <FaTwitter size={22} />
            </a>
            <a href="#" className="text-gray-500 hover:text-blue-600 transition duration-300">
              <FaLinkedin size={22} />
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700 transition duration-300">
              <FaGithub size={22} />
            </a>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center text-gray-500 text-sm mt-4">
          © {new Date().getFullYear()} TaskMan. All rights reserved.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
