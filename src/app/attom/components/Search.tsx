"use client"

import React, { useState, FormEvent, ChangeEvent, useEffect, useRef } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import Card from './Card';

const libraries: ('places')[] = ['places'];

const Search: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [data, setData] = useState<any>(null); // Adjust type as needed
  const [loading, setLoading] = useState<boolean>(true);
  console.log(data)
  // Load Google Maps API
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyBC9ytu3b3UnI1x1BTW_c1mIUU_TxXEmYA', // Replace with your API key
    libraries,
  });

  // Ref to hold the autocomplete instance
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isLoaded && searchInputRef.current) {
      // Initialize autocomplete
      autocompleteRef.current = new google.maps.places.Autocomplete(searchInputRef.current);
      autocompleteRef.current.addListener('place_changed', () => {
        const place = autocompleteRef.current?.getPlace();
        if (place) {
          setInputValue(place.formatted_address || ''); // Update input value with address
          setError(false); // Clear error if valid place is selected
        }
      });
    }
  }, [isLoaded]);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/property/filter?searchText=${inputValue}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setData(result); // Set the data state
    } catch (error: any) {
      setError(error.message); // Set the error state
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };

  const handleGoClick = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim() === '') {
      setError(true);
    } else {
      setError(false);
      fetchData();
    }
  };

  const handleClearClick = () => {
    setInputValue('');
    setError(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (error && e.target.value.trim() !== '') {
      setError(false);
    }
  };

  const gradientStyle: React.CSSProperties = {
    background: `url('https://i.ibb.co/f1mHZfM/15578.jpg'), linear-gradient(to top, rgba(0, 0, 0, 0.849), rgba(0, 0, 0, 0))`,
    backgroundSize: 'cover',
    backgroundBlendMode: 'overlay',
    backgroundPosition: "bottom",
  };

  return (
    <div>

      <div style={gradientStyle} className="bg-no-repeat bg-cover px-10 pt-56 pb-36 relative">
        <h1 className='text-6xl font-[800] uppercase text-white text-center pb-10 leading-tight'>
          Your Key to Finding <br /> the Perfect U.S. Property
        </h1>

        <div className='flex justify-center'>
          <form onSubmit={handleGoClick} className="relative w-full max-w-2xl">
            <p className='text-white font-semibold mb-3'>Search Your Property by Address</p>
            <div className="flex space-x-4">
              <div className="flex w-full rounded-md overflow-hidden">
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder='EX: 4707 Hickory PL, Cheyenne, WY 82009'
                  ref={searchInputRef} // Ref for autocomplete
                  className="w-full border rounded-md px-5"
                />
                <button
                  type="submit"
                  className="bg-[#244C7C] text-white px-6 text-lg font-semibold py-4 rounded-r-md"
                >
                  Search
                </button>
              </div>
              <button
                type='button'
                onClick={handleClearClick}
                className="bg-white px-6 text-lg font-semibold py-4 rounded-md"
              >
                Clear
              </button>
            </div>
            {error && (
              <div className="absolute top-full left-0 mt-2 w-full flex">
                <div className="flex space-x-1 items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-red-500 text-lg font-semibold">Please enter something</p>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>

    </div>
  );
};

export default Search;
