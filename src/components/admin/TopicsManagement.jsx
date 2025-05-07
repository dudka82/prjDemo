import React, { useState, useEffect } from 'react';
import { getTopics, createTopic, updateTopic, deleteTopic } from '../../services/adminApi';

const TopicsManagement = () => {
  const [themes, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTopic, setEditingTopic] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    try {
      setLoading(true);
      const response = await getTopics();
      setTopics(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch themes');
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
      if (editingTopic) {
        await updateTopic(editingTopic.id, formData);
      } else {
        await createTopic(formData);
      }
      setFormData({ title: '', description: '' });
      setEditingTopic(null);
      fetchTopics();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save theme');
    }
  };

  const handleEdit = (theme) => {
    setEditingTopic(theme);
    setFormData({
      title: theme.title,
      description: theme.description
    });
  };

  const handleDelete = async (id) => {
    try {
      await deleteTopic(id);
      fetchTopics();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete theme');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Manage Topics</h2>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
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
          {editingTopic ? 'Update Theme' : 'Create Theme'}
        </button>
      </form>
      
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {themes.map(theme => (
            <tr key={theme.id}>
              <td>{theme.title}</td>
              <td>{theme.description}</td>
              <td>
                <button onClick={() => handleEdit(theme)}>Edit</button>
                <button onClick={() => handleDelete(theme.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopicsManagement;