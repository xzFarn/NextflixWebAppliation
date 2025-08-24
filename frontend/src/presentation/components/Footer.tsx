import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-6 sm:py-8 mt-8 sm:mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
          <div className="col-span-2 sm:col-span-1">
            <h3 className="text-red-600 text-lg sm:text-xl font-bold mb-2 sm:mb-4">NETFLIX</h3>
            <p className="text-gray-400 text-sm sm:text-base">
              Unlimited movies, TV shows, and more.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2 sm:mb-4 text-sm sm:text-base">Account</h4>
            <ul className="space-y-1 sm:space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-white transition-colors text-xs sm:text-sm">Profile</a></li>
              <li><a href="/" className="hover:text-white transition-colors text-xs sm:text-sm">Settings</a></li>
              <li><a href="/" className="hover:text-white transition-colors text-xs sm:text-sm">Help</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-400">
          <p className="text-xs sm:text-sm">&copy; 2024 Netflix Clone. This is a demo project for educational purposes.</p>
        </div>
      </div>
    </footer>
  );
};
