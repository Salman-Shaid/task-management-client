import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import socket from "../../../socket";
import useAuth from "../../../hooks/useAuth";
import CreateTask from "../CreateTask";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
// import Swal from "sweetalert2"; // Import SweetAlert2

const categories = ["To-Do", "In Progress", "Done"];

const getCategoryColor = (category) => {
  switch (category) {
    case "To-Do":
      return "bg-blue-200  dark:bg-slate-600";
    case "In Progress":
      return "bg-yellow-200 dark:bg-slate-600";
    case "Done":
      return "bg-green-200 dark:bg-slate-600";
    default:
      return "bg-gray-500 ";
  }
};

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      socket.emit("getTasks");
      socket.on("tasks:update", (taskList) => {
        if (Array.isArray(taskList)) {
          setTasks(taskList);
          localStorage.setItem("tasks", JSON.stringify(taskList));
        }
      });
    } else {
      const storedTasks = JSON.parse(localStorage.getItem("tasks"));
      if (storedTasks) {
        setTasks(storedTasks);  // Load tasks from localStorage if available
      }
    }

    return () => {
      socket.off("tasks:update");
    };
  }, [user]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const { destination } = result;
    const movedTask = tasks.find((task) => task._id === result.draggableId);
    if (!movedTask) return;

    movedTask.category = destination.droppableId;
    const updatedTasks = tasks.filter((task) => task._id !== movedTask._id);
    updatedTasks.splice(destination.index, 0, movedTask);
    setTasks(updatedTasks);
    socket.emit("task:update", movedTask);
  };

  const handleDelete = (taskId) => {
    socket.emit("task:delete", taskId, (response) => {
      if (response.success) {
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
      }
    });
  };

  const openUpdateModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingTask(null);
    setIsModalOpen(false);
    setIsCreateFormOpen(false); // Close create task form when modal is closed
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedTask = {
      ...editingTask,
      title: e.target.title.value,
      description: e.target.description.value,
      category: e.target.category.value,
    };

    socket.emit("task:update", updatedTask, (response) => {
      if (response.success) {
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task._id === updatedTask._id ? updatedTask : task))
        );
        closeModal();
      }
    });
  };


  return (
    <div className="flex flex-col w-full gap-10 p-4 sm:p-6 lg:p-8">
      {/* Button to toggle create task form */}
      <button
        className="btn btn-primary mb-6"
        onClick={() => setIsCreateFormOpen(!isCreateFormOpen)}
      >
        {isCreateFormOpen ? 'Cancel Create Task' : 'Create New Task'}
      </button>

      {/* Create Task Form */}
      {isCreateFormOpen && (
        <CreateTask
          onTaskCreated={(newTask) => setTasks((prevTasks) => [...prevTasks, newTask])}
          className="w-full max-w-2xl mx-auto sm:w-96 lg:w-1/2 xl:w-1/3" // Adjusting form size
        />
      )}

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex flex-wrap justify-start gap-4">
          {categories.map((category) => {
            const categoryTasks = tasks.filter((task) => task.category === category);
            return (
              <Droppable droppableId={category} key={category}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="flex-grow sm:w-full md:w-1/3 lg:w-1/4 bg-gray-300 dark:bg-slate-800 p-4 rounded-lg shadow-md min-h-[400px]"
                  >
                    <h3 className={`text-3xl font-bold p-4 mb-6 rounded-t-lg dark:text-white text-black shadow-xl ${getCategoryColor(category)}`}>{category}</h3>
                    {categoryTasks.map((task, i) => (
                      <Draggable key={task._id} draggableId={task._id} index={i}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`card text-black dark:text-white  w-full sm:w-full md:w-96 mb-4 ${getCategoryColor(task.category)}`}
                          >
                            <div className="card-body shadow-2xl">
                              <h2 className="card-title">{task.title}</h2>
                              <p>{task.description}</p>
                              <p>{task.email}</p>
                              <p>{task.displayName}</p>
                              <p className="text-xs opacity-80">
                                {new Date(task.timestamp).toLocaleString()}
                              </p>
                              <div className="card-actions justify-end">
                                <button className="btn btn-outline btn-primary btn-sm shadow-lg" onClick={() => openUpdateModal(task)}><FaRegEdit />Edit</button>
                                <button className="btn btn-error btn-outline  btn-sm shadow-lg" onClick={() => handleDelete(task._id)}><MdDeleteForever />Delete</button>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            );
          })}
        </div>
      </DragDropContext>

      {/* Modal for updating task */}
      {isModalOpen && editingTask && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-[90%] md:w-[80%] lg:w-[40%]">
            <h2 className="text-lg font-semibold mb-4">Update Task</h2>
            <form onSubmit={handleUpdate}>
              <label className="block mb-2">
                Title:
                <input
                  type="text"
                  name="title"
                  defaultValue={editingTask.title}
                  required
                  className="input input-bordered w-full mt-1"
                />
              </label>
              <label className="block mb-2">
                Description:
                <textarea
                  name="description"
                  defaultValue={editingTask.description}
                  required
                  className="textarea textarea-bordered w-full mt-1"
                />
              </label>
              <label className="block mb-4">
                Category:
                <select name="category" defaultValue={editingTask.category} className="select select-bordered w-full mt-1">
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </label>
              <div className="flex justify-end gap-2">
                <button type="button" className="btn btn-outline" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn btn-primary">Update</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskBoard;
