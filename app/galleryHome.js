import React, { useState, useEffect } from 'react';
import { Search, Sun, Moon } from 'lucide-react';
import axios from 'axios';

const GalleryHome = () => {
  const [collections, setCollections] = useState([]);
  const [searchQ, setSearchQ] = useState('nature');
  const [darkMode, setDarkMode] = useState(false);
  const api = process.env.REACT_APP_PEXELS_API_KEY
  const fetchRandomImage = async () => {
    try {
      const response = await axios.get(`https://api.pexels.com/v1/search?query=${searchQ}`, {
        headers: {
          Authorization: api,
        },
      });
      setCollections(response.data.photos);
      console(api?api:"api key not available")
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };


  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    fetchRandomImage()
  }, [darkMode]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchRandomImage();
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark:bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header with Search and Theme Toggle */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Photo Gallery</h1>
            <button
              onClick={() => setDarkMode((prev) => !prev)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-6 h-6 text-gray-600" />}
            </button>
          </div>
          <form className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search images..."
                value={searchQ}
                onChange={(e) => setSearchQ(e.target.value)}
                className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-300 dark:border-gray-600 
                           bg-white dark:bg-gray-700 text-gray-800 dark:text-white
                           focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
            <button
             onClick={handleSearch}
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg
                         transition-colors duration-200 flex items-center gap-2 shadow-sm"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>
          </form>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {collections.map((image) => (
            <div
              key={image.id} // Unique key for each item
              className="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 
                         hover:scale-105 hover:shadow-xl aspect-square"
            >
              <img
                src={image.src.original}
                alt={image.alt || 'Image'} 
                className="object-cover w-full h-full transform transition-transform object-cover duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-semibold text-lg">{image.alt || 'Untitled Image'}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryHome;
