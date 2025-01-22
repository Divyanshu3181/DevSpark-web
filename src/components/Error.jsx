import React from 'react';

const ErrorComponent = ({ message }) => {
  return (
    <div className='flex justify-center items-center min-h-screen bg-red-100'>
      <div className='text-center bg-white shadow-md rounded-md p-6 max-w-md'>
        <h2 className='text-2xl font-bold text-red-500 mb-4'>Error</h2>
        <p className='text-gray-700 mb-4'>{message || 'An unexpected error occurred. Please try again later.'}</p>
        <button
          onClick={() => window.location.reload()}
          className='bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-200'
        >
          Refresh
        </button>
      </div>
    </div>
  );
};

export default ErrorComponent;