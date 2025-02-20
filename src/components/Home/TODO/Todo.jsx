import { useEffect, useState } from 'react';
import axios from 'axios';

const Todo = () => {
    const [tasks, setTasks] = useState([]);

    // Fetch tasks from the backend
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/tasks/todo'); // New API route
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };
        fetchTasks();
    }, []);

    return (
        <div className="p-4 bg-white rounded-lg shadow-md border">
            <h2 className="text-xl font-semibold mb-4">To-Do Tasks</h2>
            {tasks.length === 0 ? (
                <p className="text-gray-500">No tasks in To-Do.</p>
            ) : (
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {tasks.map(task => (
                        <div key={task._id} className="card w-full bg-base-100 shadow-lg border border-gray-200">
                            <div className="card-body">
                                <h3 className="card-title">{task.title}</h3>
                                <p className="text-sm text-gray-600">{task.description || 'No description'}</p>
                                <p className="text-xs text-gray-400">Created: {new Date(task.timestamp).toLocaleString()}</p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-sm btn-primary">Edit</button>
                                    <button className="btn btn-sm btn-error">Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Todo;
