import React from 'react';

function JobPortal({ items }) {
  const date = new Date(items.time);
  const formattedDate = date.toLocaleDateString('en-GB');

  return (
    <div className='bg-white my-4 p-6 shadow-lg rounded-lg border border-gray-200'>
        <a href={items.url} target="_blank" rel="noopener noreferrer" className='text-2xl font-bold text-blue-600 hover:text-blue-800 hover:underline'>
            {items.title}
        </a>
        <div className='mt-2 flex flex-wrap gap-6 text-lg text-gray-600'>
            <p className='font-medium'>By {items.by}</p>
            <p className='font-medium'>Published: {formattedDate}</p>
            <p className='font-medium text-green-600'>Remote</p>
        </div>
    </div>
  );
}

export default JobPortal;
