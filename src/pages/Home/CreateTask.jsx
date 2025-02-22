import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import PropTypes from "prop-types";
const CreateTask = ({ onTaskCreated }) => {
  const { user } = useAuth();
  const [task, setTask] = useState({
    title: "",
    description: "",
    category: "To-Do",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (task.title.length > 50) {
      return toast.error("Title must be 50 characters or less");
    }
    if (task.description.length > 200) {
      return toast.error("Description must be 200 characters or less");
    }
    if (!user) {
      return toast.error("You must be logged in to create a task.");
    }

    const newTask = {
      ...task,
      timestamp: new Date().toISOString(),
      email: user.email,
      displayName: user.displayName,
    };

    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/tasks`,
        newTask
      );

      if (response.data._id) {
        toast.success("Task Created Successfully");
        onTaskCreated(response.data); 
        setTask({ title: "", description: "", category: "To-Do" });
      }
    } catch (error) {
      console.error("Error creating task:", error); 
      toast.error("Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero bg-green-700 dark:bg-base-200 rounded-xl">
      <div className="hero-content gap-20 flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Create a New Task</h1>
          <p className="py-6">
            Provide details for the new task you did like to create. Select a
            category and give it a title and description.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                name="title"
                value={task.title}
                onChange={handleChange}
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
                name="description"
                value={task.description}
                onChange={handleChange}
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
                name="category"
                value={task.category}
                onChange={handleChange}
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
                {loading ? "Creating..." : "Create Task"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};


CreateTask.propTypes = {
  onTaskCreated: PropTypes.func.isRequired,
};

export default CreateTask;
