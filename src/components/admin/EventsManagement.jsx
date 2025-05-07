import React, { useState, useEffect } from 'react';
import { getMeetings, createMeeting, updateMeeting, deleteMeeting } from '../../services/adminApi';

const MeetingsManagement = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingMeeting, setEditingMeeting] = useState(null);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    place: '',
    description: ''
  });

  useEffect(() => {
    fetchmeetings();
  }, []);

  const fetchMeetings = async () => {
    try {
      setLoading(true);
      const response = await getMeetings();
      setMeetings(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch meetings');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingMeeting) {
        await updateMeeting(editingMeeting.id, formData);
      } else {
        await createMeeting(formData);
      }
      setFormData({ date: '', time: '', place: '', description: '' });
      setEditingMeeting(null);
      fetchMeetings();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save meeting');
    }
  };

  const handleEdit = (meeting) => {
    setEditingMeeting(meeting);
    setFormData({
      date: meeting.date,
      time: meeting.time,
      place: meeting.place,
      description: meeting.description
    });
  };

  const handleDelete = async (id) => {
    try {
      await deleteMeeting(id);
      fetchMeetings();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete meeting');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Manage Meetings</h2>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div>
          <label>Time:</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div>
          <label>Location:</label>
          <input
            type="text"
            name="place"
            value={formData.place}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <button type="submit">
          {editingMeeting ? 'Update Meeting' : 'Create Meeting'}
        </button>
      </form>
      
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Location</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {meetings.map(meeting => (
            <tr key={meeting.id}>
              <td>{meeting.date}</td>
              <td>{meeting.time}</td>
              <td>{meeting.place}</td>
              <td>{meeting.description}</td>
              <td>
                <button onClick={() => handleEdit(meeting)}>Edit</button>
                <button onClick={() => handleDelete(meeting.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MeetingsManagement;