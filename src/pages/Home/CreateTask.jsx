import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import useAuth from '../../hooks/useAuth'; // Import authentication hook
import PropTypes from 'prop-types'; // Import PropTypes

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero bg-base-200 rounded-xl">
      <div className="hero-content flex-col lg:flex-row-reverse ">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Create a New Task</h1>
          <p className="py-6">
            Provide details for the new task you d like to create. Select a category and give it a title and description.
          </p>
        </div>
        <div className="card bg-base-100  w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                maxLength={50}
                className="input input-bordered"
                placeholder="Enter task title"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={200}
                className="textarea textarea-bordered"
                placeholder="Enter task description (optional)"
              ></textarea>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="select select-bordered"
              >
                <option value="To-Do">To-Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>
            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Create Task'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// PropTypes validation for props
CreateTask.propTypes = {
  onTaskCreated: PropTypes.func.isRequired, // onTaskCreated should be a function
};

export default CreateTask;
