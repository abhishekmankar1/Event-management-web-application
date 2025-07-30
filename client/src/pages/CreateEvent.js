import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateEvent = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [tags, setTags] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const tagArray = tags.split(',').map((tag) => tag.trim());

      await axios.post(
        'http://localhost:5000/api/events',
        { title, date, description, imageUrl, tags: tagArray },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate('/');
    } catch (err) {
      console.error('Error creating event:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-300 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-lg p-8 max-w-xl w-full space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-4">
          ➕ Create New Event
        </h2>

       <input
  type="text"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  placeholder="Event Title"
  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
/>


        <input
          type="date"
          className="input-style"
          value={date}
          onChange={(e) => setDate(e.target.value)}
  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-100"
        />

        <textarea
          placeholder="Description"
          className="input-style"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
/>

        <input
          type="text"
          placeholder="Image URL (optional)"
          className="input-style"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <input
          type="text"
          placeholder="Tags (comma separated)"
          className="input-style"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
