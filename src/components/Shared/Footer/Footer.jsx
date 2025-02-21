const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-10">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-lg font-semibold">TaskMaster</h2>
          <p className="text-sm">Organize. Prioritize. Achieve.</p>
        </div>
        
        <nav className="flex space-x-6 text-sm">
          <a href="#" className="hover:text-white">Home</a>
          <a href="#" className="hover:text-white">Features</a>
          <a href="#" className="hover:text-white">About</a>
          <a href="#" className="hover:text-white">Contact</a>
        </nav>

        <p className="text-sm text-gray-400 text-center md:text-right">
          © {new Date().getFullYear()} TaskMaster. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

