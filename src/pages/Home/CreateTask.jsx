import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import useAuth from '../../hooks/useAuth'; // Import authentication hook

const CreateTask = ({ onTaskCreated }) => {
  const { user } = useAuth(); // Get logged-in user's details
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('To-Do');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title.length > 50) {
      return toast.error('Title must be 50 characters or less');
    }
    if (description.length > 200) {
      return toast.error('Description must be 200 characters or less');
    }

    if (!user) {
      return toast.error('You must be logged in to create a task.');
    }

    const newTask = {
      title,
      description,
      category,
      timestamp: new Date().toISOString(),
      email: user.email, // Store the logged-in user's email
      displayName: user.displayName, // Store the logged-in user's name
    };

    try {
      setLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/tasks`, newTask);
      if (response.data.insertedId) {
        toast.success('Task Created Successfully');
        onTaskCreated(response.data);
        setTitle('');
        setDescription('');
        setCategory('To-Do');
      }
    } catch (error) {
      toast.error('Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-96">
      <h2 className="text-lg font-bold mb-4">Create New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            maxLength={50}
            className="w-full p-2 border rounded-md"
            placeholder="Enter task title"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={200}
            className="w-full p-2 border rounded-md"
            placeholder="Enter task description (optional)"
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="To-Do">To-Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Task'}
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
