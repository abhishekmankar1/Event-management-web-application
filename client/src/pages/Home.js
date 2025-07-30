// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const userRole = localStorage.getItem('role'); // 'organizer' or 'user'
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/events');
      setEvents(res.data);
    } catch (err) {
      console.error('Failed to fetch events:', err);
      setEvents([]);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchEvents(); // refresh after delete
    } catch (err) {
      console.error('Failed to delete:', err);
    }
  };

  const handleEdit = (id) => {
    alert(`Redirect to edit form for event ID: ${id}`);
    // Later you can use: navigate(`/edit-event/${id}`)
  };

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">

        {/* Search Bar */}
        <div className="flex justify-center mb-6">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="🔍 Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-8">
          🎉 All Events
        </h1>

        {filteredEvents.length === 0 ? (
          <p className="text-center text-gray-500">No events found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 hover:shadow-2xl transition duration-300"
              >
                {event.imageUrl && (
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-48 object-cover mb-4 rounded"
                  />
                )}

                <h2 className="text-xl font-semibold text-indigo-700 mb-2">
                  {event.title}
                </h2>
                <p className="text-gray-600 mb-2">
                  {new Date(event.date).toDateString()}
                </p>
                <p className="text-gray-700 mb-2">{event.description}</p>

                {event.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {event.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="bg-indigo-100 text-indigo-600 text-xs px-2 py-1 rounded-full"
                      >
                        #{tag.trim()}
                      </span>
                    ))}
                  </div>
                )}

                {/* Show buttons only if user is organizer */}
                {userRole === 'organizer' && (
  <div className="flex space-x-2 mt-4">
    <button
      onClick={() => handleEdit(event._id)}
      className="bg-green-400 text-white px-2 py-1 rounded"
    >
      ✏️ Edit
    </button>
    <button
      onClick={() => handleDelete(event._id)}
      className="bg-red-500 text-white px-3 py-1 rounded"
    >
      🗑️ Delete
    </button>
  </div>
)}
                )
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
